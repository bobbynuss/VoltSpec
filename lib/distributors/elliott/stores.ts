/** Elliott Electric Supply store/branch list for sales rep selection */
export interface ElliottStore {
  id: string;
  name: string;
  city: string;
  phone: string;
}

export const ELLIOTT_STORES: ElliottStore[] = [
  { id: "53", name: "Austin South (53)", city: "Austin", phone: "(512) 326-0101" },
  { id: "73", name: "San Antonio RDC (73)", city: "San Antonio", phone: "(210) 590-1711" },
  { id: "49", name: "Houston RDC (49)", city: "Houston", phone: "(713) 644-1754" },
  { id: "34", name: "DFW RDC (34)", city: "Dallas/DFW", phone: "(972) 484-2244" },
  { id: "81", name: "Amarillo (81)", city: "Amarillo", phone: "(806) 372-6523" },
  { id: "191", name: "El Paso (191)", city: "El Paso", phone: "(915) 772-5522" },
  { id: "151", name: "Brownsville (151)", city: "Brownsville", phone: "(956) 544-3636" },
  { id: "58", name: "Abilene (58)", city: "Abilene", phone: "(325) 677-2558" },
  { id: "115", name: "Odessa (115)", city: "Odessa/Midland", phone: "(432) 332-0249" },
  { id: "63", name: "San Angelo (63)", city: "San Angelo", phone: "(325) 653-3594" },
];
