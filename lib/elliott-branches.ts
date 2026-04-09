/**
 * Elliott Electric Supply branch database for Texas.
 * Used for zip-code-to-nearest-branch matching.
 *
 * lat/lng are approximate branch location coordinates.
 * Store numbers match Elliott's internal branch IDs.
 */

export interface ElliottBranch {
  store: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  zip: string;
  lat: number;
  lng: number;
}

export const ELLIOTT_BRANCHES: ElliottBranch[] = [
  // ── Central Texas ───────────────────────────────────────────────────────
  { store: 53, name: "South Austin", city: "Austin", address: "2301 E Saint Elmo Rd, Ste 105, Austin, TX 78744", phone: "(512) 443-5600", zip: "78744", lat: 30.2150, lng: -97.7450 },
  { store: 179, name: "Round Rock", city: "Round Rock", address: "1750 S A.W. Grimes Blvd, Round Rock, TX 78664", phone: "(512) 246-7902", zip: "78664", lat: 30.4960, lng: -97.6630 },
  { store: 173, name: "Dripping Springs", city: "Dripping Springs", address: "12850 US-290 W, Dripping Springs, TX 78620", phone: "(512) 858-1096", zip: "78620", lat: 30.2300, lng: -98.0860 },
  { store: 252, name: "San Marcos", city: "San Marcos", address: "1620 IH-35 S, San Marcos, TX 78666", phone: "(512) 392-5999", zip: "78666", lat: 29.8630, lng: -97.9340 },
  { store: 265, name: "Georgetown", city: "Georgetown", address: "4410 Williams Dr, Georgetown, TX 78628", phone: "(512) 869-5506", zip: "78628", lat: 30.6680, lng: -97.7150 },
  { store: 323, name: "Cedar Park", city: "Cedar Park", address: "1400 E Whitestone Blvd, Cedar Park, TX 78613", phone: "(512) 528-5300", zip: "78613", lat: 30.5230, lng: -97.7930 },
  { store: 171, name: "North Austin", city: "Austin", address: "2500 W Braker Ln, Austin, TX 78758", phone: "(512) 821-2332", zip: "78758", lat: 30.3920, lng: -97.7290 },

  // ── San Antonio ─────────────────────────────────────────────────────────
  { store: 73, name: "San Antonio RDC", city: "San Antonio", address: "4643 Rittiman Rd, San Antonio, TX 78218", phone: "(210) 599-6161", zip: "78218", lat: 29.4870, lng: -98.4210 },
  { store: 318, name: "San Antonio West", city: "San Antonio", address: "9640 Westover Hills Blvd, San Antonio, TX 78251", phone: "(210) 520-0035", zip: "78251", lat: 29.4560, lng: -98.6620 },
  { store: 284, name: "New Braunfels", city: "New Braunfels", address: "1694 IH-35 S, New Braunfels, TX 78130", phone: "(830) 626-2955", zip: "78130", lat: 29.6700, lng: -98.0960 },

  // ── Houston ─────────────────────────────────────────────────────────────
  { store: 49, name: "Houston RDC", city: "Houston", address: "7350 Blankenship Dr, Houston, TX 77055", phone: "(713) 467-7474", zip: "77055", lat: 29.8060, lng: -95.5090 },
  { store: 166, name: "Houston North", city: "Houston", address: "501 Gears Rd, Houston, TX 77067", phone: "(281) 875-8701", zip: "77067", lat: 29.9450, lng: -95.5040 },
  { store: 102, name: "Pasadena", city: "Pasadena", address: "1829 E Southmore Ave, Pasadena, TX 77502", phone: "(713) 477-3232", zip: "77502", lat: 29.6910, lng: -95.1940 },
  { store: 209, name: "Katy", city: "Katy", address: "1515 N Fry Rd, Katy, TX 77449", phone: "(281) 492-5040", zip: "77449", lat: 29.8070, lng: -95.7350 },
  { store: 316, name: "Sugar Land", city: "Sugar Land", address: "12610 Southwest Fwy, Stafford, TX 77477", phone: "(281) 277-0600", zip: "77477", lat: 29.6190, lng: -95.5610 },
  { store: 325, name: "Conroe", city: "Conroe", address: "2095 N Frazier St, Conroe, TX 77301", phone: "(936) 756-4550", zip: "77301", lat: 30.3370, lng: -95.4690 },
  { store: 303, name: "League City", city: "League City", address: "2990 Gulf Fwy S, League City, TX 77573", phone: "(281) 554-6200", zip: "77573", lat: 29.5040, lng: -95.1030 },

  // ── Dallas / DFW ────────────────────────────────────────────────────────
  { store: 34, name: "Farmers Branch / DFW RDC", city: "Dallas", address: "1551 Surveyor Blvd, Farmers Branch, TX 75234", phone: "(972) 243-5100", zip: "75234", lat: 32.9240, lng: -96.9020 },
  { store: 55, name: "Arlington", city: "Arlington", address: "2300 E Lamar Blvd, Arlington, TX 76006", phone: "(817) 649-4041", zip: "76006", lat: 32.7550, lng: -97.0780 },
  { store: 91, name: "Plano", city: "Plano", address: "908 18th St, Plano, TX 75074", phone: "(972) 423-8681", zip: "75074", lat: 33.0170, lng: -96.6870 },
  { store: 276, name: "Fort Worth", city: "Fort Worth", address: "5640 N Riverside Dr, Fort Worth, TX 76137", phone: "(817) 306-3200", zip: "76137", lat: 32.8550, lng: -97.3250 },
  { store: 310, name: "McKinney", city: "McKinney", address: "600 N Tennessee St, McKinney, TX 75069", phone: "(469) 952-3600", zip: "75069", lat: 33.2150, lng: -96.6370 },

  // ── West Texas ──────────────────────────────────────────────────────────
  { store: 81, name: "Amarillo", city: "Amarillo", address: "2612 SW 6th Ave, Amarillo, TX 79106", phone: "(806) 372-8437", zip: "79106", lat: 35.1910, lng: -101.8640 },
  { store: 57, name: "El Paso", city: "El Paso", address: "7944 Gateway Blvd E, El Paso, TX 79915", phone: "(915) 779-6606", zip: "79915", lat: 31.7700, lng: -106.3870 },
  { store: 191, name: "El Paso West", city: "El Paso", address: "5445 N Mesa St, El Paso, TX 79912", phone: "(915) 307-4200", zip: "79912", lat: 31.8290, lng: -106.5260 },
  { store: 36, name: "Odessa", city: "Odessa", address: "1610 E 8th St, Odessa, TX 79761", phone: "(432) 332-6641", zip: "79761", lat: 31.8490, lng: -102.3340 },
  { store: 115, name: "Midland", city: "Midland", address: "3301 W Industrial Ave, Midland, TX 79703", phone: "(432) 699-3386", zip: "79703", lat: 31.9700, lng: -102.1180 },

  // ── South Texas / Valley ────────────────────────────────────────────────
  { store: 151, name: "Brownsville", city: "Brownsville", address: "1950 Central Blvd, Brownsville, TX 78520", phone: "(956) 541-3431", zip: "78520", lat: 25.9370, lng: -97.4920 },
  { store: 42, name: "Corpus Christi", city: "Corpus Christi", address: "330 N Navigation Blvd, Corpus Christi, TX 78408", phone: "(361) 882-1181", zip: "78408", lat: 27.7970, lng: -97.4040 },
  { store: 110, name: "McAllen", city: "McAllen", address: "1420 E Hackberry Ave, McAllen, TX 78501", phone: "(956) 631-6561", zip: "78501", lat: 26.2080, lng: -98.2210 },
  { store: 183, name: "Laredo", city: "Laredo", address: "4802 San Bernardo Ave, Laredo, TX 78041", phone: "(956) 712-0077", zip: "78041", lat: 27.5260, lng: -99.4880 },

  // ── Other Texas ─────────────────────────────────────────────────────────
  { store: 58, name: "Abilene", city: "Abilene", address: "1150 S Treadaway Blvd, Abilene, TX 79602", phone: "(325) 672-4251", zip: "79602", lat: 32.4390, lng: -99.7260 },
  { store: 63, name: "San Angelo", city: "San Angelo", address: "1602 Pulliam St, San Angelo, TX 76903", phone: "(325) 655-3146", zip: "76903", lat: 31.4530, lng: -100.4430 },
  { store: 54, name: "Waco", city: "Waco", address: "2301 Franklin Ave, Waco, TX 76710", phone: "(254) 752-8488", zip: "76710", lat: 31.5410, lng: -97.1520 },
  { store: 100, name: "Beaumont", city: "Beaumont", address: "6325 Eastex Fwy, Beaumont, TX 77708", phone: "(409) 899-3700", zip: "77708", lat: 30.1240, lng: -94.1460 },
  { store: 83, name: "Lubbock", city: "Lubbock", address: "1401 Ave Q, Lubbock, TX 79401", phone: "(806) 747-4484", zip: "79401", lat: 33.5470, lng: -101.8480 },
  { store: 177, name: "Tyler", city: "Tyler", address: "3614 Troup Hwy, Tyler, TX 75707", phone: "(903) 561-6111", zip: "75707", lat: 32.3240, lng: -95.2520 },
  { store: 119, name: "Killeen", city: "Killeen", address: "3000 E Central Texas Expy, Killeen, TX 76543", phone: "(254) 526-5050", zip: "76543", lat: 31.1090, lng: -97.7100 },
  { store: 280, name: "Temple", city: "Temple", address: "3400 S General Bruce Dr, Temple, TX 76504", phone: "(254) 774-9920", zip: "76504", lat: 31.0720, lng: -97.3650 },
  { store: 326, name: "College Station", city: "College Station", address: "2420 Texas Ave S, College Station, TX 77840", phone: "(979) 693-4200", zip: "77840", lat: 30.5990, lng: -96.3080 },
];
