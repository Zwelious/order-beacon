import { Package, Layers, ShoppingCart } from "lucide-react";
import type { Order } from "@/lib/api";

interface StatCardsProps {
  orders: Order[];
  isLoading: boolean;
}

function StatCard({
  icon: Icon,
  label,
  value,
  isLoading,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  isLoading: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 flex items-center gap-4 animate-fade-in">
      <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        {isLoading ? (
          <div className="h-7 w-20 shimmer rounded mt-1" />
        ) : (
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function StatCards({ orders, isLoading }: StatCardsProps) {
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, o) => sum + parseInt(o.quantity, 10), 0);
  const confirmedCount = orders.filter((o) => o.status === "CONFIRMED").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard icon={ShoppingCart} label="Total Orders" value={totalOrders} isLoading={isLoading} />
      <StatCard icon={Layers} label="Total Items" value={totalItems.toLocaleString()} isLoading={isLoading} />
      <StatCard icon={Package} label="Confirmed" value={confirmedCount} isLoading={isLoading} />
    </div>
  );
}
