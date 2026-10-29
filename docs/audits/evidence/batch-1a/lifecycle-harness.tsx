// Local test fixture only; not imported by the application or production build.
import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import PublicModal from '../../../../src/components/PublicModal';
import '../../../../src/index.css';

const metrics = { closeRequests: 0, shows: 0, closes: 0 };
const originalShow = HTMLDialogElement.prototype.showModal;
const originalClose = HTMLDialogElement.prototype.close;
HTMLDialogElement.prototype.showModal = function () { metrics.shows++; originalShow.call(this); };
HTMLDialogElement.prototype.close = function () { metrics.closes++; originalClose.call(this); };

function Harness() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(true);
  const title = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  Object.assign(window, { batchHarness: { setOpen, setMounted, navigate, metrics } });
  return <div className="public-site">
    <button id="opener" onClick={() => setOpen(true)}>Open fixture</button>
    <main data-public-main tabIndex={-1}>Visible fallback</main>
    {mounted && <PublicModal open={open} onRequestClose={() => { metrics.closeRequests++; setOpen(false); }} labelledBy="fixture-title" initialFocusRef={title}>
      <motion.div data-public-backdrop className="fixed inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.25 }} />
      <motion.div className="fixed right-0 top-0 bottom-0 w-80 bg-white p-6" initial={{ x: reduce ? 0 : '100%' }} animate={{ x: 0 }} exit={{ x: reduce ? 0 : '100%' }} transition={{ duration: reduce ? 0 : 0.25 }}>
        <h2 id="fixture-title" ref={title} tabIndex={-1}>Lifecycle fixture</h2>
        <button id="fixture-close" onClick={() => setOpen(false)}>Close fixture</button>
      </motion.div>
    </PublicModal>}
  </div>;
}
createRoot(document.getElementById('harness-root')!).render(<StrictMode><MemoryRouter><Harness /></MemoryRouter></StrictMode>);
