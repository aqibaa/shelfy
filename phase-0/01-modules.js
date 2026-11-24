/**
 * PHASE 0 · LESSON 1 — Modules
 * Run:  npm run p0:modules
 *
 * Node mein har file ek "module" hai: uske variables bahar nahi dikhte jab
 * tak aap `export` na karein. `package.json` mein "type": "module" likha hai,
 * isliye hum modern ESM syntax (import / export) use karte hain, purana
 * `require()` nahi.
 *
 * Teen tarah ke imports jo aap roz dekhenge:
 *   1. Node ke built-in modules  → import fs from "node:fs"
 *   2. npm packages              → import express from "express"   (Phase 1)
 *   3. Apni files                → import { add } from "./math.js"  (extension ZAROORI hai ESM mein)
 */

// 1) Built-in module. "node:" prefix batata hai ke yeh Node ka apna hai.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 2) Apni file se named exports. (Yeh file neeche banayi hai: ./lib/money.js)
import { formatPKR, applyDiscount } from "./lib/money.js";

// 3) Default export bhi ho sakta hai — ek file ka "main" export.
import inventory from "./lib/inventory.js";

console.log("--- named exports ---");
console.log(formatPKR(1250));            // "Rs 1,250"
console.log(formatPKR(applyDiscount(1000, 15))); // 15% off → "Rs 850"

console.log("\n--- default export (ek object) ---");
inventory.add("Lays Masala", 50);
inventory.add("Coke 1.5L", 24);
inventory.remove("Coke 1.5L", 4);
console.log(inventory.list());

console.log("\n--- __dirname ESM mein nahi hota; yeh hai uska tarika ---");
// GALAT: new URL(import.meta.url).pathname → Windows par "/N:/..." (extra slash).
// SAHI:  fileURLToPath() har OS (Windows/Mac/Linux) par theek path deta hai.
const here = path.dirname(fileURLToPath(import.meta.url));
console.log("Yeh file is folder mein hai:", here);

// readFile ek Promise deta hai (Lesson 2 mein detail). Abhi bas dekhein:
const pkg = JSON.parse(await readFile(path.join(here, "..", "package.json"), "utf8"));
console.log("Project name from package.json:", pkg.name);

/**
 * ✍️ EXERCISE 1
 * `phase-0/lib/strings.js` banayein jo do named functions export kare:
 *   slugify("Lays Masala 40g")  → "lays-masala-40g"
 *   initials("Muhammad Aqib")   → "MA"
 * Phir is file ke end mein import karke dono ko console.log karein.
 * Push karein, main review karunga.
 */
