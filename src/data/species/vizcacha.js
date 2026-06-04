export default {
  slug: "vizcacha",
  name: "Vizcacha andina",
  scientific: "Lagidium viscacia",
  category: "silvestre",
  iucnStatus: "LC",
  origin: "Andes (3.000–5.000 msnm)",
  size: "30–45 cm (cuerpo) + cola de 25–35 cm",
  weight: "1.5–3.5 kg",
  diet: "Pastos, hojas y cortezas",
  habitat: "Roquedales altoandinos entre 3.000 y 5.000 msnm",
  social: "Diurna y social, vive en grupos entre rocas",
  lifespan: "7–12 años",
  accent: "#8b7355",
  isFeatured: true,
  titleHtml: "Vizcacha <span>andina</span>",
  intro:
    "Roedor endémico de los Andes adaptado a la vida entre rocas y a gran altitud. Sus orejas largas y cola esponjosa la convierten en una especie única e inconfundible.",
  learningTitle: "Roedor altoandino",
  learning:
    "La vizcacha permite estudiar adaptaciones de pequeños mamíferos a entornos rocosos y fríos, termorregulación y estrategias de supervivencia en la puna.",
  focus: [
    "Reconoce adaptaciones al hábitat rocoso altoandino.",
    "Relaciona dentición de crecimiento continuo con dieta fibrosa.",
    "Comprende el rol ecológico de los roedores en el ecosistema andino.",
  ],
  didYouKnow: [
    "La vizcacha puede saltar más de 1 metro entre rocas con sus patas traseras musculosas.",
    "Tienen dientes incisivos de crecimiento continuo como todos los roedores.",
    "Son diurnas y se asolean en las rocas para regular su temperatura corporal.",
  ],
  breeds: [],
  viewer: { scale: 2.0, camera: [0, 1.2, 5.0], rotationY: 0.2 },

  layers: [
    {
      slug: "general",
      modelUrl: "/models/cuy.glb",
      structures: [
        { title: "Orejas largas",   description: "Largas y sensibles, ideales para detectar sonidos y regular temperatura.", slot: "one" },
        { title: "Bigotes",         description: "Vibrisas táctiles que le ayudan a explorar y orientarse entre rocas.", slot: "two" },
        { title: "Incisivos",       description: "Dientes frontales de crecimiento continuo, esenciales para roer.", slot: "three" },
        { title: "Patas traseras",  description: "Fuertes y musculosas, le permiten saltar entre rocas con agilidad.", slot: "four" },
      ],
    },
    {
      slug: "partes",
      modelUrl: "/models/cuy.glb",
      structures: [
        { title: "Pelaje",          description: "Denso y suave, lo aísla del frío y del viento altoandino.", slot: "one" },
        { title: "Cola",            description: "Larga y peluda, ayuda al equilibrio en terrenos rocosos.", slot: "two" },
        { title: "Patas traseras",  description: "Fuertes y musculosas le permiten saltar entre rocas con agilidad.", slot: "three" },
        { title: "Almohadillas",    description: "Proporcionan agarre en superficies rocosas y frías.", slot: "four" },
      ],
    },
    {
      slug: "huesos",
      modelUrl: "/models/cuy.glb",
      layerTitle: "Sistema óseo de la vizcacha",
      layerIntro:
        "El esqueleto de la vizcacha está diseñado para la vida en roquedales: columna flexible y extremidades posteriores potentes para el salto.",
      layerFact:
        "Sus tibias son significativamente más largas en proporción al fémur, lo que le da mayor impulso para el salto entre rocas.",
      structures: [
        { title: "Cráneo",      description: "Compacto con mandíbula robusta para roer materia vegetal.", slot: "one" },
        { title: "Columna",     description: "Flexible que permite posturas en terrenos rocosos irregulares.", slot: "two" },
        { title: "Fémur corto", description: "Hueso del muslo corto que acumula energía para el salto.", slot: "three" },
        { title: "Tibia larga", description: "Desproporcionadamente larga para maximizar el impulso al saltar.", slot: "four" },
      ],
      keyStructures: [
        { title: "Cráneo",            description: "Compacto con mandíbula robusta para roer vegetación fibrosa." },
        { title: "Columna vertebral", description: "Flexible para moverse en terrenos irregulares y rocosos." },
        { title: "Cintura pélvica",   description: "Potente; transmite la fuerza de las patas traseras al saltar." },
        { title: "Fémur",             description: "Corto pero muy musculado para acumular energía en el salto." },
        { title: "Tibia",             description: "Desproporcionadamente larga; maximiza el alcance del salto." },
        { title: "Dedos con garras",  description: "Garras curvas para aferrarse a las rocas con precisión." },
      ],
    },
    {
      slug: "organos",
      modelUrl: "/models/cuy.glb",
      layerTitle: "Función de los órganos",
      layerIntro:
        "El sistema digestivo de la vizcacha está adaptado para aprovechar vegetación de bajo valor nutricional. Como roedor, practica cecotrofia para maximizar la absorción.",
      layerFact:
        "La vizcacha practica cecotrofia: reingiere sus propias heces blandas para absorber vitaminas del complejo B producidas en el ciego.",
      structures: [
        { title: "Ciego",     description: "Clave en la fermentación de fibra vegetal en roedores herbívoros.", slot: "one" },
        { title: "Pulmones",  description: "Adaptados al intercambio gaseoso en la puna altoandina.", slot: "two" },
        { title: "Corazón",   description: "Compacto y eficiente para un animal de pequeño tamaño.", slot: "three" },
        { title: "Riñones",   description: "Conservan agua en los fríos y secos roquedales altoandinos.", slot: "four" },
      ],
      keyStructures: [
        { title: "Pulmones",           description: "Adaptados al intercambio gaseoso en la puna altoandina." },
        { title: "Corazón",            description: "Compacto y eficiente para un animal de pequeño tamaño en altura." },
        { title: "Ciego",              description: "Fermenta fibra vegetal y produce vitaminas del complejo B." },
        { title: "Intestino delgado",  description: "Absorbe nutrientes del bolo en dos pasadas (cecotrofia)." },
        { title: "Riñones",            description: "Altamente eficientes en la conservación de agua." },
        { title: "Glándulas cutáneas", description: "Regulan la temperatura corporal en el frío altoandino." },
      ],
      systems: [
        { icon: "leaf",     label: "Digestión",         text: "Cecotrofia: reingiere heces blandas para absorber vitaminas del complejo B." },
        { icon: "waves",    label: "Respiración",       text: "Pulmones adaptados para la escasa presión de oxígeno en la puna." },
        { icon: "heart",    label: "Circulación",       text: "Corazón eficiente para un pequeño mamífero de alta altitud." },
        { icon: "activity", label: "Termorregulación",  text: "Se asolean en rocas para mantener temperatura corporal óptima." },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        text: "¿Cuál de las siguientes características corresponde a la vizcacha?",
        options: [
          { text: "Orejas largas y cola espesa cubierta de pelaje", correct: true  },
          { text: "Pico largo y patas palmeadas para nadar",        correct: false },
          { text: "Cuerpo alargado y plumaje impermeable",          correct: false },
        ],
        successMsg: "Muy bien: la vizcacha es un roedor con orejas largas y cola espesa adaptada a la vida en roquedales.",
        failMsg:    "La vizcacha es un roedor andino de orejas largas, no un ave ni anfibio.",
        points: 20,
      },
      {
        text: "¿En qué tipo de hábitat vive la vizcacha andina?",
        options: [
          { text: "Roquedales altoandinos entre 3.000 y 5.000 msnm", correct: true  },
          { text: "Selva tropical húmeda",                            correct: false },
          { text: "Playas y orillas de ríos costeros",                correct: false },
        ],
        successMsg: "Correcto: la vizcacha vive en roquedales altoandinos donde se camufla y anida entre las rocas.",
        failMsg:    "La vizcacha es un roedor de altura que vive en roquedales de la puna andina.",
        points: 20,
      },
      {
        text: "¿Qué práctica digestiva especial realiza la vizcacha para maximizar la absorción de nutrientes?",
        options: [
          { text: "Cecotrofia: reingiere sus heces blandas",   correct: true  },
          { text: "Rumiación: regurgita y remastica el bolo",  correct: false },
          { text: "Fermentación ruminal en 4 compartimentos",  correct: false },
        ],
        successMsg: "Exacto: la cecotrofia le permite reabsorber vitaminas del complejo B producidas en el ciego.",
        failMsg:    "La vizcacha practica cecotrofia (como conejos y cuyes), no rumiación como los bovinos.",
        points: 20,
      },
      {
        text: "¿Por qué la tibia de la vizcacha es proporcionalmente larga?",
        options: [
          { text: "Para maximizar el impulso al saltar entre rocas", correct: true  },
          { text: "Para nadar con mayor eficiencia",                 correct: false },
          { text: "Para soportar mayor peso corporal",               correct: false },
        ],
        successMsg: "Correcto: la tibia larga le da mayor palanca para saltar con precisión entre rocas.",
        failMsg:    "La tibia larga es una adaptación para el salto en terrenos rocosos, no para la natación.",
        points: 20,
      },
      {
        text: "¿Cuál es el nombre científico de la vizcacha andina?",
        options: [
          { text: "Lagidium viscacia",  correct: true  },
          { text: "Cavia porcellus",    correct: false },
          { text: "Chinchilla laniger", correct: false },
        ],
        successMsg: "Exacto: Lagidium viscacia es el nombre científico de la vizcacha andina.",
        failMsg:    "La vizcacha andina es Lagidium viscacia, distinta del cuy (Cavia porcellus) o la chinchilla.",
        points: 20,
      },
    ],
  },
};
