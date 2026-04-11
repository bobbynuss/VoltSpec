/**
 * Elliott Electric Supply — TX, LA, OK, AR Branch Database
 *
 * Source: https://www.eesnet.com/storeinformation/storelist.aspx
 * Last refreshed: 2026-04-09
 *
 * Used for zip-code-to-nearest-branch matching via haversine distance.
 * Lat/lng are approximate branch coordinates (Google Maps / ZIP centroid).
 *
 * Excludes non-retail entities (NacSpace, NacAirWays, Store Services,
 * Central Purchasing, Elliott Property Holdings).
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
  // ── Austin / Central Texas ──────────────────────────────────────────────
  { store: 53,  name: "South Austin",             city: "Austin",           address: "2301 E Saint Elmo Rd, Ste 105, Austin, TX 78744",       phone: "(512) 443-5600", zip: "78744", lat: 30.2150, lng: -97.7450 },
  { store: 120, name: "North Austin",             city: "Austin",           address: "3101 Industrial Terrace, Austin, TX 78758",             phone: "(512) 351-3290", zip: "78758", lat: 30.3920, lng: -97.7290 },
  { store: 64,  name: "Austin RDC",               city: "Manor",            address: "12555 Harris Branch Pkwy, Ste 105, Manor, TX 78653",   phone: "(512) 339-8750", zip: "78653", lat: 30.3530, lng: -97.5560 },
  { store: 183, name: "Austin Project Solutions",  city: "Manor",            address: "12555 Harris Branch Pkwy, Ste 101, Manor, TX 78653",   phone: "(512) 339-8750", zip: "78653", lat: 30.3530, lng: -97.5560 },
  { store: 29,  name: "Round Rock",               city: "Round Rock",       address: "445 Texas Avenue, Round Rock, TX 78664",               phone: "(512) 246-8001", zip: "78664", lat: 30.5080, lng: -97.6810 },
  { store: 51,  name: "Cedar Park",               city: "Cedar Park",       address: "300 E New Hope Road, Ste 308, Cedar Park, TX 78613",   phone: "(512) 260-0684", zip: "78613", lat: 30.5100, lng: -97.8200 },
  { store: 136, name: "Georgetown",               city: "Georgetown",       address: "2450 NE Inner Loop, Bldg 1, Georgetown, TX 78626",     phone: "(737) 444-2615", zip: "78626", lat: 30.6500, lng: -97.6600 },
  { store: 173, name: "Dripping Springs",          city: "Dripping Springs", address: "4955 Bell Springs Rd, Unit 9, Dripping Springs, TX 78620", phone: "(737) 317-5073", zip: "78620", lat: 30.2300, lng: -98.0860 },
  { store: 145, name: "Bastrop",                   city: "Bastrop",          address: "405 Technology Drive, Bastrop, TX 78602",              phone: "(512) 772-2493", zip: "78602", lat: 30.1200, lng: -97.3150 },
  { store: 36,  name: "Marble Falls",              city: "Marble Falls",     address: "608 Industrial Blvd, Marble Falls, TX 78654",          phone: "(830) 693-9910", zip: "78654", lat: 30.5780, lng: -98.2750 },
  { store: 98,  name: "San Marcos",                city: "San Marcos",       address: "1904 Dutton Drive, San Marcos, TX 78666",              phone: "(512) 392-4310", zip: "78666", lat: 29.8830, lng: -97.9410 },

  // ── San Antonio ─────────────────────────────────────────────────────────
  { store: 61,  name: "San Antonio",               city: "Leon Valley",      address: "5300 Bandera Road, Leon Valley, TX 78238",             phone: "(210) 522-0146", zip: "78238", lat: 29.4770, lng: -98.5920 },
  { store: 73,  name: "San Antonio RDC",           city: "San Antonio",      address: "9707 Broadway St, Ste 100, San Antonio, TX 78217",     phone: "(210) 646-6950", zip: "78217", lat: 29.5220, lng: -98.4580 },
  { store: 129, name: "N. San Antonio",            city: "San Antonio",      address: "9707 Broadway St, Ste 100, San Antonio, TX 78217",     phone: "(210) 646-6950", zip: "78217", lat: 29.5220, lng: -98.4580 },
  { store: 198, name: "SA Project Solutions",      city: "San Antonio",      address: "9707 Broadway St, Ste 200, San Antonio, TX 78217",     phone: "(210) 646-6950", zip: "78217", lat: 29.5220, lng: -98.4580 },
  { store: 60,  name: "New Braunfels",             city: "New Braunfels",    address: "185 Deer Crest Dr, New Braunfels, TX 78130",           phone: "(830) 626-6880", zip: "78130", lat: 29.6700, lng: -98.0960 },
  { store: 82,  name: "Kerrville",                 city: "Kerrville",        address: "1200 Water St, Kerrville, TX 78028",                   phone: "(830) 896-9240", zip: "78028", lat: 30.0470, lng: -99.1400 },
  { store: 88,  name: "Pleasanton",                city: "Pleasanton",       address: "2569 E Hwy 97, Pleasanton, TX 78064",                 phone: "(830) 569-3390", zip: "78064", lat: 28.9680, lng: -98.4770 },
  { store: 127, name: "Pearsall",                  city: "Pearsall",         address: "1910 Business Interstate 35E, Pearsall, TX 78061",     phone: "(830) 334-5353", zip: "78061", lat: 28.8920, lng: -99.0940 },
  { store: 103, name: "Uvalde",                    city: "Uvalde",           address: "17 Lou Stroup Drive, Uvalde, TX 78801",                phone: "(830) 278-1938", zip: "78801", lat: 29.2100, lng: -99.7860 },
  { store: 119, name: "Kenedy",                    city: "Kenedy",           address: "475 Boardwalk, Kenedy, TX 78119",                      phone: "(830) 299-4593", zip: "78119", lat: 28.8190, lng: -97.8580 },

  // ── Houston Metro ───────────────────────────────────────────────────────
  { store: 108, name: "Houston",                   city: "Houston",          address: "7929 N Sam Houston Pkwy W, Ste 100, Houston, TX 77064", phone: "(713) 462-9901", zip: "77064", lat: 29.8870, lng: -95.5420 },
  { store: 49,  name: "Houston RDC",               city: "Houston",          address: "7929 N Sam Houston Pkwy W, Ste 100, Houston, TX 77064", phone: "(281) 345-1143", zip: "77064", lat: 29.8870, lng: -95.5420 },
  { store: 177, name: "Houston Project Solutions",  city: "Houston",          address: "7929 N Sam Houston Pkwy W, Ste 200, Houston, TX 77064", phone: "(281) 345-1143", zip: "77064", lat: 29.8870, lng: -95.5420 },
  { store: 17,  name: "Galena Park",               city: "Houston",          address: "1915 Turning Basin, Ste 500, Houston, TX 77029",       phone: "(713) 675-6700", zip: "77029", lat: 29.7350, lng: -95.2340 },
  { store: 157, name: "Spring",                    city: "Houston",          address: "21330 Inverness Forest Blvd, Houston, TX 77073",       phone: "(832) 626-1994", zip: "77073", lat: 30.0090, lng: -95.4100 },
  { store: 41,  name: "Pearland",                  city: "Houston",          address: "3520 S Sam Houston Pkwy E, Ste 900, Houston, TX 77047", phone: "(281) 412-7049", zip: "77047", lat: 29.6170, lng: -95.4040 },
  { store: 65,  name: "Stafford",                  city: "Stafford",         address: "10650 West Airport, Ste 100, Stafford, TX 77477",      phone: "(281) 879-4911", zip: "77477", lat: 29.6230, lng: -95.5640 },
  { store: 38,  name: "Katy",                      city: "Katy",             address: "1722 Primewest Parkway, Katy, TX 77449",               phone: "(281) 828-2012", zip: "77449", lat: 29.7930, lng: -95.7570 },
  { store: 28,  name: "Tomball",                   city: "Tomball",          address: "201 S Persimmon Street, Tomball, TX 77375",             phone: "(281) 357-5300", zip: "77375", lat: 30.0970, lng: -95.6160 },
  { store: 33,  name: "Humble",                    city: "Humble",           address: "1550 Wilson Rd, Humble, TX 77338",                     phone: "(281) 548-0169", zip: "77338", lat: 29.9990, lng: -95.2630 },
  { store: 69,  name: "Conroe",                    city: "Conroe",           address: "660 Frazier Commerce Dr, Conroe, TX 77303",            phone: "(936) 788-6850", zip: "77303", lat: 30.3370, lng: -95.4690 },
  { store: 130, name: "Deer Park",                 city: "Pasadena",         address: "3700 Pasadena Fwy, Pasadena, TX 77503",                phone: "(281) 220-3780", zip: "77503", lat: 29.6850, lng: -95.1730 },
  { store: 56,  name: "League City",               city: "League City",      address: "1135 Butler Road, League City, TX 77573",              phone: "(281) 833-5333", zip: "77573", lat: 29.4870, lng: -95.1050 },
  { store: 197, name: "Baytown",                   city: "Baytown",          address: "7604 Gateway Blvd, Baytown, TX 77521",                 phone: "(832) 514-7819", zip: "77521", lat: 29.7410, lng: -94.9770 },
  { store: 100, name: "Galveston",                 city: "Galveston",        address: "6510 Broadway St, Galveston, TX 77554",                phone: "(409) 741-0072", zip: "77554", lat: 29.2630, lng: -94.8310 },

  // ── Dallas / Fort Worth Metroplex ───────────────────────────────────────
  { store: 6,   name: "Dallas",                    city: "Garland",          address: "3737 Grader Street, Ste 120, Garland, TX 75041",       phone: "(214) 503-7227", zip: "75041", lat: 32.8260, lng: -96.6560 },
  { store: 18,  name: "West Dallas",               city: "Dallas",           address: "2351 Walnut Hill Lane, Ste 150, Dallas, TX 75229",     phone: "(214) 351-0785", zip: "75229", lat: 32.8770, lng: -96.8860 },
  { store: 34,  name: "DFW RDC",                   city: "Farmers Branch",   address: "13405 Stemmons Frwy, Farmers Branch, TX 75234",        phone: "(972) 206-0016", zip: "75234", lat: 32.9240, lng: -96.9020 },
  { store: 158, name: "Lancaster",                 city: "Lancaster",        address: "1810 N Interstate 35 E, Lancaster, TX 75134",          phone: "(469) 913-1947", zip: "75134", lat: 32.6120, lng: -96.7720 },
  { store: 78,  name: "Plano",                     city: "Plano",            address: "2700 Summit Ave, Ste 200, Plano, TX 75074",            phone: "(469) 467-7771", zip: "75074", lat: 33.0170, lng: -96.7050 },
  { store: 43,  name: "McKinney",                  city: "McKinney",         address: "3200 N Central Expwy, Ste 100, McKinney, TX 75071",    phone: "(972) 542-1196", zip: "75071", lat: 33.2150, lng: -96.6370 },
  { store: 163, name: "Prosper",                   city: "Prosper",          address: "700 Industry Way, Ste 10, Prosper, TX 75078",          phone: "(469) 899-3981", zip: "75078", lat: 33.2360, lng: -96.8010 },
  { store: 77,  name: "Rockwall",                  city: "Rockwall",         address: "1510 Interstate 30, Rockwall, TX 75087",               phone: "(469) 913-1945", zip: "75087", lat: 32.9310, lng: -96.4600 },
  { store: 175, name: "Forney",                    city: "Forney",           address: "10524 W US Hwy 80, Forney, TX 75126",                  phone: "(972) 210-2783", zip: "75126", lat: 32.7480, lng: -96.4720 },
  { store: 12,  name: "Arlington",                 city: "Arlington",        address: "2900 E Pioneer Parkway, Ste 170, Arlington, TX 76010", phone: "(817) 695-1616", zip: "76010", lat: 32.7150, lng: -97.0780 },
  { store: 123, name: "DFW Project Solutions",     city: "Arlington",        address: "2900 E Pioneer Parkway, Ste 140, Arlington, TX 76010", phone: "(817) 422-0258", zip: "76010", lat: 32.7150, lng: -97.0780 },
  { store: 209, name: "Express Power Solutions",   city: "Arlington",        address: "2900 E Pioneer Parkway, Ste 140, Arlington, TX 76010", phone: "(817) 422-0258", zip: "76010", lat: 32.7150, lng: -97.0780 },
  { store: 25,  name: "Ft. Worth",                 city: "Fort Worth",       address: "6312A Airport Freeway, Ft. Worth, TX 76117",           phone: "(682) 647-1594", zip: "76117", lat: 32.8200, lng: -97.2640 },
  { store: 121, name: "West Ft. Worth",            city: "Fort Worth",       address: "9651 Camp Bowie West, Fort Worth, TX 76116",           phone: "(817) 560-0585", zip: "76116", lat: 32.7260, lng: -97.4510 },
  { store: 181, name: "North Fort Worth",          city: "Fort Worth",       address: "3440 Hwy 114, Ste 200, Fort Worth, TX 76177",          phone: "(682) 237-5470", zip: "76177", lat: 32.9710, lng: -97.3180 },
  { store: 71,  name: "Mansfield",                 city: "Mansfield",        address: "1501 Heritage Parkway, Ste 101, Mansfield, TX 76063",  phone: "(682) 518-7272", zip: "76063", lat: 32.5630, lng: -97.1420 },
  { store: 40,  name: "Burleson",                  city: "Burleson",         address: "149 N Wilson St, Burleson, TX 76028",                  phone: "(817) 447-0192", zip: "76028", lat: 32.5420, lng: -97.3210 },
  { store: 116, name: "Cleburne",                  city: "Cleburne",         address: "1820 N Main St, Cleburne, TX 76033",                   phone: "(817) 202-8933", zip: "76033", lat: 32.3600, lng: -97.3870 },
  { store: 19,  name: "Denton",                    city: "Denton",           address: "2025 N Masch Branch Road, Ste 105, Denton, TX 76207",  phone: "(940) 381-9070", zip: "76207", lat: 33.2310, lng: -97.1530 },
  { store: 9,   name: "Waxahachie",                city: "Waxahachie",       address: "706 Solon Rd, Waxahachie, TX 75165",                   phone: "(972) 937-6965", zip: "75165", lat: 32.3870, lng: -96.8430 },
  { store: 44,  name: "Ennis",                     city: "Ennis",            address: "711 Lake Bardwell Dr, Ennis, TX 75119",                phone: "(972) 875-3413", zip: "75119", lat: 32.3290, lng: -96.6250 },
  { store: 26,  name: "Terrell",                   city: "Terrell",          address: "1300 Hwy 34 South, Terrell, TX 75160",                 phone: "(972) 563-2224", zip: "75160", lat: 32.7210, lng: -96.2750 },
  { store: 97,  name: "Sherman",                   city: "Sherman",          address: "4509 Texoma Parkway, Sherman, TX 75090",               phone: "(903) 892-8041", zip: "75090", lat: 33.6360, lng: -96.6090 },
  { store: 83,  name: "Gainesville",               city: "Gainesville",      address: "1725 E Highway 82, Gainesville, TX 76240",             phone: "(940) 612-1388", zip: "76240", lat: 33.6260, lng: -97.1220 },
  { store: 50,  name: "Granbury",                  city: "Granbury",         address: "4510 E Hwy 377, Granbury, TX 76049",                   phone: "(817) 573-0675", zip: "76049", lat: 32.4420, lng: -97.7280 },
  { store: 52,  name: "Weatherford",               city: "Weatherford",      address: "1830 Barnett Drive, Weatherford, TX 76087",            phone: "(817) 599-7964", zip: "76087", lat: 32.7590, lng: -97.7970 },
  { store: 23,  name: "Bridgeport",                city: "Bridgeport",       address: "204 Lake Road, Bridgeport, TX 76426",                  phone: "(940) 683-5740", zip: "76426", lat: 33.2100, lng: -97.7550 },
  { store: 95,  name: "Mineral Wells",             city: "Mineral Wells",    address: "201 NE 20th Ave, Mineral Wells, TX 76067",             phone: "(940) 325-5503", zip: "76067", lat: 32.8090, lng: -98.1070 },

  // ── East Texas ──────────────────────────────────────────────────────────
  { store: 1,   name: "Nacogdoches",               city: "Nacogdoches",      address: "2310 N Stallings Dr, Nacogdoches, TX 75964",           phone: "(936) 569-7941", zip: "75964", lat: 31.6420, lng: -94.6490 },
  { store: 2,   name: "Tyler",                     city: "Tyler",            address: "3706 Frankston Hwy, Tyler, TX 75701",                  phone: "(903) 509-9882", zip: "75701", lat: 32.3240, lng: -95.2520 },
  { store: 22,  name: "Lufkin",                    city: "Lufkin",           address: "2001 Atkinson Drive, Lufkin, TX 75901",                phone: "(936) 632-9733", zip: "75901", lat: 31.3380, lng: -94.8490 },
  { store: 16,  name: "Longview",                  city: "Longview",         address: "1500 West Cotton, Longview, TX 75604",                 phone: "(903) 757-8491", zip: "75604", lat: 32.5010, lng: -94.7610 },
  { store: 13,  name: "Kilgore",                   city: "Kilgore",          address: "1207 Energy Drive, Kilgore, TX 75662",                 phone: "(903) 984-8485", zip: "75662", lat: 32.3860, lng: -94.8760 },
  { store: 8,   name: "Marshall",                  city: "Marshall",         address: "210 Veterans Avenue, Marshall, TX 75672",              phone: "(903) 935-9535", zip: "75672", lat: 32.5450, lng: -94.3500 },
  { store: 15,  name: "Jacksonville",              city: "Jacksonville",     address: "2202 E Rusk Street, Jacksonville, TX 75766",           phone: "(903) 586-2904", zip: "75766", lat: 31.9640, lng: -95.2550 },
  { store: 68,  name: "Carthage",                  city: "Carthage",         address: "3168 SW Loop 436, Carthage, TX 75633",                 phone: "(903) 694-9924", zip: "75633", lat: 32.1570, lng: -94.3470 },
  { store: 5,   name: "Henderson",                 city: "Henderson",        address: "802 West Main, Henderson, TX 75652",                   phone: "(903) 657-1517", zip: "75652", lat: 32.1530, lng: -94.8020 },
  { store: 24,  name: "Athens",                    city: "Athens",           address: "1755 Enterprise Street, Athens, TX 75751",             phone: "(903) 675-7999", zip: "75751", lat: 32.2050, lng: -95.8540 },
  { store: 7,   name: "Palestine",                 city: "Palestine",        address: "1620 Highway 155, Palestine, TX 75803",                phone: "(903) 723-2141", zip: "75803", lat: 31.7620, lng: -95.6310 },
  { store: 30,  name: "Texarkana",                 city: "Texarkana",        address: "800 Old Boston Road, Texarkana, TX 75501",             phone: "(903) 223-6400", zip: "75501", lat: 33.4410, lng: -94.0480 },
  { store: 21,  name: "Mt. Pleasant",              city: "Mt. Pleasant",     address: "1121 W 16th Street, Mt. Pleasant, TX 75455",           phone: "(903) 577-7311", zip: "75455", lat: 33.1570, lng: -94.9780 },
  { store: 39,  name: "Paris",                     city: "Paris",            address: "3315 Park Place, Paris, TX 75462",                     phone: "(903) 784-1916", zip: "75462", lat: 33.6610, lng: -95.5560 },
  { store: 32,  name: "Jasper",                    city: "Jasper",           address: "430 South Fletcher, Jasper, TX 75951",                 phone: "(409) 489-0056", zip: "75951", lat: 30.9200, lng: -93.9970 },

  // ── North Texas / I-35 Corridor ─────────────────────────────────────────
  { store: 4,   name: "Sulphur Springs",           city: "Sulphur Springs",  address: "1220 Elm Street, Sulphur Springs, TX 75482",           phone: "(903) 885-0024", zip: "75482", lat: 33.1380, lng: -95.5990 },
  { store: 11,  name: "Greenville",                city: "Greenville",       address: "2805 Poplar, Greenville, TX 75402",                   phone: "(903) 454-3354", zip: "75402", lat: 33.1380, lng: -96.1100 },
  { store: 31,  name: "Corsicana",                 city: "Corsicana",        address: "1732 S Business 287, Corsicana, TX 75110",             phone: "(903) 872-9696", zip: "75110", lat: 32.0760, lng: -96.4680 },
  { store: 113, name: "Wichita Falls",             city: "Wichita Falls",    address: "903 Mississippi Ave, Wichita Falls, TX 76301",         phone: "(940) 257-6832", zip: "76301", lat: 33.9140, lng: -98.4930 },

  // ── I-35 Corridor / Waco / Temple / Killeen ─────────────────────────────
  { store: 42,  name: "Waco",                      city: "Waco",             address: "3325 Clay Avenue, Waco, TX 76711",                     phone: "(254) 752-3331", zip: "76711", lat: 31.5310, lng: -97.1550 },
  { store: 72,  name: "Temple",                    city: "Temple",           address: "2703 Hancock Dr, Temple, TX 76504",                    phone: "(254) 899-2800", zip: "76504", lat: 31.0720, lng: -97.3650 },
  { store: 48,  name: "Killeen",                   city: "Killeen",          address: "2501 S Fort Hood St, Killeen, TX 76542",               phone: "(254) 554-5958", zip: "76542", lat: 31.0860, lng: -97.7290 },
  { store: 47,  name: "Bryan",                     city: "Bryan",            address: "10101 SH 30, College Station, TX 77845",                  phone: "(979) 779-6630", zip: "77801", lat: 30.6740, lng: -96.3700 },
  { store: 10,  name: "Huntsville",                city: "Huntsville",       address: "926 Hwy 19, Huntsville, TX 77320",                     phone: "(936) 439-0658", zip: "77320", lat: 30.7230, lng: -95.5510 },
  { store: 84,  name: "Stephenville",              city: "Stephenville",     address: "1035 S Graham St, Stephenville, TX 76401",             phone: "(254) 965-8083", zip: "76401", lat: 32.2180, lng: -98.2020 },

  // ── West Texas / Permian Basin ──────────────────────────────────────────
  { store: 66,  name: "Odessa",                    city: "Odessa",           address: "5617 Andrews Hwy, Odessa, TX 79762",                   phone: "(432) 366-0008", zip: "79762", lat: 31.8930, lng: -102.3820 },
  { store: 62,  name: "Midland",                   city: "Midland",          address: "1001 South Goode, Midland, TX 79701",                  phone: "(432) 685-3108", zip: "79701", lat: 31.9730, lng: -102.0990 },
  { store: 70,  name: "Andrews",                   city: "Andrews",          address: "1201 West Broadway, Andrews, TX 79714",                phone: "(432) 523-2423", zip: "79714", lat: 32.3190, lng: -102.5460 },
  { store: 117, name: "Pecos",                     city: "Pecos",            address: "2000 S Bickley Ave, Pecos, TX 79772",                  phone: "(432) 445-1472", zip: "79772", lat: 31.4130, lng: -103.4930 },
  { store: 87,  name: "Fort Stockton",             city: "Fort Stockton",    address: "1308 N Nelson Street, Fort Stockton, TX 79735",        phone: "(432) 336-8730", zip: "79735", lat: 30.8940, lng: -102.8790 },
  { store: 101, name: "Big Spring",                city: "Big Spring",       address: "1308 E 4th Street, Big Spring, TX 79720",              phone: "(432) 264-0316", zip: "79720", lat: 32.2500, lng: -101.4780 },
  { store: 63,  name: "San Angelo",                city: "San Angelo",       address: "3448 Sherwood Way, San Angelo, TX 76901",              phone: "(325) 944-7321", zip: "76901", lat: 31.4430, lng: -100.4710 },
  { store: 58,  name: "Abilene",                   city: "Abilene",          address: "4281 Crawford Dr, Abilene, TX 79602",                  phone: "(325) 793-1570", zip: "79602", lat: 32.4390, lng: -99.7260 },
  { store: 93,  name: "Sweetwater",                city: "Sweetwater",       address: "2311 E Broadway St, Sweetwater, TX 79556",             phone: "(325) 236-6381", zip: "79556", lat: 32.4690, lng: -100.3870 },
  { store: 27,  name: "Brownwood",                 city: "Brownwood",        address: "4300 Danhill Drive, Brownwood, TX 76801",              phone: "(325) 646-6566", zip: "76801", lat: 31.7290, lng: -98.9760 },

  // ── Panhandle / South Plains ────────────────────────────────────────────
  { store: 81,  name: "Amarillo",                  city: "Amarillo",         address: "4000 Mockingbird Ln, Amarillo, TX 79109",              phone: "(806) 220-0404", zip: "79109", lat: 35.1700, lng: -101.8640 },
  { store: 110, name: "Lubbock",                   city: "Lubbock",          address: "6112 42nd Street, Lubbock, TX 79407",                  phone: "(806) 698-6329", zip: "79407", lat: 33.5470, lng: -101.8810 },
  { store: 96,  name: "Plainview",                 city: "Plainview",        address: "2509 West 5th, Plainview, TX 79072",                   phone: "(806) 296-5518", zip: "79072", lat: 34.1870, lng: -101.7230 },
  { store: 75,  name: "Borger",                    city: "Borger",           address: "2108 South Huber, Borger, TX 79007",                   phone: "(806) 273-3085", zip: "79007", lat: 35.6590, lng: -101.3970 },
  { store: 85,  name: "Dumas",                     city: "Dumas",            address: "110 Success Blvd, Dumas, TX 79029",                    phone: "(806) 934-4805", zip: "79029", lat: 35.8600, lng: -101.9730 },
  { store: 140, name: "Pampa",                     city: "Pampa",            address: "1620 Alcock St, Pampa, TX 79065",                      phone: "(806) 665-0433", zip: "79065", lat: 35.5360, lng: -100.9600 },
  { store: 90,  name: "Hereford",                  city: "Hereford",         address: "401 E 2nd St, Hereford, TX 79045",                     phone: "(806) 364-1529", zip: "79045", lat: 34.8150, lng: -102.3970 },

  // ── El Paso ─────────────────────────────────────────────────────────────
  { store: 191, name: "El Paso",                   city: "El Paso",          address: "1570 Lionel Drive, El Paso, TX 79936",                 phone: "(915) 995-8443", zip: "79936", lat: 31.7640, lng: -106.3060 },

  // ── South Texas / Rio Grande Valley ─────────────────────────────────────
  { store: 142, name: "Harlingen",                 city: "Harlingen",        address: "720 S Lewis Ln, Harlingen, TX 78552",                  phone: "(956) 622-4123", zip: "78552", lat: 26.1840, lng: -97.6870 },
  { store: 144, name: "McAllen",                   city: "McAllen",          address: "1701 N Jackson, Ste E, McAllen, TX 78501",             phone: "(956) 331-2410", zip: "78501", lat: 26.2230, lng: -98.2340 },
  { store: 151, name: "Brownsville",               city: "Brownsville",      address: "5575 Ruben M Torres Blvd, Brownsville, TX 78526",      phone: "(956) 295-3007", zip: "78526", lat: 25.9640, lng: -97.4680 },
  { store: 185, name: "Laredo",                    city: "Laredo",           address: "8420 Tejas Loop, Laredo, TX 78045",                    phone: "(956) 462-0607", zip: "78045", lat: 27.5610, lng: -99.4570 },

  // ── Louisiana ───────────────────────────────────────────────────────
  { store: 14,  name: "Shreveport",                city: "Shreveport",       address: "9139 Linwood Ave, Shreveport, LA 71106",               phone: "(318) 688-9822", zip: "71106", lat: 32.4270, lng: -93.6970 },
  { store: 3,   name: "Bossier City",              city: "Bossier City",     address: "2414 Montgomery Ln, Bossier City, LA 71111",           phone: "(318) 746-5712", zip: "71111", lat: 32.5160, lng: -93.7120 },
  { store: 79,  name: "Monroe",                    city: "Monroe",           address: "801 Sterlington Rd, Monroe, LA 71203",                 phone: "(318) 387-1621", zip: "71203", lat: 32.5350, lng: -92.0690 },
  { store: 55,  name: "West Monroe",               city: "West Monroe",      address: "106 Industrial Drive, West Monroe, LA 71292",          phone: "(318) 398-9757", zip: "71292", lat: 32.5130, lng: -92.1470 },
  { store: 67,  name: "Ruston",                    city: "Ruston",           address: "2020 Farmerville Highway, Ruston, LA 71270",           phone: "(318) 251-9393", zip: "71270", lat: 32.5350, lng: -92.6200 },
  { store: 20,  name: "Natchitoches",              city: "Natchitoches",     address: "500 Rapides Drive, Natchitoches, LA 71457",            phone: "(318) 352-7414", zip: "71457", lat: 31.7600, lng: -93.0860 },
  { store: 54,  name: "Alexandria",                city: "Alexandria",       address: "3705 Lee Street, Alexandria, LA 71302",                phone: "(318) 445-1336", zip: "71302", lat: 31.3110, lng: -92.4450 },
  { store: 35,  name: "Pineville",                 city: "Pineville",        address: "4406 Highway 28 East, Pineville, LA 71360",            phone: "(318) 767-0900", zip: "71360", lat: 31.3410, lng: -92.3800 },
  { store: 57,  name: "Leesville",                 city: "Leesville",        address: "206 Stanton St, Leesville, LA 71446",                  phone: "(337) 238-1624", zip: "71446", lat: 31.1430, lng: -93.2610 },
  { store: 74,  name: "Vidalia",                   city: "Vidalia",          address: "6 South Hickory, Vidalia, LA 71373",                   phone: "(318) 336-5113", zip: "71373", lat: 31.5650, lng: -91.4260 },
  { store: 59,  name: "Lafayette",                 city: "Lafayette",        address: "1811 N University, Ste 100, Lafayette, LA 70507",      phone: "(337) 235-7681", zip: "70507", lat: 30.2340, lng: -92.0190 },
  { store: 80,  name: "Sulphur",                   city: "Sulphur",          address: "1336 Swisco Road, Sulphur, LA 70665",                  phone: "(337) 533-8019", zip: "70665", lat: 30.2360, lng: -93.3770 },
  { store: 102, name: "Baton Rouge",               city: "Baton Rouge",      address: "10440 Airline Highway, Baton Rouge, LA 70816",         phone: "(225) 292-7746", zip: "70816", lat: 30.4670, lng: -91.0740 },
  { store: 170, name: "Gonzales",                  city: "Gonzales",         address: "1617 W Highway 30, Gonzales, LA 70737",                phone: "(225) 960-6273", zip: "70737", lat: 30.2380, lng: -90.9340 },
  { store: 111, name: "New Orleans",               city: "Harahan",          address: "221 Hord St, Harahan, LA 70123",                       phone: "(504) 264-9995", zip: "70123", lat: 29.9560, lng: -90.2020 },
  { store: 137, name: "Covington",                 city: "Covington",        address: "1026 N Collins Blvd, Covington, LA 70433",             phone: "(985) 302-3016", zip: "70433", lat: 30.4850, lng: -90.1010 },

  // ── Oklahoma ──────────────────────────────────────────────────────
  { store: 122, name: "Oklahoma City",             city: "Oklahoma City",    address: "1800 S May Ave, Oklahoma City, OK 73108",              phone: "(405) 896-3723", zip: "73108", lat: 35.4510, lng: -97.5370 },
  { store: 128, name: "Edmond",                    city: "Edmond",           address: "308 Centennial Blvd, Edmond, OK 73013",                phone: "(405) 562-6283", zip: "73013", lat: 35.6530, lng: -97.4780 },
  { store: 132, name: "Moore",                     city: "Moore",            address: "2101 S Eastern Ave, Moore, OK 73160",                  phone: "(405) 759-4139", zip: "73160", lat: 35.3260, lng: -97.4550 },
  { store: 184, name: "Yukon",                     city: "Yukon",            address: "1011 First Place Blvd, Yukon, OK 73099",               phone: "(405) 265-8424", zip: "73099", lat: 35.5070, lng: -97.7620 },
  { store: 179, name: "Midwest City",              city: "Midwest City",     address: "2830 Global Pkwy, Midwest City, OK 73110",             phone: "(405) 622-4254", zip: "73110", lat: 35.4490, lng: -97.3710 },
  { store: 134, name: "Tulsa",                     city: "Tulsa",            address: "10131 E 21st St, Tulsa, OK 74129",                     phone: "(918) 948-7825", zip: "74129", lat: 36.1380, lng: -95.8990 },
  { store: 176, name: "Bartlesville",              city: "Bartlesville",     address: "2646 SE Washington Blvd, Bartlesville, OK 74006",      phone: "(918) 876-3357", zip: "74006", lat: 36.7260, lng: -95.9380 },
  { store: 147, name: "Stillwater",                city: "Stillwater",       address: "303 East Harned Ave, Stillwater, OK 74075",            phone: "(405) 880-8633", zip: "74075", lat: 36.1160, lng: -97.0580 },
  { store: 162, name: "Pryor",                     city: "Pryor",            address: "1315 2nd Street MAIP, Pryor, OK 74361",                phone: "(918) 803-0063", zip: "74361", lat: 36.3080, lng: -95.3160 },
  { store: 109, name: "Lawton",                    city: "Lawton",           address: "1010 SE 1st Street, Lawton, OK 73501",                 phone: "(580) 581-7270", zip: "73501", lat: 34.6040, lng: -98.3860 },
  { store: 118, name: "Duncan",                    city: "Duncan",           address: "5668 N Hwy 81, Duncan, OK 73533",                     phone: "(580) 252-2582", zip: "73533", lat: 34.5270, lng: -97.9470 },
  { store: 133, name: "Enid",                      city: "Enid",             address: "3507 N Van Buren Bypass, Enid, OK 73701",              phone: "(580) 701-6818", zip: "73701", lat: 36.4190, lng: -97.8780 },
  { store: 115, name: "Shawnee",                   city: "Shawnee",          address: "37489 45th Street, Shawnee, OK 74804",                 phone: "(405) 585-0428", zip: "74804", lat: 35.3270, lng: -96.9250 },
  { store: 190, name: "Durant",                    city: "Durant",           address: "5018 W Main Street, Durant, OK 74701",                 phone: "(580) 745-5448", zip: "74701", lat: 33.9940, lng: -96.4270 },

  // ── Arkansas ──────────────────────────────────────────────────────
  { store: 91,  name: "Little Rock",               city: "Little Rock",      address: "5510 West 65th Street, Little Rock, AR 72209",         phone: "(501) 565-1785", zip: "72209", lat: 34.6810, lng: -92.3580 },
  { store: 86,  name: "N Little Rock",             city: "N. Little Rock",   address: "1501 North Cypress Street, N. Little Rock, AR 72114",  phone: "(501) 945-9398", zip: "72114", lat: 34.7770, lng: -92.2640 },
  { store: 94,  name: "Cabot",                     city: "Cabot",            address: "132 Professional Dr, Cabot, AR 72023",                 phone: "(501) 605-1780", zip: "72023", lat: 34.9540, lng: -92.0160 },
  { store: 131, name: "Benton",                    city: "Benton",           address: "2114 Military Rd, Benton, AR 72015",                   phone: "(501) 303-4983", zip: "72015", lat: 34.5640, lng: -92.5870 },
  { store: 99,  name: "Conway",                    city: "Conway",           address: "520 Equity Ave, Conway, AR 72032",                     phone: "(501) 336-8444", zip: "72032", lat: 35.0930, lng: -92.4420 },
  { store: 149, name: "Pine Bluff",                city: "Pine Bluff",       address: "1701 Commerce Rd, Pine Bluff, AR 71601",               phone: "(870) 671-4805", zip: "71601", lat: 34.2290, lng: -92.0030 },
  { store: 89,  name: "Searcy",                    city: "Searcy",           address: "1612 E Booth Road, Searcy, AR 72143",                  phone: "(501) 368-0309", zip: "72143", lat: 35.2480, lng: -91.7060 },
  { store: 114, name: "Hot Springs",               city: "Hot Springs",      address: "411 Autumn Street, Hot Springs, AR 71901",             phone: "(501) 762-8210", zip: "71901", lat: 34.4870, lng: -93.0560 },
  { store: 37,  name: "Hope",                      city: "Hope",             address: "1615 North Hazel St, Hope, AR 71801",                  phone: "(870) 777-4225", zip: "71801", lat: 33.6770, lng: -93.5910 },
  { store: 138, name: "El Dorado",                 city: "El Dorado",        address: "805 South Timberlane Drive, El Dorado, AR 71730",      phone: "(870) 639-6289", zip: "71730", lat: 33.2070, lng: -92.6660 },
  { store: 107, name: "Stuttgart",                 city: "Stuttgart",        address: "310 West 22nd St, Stuttgart, AR 72160",                phone: "(870) 672-7082", zip: "72160", lat: 34.4900, lng: -91.5560 },
  { store: 194, name: "Jonesboro",                 city: "Jonesboro",        address: "4712 E Highland Dr, Jonesboro, AR 72401",              phone: "(870) 604-1924", zip: "72401", lat: 35.8120, lng: -90.6640 },
  { store: 105, name: "Fort Smith",                city: "Fort Smith",       address: "5500 Wheeler Avenue, Fort Smith, AR 72901",            phone: "(479) 648-1902", zip: "72901", lat: 35.3460, lng: -94.3680 },
  { store: 104, name: "Russellville",              city: "Russellville",     address: "1715 South Knoxville, Russellville, AR 72802",         phone: "(479) 967-2303", zip: "72802", lat: 35.2580, lng: -93.1370 },
  { store: 106, name: "Springdale",                city: "Springdale",       address: "537 N 40th St, Springdale, AR 72762",                  phone: "(479) 361-2266", zip: "72762", lat: 36.1830, lng: -94.1290 },
  { store: 112, name: "Bentonville",               city: "Bentonville",      address: "320 SW 28th St, Bentonville, AR 72712",                phone: "(479) 250-1930", zip: "72712", lat: 36.3440, lng: -94.2200 },
  { store: 124, name: "Rogers",                    city: "Rogers",           address: "2214 South 8th Street, Rogers, AR 72758",              phone: "(479) 636-4190", zip: "72758", lat: 36.3170, lng: -94.1180 },
  { store: 125, name: "Fayetteville",              city: "Fayetteville",     address: "555 E 15th Street, Fayetteville, AR 72701",            phone: "(479) 443-4948", zip: "72701", lat: 36.0660, lng: -94.1570 },
  { store: 126, name: "Siloam Springs",            city: "Siloam Springs",   address: "320 N Simon Sager Ave, Siloam Springs, AR 72761",      phone: "(479) 238-1561", zip: "72761", lat: 36.1880, lng: -94.5400 },
];
