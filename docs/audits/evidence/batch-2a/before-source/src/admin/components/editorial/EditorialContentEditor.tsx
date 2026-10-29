import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowDown, ArrowUp, Bold, Copy, Italic, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';
import type { EditorialBlock, EditorialLanguage, EditorialListBlock, EditorialMedia } from '../../types/editorial';
import { emptyLocalizedText, makeBlockId } from '../../types/editorial';
import { AdminButton } from '../../ui/Button';
import { AdminInput, AdminSelect, AdminTextarea } from '../../ui/FormControls';
import { MediaUpload } from '../../ui/MediaUpload';
import { LanguageTabs } from '../../ui/MultilingualFields';

type AddableBlockType = EditorialBlock['type'];

const blockLabels: Record<AddableBlockType, string> = {
  paragraph: 'Paragraph', heading: 'Heading', 'bulleted-list': 'Bulleted List', 'numbered-list': 'Numbered List', quote: 'Quote', image: 'Image', divider: 'Divider',
};

const safeUrlTransform = (url: string) => {
  if (url.startsWith('/') || url.startsWith('#')) return url;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol) ? url : '';
  } catch {
    return '';
  }
};

function InlineMarkdown({ value }: { value: string }) {
  return <ReactMarkdown skipHtml allowedElements={['p', 'strong', 'em', 'a']} unwrapDisallowed urlTransform={safeUrlTransform} components={{ p: ({ children }) => <>{children}</>, a: ({ children, ...props }) => <a {...props} rel="noreferrer" target="_blank" className="font-semibold text-blue-700 underline">{children}</a> }}>{value || '—'}</ReactMarkdown>;
}

function InlineToolbar({ textareaId, value, onChange }: { textareaId: string; value: string; onChange: (value: string) => void }) {
  const wrap = (before: string, after: string, fallback: string) => {
    const field = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    const start = field?.selectionStart ?? value.length;
    const end = field?.selectionEnd ?? value.length;
    const selected = value.slice(start, end) || fallback;
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    onChange(next);
    window.setTimeout(() => {
      const nextField = document.getElementById(textareaId) as HTMLTextAreaElement | null;
      nextField?.focus();
      nextField?.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };
  return (
    <div role="toolbar" aria-label="Inline formatting" className="mb-2 flex flex-wrap gap-1 rounded-lg border border-[var(--admin-border)] bg-slate-50 p-1">
      <AdminButton variant="ghost" className="px-3" aria-label="Bold selected text" onClick={() => wrap('**', '**', 'bold text')}><Bold className="h-4 w-4" aria-hidden="true" /> Bold</AdminButton>
      <AdminButton variant="ghost" className="px-3" aria-label="Italicize selected text" onClick={() => wrap('_', '_', 'italic text')}><Italic className="h-4 w-4" aria-hidden="true" /> Italic</AdminButton>
      <AdminButton variant="ghost" className="px-3" aria-label="Add link to selected text" onClick={() => wrap('[', '](https://example.com)', 'link text')}><LinkIcon className="h-4 w-4" aria-hidden="true" /> Link</AdminButton>
    </div>
  );
}

function createBlock(type: AddableBlockType): EditorialBlock {
  const id = makeBlockId();
  if (type === 'heading') return { id, type, level: 2, content: emptyLocalizedText() };
  if (type === 'bulleted-list' || type === 'numbered-list') return { id, type, items: [{ id: `${id}-item-1`, content: emptyLocalizedText() }] };
  if (type === 'image') return { id, type, media: null, alt: emptyLocalizedText(), caption: emptyLocalizedText() };
  if (type === 'divider') return { id, type };
  return { id, type, content: emptyLocalizedText() };
}

function duplicateBlock(block: EditorialBlock): EditorialBlock {
  const copy = structuredClone(block);
  copy.id = makeBlockId();
  if (copy.type === 'bulleted-list' || copy.type === 'numbered-list') copy.items = copy.items.map((item, index) => ({ ...item, id: `${copy.id}-item-${index + 1}` }));
  return copy;
}

interface EditorialContentEditorProps {
  blocks: EditorialBlock[];
  onChange: (blocks: EditorialBlock[]) => void;
  error?: string;
}

export function EditorialContentEditor({ blocks, onChange, error }: EditorialContentEditorProps) {
  const [language, setLanguage] = useState<EditorialLanguage>('en');
  const [addType, setAddType] = useState<AddableBlockType>('paragraph');
  const localUrls = useRef(new Set<string>());

  useEffect(() => () => { localUrls.current.forEach((url) => URL.revokeObjectURL(url)); localUrls.current.clear(); }, []);

  const update = (id: string, next: EditorialBlock) => onChange(blocks.map((block) => block.id === id ? next : block));
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const remove = (index: number) => {
    const block = blocks[index];
    if (block.type === 'image' && block.media?.src.startsWith('blob:')) { URL.revokeObjectURL(block.media.src); localUrls.current.delete(block.media.src); }
    onChange(blocks.filter((_, blockIndex) => blockIndex !== index));
  };
  const duplicate = (index: number) => onChange([...blocks.slice(0, index + 1), duplicateBlock(blocks[index]), ...blocks.slice(index + 1)]);
  const updateImageMedia = (block: Extract<EditorialBlock, { type: 'image' }>, selection: { previewUrl: string; name: string; size: string; dimensions: string } | null) => {
    if (block.media?.src.startsWith('blob:')) { URL.revokeObjectURL(block.media.src); localUrls.current.delete(block.media.src); }
    let media: EditorialMedia | null = null;
    if (selection) {
      localUrls.current.add(selection.previewUrl);
      media = { src: selection.previewUrl, name: selection.name, size: selection.size, dimensions: selection.dimensions, source: 'local-preview', productionReady: false };
    }
    update(block.id, { ...block, media });
  };

  const completion = {
    en: { complete: blocks.some((block) => block.type !== 'divider' && (block.type === 'image' ? Boolean(block.media) : block.type === 'bulleted-list' || block.type === 'numbered-list' ? block.items.some((item) => item.content.en.trim()) : Boolean(block.content.en.trim()))), label: 'Shared structure' },
    bn: { complete: blocks.some((block) => block.type !== 'divider' && block.type !== 'image' && (block.type === 'bulleted-list' || block.type === 'numbered-list' ? block.items.some((item) => item.content.bn.trim()) : Boolean(block.content.bn.trim()))), label: 'একই কাঠামো' },
  };

  return (
    <LanguageTabs language={language} onLanguageChange={setLanguage} completion={completion} ariaLabel="Article body language">
      <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
        <strong>One shared article structure.</strong> Switching language changes only the translated text inside each block. Block type, order, heading level, and media remain shared.
      </div>
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{error}</p>}
      {blocks.length === 0 ? <div className="rounded-xl border border-dashed border-[var(--admin-border-strong)] bg-slate-50 p-8 text-center"><p className="font-extrabold text-[var(--admin-heading)]">No body blocks yet</p><p className="mt-1 text-sm text-[var(--admin-muted)]">Add a paragraph, heading, list, quote, image, or divider.</p></div> : (
        <ol className="space-y-4" aria-label="Article content blocks">
          {blocks.map((block, index) => {
            const blockLabel = `${index + 1}. ${blockLabels[block.type]}`;
            return (
              <li key={block.id} className="min-w-0 rounded-xl border border-[var(--admin-border)] bg-white p-3 sm:p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--admin-border)] pb-3">
                  <p className="font-extrabold text-[var(--admin-heading)]">{blockLabel}</p>
                  <div className="flex flex-wrap gap-1">
                    <AdminButton variant="ghost" className="px-3" disabled={index === 0} aria-label={`Move ${blockLabel} up`} onClick={() => move(index, -1)}><ArrowUp className="h-4 w-4" aria-hidden="true" /> <span className="sr-only sm:not-sr-only">Move Up</span></AdminButton>
                    <AdminButton variant="ghost" className="px-3" disabled={index === blocks.length - 1} aria-label={`Move ${blockLabel} down`} onClick={() => move(index, 1)}><ArrowDown className="h-4 w-4" aria-hidden="true" /> <span className="sr-only sm:not-sr-only">Move Down</span></AdminButton>
                    {block.type !== 'image' && block.type !== 'divider' && <AdminButton variant="ghost" className="px-3" aria-label={`Duplicate ${blockLabel}`} onClick={() => duplicate(index)}><Copy className="h-4 w-4" aria-hidden="true" /> <span className="sr-only sm:not-sr-only">Duplicate</span></AdminButton>}
                    <AdminButton variant="ghost" className="px-3 text-red-700" aria-label={`Remove ${blockLabel}`} onClick={() => remove(index)}><Trash2 className="h-4 w-4" aria-hidden="true" /> <span className="sr-only sm:not-sr-only">Remove</span></AdminButton>
                  </div>
                </div>
                {(block.type === 'paragraph' || block.type === 'quote' || block.type === 'heading') && (() => {
                  const textareaId = `${block.id}-${language}`;
                  const value = block.content[language];
                  return <div className="space-y-3">{block.type === 'heading' && <AdminSelect label="Heading level" value={block.level} onChange={(event) => update(block.id, { ...block, level: Number(event.target.value) as 2 | 3 })}><option value="2">H2</option><option value="3">H3</option></AdminSelect>}<div><InlineToolbar textareaId={textareaId} value={value} onChange={(nextValue) => update(block.id, { ...block, content: { ...block.content, [language]: nextValue } })} /><AdminTextarea id={textareaId} label={`${blockLabels[block.type]} — ${language === 'en' ? 'English' : 'বাংলা'}`} className={language === 'bn' ? 'admin-bn-text' : undefined} value={value} onChange={(event) => update(block.id, { ...block, content: { ...block.content, [language]: event.target.value } })} helpText="Use the small toolbar for bold, italic, or a safe normal link. Raw HTML is not rendered." /></div></div>;
                })()}
                {(block.type === 'bulleted-list' || block.type === 'numbered-list') && <ListBlockEditor block={block} language={language} onChange={(next) => update(block.id, next)} />}
                {block.type === 'image' && <div className="space-y-4"><MediaUpload initialSrc={block.media?.src} initialMeta={block.media ? { name: block.media.name, size: block.media.size, dimensions: block.media.dimensions } : undefined} showAltField={false} previewAlt={block.alt.en || 'Body image preview'} objectUrlOwnership="consumer" onChange={(selection) => updateImageMedia(block, selection)} /><AdminInput label={language === 'en' ? 'Image alternative text' : 'ছবির বিকল্প লেখা'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={block.alt[language]} onChange={(event) => update(block.id, { ...block, alt: { ...block.alt, [language]: event.target.value } })} /><AdminInput label={language === 'en' ? 'Image caption' : 'ছবির ক্যাপশন'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={block.caption[language]} onChange={(event) => update(block.id, { ...block, caption: { ...block.caption, [language]: event.target.value } })} /><p className="text-xs text-[var(--admin-muted)]">The selected image is shared by both languages; alt text and caption are translated within this block.</p></div>}
                {block.type === 'divider' && <div className="py-4"><hr className="border-[var(--admin-border-strong)]" /><p className="mt-3 text-center text-xs text-[var(--admin-muted)]">Shared structural divider · no translated content</p></div>}
              </li>
            );
          })}
        </ol>
      )}
      <div className="grid gap-3 rounded-xl border border-[var(--admin-border)] bg-slate-50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <AdminSelect label="Add block" value={addType} onChange={(event) => setAddType(event.target.value as AddableBlockType)}>{Object.entries(blockLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</AdminSelect>
        <AdminButton variant="secondary" onClick={() => onChange([...blocks, createBlock(addType)])}><Plus className="h-4 w-4" aria-hidden="true" /> Add {blockLabels[addType]}</AdminButton>
      </div>
      <p className="text-xs leading-5 text-[var(--admin-muted)]">H1 is intentionally unavailable because the article title is the page heading. No columns, embeds, tables, raw HTML, nested blocks, or drag-only ordering are supported.</p>
    </LanguageTabs>
  );
}

function ListBlockEditor({ block, language, onChange }: { block: EditorialListBlock; language: EditorialLanguage; onChange: (block: EditorialListBlock) => void }) {
  const updateItem = (id: string, value: string) => onChange({ ...block, items: block.items.map((item) => item.id === id ? { ...item, content: { ...item.content, [language]: value } } : item) });
  return (
    <div className="space-y-3">
      {block.items.map((item, index) => {
        const textareaId = `${block.id}-${item.id}-${language}`;
        return <div key={item.id} className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3"><div className="mb-2 flex items-center justify-between gap-2"><p className="text-xs font-extrabold uppercase tracking-wide text-[var(--admin-muted)]">Item {index + 1}</p><AdminButton variant="ghost" className="px-3 text-red-700" disabled={block.items.length === 1} aria-label={`Remove list item ${index + 1}`} onClick={() => onChange({ ...block, items: block.items.filter((entry) => entry.id !== item.id) })}><Trash2 className="h-4 w-4" aria-hidden="true" /> Remove</AdminButton></div><InlineToolbar textareaId={textareaId} value={item.content[language]} onChange={(value) => updateItem(item.id, value)} /><AdminTextarea id={textareaId} label={`List item ${index + 1} — ${language === 'en' ? 'English' : 'বাংলা'}`} className={language === 'bn' ? 'admin-bn-text' : undefined} value={item.content[language]} onChange={(event) => updateItem(item.id, event.target.value)} /></div>;
      })}
      <AdminButton variant="secondary" onClick={() => onChange({ ...block, items: [...block.items, { id: `${block.id}-item-${crypto.randomUUID()}`, content: emptyLocalizedText() }] })}><Plus className="h-4 w-4" aria-hidden="true" /> Add List Item</AdminButton>
    </div>
  );
}

export function EditorialBlocksPreview({ blocks, language = 'en', limit }: { blocks: EditorialBlock[]; language?: EditorialLanguage; limit?: number }) {
  const visible = typeof limit === 'number' ? blocks.slice(0, limit) : blocks;
  return (
    <div className={language === 'bn' ? 'admin-bn-text space-y-4' : 'space-y-4'}>
      {visible.map((block) => {
        if (block.type === 'divider') return <hr key={block.id} className="border-[var(--admin-border)]" />;
        if (block.type === 'image') return block.media ? <figure key={block.id}><img src={block.media.src} alt={block.alt[language]} className="max-h-72 w-full rounded-lg object-cover" />{block.caption[language] && <figcaption className="mt-2 text-center text-xs text-[var(--admin-muted)]">{block.caption[language]}</figcaption>}</figure> : null;
        if (block.type === 'heading') return block.level === 2 ? <h2 key={block.id} className="text-xl font-extrabold text-[var(--admin-heading)]"><InlineMarkdown value={block.content[language]} /></h2> : <h3 key={block.id} className="text-lg font-extrabold text-[var(--admin-heading)]"><InlineMarkdown value={block.content[language]} /></h3>;
        if (block.type === 'quote') return <blockquote key={block.id} className="border-l-4 border-[var(--admin-accent)] pl-4 italic text-[var(--admin-text)]"><InlineMarkdown value={block.content[language]} /></blockquote>;
        if (block.type === 'bulleted-list' || block.type === 'numbered-list') {
          const List = block.type === 'bulleted-list' ? 'ul' : 'ol';
          return <List key={block.id} className={`${block.type === 'bulleted-list' ? 'list-disc' : 'list-decimal'} space-y-1 pl-6`}>{block.items.map((item) => <li key={item.id}><InlineMarkdown value={item.content[language]} /></li>)}</List>;
        }
        return <div key={block.id} className="leading-7 text-[var(--admin-text)]"><InlineMarkdown value={block.content[language]} /></div>;
      })}
    </div>
  );
}
