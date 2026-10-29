import type { ReactNode } from 'react';

export interface DataColumn<Row> {
  key: string;
  label: string;
  render: (row: Row) => ReactNode;
  width?: string;
  headerClassName?: string;
  cellClassName?: string;
}

interface ResponsiveDataListProps<Row extends { id: string | number }> {
  rows: Row[];
  columns: DataColumn<Row>[];
  getPrimaryLabel: (row: Row) => string;
  empty?: ReactNode;
  renderMobile?: (row: Row) => ReactNode;
}

export function ResponsiveDataList<Row extends { id: string | number }>({ rows, columns, getPrimaryLabel, empty, renderMobile }: ResponsiveDataListProps<Row>) {
  if (rows.length === 0) return <>{empty}</>;

  return (
    <>
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="bg-[var(--admin-surface-subtle)] text-xs uppercase tracking-[0.06em] text-[var(--admin-muted)]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" style={{ width: column.width }} className={`border-b border-[var(--admin-border)] px-4 py-3 font-extrabold first:pl-5 last:pr-5 ${column.headerClassName ?? ''}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[var(--admin-border)] last:border-b-0 hover:bg-slate-50/70">
                {columns.map((column) => (
                  <td key={column.key} className={`min-w-0 overflow-wrap-anywhere px-4 py-3.5 align-top text-[var(--admin-text)] first:pl-5 last:pr-5 ${column.cellClassName ?? ''}`}>
                    <div className="min-w-0 break-words">{column.render(row)}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-[var(--admin-border)] md:hidden">
        {rows.map((row) => renderMobile ? (
          <article key={row.id} className="min-w-0 px-4 py-4" aria-label={getPrimaryLabel(row)}>{renderMobile(row)}</article>
        ) : (
          <article key={row.id} className="min-w-0 px-4 py-4" aria-label={getPrimaryLabel(row)}>
            <dl className="space-y-3">
              {columns.map((column) => (
                <div key={column.key} className="grid min-w-0 grid-cols-[88px_minmax(0,1fr)] gap-3">
                  <dt className="text-xs font-extrabold uppercase tracking-[0.05em] text-[var(--admin-muted)]">{column.label}</dt>
                  <dd className="min-w-0 break-words text-sm text-[var(--admin-text)]">{column.render(row)}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
