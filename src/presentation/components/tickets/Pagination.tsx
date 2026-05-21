import { PaginationMeta } from '@/domain/value-objects/Pagination';
import { Button } from '../ui/Button';

type PaginationProps = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

export function Pagination({ meta, onPageChange }: Readonly<PaginationProps>) {
  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
      <p className="text-sm text-[#888888]">
        Mostrando <span className="text-[#F0F0F0] font-medium">{(meta.page - 1) * meta.pageSize + 1}–
        {Math.min(meta.page * meta.pageSize, meta.total)}</span> de <span className="text-[#F0F0F0] font-medium">{meta.total}</span>
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={meta.page <= 1} onClick={() => onPageChange(meta.page - 1)}>
          Anterior
        </Button>
        <Button variant="secondary" size="sm" disabled={meta.page >= meta.totalPages} onClick={() => onPageChange(meta.page + 1)}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
