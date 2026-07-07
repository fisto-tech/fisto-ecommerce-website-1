import { Star, StarHalf } from "lucide-react";
import { cn } from "../../lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Rating({ value, count, size = "sm", className }: RatingProps) {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-5.5 w-5.5",
  };

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star key={i} className={cn("fill-amber-400 text-amber-400", sizeClasses[size])} />
      );
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(
        <StarHalf key={i} className={cn("fill-amber-400 text-amber-400", sizeClasses[size])} />
      );
    } else {
      stars.push(
        <Star key={i} className={cn("text-muted-foreground/30", sizeClasses[size])} />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${value} out of 5 stars`}>
        {stars}
      </div>
      {count !== undefined && (
        <span className="text-base text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
