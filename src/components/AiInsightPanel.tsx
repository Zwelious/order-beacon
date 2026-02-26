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
    <div className="rounded-2xl bg-card border border-border/60 apple-shadow overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
              <p className="text-xs text-muted-foreground">Powered by machine learning</p>
            </div>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || orders.length === 0}
            size="sm"
            className="rounded-full px-5 text-[13px] font-medium"
          >
            {loading ? "Analyzing…" : "Generate"}
          </Button>
        </div>

        {loading && (
          <div className="space-y-2.5 pt-2">
            <div className="h-4 w-3/4 shimmer rounded-full" />
            <div className="h-4 w-1/2 shimmer rounded-full" />
            <div className="h-4 w-2/3 shimmer rounded-full" />
          </div>
        )}

        {insight && !loading && (
          <div className="rounded-xl bg-primary/[0.04] border border-primary/10 p-4 animate-fade-in">
            <p className="text-[14px] leading-relaxed text-foreground">{insight}</p>
          </div>
        )}
      </div>
    </div>
  );
}
