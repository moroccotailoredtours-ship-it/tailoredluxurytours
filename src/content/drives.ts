import type { Drive } from "@/lib/types";

/**
 * Approximate road distance and driving time for the day's main drive, without stops.
 * NOT in the owner's itinerary documents: compiled from public route guides, tour operators and map sites
 * (figures disagree by 10–20%, so values are rounded and shown as "about"). Winter snow can close the
 * Tizi n'Test and Tizi n'Tichka passes. Owner to confirm before relying on them.
 * Days with no entry (arrival, departure, free days, local day trips) show no drive.
 */
const d = (km: number, h: number, m = 0): Drive => ({ km, minutes: h * 60 + m });

const FEZ_MERZOUGA = d(455, 7, 30);
const MERZOUGA_MIDELT = d(270, 4);
const FEZ_MIDELT = d(185, 3, 30);
const MERZOUGA_OUARZAZATE = d(365, 6);
const OUARZAZATE_MARRAKECH = d(200, 4);
const MARRAKECH_MERZOUGA = d(560, 9);
const MERZOUGA_TODRA = d(215, 3, 30);
const TODRA_DADES = d(80, 1, 30);
const DADES_OUARZAZATE = d(130, 2);
const DADES_MERZOUGA = d(255, 4);
const ABH_MARRAKECH = d(185, 3, 30);
const CASA_MARRAKECH = d(240, 3);
const CASA_RABAT = d(90, 1, 15);
const RABAT_MEKNES = d(140, 2);
const CASA_FEZ = d(295, 4);
const CASA_CHEF = d(340, 5, 30);
const FEZ_CHEF = d(195, 3, 30);
const ESSAOUIRA_MARRAKECH = d(180, 2, 30);
const TAROUDANT_MARRAKECH = d(310, 5, 30);

/** Drive for a day, keyed by the exact day title (same title = same route in every tour). */
export const driveByTitle: Record<string, Drive> = {
  "Fez to Merzouga": FEZ_MERZOUGA,
  "Fez to Merzouga (Sahara Desert)": FEZ_MERZOUGA,
  "Fez to the Sahara Desert": FEZ_MERZOUGA,
  "Sunrise in the Desert and Return to Fez": FEZ_MERZOUGA,
  "Sahara to Fez": FEZ_MERZOUGA,
  "Fez to Erfoud": d(410, 7),
  "Erfoud to Merzouga": d(50, 1),
  "Fez to Midelt": FEZ_MIDELT,
  "Fez to Ifrane and Midelt": FEZ_MIDELT,
  "Fez to Midelt via the Middle Atlas Mountains": FEZ_MIDELT,
  "Meknes to Midelt via Ifrane": FEZ_MIDELT,
  "Midelt to Fez": FEZ_MIDELT,
  "Midelt to Merzouga": MERZOUGA_MIDELT,
  "Midelt to Erfoud and Merzouga": MERZOUGA_MIDELT,
  "Sahara to Midelt": MERZOUGA_MIDELT,
  "Merzouga to Ouarzazate": MERZOUGA_OUARZAZATE,
  "Ouarzazate to Merzouga (Sahara Desert)": MERZOUGA_OUARZAZATE,
  "Sahara to Ouarzazate": MERZOUGA_OUARZAZATE,
  "Ouarzazate to Marrakech": OUARZAZATE_MARRAKECH,
  "Marrakech to Ouarzazate": OUARZAZATE_MARRAKECH,
  "Marrakech to Ouarzazate via Ait Ben Haddou": OUARZAZATE_MARRAKECH,
  "Marrakech to Ait Ben Haddou and Ouarzazate": OUARZAZATE_MARRAKECH,
  "Marrakech to Merzouga (Sahara Desert)": MARRAKECH_MERZOUGA,
  "Return to Marrakech": MARRAKECH_MERZOUGA,
  "Merzouga to Todra Gorge": MERZOUGA_TODRA,
  "Todra Gorge to Merzouga (Sahara Desert)": MERZOUGA_TODRA,
  "Todra Gorge to Dades Valley": TODRA_DADES,
  "Todra Gorge to Ouarzazate": d(180, 3),
  "Todra Gorge to Dades Valley and Skoura": d(170, 3),
  "Dades Valley to Ouarzazate": DADES_OUARZAZATE,
  "Dades Valley to Skoura and Ouarzazate": DADES_OUARZAZATE,
  "Dades Valley to Ouarzazate via Skoura": DADES_OUARZAZATE,
  "Ouarzazate to Dades Valley": DADES_OUARZAZATE,
  "Ouarzazate to Dades Valley and Todra Gorge": d(210, 3, 30),
  "Dades Valley to Merzouga (Sahara Desert)": DADES_MERZOUGA,
  "Skoura to Ouarzazate and Aït Benhaddou": d(70, 1, 30),
  "Ouarzazate to Aït Benhaddou": d(30, 0, 40),
  "Aït Benhaddou to Marrakech via High Atlas Mountains": ABH_MARRAKECH,
  "Aït Benhaddou to Taroudant": d(320, 5, 30),
  "Taroudant to Marrakech": TAROUDANT_MARRAKECH,
  "Taroudant to Ouarzazate": d(290, 5),
  "Taroudant to Essaouira": d(260, 3, 30),
  "Agadir to Taroudant": d(85, 1, 30),
  "Marrakech to Agadir": d(270, 3),
  "Marrakech to Essaouira": ESSAOUIRA_MARRAKECH,
  "Essaouira to Marrakech": ESSAOUIRA_MARRAKECH,
  "Casablanca to Marrakech": CASA_MARRAKECH,
  "Casablanca to El Jadida": d(110, 1, 15),
  "El Jadida to Essaouira": d(260, 3, 30),
  "Casablanca to Rabat": CASA_RABAT,
  "Rabat to Casablanca": CASA_RABAT,
  "Casablanca to Rabat and Meknes": d(230, 3, 15),
  "Casablanca to Fez via Rabat": CASA_FEZ,
  "Casablanca to Fez via Ifrane": d(360, 5),
  "Casablanca to Chefchaouen": CASA_CHEF,
  "Chefchaouen to Casablanca": CASA_CHEF,
  "Chefchaouen to Fez": FEZ_CHEF,
  "Fez to Chefchaouen": FEZ_CHEF,
  "Fez to Rabat": d(200, 2, 30),
  "Fez to Meknes": d(60, 1),
  "Fez to Meknes and Volubilis": d(120, 2),
  "Meknes to Fez via Volubilis": d(120, 2),
  "Meknes to Rabat": RABAT_MEKNES,
  "Fez to Marrakech via the Middle Atlas": d(530, 6, 30),
  "Day Trip to the Agafay Desert": d(30, 0, 45),
};

/** Days whose title alone is ambiguous (e.g. "Return to Casablanca"), keyed by `slug#day`. */
export const driveBySlugDay: Record<string, Drive> = {
  "morocco-coastal-escape-tour-6-days-from-casablanca#6": CASA_MARRAKECH,
  "moroccan-family-adventure-7-days-from-casablanca#7": CASA_MARRAKECH,
  "morocco-imperial-cities-tour-7-days-from-casablanca#7": CASA_MARRAKECH,
  "southern-morocco-discovery-8-days-from-casablanca#8": CASA_MARRAKECH,
  "the-royal-road-tour-9-days-from-casablanca#9": CASA_MARRAKECH,
  "sahara-and-atlas-adventure-8-days-from-casablanca#8": CASA_FEZ,
  "moroccan-luxury-journey-10-days-from-casablanca#9": d(370, 4, 30),
  "moroccan-luxury-journey-10-days-from-casablanca#6": MARRAKECH_MERZOUGA,
};

export function driveFor(slug: string, day: number, title: string): Drive | undefined {
  return driveBySlugDay[`${slug}#${day}`] ?? driveByTitle[title];
}
