/**
 * PHASE 0 · LESSON 3 — Event loop: Node ek waqt mein ek kaam, phir bhi tez
 * Run:  npm run p0:loop
 *
 * Pehle GUESS karein output ka order, phir chalayein. Zyada tar log galat
 * guess karte hain — yahi lesson hai.
 */

console.log("1. script start");

setTimeout(() => console.log("5. setTimeout 0ms  (macrotask)"), 0);

Promise.resolve().then(() => console.log("3. promise.then    (microtask)"));

queueMicrotask(() => console.log("4. queueMicrotask  (microtask)"));

console.log("2. script end");

/**
 * Kya hua:
 *   - Pehle poori script upar se neeche chalti hai (1, 2).
 *   - Phir Node "microtasks" nikalta hai — saare Promise callbacks (3, 4).
 *   - Phir "macrotasks" — timers, I/O, network (5).
 *   - setTimeout 0ms ka matlab "abhi" NAHI, "jab current kaam aur saare
 *     microtasks khatam ho jayein, tab".
 *
 * Express ke liye iska matlab: jab 100 users ek saath request bhejte hain,
 * Node har request ki DB query shuru karke agli request le leta hai; jawab
 * aate hi callback chalta hai. Isliye ek thread hote hue bhi hazaron
 * connections handle hote hain.
 *
 * LEKIN — agar aap CPU par bhari kaam karein (bara loop, image resize, bcrypt
 * bina async), to poora server ruk jata hai, kyunki thread ek hi hai. Dekhein:
 */

function blockFor(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {} // busy loop — KABHI production mein na karein
}

setTimeout(() => {
  console.log("\n--- blocking demo ---");
  const t = Date.now();
  setTimeout(() => console.log(`timer wanted 100ms, got ${Date.now() - t}ms (late because of blockFor)`), 100);
  blockFor(500); // is dauran koi request serve nahi ho sakti
  console.log("blockFor(500) done");
}, 50);

/**
 * ✍️ EXERCISE 3 (likhna nahi, samajhna):
 * Niche ka code kya print karega, aur kis order mein? Pehle jawab likhein
 * (comment mein), phir uncomment karke chalayein.
 *
 * async function a() { console.log("A1"); await null; console.log("A2"); }
 * console.log("X");
 * a();
 * console.log("Y");
 *
 * Mujhe apna guess + asal output dono bhejein.
 */
