/** Rupees ko "Rs 1,250" ki shakal mein. Intl browser aur Node dono mein hai. */
export function formatPKR(amount) {
  return "Rs " + new Intl.NumberFormat("en-PK").format(amount);
}

/** percent (0–100) discount lagao, paise mein round. */
export function applyDiscount(amount, percent) {
  if (percent < 0 || percent > 100) throw new Error("percent must be 0–100");
  return Math.round(amount - (amount * percent) / 100);
}
