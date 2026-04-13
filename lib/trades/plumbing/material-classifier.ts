import type { MaterialItem } from "../../core/types";
import type { MaterialGroup } from "../types";

const GROUPS: { id: string; label: string; icon: string; pattern: RegExp }[] = [
  { id: "fixtures", label: "Fixtures & Equipment", icon: "🚿", pattern: /water heater|tank|toilet|faucet|shower|tub|disposal|sink|lavatory|hose bib/i },
  { id: "pipe", label: "Pipe", icon: "🔧", pattern: /PEX|copper|PVC|CPVC|ABS|cast iron|pipe|tubing|DWV|supply line/i },
  { id: "fittings", label: "Fittings & Connectors", icon: "🔩", pattern: /fitting|elbow|tee|coupling|adapter|union|bushing|reducer|trap|fernco|sharkbite|crimp|clamp|ring|transition|connector|nipple|flange/i },
  { id: "valves", label: "Valves & Controls", icon: "🔴", pattern: /valve|ball valve|gate valve|check valve|PRV|pressure|expansion|T&P|tempering|mixing|shutoff|stop/i },
  { id: "supports", label: "Supports & Hangers", icon: "📎", pattern: /strap|hanger|support|bracket|nail plate|standoff|clamp.*pipe|j-hook/i },
  { id: "venting", label: "Venting & DWV", icon: "💨", pattern: /vent|AAV|air admittance|studor|stack|cleanout|wye|sanitary/i },
  { id: "gas", label: "Gas Piping", icon: "🔥", pattern: /black.*pipe|gas.*flex|CSST|gas.*valve|drip.*leg|sediment.*trap|gas.*connector|manifold/i },
  { id: "misc", label: "Miscellaneous", icon: "📦", pattern: /.*/ },
];

export function groupPlumbingMaterials(materials: MaterialItem[]): MaterialGroup[] {
  const buckets = new Map<string, MaterialItem[]>();
  for (const g of GROUPS) buckets.set(g.id, []);

  for (const mat of materials) {
    const text = `${mat.item} ${mat.spec}`;
    let placed = false;
    for (const g of GROUPS) {
      if (g.id === "misc") continue;
      if (g.pattern.test(text)) {
        buckets.get(g.id)!.push(mat);
        placed = true;
        break;
      }
    }
    if (!placed) buckets.get("misc")!.push(mat);
  }

  return GROUPS
    .filter((g) => (buckets.get(g.id)?.length ?? 0) > 0)
    .map((g) => ({
      id: g.id,
      label: g.label,
      icon: g.icon,
      items: buckets.get(g.id)!,
    }));
}
