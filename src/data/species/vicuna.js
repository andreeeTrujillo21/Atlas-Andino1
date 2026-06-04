export default {
  slug: "vicuna",
  name: "Vicuña",
  scientific: "Vicugna vicugna",
  category: "silvestre",
  iucnStatus: "LC",
  origin: "Altiplano",
  size: "75–85 cm (a la cruz)",
  weight: "35–40 kg",
  diet: "Hierbas, pastos y plantas altoandinas",
  habitat: "Puna y bofedales (3.500–5.000 msnm)",
  social: "Grupos familiares vigilantes",
  lifespan: "12–20 años",
  accent: "#b7864c",
  isFeatured: true,
  titleHtml: "<span>Vicuña</span> altoandina",
  intro:
    "Camélido silvestre de fibra fina, veloz y elegante. Vive en zonas frías de gran altitud y es símbolo de conservación del Perú.",
  learningTitle: "Adaptación a la altura",
  learning:
    "Permite estudiar termorregulación, locomoción ligera y supervivencia en ambientes de baja temperatura y escaso oxígeno.",
  focus: [
    "Identifica rasgos de camélidos silvestres.",
    "Analiza su relación con la puna y los bofedales.",
    "Comprende por qué su fibra requiere manejo sostenible.",
  ],
  didYouKnow: [
    "La fibra de vicuña es una de las más finas del mundo: menos de 12 micras de diámetro.",
    "Su hemoglobina tiene mayor afinidad por el oxígeno, adaptación clave para la gran altitud.",
    "El chaku es la práctica ancestral inca de captura y esquila colectiva de vicuñas.",
  ],
  breeds: [],
  infoImg: "/info/vicuna.png",
  viewer: { scale: 2.15, camera: [0, 1.45, 5.7], rotationY: -0.1 },

  layers: [
    {
      slug: "general",
      modelUrl: "/models/vicuna.glb",
      structures: [
        { title: "Orejas",    description: "Largas y móviles para captar sonidos a distancia.", slot: "one" },
        { title: "Fibra",     description: "Fina y térmica, protege del frío altoandino.", slot: "two" },
        { title: "Cuello",    description: "Flexible para vigilancia y alimentación.", slot: "three" },
        { title: "Pezuñas",   description: "Aptas para suelos duros y rocosos de la puna.", slot: "four" },
      ],
    },
    {
      slug: "partes",
      modelUrl: "/models/vicuna.glb",
      structures: [
        { title: "Ojos",          description: "Campo visual amplio para detectar depredadores.", slot: "one" },
        { title: "Lomo",          description: "Línea dorsal ligera que favorece la carrera.", slot: "two" },
        { title: "Pecho",         description: "Capacidad respiratoria adaptada a la baja presión de oxígeno.", slot: "three" },
        { title: "Extremidades",  description: "Delgadas y resistentes para desplazarse con rapidez.", slot: "four" },
      ],
    },
    {
      slug: "huesos",
      modelUrl: "/models/vicuna.glb",
      layerTitle: "Sistema óseo de la vicuña",
      layerIntro:
        "El esqueleto de la vicuña es ligero pero robusto, diseñado para la velocidad y resistencia en el altiplano.",
      layerFact:
        "La vicuña puede alcanzar 45 km/h gracias a su esqueleto ligero y sus largas extremidades.",
      structures: [
        { title: "Cráneo",          description: "Estructura liviana con mandíbula para pastoreo.", slot: "one" },
        { title: "Vértebras",       description: "Sostienen el cuello largo y permiten postura alerta.", slot: "two" },
        { title: "Cintura pélvica", description: "Transfiere fuerza durante la carrera.", slot: "three" },
        { title: "Metacarpos",      description: "Segmentos largos que reducen el peso distal.", slot: "four" },
      ],
      keyStructures: [
        { title: "Cráneo",            description: "Estructura liviana con mandíbula adaptada para pastoreo de gramíneas." },
        { title: "Columna vertebral", description: "Sostiene el cuello largo y permite postura alerta y flexible." },
        { title: "Costillas",         description: "Caja torácica amplia para mayor capacidad pulmonar en la altura." },
        { title: "Pelvis",            description: "Conecta la columna con las extremidades y transfiere fuerza en la carrera." },
        { title: "Húmero",            description: "Hueso del miembro anterior, delgado y ligero para mayor velocidad." },
        { title: "Radio-cúbito",      description: "Huesos fusionados del antebrazo que dan rigidez al miembro anterior." },
        { title: "Fémur",             description: "Poderoso hueso del muslo que impulsa la carrera." },
        { title: "Tibia",             description: "Hueso principal de la pierna posterior, largo y resistente." },
      ],
    },
    {
      slug: "organos",
      modelUrl: "/models/vicuna.glb",
      layerTitle: "Función de los órganos",
      layerIntro:
        "Los órganos de la vicuña están especializados para funcionar en la puna, donde el oxígeno es escaso y las temperaturas extremas.",
      layerFact:
        "Su hemoglobina capta oxígeno con mayor eficiencia que la de mamíferos de tierras bajas.",
      structures: [
        { title: "Pulmones", description: "Favorecen el intercambio gaseoso en gran altitud.", slot: "one" },
        { title: "Corazón",  description: "Sostiene la circulación durante desplazamientos rápidos.", slot: "two" },
        { title: "Estómago", description: "Procesa pastos de baja calidad nutricional.", slot: "three" },
        { title: "Bazo",     description: "Reserva eritrocitos especializados de alta afinidad por el oxígeno.", slot: "four" },
      ],
      keyStructures: [
        { title: "Pulmones",                 description: "Ampliados para favorecer el intercambio gaseoso en la puna." },
        { title: "Corazón",                  description: "Latido potente que sostiene la circulación en desplazamientos exigentes." },
        { title: "Estómago compartimentado", description: "Procesa pastos altoandinos de baja calidad mediante fermentación microbiana." },
        { title: "Bazo",                     description: "Reserva de eritrocitos con alta afinidad por el oxígeno." },
        { title: "Riñones",                  description: "Regulan el balance hídrico en ambientes secos y de alta altitud." },
        { title: "Hígado",                   description: "Metaboliza los nutrientes absorbidos de los pastos fibrosos." },
      ],
      systems: [
        { icon: "leaf",     label: "Digestión",   text: "Fermenta pastos altoandinos de bajo valor nutricional." },
        { icon: "waves",    label: "Respiración", text: "Pulmones adaptados a la escasez de oxígeno en la puna." },
        { icon: "heart",    label: "Circulación", text: "Hemoglobina especializada transporta oxígeno con eficiencia." },
        { icon: "activity", label: "Excreción",   text: "Riñones regulan líquidos en ambientes secos y fríos." },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        text: "¿Qué rasgo ayuda a la vicuña a vivir en el altiplano frío?",
        options: [
          { text: "Fibra fina y térmica",   correct: true  },
          { text: "Piel acuático-marina",   correct: false },
          { text: "Garras arborícolas",     correct: false },
        ],
        successMsg: "Muy bien: su fibra fina conserva el calor en la puna.",
        failMsg:    "Piensa en el abrigo natural que protege del frío altoandino.",
        points: 20,
      },
      {
        text: "¿Cuál es el nombre científico de la vicuña?",
        options: [
          { text: "Vicugna vicugna", correct: true  },
          { text: "Cavia porcellus", correct: false },
          { text: "Bos taurus",      correct: false },
        ],
        successMsg: "Correcto: Vicugna vicugna es el nombre científico de este camélido silvestre.",
        failMsg:    "La vicuña pertenece al género Vicugna, distinto de los cuyes o bovinos.",
        points: 20,
      },
      {
        text: "¿Cuál es la característica especial de la hemoglobina de la vicuña?",
        options: [
          { text: "Mayor afinidad por el oxígeno", correct: true  },
          { text: "Menor cantidad de hierro",      correct: false },
          { text: "Produce más calor corporal",    correct: false },
        ],
        successMsg: "Exacto: su hemoglobina capta oxígeno con mayor eficiencia, adaptación clave para la puna.",
        failMsg:    "Piensa en cómo un mamífero puede sobrevivir donde hay menos oxígeno.",
        points: 20,
      },
      {
        text: "¿En qué hábitat vive principalmente la vicuña?",
        options: [
          { text: "Puna y bofedales altoandinos", correct: true  },
          { text: "Selva amazónica",               correct: false },
          { text: "Desierto costero",              correct: false },
        ],
        successMsg: "Correcto: la vicuña habita la puna y los bofedales entre 3.500 y 5.000 msnm.",
        failMsg:    "La vicuña está adaptada a las zonas altas y frías de los Andes.",
        points: 20,
      },
      {
        text: "¿Qué práctica ancestral consiste en capturar y esquilar vicuñas de forma sostenible?",
        options: [
          { text: "Chaku", correct: true  },
          { text: "Minka", correct: false },
          { text: "Ayni",  correct: false },
        ],
        successMsg: "Muy bien: el chaku es la práctica andina de rodeo y esquila sostenible de vicuñas.",
        failMsg:    "El chaku es la técnica ancestral inca de captura colectiva de vicuñas.",
        points: 20,
      },
    ],
  },
};
