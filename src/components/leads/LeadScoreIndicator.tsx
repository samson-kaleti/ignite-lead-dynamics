
import { cn } from "@/lib/utils";

interface LeadScoreIndicatorProps {
  score: number;
  showText?: boolean;
  className?: string;
}

export function LeadScoreIndicator({ score, showText = true, className }: LeadScoreIndicatorProps) {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", getScoreColor())}
          style={{ width: `${score}%` }}
        />
      </div>
      {showText && <span className="text-sm font-medium w-8 text-gray-700">{score}</span>}
    </div>
  );
}
