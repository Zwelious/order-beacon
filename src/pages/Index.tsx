import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
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
    <div className="min-h-screen bg-background grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Order Intelligence</h1>
            <p className="text-xs text-muted-foreground">Real-time logistics analytics</p>
          </div>
        </div>

        {/* Stats */}
        <StatCards orders={orders} isLoading={loading} />

        {/* AI Insights */}
        <AiInsightPanel orders={orders} />

        {/* Table header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Orders</h2>
          <ExportButton />
        </div>

        {/* Table */}
        <OrderTable orders={orders} isLoading={loading} />
      </div>
    </div>
  );
};

export default Index;
