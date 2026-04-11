/**
 * Core types — trade-agnostic data interfaces.
 *
 * These types are shared across all trades (electrical, plumbing, HVAC, etc.)
 * and all distributors. Nothing here should reference a specific trade or supplier.
 */

export interface Supplier {
  name: string;
  address: string;
  phone: string;
  website?: string;
  notes?: string;
}

export interface OfficialDoc {
  title: string;
  url: string;
  description: string;
}

export interface MaterialItem {
  item: string;
  quantity: string;
  spec: string;
  unitPrice?: number;
}

export interface Job {
  id: string;
  label: string;
  requirements: string[];
  materials: MaterialItem[];
  blueprintNotes?: string[];
  svgDiagram?: string;
  suppliers: Supplier[];
  officialDocs: OfficialDoc[];
}
