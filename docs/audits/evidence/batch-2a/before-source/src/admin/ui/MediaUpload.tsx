import { useEffect, useRef, useState } from 'react';
import { FileImage, ImagePlus, RefreshCw, Trash2, UploadCloud } from 'lucide-react';
import { AdminButton } from './Button';
import { AdminInput } from './FormControls';

export interface LocalImageSelection {
  previewUrl: string;
  name: string;
  size: string;
  dimensions: string;
}

interface MediaUploadProps {
  initialDemo?: boolean;
  initialSrc?: string;
  initialMeta?: Omit<LocalImageSelection, 'previewUrl'>;
  onChange?: (selection: LocalImageSelection | null) => void;
  showAltField?: boolean;
  altValue?: string;
  onAltChange?: (value: string) => void;
  previewAlt?: string;
  objectUrlOwnership?: 'component' | 'consumer';
}

export function MediaUpload({ initialDemo = false, initialSrc, initialMeta, onChange, showAltField = true, altValue, onAltChange, previewAlt = 'Local media preview', objectUrlOwnership = 'component' }: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const demoSrc = initialSrc ?? (initialDemo ? '/products/sku-002/01-product.png' : null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(demoSrc);
  const [meta, setMeta] = useState<Omit<LocalImageSelection, 'previewUrl'> | null>(demoSrc ? initialMeta ?? {
    name: demoSrc.split('/').pop() ?? 'Existing image',
    size: 'Existing production asset',
    dimensions: '4:3 preview',
  } : null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (objectUrlOwnership === 'component' && previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    };
  }, [objectUrlOwnership, previewUrl]);

  const useFile = (file?: File) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file. Validation is local to this browser preview.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('This local preview accepts images up to 8 MB. No upload was attempted.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      const nextMeta = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        dimensions: `${image.naturalWidth} × ${image.naturalHeight}px`,
      };
      setMeta(nextMeta);
      onChange?.({ previewUrl: objectUrl, ...nextMeta });
    };
    image.src = objectUrl;
    setPreviewUrl(objectUrl);
  };

  const remove = () => {
    setPreviewUrl(null);
    setMeta(null);
    setError('');
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={(event) => useFile(event.target.files?.[0])} />
      {!previewUrl ? (
        <div
          onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => { if (event.currentTarget === event.target) setDragging(false); }}
          onDrop={(event) => { event.preventDefault(); setDragging(false); useFile(event.dataTransfer.files?.[0]); }}
          className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${dragging ? 'border-[var(--admin-accent)] bg-rose-50' : 'border-[var(--admin-border-strong)] bg-slate-50'}`}
        >
          <UploadCloud className="mx-auto h-8 w-8 text-[var(--admin-muted)]" aria-hidden="true" />
          <p className="mt-3 font-extrabold text-[var(--admin-heading)]">Drop an image here</p>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">Local preview only · PNG, JPG, WEBP · maximum 8 MB</p>
          <AdminButton variant="secondary" className="mt-4" onClick={() => inputRef.current?.click()}>
            <ImagePlus className="h-4 w-4" aria-hidden="true" /> Browse files
          </AdminButton>
        </div>
      ) : (
        <div className="grid gap-4 rounded-xl border border-[var(--admin-border)] p-4 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
            <img src={previewUrl} alt={previewAlt} className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <FileImage className="mt-0.5 h-5 w-5 shrink-0 text-[var(--admin-accent)]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="break-all font-extrabold text-[var(--admin-heading)]">{meta?.name ?? 'Reading image details…'}</p>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">{meta ? `${meta.dimensions} · ${meta.size}` : 'Local browser preview'}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <AdminButton variant="secondary" onClick={() => inputRef.current?.click()}><RefreshCw className="h-4 w-4" aria-hidden="true" /> Replace</AdminButton>
              <AdminButton variant="ghost" onClick={remove}><Trash2 className="h-4 w-4" aria-hidden="true" /> Remove</AdminButton>
            </div>
          </div>
        </div>
      )}
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{error}</p>}
      {showAltField && <AdminInput label="Alternative text" placeholder="Describe the image for accessibility" helpText="UI example only. This value is not saved or uploaded." value={altValue} onChange={(event) => onAltChange?.(event.target.value)} />}
    </div>
  );
}
