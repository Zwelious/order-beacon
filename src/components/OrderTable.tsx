import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order } from "@/lib/api";

function truncateUUID(uuid: string) {
  return uuid.slice(0, 8) + "…";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-1.5 inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    CONFIRMED: "bg-badge-confirmed/15 text-badge-confirmed border-badge-confirmed/30",
    PENDING: "bg-badge-pending/15 text-badge-pending border-badge-pending/30",
    CANCELLED: "bg-badge-cancelled/15 text-badge-cancelled border-badge-cancelled/30",
  };
  const cls = colorMap[status] || "bg-secondary text-secondary-foreground border-border";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 6 }).map((_, j) => (
            <TableCell key={j}>
              <div className="h-4 shimmer rounded w-full max-w-[120px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

interface OrderTableProps {
  orders: Order[];
  isLoading: boolean;
}

export default function OrderTable({ orders, isLoading }: OrderTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Order ID</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Product ID</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">User ID</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Qty</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.orderId} className="border-border hover:bg-secondary/50 transition-colors">
                  <TableCell className="font-mono text-sm">
                    {truncateUUID(order.orderId)}
                    <CopyButton text={order.orderId} />
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {truncateUUID(order.productId)}
                    <CopyButton text={order.productId} />
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {truncateUUID(order.userId)}
                    <CopyButton text={order.userId} />
                  </TableCell>
                  <TableCell className="font-semibold">{order.quantity}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(order.createdAt), "MMM d, yyyy · HH:mm")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
