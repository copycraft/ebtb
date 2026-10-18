/**
 * Recipes. Kept as typed data for now; the shape maps 1:1 onto a CMS later (WordPress posts,
 * Strapi, MDX) — swap the body of `getRecipes` and nothing else changes.
 *
 * MINTATARTALOM: these are starter drafts written for layout. Cook, photograph and edit them before launch.
 */

export const recipeCategories = ["Reggeli", "Saláta", "Snack", "Köret", "Főétel", "Pékáru"] as const;
export type RecipeCategory = (typeof recipeCategories)[number];

export interface Recipe {
  slug: string;
  title: string;
  category: RecipeCategory;
  tags: string[];
  /** Total time in minutes. */
  minutes: number;
  serves: number;
  /** One or two sentences under the title. */
  intro: string;
  ingredients: string[];
  steps: string[];
  /** Product slug the recipe is built around. */
  product: string;
  /** Placeholder caption for the hero photo still to be taken. */
  shot: string;
  /** ISO date, used for sorting and schema.org. */
  published: string;
}

const recipes: Recipe[] = [
  {
    slug: "everything-rantotta",
    title: "Everything rántotta",
    category: "Reggeli",
    tags: ["vegetáriánus", "10 perc alatt"],
    minutes: 10,
    serves: 2,
    intro: "Lassan, vajon sütött, krémes rántotta. A szórás a legvégén jön, hogy a szezám ropogós maradjon.",
    ingredients: ["4 tojás", "1 ek vaj", "2 ek tejföl", "1 csapott tk Everything Blend", "metélőhagyma"],
    steps: [
      "Verd fel a tojásokat a tejföllel. Sózni nem kell, a keverékben van só.",
      "Olvaszd meg a vajat alacsony lángon, öntsd bele a tojást, és fakanállal folyamatosan húzogasd.",
      "Amikor még kicsit folyós, húzd le a tűzről — a serpenyő melege befejezi.",
      "Tálald, szórd meg bőven Everything Blenddel és metélőhagymával.",
    ],
    product: "everything-blend",
    shot: "Rántotta tányéron, felülről, a szórással",
    published: "2026-09-02",
  },
  {
    slug: "avokados-piritos",
    title: "Avokádós pirítós, ahogy kell",
    category: "Reggeli",
    tags: ["vegán", "10 perc alatt"],
    minutes: 8,
    serves: 1,
    intro: "A klasszikus, amiért az egész kategória létezik. Citrom, olívaolaj, egy marék szórás.",
    ingredients: ["1 szelet kovászos kenyér", "½ érett avokádó", "pár csepp citromlé", "1 tk olívaolaj", "1 tk Everything Blend"],
    steps: [
      "Pirítsd meg a kenyeret ropogósra.",
      "Villával törd össze az avokádót a citromlével, és kend a kenyérre.",
      "Csorgasd meg olívaolajjal, és szórd meg a keverékkel.",
    ],
    product: "everything-blend",
    shot: "Avokádós pirítós deszkán, közelről",
    published: "2026-09-05",
  },
  {
    slug: "turo-retekkel",
    title: "Túrókrém retekkel",
    category: "Snack",
    tags: ["vegetáriánus", "főzés nélkül"],
    minutes: 10,
    serves: 4,
    intro: "Körözött helyett, vagy mellett. Friss kenyérrel, zöldséggel, bármikor.",
    ingredients: ["250 g túró", "100 g tejföl", "1 csokor retek", "1 kis csokor újhagyma", "2 tk Extra Fokhagyma"],
    steps: [
      "Keverd simára a túrót a tejföllel.",
      "Vágd vékonyra a retket és az újhagymát, és forgasd bele a felét.",
      "Tálald, a tetejét szórd meg a maradék zöldséggel és az Extra Fokhagymával.",
    ],
    product: "extra-fokhagyma",
    shot: "Túrókrém tálban, retekkarikákkal",
    published: "2026-09-09",
  },
  {
    slug: "uborkasalata-everything",
    title: "Uborkasaláta, másképp",
    category: "Saláta",
    tags: ["vegán", "főzés nélkül"],
    minutes: 15,
    serves: 4,
    intro: "Nem a nagymama ecetes uborkája — de ő is kérne belőle. Ropogós, savanykás, szezámos.",
    ingredients: ["2 kígyóuborka", "2 ek rizsecet", "1 ek szezámolaj", "1 tk méz vagy juharszirup", "2 tk Everything Blend"],
    steps: [
      "Törd meg az uborkát egy sodrófával, majd szedd falatnyi darabokra.",
      "Keverd össze az ecetet, az olajat és a mézet.",
      "Forgasd össze az uborkát az öntettel, és tálalás előtt szórd meg a keverékkel.",
    ],
    product: "everything-blend",
    shot: "Uborkasaláta tálban, felülről",
    published: "2026-09-14",
  },
  {
    slug: "sult-krumpli-chili",
    title: "Sült krumpli, csípősen",
    category: "Köret",
    tags: ["vegán", "sütőben"],
    minutes: 45,
    serves: 4,
    intro: "Héjában sült cikkek, a végén Chili Everythinggel. Majonézbe mártva veszélyes.",
    ingredients: ["1 kg burgonya", "3 ek olívaolaj", "2 tk Chili Everything", "majonéz a mártáshoz"],
    steps: [
      "Melegítsd elő a sütőt 220 °C-ra. Vágd cikkekre a krumplit, és forgasd össze az olajjal.",
      "Terítsd egy rétegben tepsire, és süsd 35–40 percig, félidőben forgasd meg.",
      "A sütőből kivéve azonnal szórd meg a Chili Everythinggel, és rázd össze.",
    ],
    product: "chili-everything",
    shot: "Sült krumpli tepsiben, a szórással",
    published: "2026-09-20",
  },
  {
    slug: "sult-csicseriborso",
    title: "Ropogós csicseriborsó",
    category: "Snack",
    tags: ["vegán", "sütőben"],
    minutes: 35,
    serves: 3,
    intro: "Chips helyett. Tálba, salátára, levesbe — mindegy, gyorsan elfogy.",
    ingredients: ["1 konzerv csicseriborsó", "1 ek olívaolaj", "2 tk Everything Blend"],
    steps: [
      "Csepegtesd le és alaposan szárítsd meg a csicseriborsót egy konyharuhával.",
      "Forgasd össze az olajjal, és süsd 200 °C-on 25–30 percig, amíg ropogós.",
      "Még melegen szórd meg a keverékkel, és hagyd kihűlni a tepsin.",
    ],
    product: "everything-blend",
    shot: "Sült csicseriborsó tálban",
    published: "2026-09-27",
  },
  {
    slug: "sult-zoldseg-tepsi",
    title: "Sült zöldség egy tepsiben",
    category: "Köret",
    tags: ["vegán", "sütőben"],
    minutes: 40,
    serves: 4,
    intro: "Ami a hűtőben van: répa, cékla, cukkini, karfiol. Egy tepsi, egy szórás.",
    ingredients: ["kb. 1 kg vegyes zöldség", "3 ek olívaolaj", "1 citrom", "2 tk Everything Blend"],
    steps: [
      "Vágd hasonló méretű darabokra a zöldséget, és forgasd össze az olajjal.",
      "Süsd 210 °C-on 30–35 percig, amíg a széle karamellizálódik.",
      "Facsard rá a citromot, és szórd meg a keverékkel.",
    ],
    product: "everything-blend",
    shot: "Sült zöldségek tepsiben",
    published: "2026-10-03",
  },
  {
    slug: "kecskesajtos-salata",
    title: "Saláta kecskesajttal",
    category: "Saláta",
    tags: ["vegetáriánus", "főzés nélkül"],
    minutes: 15,
    serves: 2,
    intro: "Zöld saláta, körte, kecskesajt, és ami összefogja: egy szórás a tetején.",
    ingredients: ["1 fej vegyes saláta", "1 körte", "100 g friss kecskesajt", "2 ek olívaolaj", "1 ek balzsamecet", "1 tk Everything Blend"],
    steps: [
      "Tépd falatnyira a salátát, és vágd vékony szeletekre a körtét.",
      "Keverd össze az olajat az ecettel, és locsold a salátára.",
      "Morzsold rá a kecskesajtot, és szórd meg a keverékkel.",
    ],
    product: "everything-blend",
    shot: "Zöld saláta körtével és kecskesajttal, közelkép",
    published: "2026-10-10",
  },
  {
    slug: "everything-pogacsa",
    title: "Pogácsa, a tetején szórással",
    category: "Pékáru",
    tags: ["vegetáriánus", "sütőben"],
    minutes: 70,
    serves: 24,
    intro: "A tepsi, ami minden családi ebédről elfogy. A sajt helyett vagy mellé a tetejére megy a szórás.",
    ingredients: ["500 g liszt", "250 g hideg vaj", "200 g tejföl", "1 tojás + 1 a kenéshez", "1 tk só", "½ cs sütőpor", "3 ek Everything Blend"],
    steps: [
      "Morzsold el a lisztet a hideg vajjal, a sóval és a sütőporral.",
      "Add hozzá a tejfölt és egy tojást, gyúrd össze gyorsan, és pihentesd a hűtőben 30 percig.",
      "Nyújtsd 2 cm vastagra, rácsozd be a tetejét, és szaggasd ki.",
      "Kend le felvert tojással, szórd meg bőven a keverékkel, és süsd 200 °C-on 18–20 percig.",
    ],
    product: "everything-blend",
    shot: "Pogácsák tepsiben, a tetejükön a szórással",
    published: "2026-10-17",
  },
  {
    slug: "langos-tejfollel",
    title: "Lángos, de nem a szokásos",
    category: "Pékáru",
    tags: ["vegetáriánus", "olajban sütve"],
    minutes: 90,
    serves: 6,
    intro: "Tejföl, reszelt sajt — és fokhagymás víz helyett Extra Fokhagyma. A strand ízét hazahozza, egy csavarral.",
    ingredients: ["500 g liszt", "1 kis krumpli, főzve és áttörve", "20 g friss élesztő", "300 ml langyos tej", "1 tk só", "olaj a sütéshez", "tejföl, reszelt sajt", "Extra Fokhagyma"],
    steps: [
      "Futtasd fel az élesztőt a langyos tejben, majd dagaszd össze a liszttel, a krumplival és a sóval.",
      "Keleszd duplájára, nagyjából egy óra alatt.",
      "Olajos kézzel húzz ki tenyérnyi lapokat, és süsd forró olajban mindkét oldalán aranybarnára.",
      "Kend meg tejföllel, szórd meg sajttal és egy jó adag Extra Fokhagymával.",
    ],
    product: "extra-fokhagyma",
    shot: "Lángos tejföllel, sajttal, közelről",
    published: "2026-10-15",
  },
  {
    slug: "sutotokkremleves",
    title: "Sütőtökkrémleves ropogós tetővel",
    category: "Főétel",
    tags: ["vegán", "egy fazékban"],
    minutes: 50,
    serves: 4,
    intro: "Bársonyos, édeskés leves. A ropogást a tetejére szórt keverék adja, mint krutonnál, csak gyorsabban.",
    ingredients: ["1 kg sütőtök", "1 fej vöröshagyma", "2 ek olívaolaj", "800 ml zöldségalaplé", "100 ml kókusztej", "Chili Everything a tálaláshoz"],
    steps: [
      "Vágd kockára a tököt és a hagymát, és párold meg az olajon.",
      "Öntsd fel az alaplével, és főzd puhára, kb. 25 percig.",
      "Turmixold simára a kókusztejjel.",
      "Tányérba szedve csorgass rá egy kis olajat, és szórd meg Chili Everythinggel.",
    ],
    product: "chili-everything",
    shot: "Sütőtökkrémleves tányérban, felülről",
    published: "2026-10-13",
  },
  {
    slug: "sult-lazac",
    title: "Sült lazac kéreggel",
    category: "Főétel",
    tags: ["halas", "sütőben"],
    minutes: 20,
    serves: 2,
    intro: "Egy kanál mustár, egy réteg szórás, tizenkét perc. Hétköznapi vacsora, ami ünnepinek néz ki.",
    ingredients: ["2 szelet lazacfilé", "1 ek dijoni mustár", "2 tk Everything Blend", "1 citrom", "olívaolaj"],
    steps: [
      "Melegítsd elő a sütőt 200 °C-ra, és tedd a lazacot sütőpapíros tepsire.",
      "Kend meg a tetejét vékonyan mustárral, és nyomkodd rá a keveréket.",
      "Csorgasd meg olajjal, és süsd 12–14 percig.",
      "Citromgerezdekkel tálald.",
    ],
    product: "everything-blend",
    shot: "Sült lazac kéreggel, citrommal, tányéron",
    published: "2026-10-11",
  },
  {
    slug: "sult-karfiol",
    title: "Egészben sült karfiol",
    category: "Köret",
    tags: ["vegán", "sütőben"],
    minutes: 60,
    serves: 4,
    intro: "Egy egész fej, aranybarnára sütve, középre téve. Mindenki szed belőle, senki nem hagyja ott.",
    ingredients: ["1 fej karfiol", "3 ek olívaolaj", "1 citrom leve", "2 tk Chili Everything", "joghurt a tálaláshoz"],
    steps: [
      "Melegítsd elő a sütőt 210 °C-ra. Vágd le a karfiol leveleit, és állítsd egy kis tepsibe.",
      "Kend be olajjal és citromlével, és süsd 45–50 percig, amíg kés könnyen belecsúszik.",
      "Szórd meg a keverékkel, és joghurttal tálald.",
    ],
    product: "chili-everything",
    shot: "Egészben sült karfiol, joghurttal",
    published: "2026-10-08",
  },
  {
    slug: "paradicsomsalata-mozzarellaval",
    title: "Paradicsomsaláta mozzarellával",
    category: "Saláta",
    tags: ["vegetáriánus", "főzés nélkül"],
    minutes: 10,
    serves: 2,
    intro: "Érett paradicsom, friss mozzarella, olívaolaj. A bazsalikom maradhat — a szórás viszi a showt.",
    ingredients: ["3 érett paradicsom", "1 golyó mozzarella", "2 ek olívaolaj", "pár levél bazsalikom", "1 tk Everything Blend"],
    steps: [
      "Szeleteld a paradicsomot és a mozzarellát, és rakd tányérra felváltva.",
      "Locsold meg olívaolajjal, tépj rá bazsalikomot.",
      "Közvetlenül tálalás előtt szórd meg a keverékkel.",
    ],
    product: "everything-blend",
    shot: "Paradicsom és mozzarella tányéron, felülről",
    published: "2026-09-30",
  },
  {
    slug: "pattogatott-kukorica",
    title: "Pattogatott kukorica filmesthez",
    category: "Snack",
    tags: ["vegán", "10 perc alatt"],
    minutes: 10,
    serves: 3,
    intro: "Vajas, sós, és ezúttal nem kell a mozi. A keverék a vajjal együtt tapad rá a kukoricára.",
    ingredients: ["100 g pattogatni való kukorica", "2 ek olaj", "2 ek olvasztott vaj (vagy vegán vaj)", "2 tk Everything Blend"],
    steps: [
      "Hevítsd fel az olajat egy fedős lábasban, és szórd bele a kukoricát.",
      "Fedd le, és rázogasd, amíg a pattogás lelassul.",
      "Tálba öntve forgasd össze az olvasztott vajjal, majd a keverékkel.",
    ],
    product: "everything-blend",
    shot: "Pattogatott kukorica tálban, kanapén",
    published: "2026-09-24",
  },
  {
    slug: "joghurtos-martogatos",
    title: "Joghurtos mártogatós",
    category: "Snack",
    tags: ["vegetáriánus", "főzés nélkül"],
    minutes: 5,
    serves: 4,
    intro: "Öt perc, egy tál, egy kanál. Zöldséghez, sült krumplihoz, grillhez — és a hűtőben is eláll két napig.",
    ingredients: ["400 g görög joghurt", "1 kis uborka, reszelve és kinyomkodva", "1 ek olívaolaj", "pár csepp citromlé", "2 tk Extra Fokhagyma"],
    steps: [
      "Keverd össze a joghurtot az uborkával, az olajjal és a citromlével.",
      "Keverd bele a keverék felét, és hagyd állni 10 percig.",
      "Tálaláskor szórd a tetejére a maradékot.",
    ],
    product: "extra-fokhagyma",
    shot: "Joghurtos mártogatós tálban, zöldséghasábokkal",
    published: "2026-09-17",
  },
];

export function getRecipes() {
  return [...recipes].sort((a, b) => b.published.localeCompare(a.published));
}

export function getRecipe(slug: string) {
  return recipes.find((r) => r.slug === slug);
}

export const RECIPES_PER_PAGE = 6;
