import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/api";
import { fetchAiInsight } from "@/lib/api";

interface AiInsightPanelProps {
  orders: Order[];
}

export default function AiInsightPanel({ orders }: AiInsightPanelProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setInsight(null);
    try {
      const result = await fetchAiInsight(orders);
      setInsight(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleGenerate}
        disabled={loading || orders.length === 0}
        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        {loading ? "Analyzing…" : "✨ Generate AI Insights"}
      </Button>

      {loading && (
        <div className="rounded-lg border border-border bg-card p-5 space-y-2">
          <div className="h-4 w-3/4 shimmer rounded" />
          <div className="h-4 w-1/2 shimmer rounded" />
          <div className="h-4 w-2/3 shimmer rounded" />
        </div>
      )}

      {insight && !loading && (
        <div className="rounded-lg border border-primary/30 bg-card p-5 glow-primary animate-fade-in">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm leading-relaxed text-foreground">{insight}</p>
          </div>
        </div>
      )}
    </div>
  );
}
