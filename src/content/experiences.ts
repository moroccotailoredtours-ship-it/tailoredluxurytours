import type { Experience } from "@/lib/types";
import { images } from "./images";

export const experiences: Experience[] = [
  {
    slug: "culture-heritage",
    status: "published",
    title: "Culture & Heritage",
    summary: "Living traditions, craft, music and the stories behind Morocco's places.",
    image: images.fezMadrasa,
    intro: [
      "Morocco's culture is layered: Amazigh, Arab, Andalusian and Saharan influences meet in its music, food, architecture and daily rituals.",
      "A cultural journey is less about ticking off sights than about context: why a place looks as it does, and who keeps its traditions alive.",
    ],
    whatItInvolves: [
      "Guided visits to historic sites with local context.",
      "Time with artisans where visits can be arranged respectfully.",
      "Unhurried hours in neighbourhoods rather than only landmarks.",
    ],
    whoEnjoys: ["Curious travellers who like context and conversation", "Repeat visitors who want depth over breadth"],
    considerations: [
      "Dress modestly at religious and traditional sites.",
      "Ask before photographing people.",
      "Public holidays and Ramadan affect opening hours and atmosphere.",
    ],
    destinations: ["fez", "marrakech"],
    seo: {
      title: "Cultural & Heritage Travel in Morocco",
      description: "Craft, history and living traditions: add cultural depth to a private, tailor-made Morocco journey.",
    },
  },
  {
    slug: "desert-journeys",
    status: "published",
    title: "Desert Journeys",
    summary: "Dunes, oases and nights beneath the stars in Morocco's Sahara.",
    image: images.saharaTrek,
    intro: [
      "The desert is Morocco's most elemental landscape. It also demands the most planning, because distances are long and conditions vary with the season.",
      "We help you decide how far into the desert to go and how to spend your time there, based on how much you want to travel and how you prefer to stay.",
    ],
    whatItInvolves: [
      "Overland travel through southern Morocco's valleys and oases.",
      "Time on or near the dunes at the best hours of light.",
      "An overnight stay in or near the desert, if it suits you.",
    ],
    whoEnjoys: ["Photographers and stargazers", "Travellers who value space and silence"],
    considerations: [
      "Long driving days are part of the experience; we plan the pacing with you.",
      "Temperature extremes: very hot summer days, cold winter nights.",
    ],
    destinations: ["sahara"],
    seo: {
      title: "Desert Journeys in the Moroccan Sahara",
      description: "Dunes, oases and star-filled nights: how a Sahara chapter can fit into a private, tailored Morocco trip.",
    },
  },
  {
    slug: "mountains-nature",
    status: "published",
    title: "Mountains & Nature",
    summary: "Valley walks, village stays and high-mountain scenery in the Atlas.",
    image: images.atlasCanyon,
    intro: [
      "Morocco's mountains offer fresh air, terraced valleys and a different pace of life from the cities.",
      "Activity can range from short, easy valley walks to more demanding days with local guides, matched to your fitness and interests.",
    ],
    whatItInvolves: [
      "Guided walks between villages and through valleys.",
      "Optional stays in mountain lodges or village guesthouses.",
      "Scenic drives over high passes.",
    ],
    whoEnjoys: ["Walkers and nature lovers", "Families seeking space and fresh air"],
    considerations: [
      "Weather and trail conditions vary by season.",
      "Higher-altitude trekking should only be done with qualified local guides.",
    ],
    destinations: ["atlas-mountains"],
    seo: {
      title: "Mountains & Nature in Morocco's Atlas",
      description: "Valley walks, village stays and scenic passes: add the Atlas Mountains to a tailor-made Morocco itinerary.",
    },
  },
  {
    slug: "food-traditions",
    status: "published",
    title: "Moroccan Food & Traditions",
    summary: "Markets, home cooking and the rituals of tea and the table.",
    image: images.spices,
    intro: [
      "Food is one of the easiest ways into Moroccan culture. Tagines, couscous, pastries, soups and mint tea are woven into daily hospitality.",
      "Food experiences can be built around markets, cooking classes, or simply well-chosen restaurants and cafes along your route.",
    ],
    whatItInvolves: [
      "Market visits to see and taste local ingredients.",
      "Cooking sessions where available.",
      "Recommendations for dining at different levels of formality.",
    ],
    whoEnjoys: ["Food lovers", "Families and groups who enjoy shared activities"],
    considerations: [
      "Please share dietary requirements and allergies early in the planning conversation.",
      "Street food suits some travellers more than others; we can suggest alternatives.",
    ],
    destinations: ["marrakech", "fez", "atlantic-coast"],
    seo: {
      title: "Moroccan Food Experiences & Traditions",
      description: "Markets, cooking and the rituals of tea and the table: weave food into a private Morocco itinerary.",
    },
  },
  {
    slug: "architecture-historic-cities",
    status: "published",
    title: "Architecture & Historic Cities",
    summary: "Medinas, madrasas, palaces and the craft of zellige, carved plaster and cedar.",
    image: images.bahia,
    intro: [
      "From riad courtyards to royal gates, Moroccan architecture is built around light, shade, water and pattern.",
      "The country's imperial cities (Fez, Marrakech, Meknes and Rabat) each show a different chapter in that story.",
    ],
    whatItInvolves: [
      "Visits to historic buildings with guides who can explain what you are seeing.",
      "Stays in traditional courtyard houses (riads) where suitable.",
      "Time to photograph and sketch without rushing.",
    ],
    whoEnjoys: ["Design and architecture enthusiasts", "History readers"],
    considerations: [
      "Some sites are closed to non-Muslim visitors or have limited hours.",
      "Medina buildings can involve stairs and narrow approaches.",
    ],
    destinations: ["fez", "marrakech"],
    seo: {
      title: "Architecture & Historic Cities of Morocco",
      description: "Riads, madrasas and medinas: plan an architecture-focused journey through Morocco's historic cities.",
    },
  },
  {
    slug: "scenic-road-journeys",
    status: "published",
    title: "Scenic Road Journeys",
    summary: "Mountain passes, gorges and desert roads, with a private driver and time to stop.",
    image: images.atlasRoad,
    intro: [
      "Much of Morocco's beauty lies between destinations. Private road journeys let you stop for views, villages and lunch without a fixed schedule.",
      "Routes can be as direct or as scenic as you like, and we plan driving times honestly so journeys stay enjoyable.",
    ],
    whatItInvolves: [
      "Private transfers between regions.",
      "Planned stops for viewpoints, villages and meals.",
      "Flexibility to adjust the day as you go.",
    ],
    whoEnjoys: ["Photographers", "Travellers who like to see the country between the cities"],
    considerations: [
      "Mountain roads are slow and winding.",
      "Weather can close passes in winter.",
    ],
    destinations: ["atlas-mountains", "sahara", "atlantic-coast"],
    seo: {
      title: "Scenic Road Journeys in Morocco",
      description: "Private road journeys across mountain passes, gorges and desert: how to plan scenic travel through Morocco.",
    },
  },
];
