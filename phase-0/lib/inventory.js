/**
 * Ek chhota in-memory inventory. Yeh "module scope" ka demo hai:
 * `stock` is file ke bahar kisi ko nazar nahi aata — sirf jo functions hum
 * export karte hain woh use kar sakte hain. Phase 2 mein yahi data Postgres
 * mein jayega, lekin shape yahi rahegi.
 */
const stock = new Map(); // name → quantity

function add(name, qty) {
  stock.set(name, (stock.get(name) ?? 0) + qty);
}

function remove(name, qty) {
  const current = stock.get(name) ?? 0;
  if (qty > current) throw new Error(`Not enough ${name}: have ${current}, want ${qty}`);
  stock.set(name, current - qty);
}

function list() {
  // Map → plain array of objects (JSON-friendly)
  return [...stock.entries()].map(([name, quantity]) => ({ name, quantity }));
}

export default { add, remove, list };
