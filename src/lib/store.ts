import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
}

// ── Types ──────────────────────────────────────────────
export type ProductSize = { label: string; stock: number };
export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  badge: "Baru" | "Habis" | "Stok Terbatas" | "Premium Release" | null;
  isActive: boolean;
  createdAt: string;
};

export type PaymentMethod = {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  fee: number;
  description: string;
};

export type ShippingMethod = {
  id: string;
  label: string;
  courier: string;
  isActive: boolean;
  estimatedDays: string;
  rateType: "flat" | "per_kg";
  flatRate: number;
  description: string;
};

export type OrderItem = {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
};

export type OrderStatus =
  | "menunggu_pembayaran"
  | "dikonfirmasi"
  | "diproses"
  | "dikirim"
  | "selesai"
  | "dibatalkan";

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  status: OrderStatus;
  note: string;
  createdAt: string;
};

// ── Products ──────────────────────────────────────────
export function getProducts(): Product[] {
  return readJSON<Product[]>("products.json");
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function createProduct(product: Product): void {
  const products = getProducts();
  products.push(product);
  writeJSON("products.json", products);
}

export function updateProduct(id: string, updates: Partial<Product>): boolean {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products[idx] = { ...products[idx], ...updates };
  writeJSON("products.json", products);
  return true;
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  writeJSON("products.json", filtered);
  return true;
}

// ── Payment Methods ───────────────────────────────────
export function getPaymentMethods(): PaymentMethod[] {
  return readJSON<PaymentMethod[]>("payment-methods.json");
}

export function updatePaymentMethod(id: string, updates: Partial<PaymentMethod>): boolean {
  const methods = getPaymentMethods();
  const idx = methods.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  methods[idx] = { ...methods[idx], ...updates };
  writeJSON("payment-methods.json", methods);
  return true;
}

// ── Shipping Methods ──────────────────────────────────
export function getShippingMethods(): ShippingMethod[] {
  return readJSON<ShippingMethod[]>("shipping-methods.json");
}

export function updateShippingMethod(id: string, updates: Partial<ShippingMethod>): boolean {
  const methods = getShippingMethods();
  const idx = methods.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  methods[idx] = { ...methods[idx], ...updates };
  writeJSON("shipping-methods.json", methods);
  return true;
}

// ── Orders ────────────────────────────────────────────
export function getOrders(): Order[] {
  try {
    return readJSON<Order[]>("orders.json");
  } catch {
    return [];
  }
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function createOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  writeJSON("orders.json", orders);
}

export function updateOrderStatus(id: string, status: OrderStatus): boolean {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return false;
  orders[idx].status = status;
  writeJSON("orders.json", orders);
  return true;
}

// ── Subscribers ───────────────────────────────────────
export type Subscriber = {
  email: string;
  name: string | null;
  subscribedAt: string;
};

export function getSubscribers(): Subscriber[] {
  try {
    return readJSON<Subscriber[]>("subscribers.json");
  } catch {
    return [];
  }
}

export function addSubscriber(subscriber: Subscriber): "added" | "exists" {
  const list = getSubscribers();
  if (list.find((s) => s.email === subscriber.email)) return "exists";
  list.unshift(subscriber);
  writeJSON("subscribers.json", list);
  return "added";
}

export function deleteSubscriber(email: string): boolean {
  const list = getSubscribers();
  const filtered = list.filter((s) => s.email !== email);
  if (filtered.length === list.length) return false;
  writeJSON("subscribers.json", filtered);
  return true;
}
