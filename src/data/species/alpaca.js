export default {
  slug: "alpaca",
  name: "Alpaca andina",
  scientific: "Vicugna pacos",
  category: "domestico",
  iucnStatus: "LC",
  origin: "Andes (3.500–5.000 msnm)",
  size: "0.9–1.1 m (altura a la cruz)",
  weight: "55–75 kg",
  diet: "Pastos altoandinos y forrajes",
  habitat: "Puna, bofedales y comunidades altoandinas",
  social: "Manejo en rebaños familiares",
  lifespan: "15–20 años",
  accent: "#c8a97a",
  isFeatured: true,
  titleHtml: "Alpaca <span>andina</span>",
  intro:
    "Camélido domesticado símbolo de los Andes. Su fibra fina es uno de los recursos textiles más valiosos del mundo y sustento de miles de familias.",
  learningTitle: "Fibra y adaptación",
  learning:
    "La alpaca permite estudiar termorregulación, digestión de pastos fibrosos y la importancia económica y cultural de los camélidos andinos domesticados.",
  focus: [
    "Distingue alpaca huacaya de suri por su fibra.",
    "Relaciona su anatomía digestiva con la alimentación en altura.",
    "Comprende el valor cultural y económico de su fibra.",
  ],
  didYouKnow: [
    "Existen dos razas de alpaca: huacaya (fibra rizada y esponjosa) y suri (fibra lacia en mechones).",
    "La fibra de alpaca puede tener entre 18 y 30 micras de diámetro según la raza y edad.",
    "El Perú concentra el 80 % de la población mundial de alpacas.",
  ],
  breeds: [
    { name: "Huacaya", description: "Fibra densa y esponjosa con apariencia rizada. La raza más común." },
    { name: "Suri",    description: "Fibra larga, lacia y sedosa en mechones. Más escasa y valorada." },
  ],
  infoImg: "/info/alpaca.png",
  viewer: { scale: 2.2, camera: [0, 1.45, 5.7], rotationY: -0.15 },

  layers: [
    {
      slug: "general",
      modelUrl: "/models/alpaca/alpaca.glb",
      structures: [
        { title: "Orejas móviles",       description: "Excelente audición para detectar amenazas en campo abierto.", slot: "one" },
        { title: "Fibra de alpaca",       description: "Suave, térmica y resistente; protege del frío altoandino.", slot: "two" },
        { title: "Conformación robusta",  description: "Cuerpo adaptado a climas fríos y a la vida en altura.", slot: "three" },
        { title: "Pezuñas acolchadas",    description: "Mayor agarre en terrenos altoandinos rocosos e irregulares.", slot: "four" },
      ],
    },
    {
      slug: "partes",
      modelUrl: "/models/alpaca/alpaca.glb",
      structures: [
        { title: "Cabeza",        description: "Frente ancha y ojos expresivos con campo visual amplio.", slot: "one" },
        { title: "Cuello",        description: "Largo y flexible, útil para vigilancia y pastoreo.", slot: "two" },
        { title: "Lomo",          description: "Línea dorsal sólida que brinda estabilidad en terrenos andinos.", slot: "three" },
        { title: "Extremidades",  description: "Fuertes y musculosas, diseñadas para caminar en los Andes.", slot: "four" },
      ],
    },
    {
      slug: "huesos",
      modelUrl: "/models/alpaca/huesos.glb",
      layerTitle: "Sistema óseo de la alpaca",
      layerIntro:
        "El esqueleto de la alpaca sostiene su cuerpo, permite flexibilidad y movimiento en terrenos irregulares de la puna.",
      layerFact:
        "La alpaca tiene 50 vértebras en su columna vertebral, lo que le otorga flexibilidad y equilibrio en terrenos andinos.",
      structures: [
        { title: "Cráneo",            description: "Protege el cerebro y forma la base de la estructura facial.", slot: "one" },
        { title: "Columna vertebral", description: "Sostiene el cuerpo y permite flexibilidad y movimiento.", slot: "two" },
        { title: "Costillas",         description: "Protegen los órganos vitales como el corazón y los pulmones.", slot: "three" },
        { title: "Pelvis",            description: "Conecta la columna con las patas traseras y da estabilidad.", slot: "four" },
      ],
      keyStructures: [
        { title: "Cráneo",            description: "Protege el cerebro y forma la base de la estructura facial." },
        { title: "Columna vertebral", description: "50 vértebras que permiten flexibilidad y movimiento en la puna." },
        { title: "Costillas",         description: "Protegen los órganos vitales: corazón y pulmones." },
        { title: "Pelvis",            description: "Conecta la columna con las patas traseras y da estabilidad." },
        { title: "Húmero",            description: "Hueso del brazo que une el hombro con el codo." },
        { title: "Radio-cúbito",      description: "Huesos del antebrazo que dan rigidez al miembro anterior." },
        { title: "Fémur",             description: "Poderoso hueso del muslo que impulsa el movimiento." },
        { title: "Tibia",             description: "Hueso principal de la pierna posterior." },
      ],
    },
    {
      slug: "organos",
      modelUrl: "/models/alpaca/alpaca.glb",
      layerTitle: "Función de los órganos",
      layerIntro:
        "La alpaca es rumiante con tres compartimentos estomacales. Su sistema digestivo está adaptado para procesar pastos altoandinos de baja calidad nutricional.",
      layerFact:
        "A diferencia de los bovinos (4 compartimentos), los camélidos sudamericanos tienen 3 compartimentos gástricos.",
      structures: [
        { title: "Pulmones",  description: "Adaptados para el intercambio gaseoso en la puna.", slot: "one" },
        { title: "Corazón",   description: "Distribuye sangre oxigenada a todo el organismo.", slot: "two" },
        { title: "Estómago",  description: "Tres compartimentos para fermentar pastos altoandinos.", slot: "three" },
        { title: "Riñones",   description: "Regulan el balance hídrico en ambientes fríos y secos.", slot: "four" },
      ],
      keyStructures: [
        { title: "Pulmones",                  description: "Adaptados para el intercambio gaseoso en alturas de 3.500–5.000 msnm." },
        { title: "Corazón",                   description: "Bombea sangre con hemoglobina de alta afinidad por el oxígeno." },
        { title: "C1 - Primer compartimento", description: "Fermentación inicial de fibra con microorganismos simbióticos." },
        { title: "C2 - Segundo compartimento", description: "Selección de partículas y absorción de nutrientes." },
        { title: "C3 - Abomaso",              description: "Digestión enzimática del bolo alimenticio." },
        { title: "Hígado",                    description: "Metaboliza nutrientes y desintoxica el organismo." },
        { title: "Riñones",                   description: "Regulan líquidos en el ambiente seco y frío de la puna." },
      ],
      systems: [
        { icon: "leaf",     label: "Digestión",    text: "Tres compartimentos fermentan pastos altoandinos de bajo valor nutricional." },
        { icon: "waves",    label: "Respiración",  text: "Pulmones adaptados a la baja presión de oxígeno en la puna." },
        { icon: "heart",    label: "Circulación",  text: "Hemoglobina especializada para máxima eficiencia en la altura." },
        { icon: "activity", label: "Excreción",    text: "Riñones conservan agua en el ambiente seco altoandino." },
      ],
    },
    {
      slug: "craneo",
      modelUrl: "/models/alpaca/craneo.glb",
      layerTitle: "Cráneo de la alpaca",
      layerIntro:
        "El cráneo de la alpaca es alargado y liviano, con orbitas oculares amplias y una cavidad nasal desarrollada para respirar en ambientes de baja presión de oxígeno.",
      layerFact:
        "La alpaca no tiene incisivos superiores; en su lugar tiene una almohadilla dental dura que le permite cortar los pastos con eficiencia.",
      structures: [
        { title: "Órbita ocular",   description: "Grande y lateral para campo visual amplio, detecta depredadores.", slot: "one" },
        { title: "Cavidad nasal",   description: "Amplia para maximizar la captación de oxígeno en la altura.", slot: "two" },
        { title: "Mandíbula",       description: "Robusta con movimiento lateral para moler pastos fibrosos.", slot: "three" },
        { title: "Arco cigomático", description: "Prominente, ancla los músculos maseteros para la masticación.", slot: "four" },
      ],
      keyStructures: [
        { title: "Hueso frontal",     description: "Forma la parte superior del cráneo y protege el encéfalo." },
        { title: "Órbita ocular",     description: "Gran cavidad lateral que aloja el globo ocular con amplio campo visual." },
        { title: "Cavidad nasal",     description: "Estructura ósea que guía el flujo de aire hacia los pulmones." },
        { title: "Arco cigomático",   description: "Ancla los músculos maseteros para la masticación de pastos duros." },
        { title: "Mandíbula inferior", description: "Articulada con movimiento lateral para triturar fibra vegetal." },
        { title: "Almohadilla dental", description: "Reemplaza los incisivos superiores; permite cortar pasto sin dañarlo." },
        { title: "Foramen magnum",    description: "Orificio posterior por donde pasa la médula espinal." },
        { title: "Bula timpánica",    description: "Cámara ósea que amplifica los sonidos para su aguda audición." },
      ],
      systems: [],
    },
  ],

  quiz: {
    questions: [
      {
        text: "¿Cuántas razas principales de alpaca existen?",
        options: [
          { text: "Dos: huacaya y suri",           correct: true  },
          { text: "Tres: huacaya, suri y criollo", correct: false },
          { text: "Una sola raza universal",        correct: false },
        ],
        successMsg: "Correcto: huacaya (fibra rizada) y suri (fibra lacia en mechones) son las dos razas de alpaca.",
        failMsg:    "La alpaca tiene exactamente dos razas reconocidas: huacaya y suri.",
        points: 20,
      },
      {
        text: "¿Cuántos compartimentos gástricos tiene la alpaca?",
        options: [
          { text: "Tres",   correct: true  },
          { text: "Cuatro", correct: false },
          { text: "Uno",    correct: false },
        ],
        successMsg: "Exacto: los camélidos sudamericanos tienen 3 compartimentos, a diferencia de los bovinos (4).",
        failMsg:    "Los camélidos sudamericanos tienen 3 compartimentos gástricos, no 4 como los bovinos.",
        points: 20,
      },
      {
        text: "¿Cuál es el nombre científico de la alpaca?",
        options: [
          { text: "Vicugna pacos",   correct: true  },
          { text: "Lama glama",      correct: false },
          { text: "Vicugna vicugna", correct: false },
        ],
        successMsg: "Correcto: Vicugna pacos es el nombre científico de la alpaca doméstica.",
        failMsg:    "La alpaca es Vicugna pacos. Lama glama es la llama y Vicugna vicugna es la vicuña silvestre.",
        points: 20,
      },
      {
        text: "¿Qué país concentra el mayor porcentaje de la población mundial de alpacas?",
        options: [
          { text: "Perú",      correct: true  },
          { text: "Bolivia",   correct: false },
          { text: "Argentina", correct: false },
        ],
        successMsg: "Muy bien: Perú concentra aproximadamente el 80 % de la población mundial de alpacas.",
        failMsg:    "Perú es el país con mayor población de alpacas a nivel mundial, con cerca del 80 %.",
        points: 20,
      },
      {
        text: "¿Qué característica distingue a la raza suri de la huacaya?",
        options: [
          { text: "Fibra lacia y sedosa en mechones",  correct: true  },
          { text: "Mayor tamaño corporal",              correct: false },
          { text: "Color de pelaje siempre blanco",    correct: false },
        ],
        successMsg: "Exacto: la suri tiene fibra lacia y sedosa que cae en mechones, la huacaya tiene fibra rizada.",
        failMsg:    "La diferencia clave es la fibra: la suri es lacia en mechones, la huacaya es rizada y esponjosa.",
        points: 20,
      },
    ],
  },
};
