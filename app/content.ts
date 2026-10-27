// Everything on the page comes from public sources: trade press, TV interviews,
// the company's roadside sign and the Tucson Lifestyle / SALC profiles.
// Every visible string is in English and Spanish; Spanish uses "usted".

export type Lang = "en" | "es";
export type Bi = { en: string; es: string };
export const b = (en: string, es: string): Bi => ({ en, es });

export const PHONE = "520·281·1234";
export const TEL = "tel:+15202811234";
export const WAREHOUSE = "520·281·9426";
export const WAREHOUSE_TEL = "tel:+15202819426";
export const EMAIL = "sales@chamberlaindistributing.com";
export const ADDRESS = ["2731 N. Donna Ave.", "Nogales, Arizona 85621"];
export const MAPS = "https://www.google.com/maps/search/?api=1&query=2731+N+Donna+Ave,+Nogales,+AZ+85621";

export const PATH: Record<Lang, string> = { en: "/", es: "/es" };

// His experiences, as the small cards under his name in the hero: what he was, for whom, and
// that organization's own website where one could be confirmed (none found for the Port Authority).
export const credentials: [Bi, Bi, string?][] = [
  [b("Past Chairman", "Expresidente"), b("Greater Nogales Santa Cruz County Port Authority", "Autoridad Portuaria de Greater Nogales y el Condado de Santa Cruz")],
  [b("Chairman of the Board, 2010–2012", "Presidente del Consejo, 2010–2012"), b("Fresh Produce Association of the Americas", "Fresh Produce Association of the Americas"), "https://www.thefpaa.com"],
  [b("Hispanic Businessman of the Year, 2025", "Empresario Hispano del Año, 2025"), b("Southern Arizona Hispanic Chamber of Commerce", "Cámara de Comercio Hispana del Sur de Arizona"), "https://www.soazhcc.org"],
  [b("Co-Chair, Ports & Infrastructure", "Copresidente, Puertos e Infraestructura"), b("Arizona-Mexico Commission", "Comisión Arizona-México"), "https://azmc.org"],
  [b("Importer of the Year, 2014", "Importador del Año, 2014"), b("The Packer", "The Packer"), "https://www.thepacker.com"],
  [b("Director", "Director"), b("Southern Arizona Leadership Council", "Southern Arizona Leadership Council"), "https://salc.org/people/jaime-chamberlain/"],
  [b("Hispanic Businessman of the Year, 2015", "Empresario Hispano del Año, 2015"), b("Tucson Hispanic Chamber of Commerce", "Cámara de Comercio Hispana de Tucson"), "https://www.soazhcc.org"],
  [b("Chairman Emeritus", "Presidente emérito"), b("St. Andrew’s Children’s Clinic", "Clínica Infantil St. Andrew’s"), "https://standrewsclinic.org"],
];

export const outlets = [
  "KGUN 9",
  "ABC15 Arizona",
  "NPR",
  "CNN",
  "BBC",
  "The Packer",
  "AZPM",
  "KJZZ",
  "Nogales International",
  "Tucson Lifestyle",
  "BizTucson",
  "FreshPlaza",
  "Veggies From Mexico",
];

export type Film = {
  id: string;
  thumb: string;
  outlet: string;
  date: Bi;
  title: Bi;
  length: string;
  start?: number;
};

// Featured first. Every one is on YouTube and plays from there (all in English).
export const films: Film[] = [
  { id: "YSQqVts-YBY", thumb: "tn-kgun-2021", outlet: "KGUN 9", date: b("May 2021", "Mayo 2021"), title: b("Multi-billion dollar Nogales distributor expands during pandemic", "Distribuidor de Nogales de miles de millones crece durante la pandemia"), length: "3:47" },
  { id: "UWAj3i7PwlA", thumb: "tn-dawn-page-2024", outlet: "Dawn Page", date: b("Dec 2024", "Dic 2024"), title: b("Produce leaders from Nogales on potential tariffs on Mexican imports", "Líderes del producto en Nogales sobre posibles aranceles a las importaciones mexicanas"), length: "4:47", start: 110 },
  { id: "Oy36Mje3TX8", thumb: "tn-abc15-2024", outlet: "ABC15 Arizona", date: b("Apr 2024", "Abr 2024"), title: b("Updating Arizona’s busiest border port a priority for business leaders", "Modernizar el puerto fronterizo más transitado de Arizona, prioridad para los empresarios"), length: "2:23" },
  { id: "TYgViyzUS-Y", thumb: "tn-arizona-chamber-2019", outlet: "Arizona Chamber", date: b("May 2019", "Mayo 2019"), title: b("Ham(m)er Time, Episode 34: Jaime Chamberlain and Lance Jungmeyer", "Ham(m)er Time, episodio 34: Jaime Chamberlain y Lance Jungmeyer"), length: "14:50" },
  { id: "xFoiK4Wp58c", thumb: "tn-nogales-chamber-2021", outlet: "Nogales-SCC Chamber", date: b("Feb 2021", "Feb 2021"), title: b("How did the pandemic affect the produce industry?", "¿Cómo afectó la pandemia a la industria del producto fresco?"), length: "6:09" },
  { id: "ApU3Ue6ifbE", thumb: "tn-kgun-st-james-2021", outlet: "KGUN 9", date: b("Jun 2021", "Jun 2021"), title: b("New produce warehouse to boost border business", "Nuevo almacén de producto impulsa el comercio fronterizo"), length: "3:18" },
  { id: "xFGhWBlEGSQ", thumb: "tn-we-love-nogales-2019", outlet: "We Love Nogales", date: b("Nov 2019", "Nov 2019"), title: b("Jaime Chamberlain on the Nogales produce industry", "Jaime Chamberlain sobre la industria del producto en Nogales"), length: "31:43" },
  { id: "1eAPET99tQY", thumb: "tn-arizona-town-hall-2022", outlet: "Arizona Town Hall", date: b("Apr 2022", "Abr 2022"), title: b("Cross-border connecting: agriculture on the border", "Conexión transfronteriza: la agricultura en la frontera"), length: "2:03:28" },
  { id: "Aew8n1UE_aM", thumb: "tn-the-packer-2014", outlet: "The Packer", date: b("Mar 2014", "Mar 2014"), title: b("Jaime Chamberlain, Packer Importer of the Year", "Jaime Chamberlain, Importador del Año de The Packer"), length: "0:49" },
];

export type Chapter = { year: string; title: Bi; body: Bi; quote?: [Bi, Bi] };

export const record: Chapter[] = [
  {
    year: "1971",
    title: b("A family business, started with $1,000", "Una empresa familiar que empezó con $1,000"),
    body: b(
      "His mother opens the company in Nogales with a thousand-dollar investment. For years it trades as J-C Distributing.",
      "Su madre abre la empresa en Nogales con una inversión de mil dólares. Durante años opera como J-C Distributing.",
    ),
  },
  {
    year: "1987",
    title: b("Jaime comes home to Nogales", "Jaime regresa a Nogales"),
    body: b(
      "After learning the trade with tomato distributors in California, he joins the family company. He owns it today with his sister, Diana Durazo.",
      "Después de aprender el oficio con distribuidores de tomate en California, se une a la empresa familiar. Hoy es dueño de ella junto con su hermana, Diana Durazo.",
    ),
    quote: [b("I never got to Notre Dame, but I sell tomatoes.", "Nunca llegué a Notre Dame, pero vendo tomates."), b("BizTucson, 2015", "BizTucson, 2015")],
  },
  {
    year: "2010",
    title: b("Chairman of the Fresh Produce Association of the Americas", "Presidente de la Fresh Produce Association of the Americas"),
    body: b(
      "He leads the board of the association that speaks for the importers of Nogales, through 2012.",
      "Encabeza hasta 2012 el consejo de la asociación que representa a los importadores de Nogales.",
    ),
  },
  {
    year: "2014",
    title: b("The Packer’s Importer of the Year", "Importador del Año de The Packer"),
    body: b(
      "The produce industry’s trade paper names him Importer of the Year. The same spring he tells NPR what Nogales wants the country to hear.",
      "El periódico de la industria del producto fresco lo nombra Importador del Año. Esa misma primavera le dice a NPR lo que Nogales quiere que escuche el país.",
    ),
    quote: [b("We are here. We are open for trade. And we welcome your dollars.", "Aquí estamos. Estamos abiertos al comercio. Y sus dólares son bienvenidos."), b("NPR, 2014", "NPR, 2014")],
  },
  {
    year: "2015",
    title: b("Hispanic Businessman of the Year", "Empresario Hispano del Año"),
    body: b(
      "The Tucson Hispanic Chamber of Commerce gives him its Businessman of the Year award for the first time.",
      "La Cámara de Comercio Hispana de Tucson le otorga por primera vez su premio al Empresario del Año.",
    ),
  },
  {
    year: "2019",
    title: b("The tomato fight", "La batalla del tomate"),
    body: b(
      "When the United States ends the tomato suspension agreement, he becomes one of the voices explaining the duties, the USMCA and what they mean for the border, on TV, on radio and on CNN.",
      "Cuando Estados Unidos termina el acuerdo de suspensión del tomate, se convierte en una de las voces que explican los aranceles, el T-MEC y lo que significan para la frontera, en televisión, en radio y en CNN.",
    ),
    quote: [b("At the moment, it’s 17.56 percent duties on the value of the product.", "En este momento son aranceles del 17.56 por ciento sobre el valor del producto."), b("AZPM, 2019", "AZPM, 2019")],
  },
  {
    year: "2020",
    title: b("He builds while everything closes", "Construye mientras todo cierra"),
    body: b(
      "When Arizona shuts down for COVID-19, he starts a new 60,000-square-foot, fully refrigerated building right off the interstate.",
      "Cuando Arizona cierra por el COVID-19, empieza a construir un nuevo edificio de 60,000 pies cuadrados, totalmente refrigerado, a un lado de la carretera interestatal.",
    ),
    quote: [b("When the desperation is at an all-time low, that’s when you go forward.", "Cuando la desesperación está en su punto más bajo, es cuando hay que avanzar."), b("KGUN 9, 2021", "KGUN 9, 2021")],
  },
  {
    year: "2021",
    title: b("Chairman of the Port Authority", "Presidente de la Autoridad Portuaria"),
    body: b(
      "He leads the Greater Nogales Santa Cruz County Port Authority, pushing for the Mariposa port of entry and the roads that feed it.",
      "Encabeza la Autoridad Portuaria de Greater Nogales y el Condado de Santa Cruz, impulsando la garita Mariposa y las carreteras que la alimentan.",
    ),
    quote: [b("We need our ports of entry to be as efficient as possible.", "Necesitamos que nuestros puertos de entrada sean lo más eficientes posible."), b("ABC15, 2024", "ABC15, 2024")],
  },
  {
    year: "2025",
    title: b("Hispanic Businessman of the Year, again", "Empresario Hispano del Año, otra vez"),
    body: b(
      "Nearly four decades in, the Southern Arizona Hispanic Chamber of Commerce honours him at the Colores del Alma Gala.",
      "Casi cuatro décadas después, la Cámara de Comercio Hispana del Sur de Arizona lo honra en la Gala Colores del Alma.",
    ),
  },
];


export const commodities: Bi[] = [
  b("Tomatoes", "Tomate"),
  b("Bell peppers", "Chile morrón"),
  b("Cucumbers", "Pepino"),
  b("Beans", "Ejote"),
  b("Soft squash", "Calabacita"),
  b("Hard squash", "Calabaza dura"),
  b("Melons", "Melón"),
  b("Table grapes", "Uva de mesa"),
  b("Mangos", "Mango"),
  b("Papayas", "Papaya"),
  b("Avocados", "Aguacate"),
];

// South to north, the way the trucks come up to Nogales.
export const regions = ["Oaxaca", "Jalisco", "Sinaloa", "Sonora"];
export const markets: Bi[] = [
  b("Seattle", "Seattle"),
  b("San Francisco", "San Francisco"),
  b("Los Angeles", "Los Ángeles"),
  b("St. Louis", "San Luis"),
  b("Chicago", "Chicago"),
  b("Boston", "Boston"),
  b("Philadelphia", "Filadelfia"),
  b("Toronto", "Toronto"),
  b("Asia", "Asia"),
];


// Interface and section copy.
export const copy = {
  en: {
    meta: {
      title: "Jaime S. Chamberlain | Chamberlain Distributing, Inc., Nogales, Arizona",
      description:
        "Jaime S. Chamberlain, president of Chamberlain Distributing, Inc., a family produce importer in Nogales, Arizona since 1971. Past chairman of the Greater Nogales Santa Cruz County Port Authority and 2025 Hispanic Businessman of the Year.",
    },
    nav: [
      ["Media", "#camera"],
      ["Biography", "#record"],
      ["Company", "#house"],
      ["Contact", "#contact"],
    ],
    office: "Office",
    backToTop: "Chamberlain Distributing, back to top",
    switchTo: "Ver en español",
    swipe: "Swipe for more",
    hero: {
      role: "President",
      company: "Chamberlain Distributing, Inc.",
      place: "Nogales, Arizona",
    },
    outletsLabel: "On the record with",
    outletsAria: "Where he has been heard",
    camera: {
      label: "On camera",
      title: "When the border makes the news,",
      titleEm: "they call Jaime.",
      lead: "Tariffs, tomato duties, port lines and empty shelves in the pandemic: for nearly four decades he has explained the Nogales produce trade to Arizona and to the country.",
      listing: "Interviews",
      more: (n: number) => `${n} on YouTube`,
      play: "Play",
      next: "Next",
      prev: "Previous",
      now: "Now showing",
    },
    record: { label: "The record", title: "Four decades at the crossing.", place: "Nogales, Arizona" },
    house: {
      label: "The house",
      title: "Behind the man,",
      titleEm: "the house his mother built.",
      lead: "Chamberlain Distributing is a family-owned importer of fresh fruit and vegetables in Nogales. Growers in Sonora, Sinaloa, Jalisco and as far south as Oaxaca send their crops north; the house cools them, inspects them and builds them into loads for foodservice, wholesale and retail chains across the United States and Canada, with hard squash and melons going on to Asia.",
      stats: [
        ["1971", "Founded in Nogales by the Chamberlain family"],
        ["60,000", "Square feet, fully refrigerated, right off the interstate"],
        ["2", "Generations: his mother founded it, he and his sister own it"],
        ["3", "Countries his loads reach: the U.S., Canada and Asia"],
      ],
      quote: "We actually make and build loads here.",
      corridor: "The corridor",
      corridorTitle: "Four growing regions in. A continent out.",
    },
    corridor: {
      aria: (r: string, m: string) => `Produce from ${r} comes through Nogales to ${m}.`,
      mx: "México",
      us: "U.S.A.",
    },
    contact: {
      label: "Contact",
      title: "Call the house.",
      lead: "Buyers, growers and the press all reach Chamberlain Distributing the same way: pick up the phone. It’s a family business, and it answers like one.",
      office: "Office",
      warehouse: "Warehouse",
      address: "Address",
      sales: "Sales",
      request: "Request product",
      now: "In Nogales now",
      requestLead: "Tell us what you need and the sales desk will come back to you.",
    },
    footer: "Family-owned in Nogales, Arizona since 1971.",
    portraitAlt: "Jaime S. Chamberlain",
  },
  es: {
    meta: {
      title: "Jaime S. Chamberlain | Chamberlain Distributing, Inc., Nogales, Arizona",
      description:
        "Jaime S. Chamberlain, presidente de Chamberlain Distributing, Inc., importadora familiar de producto fresco en Nogales, Arizona, desde 1971. Expresidente de la Autoridad Portuaria de Greater Nogales y el Condado de Santa Cruz y Empresario Hispano del Año 2025.",
    },
    nav: [
      ["Medios", "#camera"],
      ["Biografía", "#record"],
      ["Empresa", "#house"],
      ["Contacto", "#contact"],
    ],
    office: "Oficina",
    backToTop: "Chamberlain Distributing, volver al inicio",
    switchTo: "View in English",
    swipe: "Deslice para ver más",
    hero: {
      role: "Presidente",
      company: "Chamberlain Distributing, Inc.",
      place: "Nogales, Arizona",
    },
    outletsLabel: "Lo han entrevistado",
    outletsAria: "Dónde se le ha escuchado",
    camera: {
      label: "En cámara",
      title: "Cuando la frontera es noticia,",
      titleEm: "llaman a Jaime.",
      lead: "Aranceles, impuestos al tomate, filas en las garitas y anaqueles vacíos en la pandemia: durante casi cuatro décadas ha explicado el comercio de producto de Nogales a Arizona y al país.",
      listing: "Entrevistas",
      more: (n: number) => `${n} en YouTube · en inglés`,
      play: "Reproducir",
      next: "Siguiente",
      prev: "Anterior",
      now: "En pantalla",
    },
    record: { label: "Trayectoria", title: "Cuatro décadas en la frontera.", place: "Nogales, Arizona" },
    house: {
      label: "La casa",
      title: "Detrás del hombre,",
      titleEm: "la casa que fundó su madre.",
      lead: "Chamberlain Distributing es una importadora familiar de frutas y verduras frescas en Nogales. Productores de Sonora, Sinaloa, Jalisco y, hacia el sur, hasta Oaxaca mandan sus cosechas al norte; la casa las enfría, las inspecciona y arma con ellas cargas para servicio de alimentos, mayoreo y cadenas de supermercados en Estados Unidos y Canadá, y la calabaza dura y el melón siguen hasta Asia.",
      stats: [
        ["1971", "Fundada en Nogales por la familia Chamberlain"],
        ["60,000", "Pies cuadrados, totalmente refrigerados, junto a la interestatal"],
        ["2", "Generaciones: la fundó su madre, hoy es de él y de su hermana"],
        ["3", "Países a los que llegan sus cargas: EE. UU., Canadá y Asia"],
      ],
      quote: "Aquí de verdad hacemos y armamos las cargas.",
      corridor: "El corredor",
      corridorTitle: "Cuatro regiones de cultivo entran. Un continente sale.",
    },
    corridor: {
      aria: (r: string, m: string) => `El producto de ${r} pasa por Nogales hacia ${m}.`,
      mx: "México",
      us: "EE. UU.",
    },
    contact: {
      label: "Contacto",
      title: "Llame a la casa.",
      lead: "Compradores, productores y prensa llegan a Chamberlain Distributing de la misma manera: levantando el teléfono. Es una empresa familiar y contesta como tal.",
      office: "Oficina",
      warehouse: "Almacén",
      address: "Dirección",
      sales: "Ventas",
      request: "Solicitar producto",
      now: "En Nogales ahora",
      requestLead: "Díganos qué necesita y el área de ventas le responderá.",
    },
    footer: "Empresa familiar en Nogales, Arizona, desde 1971.",
    portraitAlt: "Jaime S. Chamberlain",
  },
} as const;

export type Copy = (typeof copy)[Lang];

// The "Request product" box: a floating button that opens a three-step request
// (products, the load, contact) sent through Netlify Forms to the sales desk.
export const FORM_NAME = "product-request";
export const FORM_FIELDS = ["products", "volume", "destination", "when", "notes", "name", "company", "email", "phone", "language", "page"];

export const inquiry = {
  en: {
    open: "Request product",
    openShort: "Request",
    title: "Request product",
    intro: "Tell us what you need. The sales desk answers the same business day.",
    quick: "Rather talk?",
    call: "Call the office",
    close: "Close",
    step: (n: number) => `Step ${n} of 3`,
    steps: ["Products", "The load", "Your details"],
    pick: "Choose one or more",
    other: "Something else",
    volume: "How much",
    volumes: ["A few pallets", "Full truckload", "Mixed load", "Season program"],
    destination: "Delivered to",
    destinationHint: "City and state",
    when: "When",
    whens: ["This week", "Next two weeks", "This season"],
    notes: "Notes",
    notesHint: "Pack, grade, label or anything else",
    optional: "optional",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    replyIn: "Reply in",
    english: "English",
    spanish: "Spanish",
    required: "Please add your name and a valid email.",
    back: "Back",
    next: "Continue",
    send: "Send request",
    sending: "Sending…",
    failed: "It didn’t go through. Please call the office instead.",
    doneTitle: "Request received",
    doneBody: (first: string) => `Thank you${first ? `, ${first}` : ""}. The sales desk at Chamberlain Distributing has your request and will answer you shortly.`,
    localNote: "Preview only: on this computer nothing was sent.",
    another: "Send another request",
  },
  es: {
    open: "Solicitar producto",
    openShort: "Solicitar",
    title: "Solicitar producto",
    intro: "Díganos qué necesita. El área de ventas responde el mismo día hábil.",
    quick: "¿Prefiere hablar?",
    call: "Llame a la oficina",
    close: "Cerrar",
    step: (n: number) => `Paso ${n} de 3`,
    steps: ["Productos", "La carga", "Sus datos"],
    pick: "Elija uno o varios",
    other: "Otro producto",
    volume: "Cuánto",
    volumes: ["Algunas tarimas", "Tráiler completo", "Carga mixta", "Programa de temporada"],
    destination: "Entrega en",
    destinationHint: "Ciudad y estado",
    when: "Cuándo",
    whens: ["Esta semana", "Próximas dos semanas", "Esta temporada"],
    notes: "Notas",
    notesHint: "Empaque, grado, etiqueta o lo que necesite",
    optional: "opcional",
    name: "Nombre",
    company: "Empresa",
    email: "Correo",
    phone: "Teléfono",
    replyIn: "Responder en",
    english: "Inglés",
    spanish: "Español",
    required: "Por favor escriba su nombre y un correo válido.",
    back: "Atrás",
    next: "Continuar",
    send: "Enviar solicitud",
    sending: "Enviando…",
    failed: "No se pudo enviar. Por favor llame a la oficina.",
    doneTitle: "Solicitud recibida",
    doneBody: (first: string) => `Gracias${first ? `, ${first}` : ""}. El área de ventas de Chamberlain Distributing tiene su solicitud y le responderá pronto.`,
    localNote: "Solo vista previa: en esta computadora no se envió nada.",
    another: "Enviar otra solicitud",
  },
} as const;
