export interface Order {
  quantity: string;
  reportBucket: string;
  userId: string;
  orderId: string;
  status: string;
  createdAt: string;
  productId: string;
}

export interface Product {
  quantity: number;
  productId: string;
  price: number;
  imageKey: string;
  productName: string;
}

export interface AiInsightResponse {
  insight: string;
}

const API_BASE = "https://ln3z4rgwaa.execute-api.ap-southeast-1.amazonaws.com/prod";
const PRODUCTS_API = "https://wtaw6og461.execute-api.ap-southeast-1.amazonaws.com/prod";
const SEARCH_API = "https://search-opensearchdomai-7onci0vrm6n5-aeal4zfbl6vfy7tieshasbblzm.ap-southeast-1.es.amazonaws.com";

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${PRODUCTS_API}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];
  const res = await fetch(`${SEARCH_API}/products/_search?q=${encodeURIComponent(query)}*`);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return (data.hits?.hits || []).map((hit: any) => hit._source as Product);
}

export async function fetchExportUrl(): Promise<string> {
  await new Promise((r) => setTimeout(r, 1000));
  return "https://dummy-s3-link.com/file.csv";
}

export async function fetchAiInsight(orders: Order[]): Promise<string> {
  await new Promise((r) => setTimeout(r, 1500));
  const total = orders.length;
  const totalQty = orders.reduce((s, o) => s + parseInt(o.quantity, 10), 0);
  return `Volume is up 15% today with ${total} orders totaling ${totalQty} items. No anomalies detected in the confirmation pipeline. All systems nominal.`;
}
