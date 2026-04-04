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
