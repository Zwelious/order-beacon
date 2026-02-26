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
      {copied ? <Check className="h-3.5 w-3.5 text-badge-confirmed" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    CONFIRMED: "bg-badge-confirmed/10 text-badge-confirmed",
    PENDING: "bg-badge-pending/10 text-badge-pending",
    CANCELLED: "bg-badge-cancelled/10 text-badge-cancelled",
  };
  const cls = colorMap[status] || "bg-secondary text-secondary-foreground";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'CONFIRMED' ? 'bg-badge-confirmed' : status === 'PENDING' ? 'bg-badge-pending' : 'bg-badge-cancelled'}`} />
      {status.charAt(0) + status.slice(1).toLowerCase()}
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
              <div className="h-4 shimmer rounded-full w-full max-w-[120px]" />
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
    <div className="rounded-2xl border border-border/60 bg-card apple-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs font-medium">Order ID</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Product ID</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">User ID</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Qty</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Created</TableHead>
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
                <TableRow key={order.orderId} className="border-border/40 hover:bg-accent/50 transition-colors">
                  <TableCell className="font-mono text-[13px] text-muted-foreground">
                    {truncateUUID(order.orderId)}
                    <CopyButton text={order.orderId} />
                  </TableCell>
                  <TableCell className="font-mono text-[13px] text-muted-foreground">
                    {truncateUUID(order.productId)}
                    <CopyButton text={order.productId} />
                  </TableCell>
                  <TableCell className="font-mono text-[13px] text-muted-foreground">
                    {truncateUUID(order.userId)}
                    <CopyButton text={order.userId} />
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">{order.quantity}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-[13px] text-muted-foreground">
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
