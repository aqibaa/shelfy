/**
 * PHASE 0 · LESSON 4 — HTTP server BINA Express ke
 * Run:  npm run p0:http   → phir browser/Thunder Client mein http://localhost:4000
 *
 * Express andar se yahi `http` module use karta hai. Ek bar raw version dekh
 * lein to Phase 1 mein samajh aayega ke Express kya "asaan" karta hai:
 * routing, JSON parsing, status codes, middleware — yeh sab yahan haath se
 * karna parta hai.
 */
import { createServer } from "node:http";
import inventory from "./lib/inventory.js";

inventory.add("Lays Masala", 50);
inventory.add("Coke 1.5L", 24);

/** Helper: JSON jawab bhejo. Express mein yeh `res.json()` hai. */
function sendJSON(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

/** Helper: request ka body (JSON) padho. Express mein `express.json()`. */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk)); // body tukron (chunks) mein aata hai
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  console.log(req.method, url.pathname);

  // "Routing" haath se: method + path dekh kar decide karo.
  if (req.method === "GET" && url.pathname === "/") {
    return sendJSON(res, 200, { ok: true, message: "Shelfy raw HTTP server" });
  }

  if (req.method === "GET" && url.pathname === "/products") {
    return sendJSON(res, 200, inventory.list());
  }

  if (req.method === "POST" && url.pathname === "/products") {
    try {
      const body = await readBody(req);
      if (!body.name || typeof body.quantity !== "number") {
        return sendJSON(res, 400, { error: "name (string) and quantity (number) required" });
      }
      inventory.add(body.name, body.quantity);
      return sendJSON(res, 201, { ok: true });
    } catch (err) {
      return sendJSON(res, 400, { error: err.message });
    }
  }

  // Kuch match nahi hua.
  sendJSON(res, 404, { error: "Not found" });
});

server.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
  console.log("Try:  GET /products   |   POST /products  {\"name\":\"Pepsi\",\"quantity\":12}");
});

/**
 * ✍️ EXERCISE 4
 * Thunder Client se:
 *   1. GET  http://localhost:4000/products          → list dekhein
 *   2. POST http://localhost:4000/products  body: {"name":"Pepsi","quantity":12}
 *   3. POST galat body {"name":"X"}                  → 400 aana chahiye
 *   4. GET  http://localhost:4000/nothing            → 404
 * Phir code mein add karein:  DELETE /products?name=Pepsi  → inventory se
 * remove kare (hint: url.searchParams.get("name")), 404 agar naam na mile.
 * Screenshot/ya request-response text bhejein.
 */
