import { useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router-dom';

interface PublicModalProps {
  open: boolean;
  onRequestClose: () => void;
  labelledBy: string;
  initialFocusRef: RefObject<HTMLElement | null>;
  exitDuration?: number;
  children: ReactNode;
}

// Locks are shared only by public modals. Restore the original inline values,
// including when a route unmounts an overlay before its exit can complete.
let lockCount = 0;
let restoreScrollStyles: (() => void) | undefined;
function lockScroll() {
  if (lockCount++ === 0) {
    const root = document.documentElement;
    const body = document.body;
    const previous = [root.style.overflow, root.style.scrollbarGutter, body.style.overflow];
    // Overlay scrollbars reserve no width. Forcing a stable gutter there would
    // introduce a new gap (and shift fixed headers) when the modal opens.
    if (window.innerWidth > root.clientWidth) root.style.scrollbarGutter = 'stable';
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    restoreScrollStyles = () => {
      [root.style.overflow, root.style.scrollbarGutter, body.style.overflow] = previous;
    };
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--lockCount === 0) {
      restoreScrollStyles?.();
      restoreScrollStyles = undefined;
    }
  };
}

function usable(element: HTMLElement | null): element is HTMLElement {
  return !!element?.isConnected && element.getClientRects().length > 0
    && getComputedStyle(element).visibility !== 'hidden'
    && !element.closest('[inert]') && !element.matches(':disabled');
}

/** Native modality with one coordinated React / Motion / browser lifecycle. */
export default function PublicModal({ open, onRequestClose, labelledBy, initialFocusRef, exitDuration = 0.4, children }: PublicModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const active = useRef(false);
  const requested = useRef(false);
  const unlock = useRef<(() => void) | undefined>(undefined);
  const latest = useRef({ open, onRequestClose });
  latest.current = { open, onRequestClose };
  const route = useLocation().key;
  const openedOnRoute = useRef(route);
  const reduceMotion = useReducedMotion();

  const requestClose = () => {
    if (!active.current || requested.current || !latest.current.open) return;
    requested.current = true;
    latest.current.onRequestClose();
  };

  const finish = (returnToOpener = true) => {
    if (!active.current) return;
    active.current = false;
    if (dialogRef.current?.open) dialogRef.current.close();
    unlock.current?.();
    unlock.current = undefined;
    const target = returnToOpener && usable(opener.current)
      ? opener.current : document.querySelector<HTMLElement>('[data-public-main]');
    if (usable(target) && document.activeElement !== target) target.focus({ preventScroll: true });
    opener.current = null;
  };

  useLayoutEffect(() => {
    if (openedOnRoute.current !== route) {
      openedOnRoute.current = route;
      requestClose();
      finish(false);
      return;
    }
    const dialog = dialogRef.current;
    if (open && dialog) {
      requested.current = false;
      if (!active.current) {
        opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        active.current = true;
        unlock.current = lockScroll();
      }
      if (!dialog.open) dialog.showModal();
      if (usable(initialFocusRef.current)) initialFocusRef.current.focus({ preventScroll: true });
    }
  }, [open, route, initialFocusRef]);

  useLayoutEffect(() => () => finish(false), []);

  const backdropStart = useRef(false);
  return (
    <dialog
      ref={dialogRef}
      className="public-site public-modal"
      aria-labelledby={labelledBy}
      aria-modal="true"
      onCancel={event => { event.preventDefault(); requestClose(); }}
      onClose={() => {
        // A queued close event from an earlier cycle must not close a reopened modal.
        if (!dialogRef.current?.open && active.current) { requestClose(); finish(); }
      }}
      onPointerDown={event => { backdropStart.current = event.target instanceof Element && event.target.hasAttribute('data-public-backdrop'); }}
      onClick={event => {
        if (backdropStart.current && event.target instanceof Element && event.target.hasAttribute('data-public-backdrop')) requestClose();
        backdropStart.current = false;
      }}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          requestClose();
          return;
        }
        if (event.key !== 'Tab') return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])'
        )).filter(usable);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) { event.preventDefault(); initialFocusRef.current?.focus(); }
        else if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement as HTMLElement))) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }}
    >
      <AnimatePresence onExitComplete={() => { if (!latest.current.open) finish(); }}>
        {open && (
          <motion.div
            key="contents"
            className="fixed inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : exitDuration }}
            onAnimationComplete={definition => {
              // The shell owns dismissal. A nested carousel/disclosure presence
              // must not keep the native dialog open after the shell has exited.
              if (typeof definition === 'object' && 'opacity' in definition
                && definition.opacity === 0 && !latest.current.open) finish();
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
