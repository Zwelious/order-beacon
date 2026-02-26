import { useEffect, useState } from "react";
import { Activity, BarChart3, Zap } from "lucide-react";
import { fetchOrders, type Order } from "@/lib/api";
import StatCards from "@/components/StatCards";
import AiInsightPanel from "@/components/AiInsightPanel";
import OrderTable from "@/components/OrderTable";
import ExportButton from "@/components/ExportButton";

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">OrderIQ</span>
          </div>
          <div className="flex items-center gap-3">
            <ExportButton />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Hero header */}
        <div className="space-y-1.5">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Order Intelligence
          </h1>
          <p className="text-[15px] text-muted-foreground">
            Real-time logistics analytics & AI-powered insights
          </p>
        </div>

        {/* Stats */}
        <StatCards orders={orders} isLoading={loading} />

        {/* AI Insights */}
        <AiInsightPanel orders={orders} />

        {/* Table section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-medium text-muted-foreground">Recent Orders</h2>
            </div>
            <span className="text-xs text-muted-foreground">{orders.length} total</span>
          </div>
          <OrderTable orders={orders} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
