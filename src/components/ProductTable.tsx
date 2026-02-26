import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/lib/api";

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 4 }).map((_, j) => (
            <TableCell key={j}>
              <div className="h-4 shimmer rounded-full w-full max-w-[120px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductTable({ products, isLoading }: ProductTableProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card apple-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs font-medium">Product Name</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Product ID</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium text-right">Price</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.productId} className="border-border/40 hover:bg-accent/50 transition-colors">
                  <TableCell className="font-medium text-foreground">{product.productName}</TableCell>
                  <TableCell className="font-mono text-[13px] text-muted-foreground">
                    {product.productId.slice(0, 8)}…
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.quantity > 50
                        ? "bg-badge-confirmed/10 text-badge-confirmed"
                        : product.quantity > 10
                        ? "bg-badge-pending/10 text-badge-pending"
                        : "bg-badge-cancelled/10 text-badge-cancelled"
                    }`}>
                      {product.quantity} units
                    </span>
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
