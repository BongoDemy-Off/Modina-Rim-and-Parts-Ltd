import { Search, SlidersHorizontal, X } from 'lucide-react';
import { AdminButton } from './Button';

export interface SearchFilterDefinition {
  key: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | { label: string; value: string }>;
}

interface SearchFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  filter?: string;
  onFilterChange?: (value: string) => void;
  options?: string[];
  filters?: SearchFilterDefinition[];
  searchLabel?: string;
  searchPlaceholder?: string;
}

export function SearchFilterBar({ query, onQueryChange, filter = 'All', onFilterChange, options = [], filters, searchLabel = 'Search content', searchPlaceholder = 'Search by title, SKU, or keyword…' }: SearchFilterBarProps) {
  const configuredFilters = filters ?? (onFilterChange ? [{ key: 'filter', label: 'Status', value: filter, onChange: onFilterChange, options }] : []);
  const active = Boolean(query || configuredFilters.some((item) => item.value !== 'All'));
  return (
    <div className="flex flex-col gap-3 rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface-subtle)] p-3 sm:flex-row sm:items-end">
      <label className="min-w-0 flex-1">
         <span className="mb-1.5 block text-xs font-bold text-[var(--admin-heading)]">{searchLabel}</span>
        <span className="relative block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" aria-hidden="true" />
          <input
            type="search"
            className="admin-control pl-10 pr-3.5"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </span>
      </label>
      {configuredFilters.map((item) => (
        <label key={item.key} className="sm:w-44">
          <span className="mb-1.5 block text-xs font-bold text-[var(--admin-heading)]">{item.label}</span>
          <span className="relative block">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" aria-hidden="true" />
            <select className="admin-control pl-10 pr-3" value={item.value} onChange={(event) => item.onChange(event.target.value)}>
              {item.options.map((option) => typeof option === 'string' ? <option key={option}>{option}</option> : <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </span>
        </label>
      ))}
      <AdminButton
        variant="ghost"
        disabled={!active}
        onClick={() => { onQueryChange(''); configuredFilters.forEach((item) => item.onChange('All')); }}
        className="sm:mb-0"
      >
        <X className="h-4 w-4" aria-hidden="true" /> Clear Filters
      </AdminButton>
    </div>
  );
}
