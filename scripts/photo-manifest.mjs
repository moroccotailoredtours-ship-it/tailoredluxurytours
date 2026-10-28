// Single source of truth for every published photo.
// Line format:  [*]id|place|alt text        (id = number in source/photo-index.json; "*" = hero-grade, exported at 2560px JPEG)
// - alt text is written for people first: what is visible + where, unique, <=125 chars, no "image of".
// - the SEO file name is derived from the alt text by scripts/build-photos.mjs.
// - where the exact landmark is uncertain the alt describes only what is visible (never guess a place name).
// Excluded on purpose: near-duplicates, selfies/group snaps, crowded phone shots, film-set images, dark/blank frames.

export const places = {
  marrakech: { name: "Marrakech", dest: "marrakech", blurb: "The red city: souks, courtyards, gardens and Jemaa el-Fnaa, with the Atlas on the horizon." },
  fez: { name: "Fez", dest: "fez", blurb: "Medina lanes, tanneries, madrasas and zellige: Morocco's medieval capital in pictures." },
  sahara: { name: "The Sahara", dest: "sahara", blurb: "Dunes, camel caravans and desert light across Morocco's Sahara." },
  atlas: { name: "Atlas Mountains & Southern Morocco", dest: "atlas-mountains", blurb: "Kasbahs, palm oases, gorges and mountain valleys on the roads south." },
  essaouira: { name: "Essaouira & the Atlantic Coast", dest: "atlantic-coast", blurb: "Ramparts, blue fishing boats and ocean light on Morocco's Atlantic edge." },
  casablanca: { name: "Casablanca", dest: "casablanca", blurb: "The Hassan II Mosque and the Atlantic gateway to Morocco." },
  chefchaouen: { name: "Chefchaouen", dest: "chefchaouen", blurb: "The blue-washed lanes and hillside views of the Rif Mountains." },
  rabat: { name: "Rabat", dest: null, blurb: "The capital's Hassan Tower, mausoleum and the Kasbah of the Udayas." },
  meknes: { name: "Meknes & Volubilis", dest: "fez", blurb: "Imperial gates, granaries and the Roman ruins of Volubilis." },
  tangier: { name: "Tangier & the North", dest: null, blurb: "Cap Spartel, the Caves of Hercules and Tangier's old fortifications." },
  agadir: { name: "Agadir", dest: null, blurb: "Morocco's southern Atlantic resort city and its sweeping bay." },
  ifrane: { name: "Ifrane & the Middle Atlas", dest: null, blurb: "Cedar country, Barbary macaques and winter snow in the Middle Atlas." },
};

export const entries = `
*0|marrakech|Tiled courtyard of the Bahia Palace in Marrakech with palms and a green-tiled roof
*13|marrakech|Brass and glass lanterns glowing in a Marrakech souk
*23|marrakech|Long terracotta ramparts of Marrakech with a lone walker
*47|marrakech|The Koutoubia minaret rising above Marrakech with the snow-capped Atlas behind
40|marrakech|Ginger cat asleep in a terracotta pot in a Moroccan courtyard
85|marrakech|Colourful rugs and ceramics displayed in a Moroccan souk
384|marrakech|Horse-drawn carriages on the avenue beside the Koutoubia minaret in Marrakech
385|marrakech|Koutoubia minaret seen down a tree-lined road in Marrakech
387|marrakech|Wide open Jemaa el-Fnaa square in Marrakech by day
458|marrakech|Jemaa el-Fnaa food stalls glowing at dusk in Marrakech
459|marrakech|Aerial view of Jemaa el-Fnaa square and its market stalls in Marrakech
460|marrakech|Koutoubia Mosque minaret against a deep blue sky in Marrakech
461|marrakech|Koutoubia minaret framed by palm trees and a pale archway in Marrakech
462|marrakech|Hanging brass lamps in a Marrakech souk shop
463|marrakech|Courtyard pool reflecting carved arches in a Moroccan palace at dusk
464|marrakech|Koutoubia minaret and Marrakech rooftops under the snowy High Atlas
465|marrakech|Garden courtyard with a tiled fountain and orange trees in Marrakech
466|marrakech|Riad swimming pool with a tiled daybed in Marrakech
467|marrakech|Spice and herb shop with hanging bundles in a Marrakech souk
468|marrakech|Madrasa courtyard with a central water basin in Marrakech
469|marrakech|Jemaa el-Fnaa crowds in motion beneath a pink and purple Marrakech sunset
470|marrakech|Souk alley lined with fabrics and lanterns in Marrakech
471|marrakech|Lantern shop lit up at night in a Marrakech souk
472|marrakech|White arched courtyard with a fountain at the Bahia Palace in Marrakech
473|marrakech|Busy Marrakech souk street with shops and a passing motorbike
474|marrakech|Black and white columned courtyard around a blue pool in Marrakech
475|marrakech|Yellow and blue plant pots on a polished garden terrace in Marrakech
477|marrakech|Terracotta rooftops and ochre walls of Marrakech seen from above
478|marrakech|Koutoubia minaret between tall palm trees in Marrakech
479|marrakech|Stone archway in the souk hung with colourful textiles in Marrakech
480|marrakech|Covered souk passage with shops and lamplight in Marrakech
481|marrakech|Marrakech city walls with palms and green foliage
482|marrakech|Marrakech skyline with the Koutoubia and the Atlas mountains beyond
483|marrakech|Jemaa el-Fnaa square at blue hour with blurred crowds in Marrakech
484|marrakech|Palm gardens in Marrakech with the Koutoubia in the distance
485|marrakech|Koutoubia minaret, a palm tree and the red city wall in Marrakech
486|marrakech|Ornate horseshoe gateway in the red walls of Marrakech
487|marrakech|Carved stone gateway of Marrakech's old city walls
488|marrakech|Orange sunset over Jemaa el-Fnaa market with the Koutoubia in Marrakech
489|marrakech|Water basins and gardens of the El Badi Palace in Marrakech
490|marrakech|Horse-drawn carriage by the ramparts at sunset in Marrakech
491|marrakech|Koutoubia minaret and palms glowing at sunset in Marrakech
492|marrakech|Menara pavilion reflected in its basin at sunset near Marrakech
*493|marrakech|Cobalt-blue villa and cacti in the Majorelle Garden in Marrakech
494|marrakech|Koutoubia minaret rising behind a garden wall in Marrakech
495|marrakech|Flower beds in front of the Koutoubia minaret in Marrakech
496|marrakech|Night lights and food stalls of Jemaa el-Fnaa in Marrakech
*1|fez|Aerial view of the leather tanneries and dye pits of Fez
*75|fez|Colourful dye and lime pits of the Fez tanneries seen from above
*268|fez|Green-tiled rooftops of the Fez medina under a bright sky
*413|fez|Sunlit madrasa courtyard in Fez with a black and white tiled floor
*259|fez|Zellige-tiled hall with a carved horseshoe arch in Fez
*276|fez|Bab Bou Jeloud, the blue gate of the Fez medina
*278|fez|Baskets of spices and rugs inside a Fez medina shop
3|fez|Narrow sunlit lane beside tannery vats in the Fez medina
4|fez|Tannery dye pits and rooftops of the Fez medina from a high terrace
11|fez|Stone-walled leather tannery with rows of dye vats in Fez
31|fez|Close view of brown and ochre tannery vats in Fez
33|fez|Tannery vats surrounded by medina buildings in Fez
186|fez|Ornate blue-tiled gateway in Fez
187|fez|Fez skyline with a minaret rising above the medina
188|fez|Fez medina lit by evening lights
189|fez|Carved wooden and plaster courtyard galleries in a Fez madrasa
190|fez|Fez rooftops and crumbling ramparts from a hilltop
191|fez|Red and brown dye vats in a Fez tannery
192|fez|Golden doors of the Royal Palace of Fez on a wide plaza
193|fez|Tiled courtyard beside heavy carved cedar doors in Fez
194|fez|Wide panorama over the Fez medina rooftops to the hills
195|fez|Cafe tables and lanterns by the city walls at night in Fez
196|fez|Colourful zellige mosaic in an intricate star pattern
197|fez|Horseshoe-arched gateway in the old walls of Fez
198|fez|Bou Inania-style madrasa courtyard with a fountain in Fez
199|fez|Moroccan mint tea tray with a silver teapot and glasses
200|fez|Fez medina rooftops at dusk
201|fez|Minaret above the packed rooftops of the Fez medina
202|fez|Royal Palace gate in Fez with green and gold tilework
203|fez|Zellige tiles and carved calligraphy on a Fez wall
204|fez|Pair of golden arched doors with blue zellige surrounds in Fez
205|fez|Fez rooftops and hillside tombs from a viewpoint
206|fez|Terracotta rooftops and minarets of Fez
207|fez|Fez tanneries seen from a rooftop terrace
208|fez|Bab Bou Jeloud gate framing a view through its blue arch in Fez
209|fez|Carved cedar and plaster interior of a historic building in Fez
210|fez|Carved plaster and zellige arches in Fez
211|fez|Dense rooftops with satellite dishes in the Fez medina
212|fez|Ruined archway at sunset above Fez
213|fez|Rows of tannery vats and yellow dye in Fez
214|fez|Souk alley with carpets, brassware and shoppers in Fez
215|fez|Band of carved plaster above a blue and white zellige mosaic in Fez
216|fez|White lime and brown dye pits at a Fez tannery
217|fez|Sand-coloured fortress walls with arched doorways in Fez
218|fez|Crenellated old city wall under a blue evening sky in Fez
219|fez|Fez rooftops under a cloudy blue sky
220|fez|Golden-lit rooftops of the old city of Fez
221|fez|Fez spreading across its valley seen from the hills
222|fez|Walker beneath ruined stone arches at sunset in Fez
223|fez|Carved plaster windows set into a cedar wall in Fez
224|fez|Arches and carved plaster on a madrasa wall in Fez
225|fez|Royal Palace gates of Fez with green and gold tiles
226|fez|Hillside panorama over the modern city of Fez
227|fez|Minarets and green roofs of the Fez medina
228|fez|Tall bronze-gold door with Moorish arch at the Royal Palace in Fez
230|fez|Madrasa courtyard with a tiled fountain in Fez
231|fez|Fez tannery vats seen from a leather shop terrace
232|fez|Green-roofed gate of the Royal Palace in Fez
233|fez|Fez medina and a minaret under a hazy sky
235|fez|Fez rooftops beneath a dramatic cloudy sky
236|fez|Chouara tannery dye pits and surrounding buildings in Fez
237|fez|Close view of turquoise and red tannery pits in Fez
238|fez|Fez medina at dusk with lights coming on
239|fez|Colourful tannery pits seen from a terrace in Fez
249|fez|Rooftop view over the city of Fez
262|fez|Antique shop interior filled with carved furniture in Fez
264|fez|Shelves of brassware and decorative boxes in a Fez shop
269|fez|Courtyard and green-tiled roofs seen from a Fez rooftop
270|fez|Blue-tiled gateway and plaza in Fez
271|fez|Rug and textile shop corridor in the Fez medina
274|fez|Stacks of woven rugs and cushions in a Fez shop
279|fez|Zellige-lined entrance hall with carved doors in Fez
280|fez|Riad courtyard with a fountain and garden plants in Fez
297|fez|Tannery vats and yellow medina buildings in Fez
304|fez|Fez tannery vats from above
308|fez|Golden palace gate and wide plaza in Fez
311|fez|Fez rooftops and hills at dusk
394|fez|Madrasa courtyard with carved plaster arches in Fez
399|fez|Courtyard of a Fez madrasa under a blue sky
402|fez|Carved cedar panel beside a zellige mosaic in Fez
414|fez|Shafts of sunlight in a tiled madrasa courtyard in Fez
415|fez|Open sky above the carved courtyard of a Fez madrasa
417|fez|Black Arabic calligraphy carved in plaster above blue tiles in Fez
421|fez|Carved Kufic calligraphy panel on a Fez wall
430|fez|Fez tannery vats and walls from a terrace
432|fez|Royal Palace gate in Fez with red flags on its battlements
436|fez|Royal Palace entrance in Fez beneath a blue sky
438|fez|Olive trees and the Fez medina in the valley below
442|fez|Zellige-clad arcade with carved wooden eaves in Fez
443|fez|Carved ceiling and arch in a Fez madrasa
444|fez|Red rug and folded textiles in a Fez shop
447|fez|Colourful carpets and cushions stacked in a Fez shop
457|fez|Fez rooftops in golden evening light
*8|sahara|A camel caravan crossing Sahara dunes in soft morning haze
*6|sahara|Smooth orange dunes of the Moroccan Sahara
*10|sahara|Camel caravan trekking along a Sahara dune ridge
*62|sahara|A lone acacia tree on golden desert sand beneath a dramatic sky
*56|sahara|Desert camp tents and Moroccan rugs at dusk in the Sahara
*24|sahara|Two travellers watching the sunset from a Sahara dune
*52|sahara|Close portrait of a camel with a blue halter in the Sahara
2|sahara|Lone figure walking across a sunlit Sahara dune
16|sahara|Sunlit dune with tyre tracks in the Moroccan Sahara
20|sahara|Hand letting golden Sahara sand run through the fingers
26|sahara|Walker climbing a Sahara dune ridge at golden hour
29|sahara|Camel resting on the sand with its saddle in the Sahara
59|sahara|Soft pink dunes rolling away in the Sahara
63|sahara|Camels and their long shadows on a Sahara dune
65|sahara|Camel caravan in silhouette against a night sky in the Sahara
66|sahara|Walker on a dune crest in the Moroccan desert
71|sahara|Camel riders crossing a Sahara dune in golden light
74|sahara|Camel riders resting beside palm trees at a desert oasis
76|sahara|Four-wheel drive vehicle driving across dunes at sunset
77|sahara|Small camel caravan crossing a wide dune field
78|sahara|Camel caravan climbing a pale Sahara dune
318|sahara|Long shadows of a camel caravan on orange sand at sunset
321|sahara|Camel caravan crossing Sahara dunes at dusk
344|sahara|Camel train winding across a distant Sahara dune
346|sahara|Sunset glowing on the horizon over the Sahara
348|sahara|Walker leading a camel caravan on a Sahara dune at sunset
349|sahara|Camel caravan silhouetted on a Sahara dune ridge
350|sahara|Dune and palm oasis in the Moroccan desert
512|sahara|View from under a desert tent out across the Sahara
514|sahara|Footprints climbing a sharp dune crest in the Sahara
515|sahara|Sun breaking over rolling Sahara dunes
516|sahara|Glow of a desert camp beneath dark dunes at night
517|sahara|Golden Sahara dunes under a clear blue sky
518|sahara|Camel riders in silhouette on a dune beneath a blue sky
519|sahara|Pale sweeping dune curve in the Sahara
520|sahara|Sculpted orange dunes in the Moroccan Sahara
521|sahara|Road lined with date palms through a Saharan oasis
522|sahara|Sunset over rippling Sahara dunes
523|sahara|Camels in silhouette beneath the Milky Way in the Sahara
524|sahara|Storm clouds breaking over the Sahara at sunset
525|sahara|Lone oasis house and palm tree in a sea of dunes
526|sahara|Camel kneeling on pale sand in the Sahara
527|sahara|Dune ridges at dusk in the Sahara
528|sahara|Caravan of camels on the Sahara horizon at twilight
529|sahara|Straight desert road with dunes and a village near Merzouga
530|sahara|Sunset sky over a village and red dune near Merzouga
531|sahara|Camel saddle and footprints in Sahara sand
532|sahara|Dune ridge under a purple twilight sky in the Sahara
533|sahara|Wind-rippled sand ridges in the Sahara
534|sahara|Smooth orange dune curve in the Sahara
535|sahara|Rider on a camel climbing a dune beneath a pink sky
536|sahara|Camels casting long shadows on a Sahara dune
537|sahara|Camel caravan in silhouette against a fiery sunset in the Sahara
538|sahara|Wind-carved dune ripples beneath a blue sky in the Sahara
539|sahara|Camel caravan at sunset on a Sahara dune
540|sahara|Rider in a blue robe leading a camel caravan across the dunes
541|sahara|Two camels in silhouette against a low sun in the Sahara
542|sahara|Hazy caravan and a standing guide on a Sahara dune
543|sahara|Camel riders silhouetted on yellow Sahara dunes
544|sahara|Two camel riders in the golden Sahara
545|sahara|Camel caravan moving through a wide dune field
546|sahara|Line of camels crossing a golden Sahara dune
548|sahara|Traveller in a red turban looking over Sahara dunes
549|sahara|Two camels and a guide standing on open desert sand
550|sahara|Camel caravan crossing a wide desert plain in the Sahara
551|sahara|Two people with a flowing scarf on a Sahara dune
552|sahara|Dune beneath a bright cloudy sky in the Sahara
553|sahara|Traditional nomad tent on a stony desert plain
554|sahara|Camel caravan descending a Sahara dune
556|sahara|Camels and long shadows with a guide on a Sahara dune
557|sahara|Camel caravan crossing a pale Sahara dune
558|sahara|Camel caravan far across a pale desert dune
559|sahara|Golden sand dunes meeting a hazy sky in the Sahara
560|sahara|Tiny camel caravan crossing an endless dune sea
561|sahara|Sun rising over Sahara dunes
562|sahara|Camel shadows stretching across a Sahara dune
563|sahara|Sunset over desert plains with green scrub in Morocco
564|sahara|Camel riders in turbans crossing a yellow dune
565|sahara|Fiery orange sky over Sahara dunes
566|sahara|Camel caravan crossing a golden Sahara dune
*46|atlas|Rugged High Atlas peaks above a green valley
*35|atlas|A 4x4 on a mountain track in the Atlas
*36|atlas|A river canyon winding through southern Morocco
*49|atlas|Ait Benhaddou kasbah glowing pink at dusk
*73|atlas|Earthen kasbah houses above a southern Moroccan river valley
*64|atlas|A kasbah rising from a palm oasis in southern Morocco
*44|atlas|A palm-filled valley in the Anti-Atlas mountains
5|atlas|Distant kasbah town on a hill above a green oasis valley
7|atlas|Hot-air balloon floating over a mountain valley in Morocco
9|atlas|Snow-streaked mountain peaks in the Atlas
19|atlas|Winding mountain road through red Atlas rock
37|atlas|Earth-built village among palm groves in southern Morocco
41|atlas|Rolling brown hills of southern Morocco
42|atlas|Village and olive groves in a dry Moroccan valley
51|atlas|Walled village in a sunlit valley of southern Morocco
55|atlas|River winding through a green canyon in southern Morocco
58|atlas|Colourful scarves lining a roadside viewpoint over a southern Moroccan valley
72|atlas|Footbridge and palm groves beside an earthen kasbah in southern Morocco
86|atlas|Golden mud-brick kasbah of Ait Benhaddou above a palm valley
87|atlas|Ait Benhaddou ksar rising from a hill beneath a blue sky
88|atlas|Ait Benhaddou and its palm valley from a hilltop
89|atlas|Ruined mud-brick walls above the Ounila valley in southern Morocco
90|atlas|Terracotta towers of Ait Benhaddou beside palm trees
91|atlas|Ait Benhaddou kasbah beyond a palm-lined riverbank
92|atlas|Ait Benhaddou reflected in a shallow red river
93|atlas|Golden light on the mud-brick ksar of Ait Benhaddou
94|atlas|Red mud-brick towers among palms at Ait Benhaddou
95|atlas|Hilltop kasbah behind palms and a dry river bed in southern Morocco
96|atlas|Turquoise rock pool in a Moroccan mountain river
97|atlas|Waterfall cascading through green forest in Morocco
98|atlas|Mountain stream with pink oleander flowers and turquoise pools
99|atlas|Clear stream tumbling over rocks beneath green trees
100|atlas|Small cascades over mossy rocks in a Moroccan river
101|atlas|Green terraced mountain valley under a rainy sky in northern Morocco
102|atlas|Waterfall and flowers in a mountain garden in Morocco
103|atlas|Turquoise waterfall plunging into a rocky pool in Morocco
601|atlas|Switchback road climbing through red rock in the Dades Gorge
602|atlas|Narrow sunlit gorge with palms at the base in southern Morocco
603|atlas|Kasbah village and palm groves along a gorge road in southern Morocco
604|atlas|Mud-brick village in the Dades Valley beneath red cliffs
605|atlas|Palm oasis and stream beneath southern Moroccan cliffs
606|atlas|Road winding along the base of Dades Gorge cliffs
607|atlas|Carpets hanging from a rock overhang beside a gorge road
608|atlas|Light trails on a hairpin mountain road at night in southern Morocco
609|atlas|Eroded rock fingers above the Dades Valley
610|atlas|Colourful rugs for sale beneath red cliffs in southern Morocco
611|atlas|Palm oasis and kasbah in the Todra Valley
612|atlas|Towering red walls of the Todra Gorge
613|atlas|Aerial view of a winding blue road through a Moroccan gorge
614|atlas|Palm valley beneath rocky cliffs in southern Morocco
615|atlas|Tall cliffs and a river road in the Todra Gorge
616|atlas|Palm grove stretching toward bare hills in southern Morocco
617|atlas|Woman in white resting among rocks and shrubs in southern Morocco
618|atlas|Straight desert road with two red watchtowers in southern Morocco
619|atlas|Village and green fields below arid hills in southern Morocco
620|atlas|Road passing between sheer walls of a narrow gorge
621|atlas|Green oasis plain stretching below the Atlas foothills
622|atlas|Curving road through a gorge with palms in southern Morocco
623|atlas|Aerial view of a hairpin road through red cliffs in southern Morocco
624|atlas|Red rock switchbacks of the Dades Gorge road
625|atlas|Earth-built village among hills and green fields in southern Morocco
627|atlas|Stream and mountain wall in a southern Moroccan gorge
628|atlas|Scarves for sale along a roadside above a southern Moroccan valley
629|atlas|Colourful scarves and walkers at the entrance to Todra Gorge
630|atlas|Red river valley and kasbah in southern Morocco
632|atlas|Red canyon and green river valley in southern Morocco
*57|essaouira|Atlantic rocks and the white town of Essaouira
*54|essaouira|Weathered port gate at Essaouira
*43|essaouira|A turquoise Atlantic cove on Morocco's coast
*34|essaouira|Blue fishing boats below a white coastal village
14|tangier|Lighthouse tower and palm trees above the sea in northern Morocco
32|essaouira|Stone gateway and fortress walls at Essaouira
39|essaouira|Atlantic waves breaking on a rocky Moroccan shore
167|essaouira|Essaouira ramparts and old town from above
168|essaouira|Seagulls and a fisherman on the beach at Essaouira
169|essaouira|Blue fishing boats in Essaouira harbour at sunset
170|essaouira|Red fishing nets and blue boats at sunset in Essaouira
171|essaouira|View of the white town of Essaouira through a round stone porthole
172|essaouira|Essaouira rooftops and the old fortress beneath a bright sky
173|essaouira|Sea gull on the Skala bastion above fishing boats in Essaouira
174|essaouira|Blue wooden boat beside the Skala tower in Essaouira
175|essaouira|Crowded Essaouira fishing harbour with a gull overhead
176|essaouira|Blue boats and a white house by the sea in Essaouira
177|essaouira|Essaouira ramparts above turquoise Atlantic water
178|essaouira|Fishing boats and fortress arches in Essaouira harbour
179|essaouira|Colourful carpets, ceramics and fabrics at a stall in Essaouira
180|essaouira|Woven rugs hanging at a stall in Essaouira
181|essaouira|Essaouira harbour and old town from above
182|essaouira|Pink and orange sunset over Essaouira harbour
183|essaouira|Blue boats and the whitewashed medina of Essaouira
184|essaouira|Goats standing in an argan tree near Essaouira
185|essaouira|Washing hanging on the sand-coloured ramparts of Essaouira
364|essaouira|Atlantic coast at sunset beside Essaouira
378|essaouira|Sand-coloured gate and tower in the Essaouira ramparts
381|essaouira|Arched passage and shops in the Essaouira medina
382|essaouira|Whitewashed street with blue doors in Essaouira
383|essaouira|Crenellated gateway into the Essaouira medina
*17|casablanca|The Hassan II Mosque and its minaret in Casablanca
*18|casablanca|Carved arches of the Hassan II Mosque
15|casablanca|Hassan II Mosque minaret rising above the Atlantic in Casablanca
70|casablanca|Golden courtyard arches of the Hassan II Mosque in Casablanca
104|casablanca|Lamp-lit arches inside the Hassan II Mosque in Casablanca
105|casablanca|Hassan II Mosque and Atlantic waves under a blue sky
107|casablanca|Twin spires of the Sacre-Coeur Cathedral in Casablanca
108|casablanca|Carved green and cream arches on a Casablanca mosque facade
109|casablanca|Arcaded courtyard and wide plaza in Casablanca
110|casablanca|Minaret and carved ceiling seen from below at the Hassan II Mosque
111|casablanca|Carved arch and tiled fountain at the Hassan II Mosque
112|casablanca|Hassan II Mosque minaret at dusk in Casablanca
113|casablanca|Hassan II Mosque lit up against a deep blue night sky
114|casablanca|Hassan II Mosque on the ocean under a cloudy sky
115|casablanca|Arched corridor with pale carved stone in Casablanca
116|casablanca|Hassan II Mosque standing above the waves in Casablanca
117|casablanca|Hassan II Mosque and a stormy Atlantic in Casablanca
118|casablanca|Ornate carved doorway at the Hassan II Mosque
120|casablanca|Hassan II Mosque beside the sea on a bright day
121|casablanca|Tiled fountain alcove with a horseshoe arch in Casablanca
122|casablanca|Marble basin hall with slender columns in Casablanca
123|casablanca|Geometric blue and white window pattern at the Hassan II Mosque
124|casablanca|Plaster arch alcove carved with delicate patterns in Casablanca
125|casablanca|Star-patterned paving in the mosque courtyard in Casablanca
126|casablanca|Columns and a carved door at the Hassan II Mosque
127|casablanca|Hassan II Mosque and its plaza under a blue sky
129|casablanca|Lattice-carved arch details at the Hassan II Mosque
130|casablanca|Casablanca skyline at dusk with the mosque on the coast
131|casablanca|Hassan II Mosque minaret glowing at night
133|casablanca|Aerial view of roads and rooftops in Casablanca
134|casablanca|Rocky Atlantic coastline beside Casablanca
135|casablanca|Hassan II Mosque and its tall minaret beside the sea
136|casablanca|Hassan II Mosque from the shoreline in Casablanca
137|casablanca|Hassan II Mosque and the seafront promenade in Casablanca
138|casablanca|Black and white carved plaster pattern in Casablanca
139|casablanca|Arcade of horseshoe arches in Casablanca
*12|chefchaouen|A quiet street in Chefchaouen's medina
*21|chefchaouen|Chefchaouen's blue-washed houses on the hillside
*30|chefchaouen|A blue courtyard with potted plants in Chefchaouen
25|chefchaouen|Blue staircase with flower pots in Chefchaouen
45|chefchaouen|Blue-washed town of Chefchaouen climbing a green hillside
140|chefchaouen|Old stone walls and gardens in northern Morocco
141|chefchaouen|Blue and terracotta houses along a Chefchaouen street
142|chefchaouen|Blue stairway with potted plants in Chefchaouen
143|chefchaouen|Chefchaouen spread across its hillside beneath the Rif Mountains
144|chefchaouen|Blue alley with a tiled doorway in Chefchaouen
145|chefchaouen|Orange blanket hanging in a blue lane of Chefchaouen
146|chefchaouen|Blue lane curving between whitewashed walls in Chefchaouen
147|chefchaouen|Blue terrace with plants and a tea set in Chefchaouen
148|chefchaouen|Turquoise doorway overlooking green hills near Chefchaouen
149|chefchaouen|Traveller looking over the lights of Chefchaouen at dusk
151|chefchaouen|Pale blue steps climbing a lane in Chefchaouen
152|chefchaouen|Traveller with a backpack looking over blue rooftops in Chefchaouen
153|chefchaouen|Olive tree and blue houses in Chefchaouen
154|chefchaouen|Cat on blue-washed steps in Chefchaouen
155|chefchaouen|Silhouette walking through a deep blue alley in Chefchaouen
156|chefchaouen|Blue steps lined with plants in Chefchaouen
157|chefchaouen|Traveller overlooking the blue town of Chefchaouen at sunset
158|chefchaouen|Chefchaouen's blue houses covering a green hillside
159|chefchaouen|Blue lane and wall with a walker in Chefchaouen
160|chefchaouen|Cafe terrace and white houses on a Chefchaouen square
161|chefchaouen|Blue and terracotta rooftops of Chefchaouen from above
162|chefchaouen|Shaded square with trees and market stalls in Chefchaouen
163|chefchaouen|Chefchaouen town beneath a mountain with a palm tree
164|chefchaouen|Blue house with wooden windows in Chefchaouen
166|chefchaouen|Blue staircase with colourful plant pots in Chefchaouen
571|rabat|Hassan Tower and rows of stone columns in Rabat
572|rabat|Hassan Tower minaret rising above ancient columns in Rabat
573|rabat|Gilded lamp and carved facade at the Mausoleum of Mohammed V in Rabat
574|rabat|Kasbah of the Udayas above the river in Rabat
575|rabat|Ramparts and gate of the Kasbah of the Udayas in Rabat
576|rabat|Fortified gardens with palms in Rabat
577|rabat|Hassan Tower and a stone fountain in Rabat
578|rabat|White Mausoleum of Mohammed V with a green tiled roof in Rabat
579|rabat|Old iron cannon on a stone plinth in Rabat
580|rabat|Hassan Tower behind a tall palm in Rabat
581|rabat|Visitors climbing steps to the Udayas gate in Rabat
582|rabat|White houses and the kasbah above the river in Rabat
583|rabat|Mosaic-tiled fountain wall with horseshoe arches in Morocco
584|rabat|Fishing boats and white seafront buildings in Rabat
585|rabat|Mausoleum of Mohammed V beside a stone wall in Rabat
586|rabat|Chellah gateway and lawns in Rabat
587|rabat|Mounted guards in red cloaks at the Mausoleum of Mohammed V in Rabat
497|meknes|Ochre gate towers in the old walls of Meknes
498|meknes|Palm trees along the ramparts of Meknes
499|meknes|Bab Mansour gate glowing in golden light in Meknes
500|meknes|Bab Mansour gateway across an open square in Meknes
501|meknes|Gateway in Meknes lit against a purple dusk sky
502|meknes|Green zellige tilework on the Bab Mansour gate in Meknes
503|meknes|Bab Mansour and its flanking towers in Meknes
504|meknes|Vaulted arches of the old granaries in Meknes
505|meknes|Minaret and sand-coloured walls in Meknes
506|meknes|Hillside town of Moulay Idriss Zerhoun above olive groves
507|meknes|Road beside the ramparts of Meknes
508|meknes|Vaulted stone passage in Meknes
509|meknes|Crenellated ramparts against a deep blue sky in Meknes
510|meknes|Imperial wall and arched gate in Meknes
511|meknes|Bab Mansour gate at golden hour in Meknes
*281|meknes|Roman colonnade at Volubilis
*286|meknes|Geometric Roman mosaic at Volubilis
282|meknes|Roman house ruins and standing columns at Volubilis
283|meknes|Stone ruins of Roman Volubilis beneath the hills
284|meknes|Collapsed walls and arches at Volubilis
287|meknes|Roman columns and ruins under a blue sky at Volubilis
322|meknes|Row of Roman columns at sunset at Volubilis
323|meknes|Roman street and columns at Volubilis in evening light
326|meknes|Roman ruins and columns at Volubilis
328|meknes|Stork nest on top of a Roman column at Volubilis
332|meknes|Tall Roman column and ruins at Volubilis
633|meknes|Roman basilica and green hills at Volubilis
634|meknes|Roman stone ruins in the sunshine at Volubilis
635|meknes|Tall arches of the Roman basilica at Volubilis
636|meknes|Roman arcade and column bases at Volubilis
637|meknes|Triumphal arch standing on the plain at Volubilis
638|meknes|Roman columns and ruins at Volubilis beneath a blue sky
639|meknes|Distant Roman arch under a pale sky at Volubilis
640|meknes|Row of Roman columns at Volubilis
641|meknes|Roman ruins with green hills and cypress trees at Volubilis
642|meknes|Roman ruins and arches beneath a bright sky at Volubilis
643|meknes|Basilica arches and stone steps at Volubilis
644|meknes|Weathered Roman arcade at Volubilis
645|meknes|Paved Roman road lined with columns at Volubilis
646|meknes|Roman mosaic of a hunter and birds at Volubilis
647|meknes|Roman basilica arches in warm light at Volubilis
648|meknes|Triumphal arch of Caracalla at Volubilis
649|meknes|Roman ruins and standing columns at Volubilis
650|meknes|Arch of Caracalla framing the sky at Volubilis
651|meknes|Ruined Roman arch and columns at Volubilis
652|meknes|Roman archway on a green lawn at Volubilis
653|meknes|Roman ruins and a ruined arch at Volubilis
588|tangier|Tangier port and old fortress walls
589|tangier|Palms and old fortress rooftops in Tangier
590|tangier|Sea seen through a rock opening at the Caves of Hercules
592|tangier|Rock opening framing the Atlantic at the Caves of Hercules
593|tangier|Tangier at dusk with a lit minaret
594|tangier|Cap Spartel lighthouse on a green headland near Tangier
595|tangier|Tangier marina and harbour beside the old fortress
596|tangier|Old fortress above the harbour in Tangier
597|tangier|Stone gateway and cobbled steps in Tangier's old town
598|tangier|Cap Spartel lighthouse above the sea near Tangier
599|tangier|Tangier fortress walls at night with a palm tree
600|tangier|Fortress walls above a roundabout in Tangier
81|agadir|Agadir bay and port seen from the hilltop
82|agadir|Lit hillside kasbah overlooking Agadir at night
83|agadir|Sweeping bay of Agadir from above
84|agadir|Agadir beach and bay under morning mist
240|ifrane|Snow-dusted stone lion statue in Ifrane
241|ifrane|Barbary macaques resting in the cedar forest of the Middle Atlas
242|ifrane|Barbary macaque eating in the Middle Atlas forest
243|ifrane|Close portrait of a Barbary macaque
244|ifrane|Landscaped gardens and chalet rooftops in Ifrane
245|ifrane|Barbary macaque peeling an orange
247|ifrane|Snow-covered clearing in the Middle Atlas forest
248|ifrane|Misty tree-lined road in winter in the Middle Atlas
67|ifrane|Barbary macaque watching from the trees in the Middle Atlas
`;
