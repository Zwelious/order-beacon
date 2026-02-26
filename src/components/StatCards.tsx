import { Package, Layers, ShoppingCart, TrendingUp } from "lucide-react";
import type { Order } from "@/lib/api";

interface StatCardsProps {
  orders: Order[];
  isLoading: boolean;
}

function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  isLoading,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  isLoading: boolean;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 p-6 apple-shadow hover:apple-shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TrendingUp className="h-4 w-4 text-muted-foreground/50" />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        {isLoading ? (
          <div className="h-8 w-20 shimmer rounded-lg mt-1" />
        ) : (
          <>
            <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default function StatCards({ orders, isLoading }: StatCardsProps) {
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, o) => sum + parseInt(o.quantity, 10), 0);
  const confirmedCount = orders.filter((o) => o.status === "CONFIRMED").length;
  const confirmRate = totalOrders > 0 ? Math.round((confirmedCount / totalOrders) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <StatCard
        icon={ShoppingCart}
        label="Total Orders"
        value={totalOrders}
        subtitle="All time"
        isLoading={isLoading}
        color="bg-primary/10 text-primary"
      />
      <StatCard
        icon={Layers}
        label="Total Items"
        value={totalItems.toLocaleString()}
        subtitle="Sum of quantities"
        isLoading={isLoading}
        color="bg-badge-confirmed/10 text-badge-confirmed"
      />
      <StatCard
        icon={Package}
        label="Confirmed"
        value={`${confirmRate}%`}
        subtitle={`${confirmedCount} of ${totalOrders}`}
        isLoading={isLoading}
        color="bg-badge-pending/10 text-badge-pending"
      />
    </div>
  );
}
