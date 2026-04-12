/**
 * One-time script: creates VoltSpec Pro product + prices in Stripe,
 * then prints the env vars to add to .env.local
 */
import Stripe from "stripe";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
}

const stripe = new Stripe(envVars.STRIPE_SECRET_KEY);

async function setup() {
  console.log("Creating VoltSpec Pro product...");

  // Check if product already exists
  const existing = await stripe.products.list({ limit: 10 });
  let product = existing.data.find((p) => p.name === "VoltSpec Pro");

  if (product) {
    console.log(`Product already exists: ${product.id}`);
  } else {
    product = await stripe.products.create({
      name: "VoltSpec Pro",
      description:
        "Full access to all 74 jurisdictions, 29 job types, saved projects, white-label PDF exports, and priority support.",
    });
    console.log(`Created product: ${product.id}`);
  }

  // Check for existing prices
  const existingPrices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 10,
  });

  let monthlyPrice = existingPrices.data.find(
    (p) => p.recurring?.interval === "month" && p.unit_amount === 2400
  );
  let annualPrice = existingPrices.data.find(
    (p) => p.recurring?.interval === "year" && p.unit_amount === 19900
  );

  if (!monthlyPrice) {
    monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 2400, // $24.00
      currency: "usd",
      recurring: { interval: "month" },
      lookup_key: "voltspec_pro_monthly",
    });
    console.log(`Created monthly price: ${monthlyPrice.id}`);
  } else {
    console.log(`Monthly price exists: ${monthlyPrice.id}`);
  }

  if (!annualPrice) {
    annualPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 19900, // $199.00
      currency: "usd",
      recurring: { interval: "year" },
      lookup_key: "voltspec_pro_annual",
    });
    console.log(`Created annual price: ${annualPrice.id}`);
  } else {
    console.log(`Annual price exists: ${annualPrice.id}`);
  }

  console.log("\n✅ Add these to your .env.local:\n");
  console.log(`STRIPE_PRICE_MONTHLY_ID=${monthlyPrice.id}`);
  console.log(`STRIPE_PRICE_ANNUAL_ID=${annualPrice.id}`);
  console.log(`STRIPE_PRODUCT_ID=${product.id}`);
}

setup().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
