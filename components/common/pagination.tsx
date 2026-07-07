import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 py-4" aria-label="Pagination Navigation">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1.5 text-sm font-medium">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;
          return (
            <Button
              key={page}
              variant={isCurrent ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="h-9 w-9 p-0"
              aria-label={`Go to page ${page}`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Go to next page"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </nav>
  );
}
