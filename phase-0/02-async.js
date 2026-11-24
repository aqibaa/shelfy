/**
 * PHASE 0 · LESSON 2 — Async: callbacks → Promises → async/await
 * Run:  npm run p0:async
 *
 * Node ek "single-threaded" program hai: ek waqt mein ek hi line chalti hai.
 * Lekin DB query, file read, HTTP call — yeh sab "bahar" hote hain aur waqt
 * lete hain. Node un ka WAIT nahi karta; woh kaam shuru karke aage barh jata
 * hai, aur jab jawab aaye to aap ka diya hua function chala deta hai.
 * Yahi "asynchronous" hai. Express mein har route handler aisa hi hota hai.
 */

// Ek fake DB call: `ms` baad `value` deta hai. Real DB bhi bilkul aisa hi
// behave karti hai, bas waqt network par depend karta hai.
function fakeQuery(label, ms, value, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(`${label} failed`));
      else resolve(value);
    }, ms);
  });
}

// ---------------------------------------------------------------------------
// 1) Purana tarika: .then() chains. Padhna mushkil, isliye ab kam use hota hai.
// ---------------------------------------------------------------------------
console.log("1) .then() chain shuru");
fakeQuery("products", 300, ["Lays", "Coke"])
  .then((products) => {
    console.log("   products:", products);
    return fakeQuery("count", 100, products.length);
  })
  .then((count) => console.log("   count:", count))
  .catch((err) => console.error("   error:", err.message));

// Note: yeh line UPAR wali query khatam hone se PEHLE chalegi — kyunki Node
// wait nahi karta. (Lesson 3 mein kyun.)
console.log("   (yeh line pehle print hogi)\n");

// ---------------------------------------------------------------------------
// 2) async/await — wahi Promises, lekin aise likhte hain jaise sync code ho.
//    `await` sirf `async` function ke andar (ya ESM file ke top level par).
// ---------------------------------------------------------------------------
async function loadDashboard() {
  console.log("2) async/await shuru");
  try {
    const products = await fakeQuery("products", 300, ["Lays", "Coke"]);
    const count = await fakeQuery("count", 100, products.length);
    console.log("   products:", products, "count:", count);
  } catch (err) {
    // await ke saath error normal try/catch se pakra jata hai. Express mein
    // yahi error hum `next(err)` ko denge (Phase 1).
    console.error("   error:", err.message);
  }
}

// ---------------------------------------------------------------------------
// 3) Sequential vs parallel. Yeh FARQ production mein sab se zyada matter
//    karta hai. Teen 300ms queries:
//      sequential = 900ms   (ek ke baad ek)
//      parallel   = 300ms   (teeno ek saath, Promise.all)
// ---------------------------------------------------------------------------
async function sequentialVsParallel() {
  console.log("\n3) sequential vs parallel");
  let t = Date.now();
  await fakeQuery("a", 300, 1);
  await fakeQuery("b", 300, 2);
  await fakeQuery("c", 300, 3);
  console.log(`   sequential: ${Date.now() - t}ms`);

  t = Date.now();
  const [a, b, c] = await Promise.all([
    fakeQuery("a", 300, 1),
    fakeQuery("b", 300, 2),
    fakeQuery("c", 300, 3),
  ]);
  console.log(`   parallel:   ${Date.now() - t}ms  →`, a, b, c);

  // Promise.all mein EK bhi fail ho to poora fail. Agar aap chahte hain ke
  // baaki ke results phir bhi milein → Promise.allSettled.
  const results = await Promise.allSettled([
    fakeQuery("ok", 100, "fine"),
    fakeQuery("bad", 100, null, true),
  ]);
  console.log("   allSettled:", results.map((r) => r.status));
}

// Top-level await: ESM files mein allowed hai. Yeh order guarantee karta hai.
await loadDashboard();
await sequentialVsParallel();

/**
 * ✍️ EXERCISE 2
 * `fastest(promises)` function likhein jo kai fakeQuery mein se jo PEHLE
 * resolve ho uska value de (hint: Promise.race). Phir `withTimeout(promise, ms)`
 * likhein jo `ms` ke baad Error("timeout") throw kare agar promise poora na
 * hua ho. Dono ko is file ke end mein test karein (ek pass, ek timeout).
 * Yeh dono real backend mein roz lagte hain (slow DB, slow third-party API).
 */
