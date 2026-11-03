import { Product } from "@/db/schema";

/**
 * Mock data for showcase purposes.
 * Replaces actual database initialization to avoid runtime errors.
 */
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "hydraulic-oil-aw-150-100",
    name: "GermanOil Hydraulic Oil AW 150/100",
    category: "Industrial Use",
    grade: "AW 150 / AW 100",
    tagline: "Anti-wear hydraulic fluid for heavy duty systems.",
    description: "Formulated with premium base stocks and a zinc anti-wear additive package, delivering outstanding oxidation stability, rapid air release and reliable protection for high-pressure industrial hydraulic systems.",
    imageUrl: "/images/product-hydraulic.png",
    imageAlt: "Yellow industrial bucket of GermanOil Hydraulic Oil AW 150/100 on a black background",
    specs: [
      { label: "Viscosity", value: "ISO VG 100 / 150" },
      { label: "Application", value: "Industrial hydraulics" },
      { label: "Pack Size", value: "20 L Bucket" },
    ],
    sortOrder: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    slug: "premium-4t-sae-20w50",
    name: "GermanOil Premium 4T SAE 20W50",
    category: "Motorcycle Engine Oil",
    grade: "SAE 20W-50",
    tagline: "Smooth shifting power for four-stroke motorcycles.",
    description: "A JASO MA2 inspired four-stroke formulation engineered for wet-clutch motorcycles. Maintains film strength in Bangladesh's heat and traffic, protecting gears, clutch and engine alike.",
    imageUrl: "/images/product-4t.png",
    imageAlt: "Silver metal can of GermanOil Premium 4T SAE 20W50 motorcycle engine oil",
    specs: [
      { label: "Viscosity", value: "SAE 20W-50" },
      { label: "Application", value: "4-stroke motorcycles" },
      { label: "Pack Size", value: "0.8 L / 1 L Can" },
    ],
    sortOrder: 2,
    createdAt: new Date(),
  },
  {
    id: 3,
    slug: "premium-6000-sae-20w50-api-sm",
    name: "GermanOil Premium 6000 SAE 20W50 API SM",
    category: "Petrol Engine Oil",
    grade: "SAE 20W-50 · API SM",
    tagline: "High-mileage protection for modern petrol engines.",
    description: "An API SM performance petrol engine oil with detergent-dispersant technology that keeps pistons clean, limits deposit build-up and extends engine life under demanding stop-start conditions.",
    imageUrl: "/images/product-6000.png",
    imageAlt: "Checkerboard patterned metal tin of GermanOil Premium 6000 SAE 20W50 API SM petrol engine oil",
    specs: [
      { label: "Viscosity", value: "SAE 20W-50" },
      { label: "Standard", value: "API SM" },
      { label: "Pack Size", value: "1 L / 4 L Tin" },
    ],
    sortOrder: 3,
    createdAt: new Date(),
  },
];

/**
 * Minimal drizzle-orm compatible mock for showcase.
 * Supports the exact call patterns used in the codebase.
 */
const mockReturning = async (_?: any) => [{ id: 1 }];

const orderByMock = async (_?: any) => FALLBACK_PRODUCTS;

export const db = {
  select: () => ({
    from: (table: any) => ({
      orderBy: orderByMock,
    }),
  }),
  insert: (table: any) => ({
    values: (data: any) => ({
      onConflictDoNothing: () => ({
        returning: mockReturning,
      }),
      returning: mockReturning,
    }),
  }),
  execute: async (sql: any) => ({ rowCount: 1 }),
};