export interface Order {
  quantity: string;
  reportBucket: string;
  userId: string;
  orderId: string;
  status: string;
  createdAt: string;
  productId: string;
}

export interface AiInsightResponse {
  insight: string;
}

const API_BASE = "https://ln3z4rgwaa.execute-api.ap-southeast-1.amazonaws.com/prod";

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function fetchExportUrl(): Promise<string> {
  // Mock: simulate API delay
  await new Promise((r) => setTimeout(r, 1000));
  return "https://dummy-s3-link.com/file.csv";
}

export async function fetchAiInsight(orders: Order[]): Promise<string> {
  // Mock: simulate API delay
  await new Promise((r) => setTimeout(r, 1500));
  const total = orders.length;
  const totalQty = orders.reduce((s, o) => s + parseInt(o.quantity, 10), 0);
  return `Volume is up 15% today with ${total} orders totaling ${totalQty} items. No anomalies detected in the confirmation pipeline. All systems nominal.`;
}
