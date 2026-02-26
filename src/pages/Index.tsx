import { useEffect, useState } from "react";
import { BarChart3, Box, Zap, ShoppingCart } from "lucide-react";
import { fetchOrders, fetchProducts, type Order, type Product } from "@/lib/api";
import StatCards from "@/components/StatCards";
import AiInsightPanel from "@/components/AiInsightPanel";
import OrderTable from "@/components/OrderTable";
import ProductTable from "@/components/ProductTable";
import ExportButton from "@/components/ExportButton";
import SearchBar from "@/components/SearchBar";

type Tab = "orders" | "products";

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoadingOrders(false));
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoadingProducts(false));
  }, []);

  const displayedProducts = searchResults !== null ? searchResults : products;

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
        <StatCards orders={orders} isLoading={loadingOrders} />

        {/* AI Insights */}
        <AiInsightPanel orders={orders} />

        {/* Segmented Control + Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 p-1 rounded-full bg-muted border border-border/60">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  activeTab === "orders"
                    ? "bg-card text-foreground apple-shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Recent Orders
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  activeTab === "products"
                    ? "bg-card text-foreground apple-shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Box className="h-3.5 w-3.5" />
                Products
              </button>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === "products" && (
                <SearchBar
                  onResults={setSearchResults}
                  onClear={() => setSearchResults(null)}
                  isSearching={isSearching}
                  setIsSearching={setIsSearching}
                />
              )}
              <span className="text-xs text-muted-foreground">
                {activeTab === "orders" ? `${orders.length} total` : `${displayedProducts.length} total`}
              </span>
            </div>
          </div>

          {activeTab === "orders" ? (
            <OrderTable orders={orders} isLoading={loadingOrders} />
          ) : (
            <ProductTable products={displayedProducts} isLoading={loadingProducts || isSearching} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
