export default {
  slug: "llama",
  name: "Llama",
  scientific: "Lama glama",
  category: "domestico",
  iucnStatus: "LC",
  origin: "Andes (sur del Perú y Bolivia)",
  size: "1.7–1.9 m (altura total)",
  weight: "130–200 kg",
  diet: "Pastos, arbustos y forrajes",
  habitat: "Puna, valles andinos y comunidades rurales",
  social: "Rebaños con estructura jerárquica",
  lifespan: "15–25 años",
  accent: "#9c8866",
  isFeatured: false,
  titleHtml: "<span>Llama</span> andina",
  intro:
    "El camélido de carga más importante de los Andes. Compañera de trabajo, fuente de fibra y alimento, y símbolo de la civilización andina desde tiempos inmemoriales.",
  learningTitle: "Animal de trabajo andino",
  learning:
    "La llama permite estudiar locomoción en terrenos irregulares, adaptación fisiológica a la altura y el papel central de los camélidos en la economía andina.",
  focus: [
    "Identifica rasgos anatómicos adaptados al trabajo de carga.",
    "Comprende su rol histórico en el transporte andino.",
    "Distingue la llama de la alpaca por tamaño y función.",
  ],
  didYouKnow: [
    "Las llamas pueden cargar hasta el 25–30 % de su peso corporal sin daño.",
    "Son resistentes a la altura y pueden vivir entre 3.000 y 5.000 msnm.",
    "El estiércol de llama fue el principal combustible en las comunidades altoandinas.",
  ],
  breeds: [
    { name: "Ccara",  description: "Cuello descubierto, más grande y utilizada principalmente para carga." },
    { name: "Lanuda", description: "Con fibra más densa en el cuello, apta para producción de fibra y carga." },
  ],
  viewer: { scale: 2.3, camera: [0, 1.55, 6.0], rotationY: -0.2 },

  layers: [
    {
      slug: "general",
      modelUrl: "/models/vicuna.glb",
      structures: [
        { title: "Cuello largo",    description: "Permite vigilancia y alcanzar vegetación a distintas alturas.", slot: "one" },
        { title: "Orejas erectas",  description: "Captan sonidos y expresan el estado emocional del animal.", slot: "two" },
        { title: "Cuerpo robusto",  description: "Masa muscular sólida apta para el transporte de cargas.", slot: "three" },
        { title: "Pezuñas blandas", description: "Almohadillas que protegen el terreno andino al pisarlo.", slot: "four" },
      ],
    },
    {
      slug: "partes",
      modelUrl: "/models/vicuna.glb",
      structures: [
        { title: "Cabeza",        description: "Orejas largas y móviles que detectan peligros a distancia.", slot: "one" },
        { title: "Labios",        description: "Muy móviles y sensibles para seleccionar la vegetación.", slot: "two" },
        { title: "Espalda",       description: "Zona de apoyo para cargas distribuidas correctamente.", slot: "three" },
        { title: "Extremidades",  description: "Robustas y con buena base para transitar terrenos difíciles.", slot: "four" },
      ],
    },
    {
      slug: "huesos",
      modelUrl: "/models/vicuna.glb",
      layerTitle: "Sistema óseo de la llama",
      layerIntro:
        "El esqueleto de la llama combina robustez para el trabajo de carga con la ligereza necesaria para moverse en terrenos andinos irregulares.",
      layerFact:
        "La llama tiene vértebras lumbares especialmente reforzadas para soportar la carga sin lesiones en la columna.",
      structures: [
        { title: "Cráneo",          description: "Voluminoso y con mandíbula fuerte para una dieta variada.", slot: "one" },
        { title: "Columna lumbar",  description: "Reforzada para soportar cargas pesadas sin daño.", slot: "two" },
        { title: "Costillar",       description: "Amplio para albergar pulmones grandes adaptados a la altitud.", slot: "three" },
        { title: "Extremidades",    description: "Osamente densa que soporta el peso corporal más la carga.", slot: "four" },
      ],
      keyStructures: [
        { title: "Cráneo",            description: "Voluminoso con mandíbula fuerte para una dieta variada." },
        { title: "Columna vertebral", description: "Vértebras lumbares reforzadas para soportar cargas." },
        { title: "Costillar",         description: "Amplio para pulmones grandes adaptados a la altitud." },
        { title: "Pelvis",            description: "Base sólida para el trabajo de carga y locomoción." },
        { title: "Fémur",             description: "Hueso del muslo robusto que soporta el peso de la carga." },
        { title: "Tibia",             description: "Junto con el fémur da estabilidad en pendientes." },
        { title: "Metacarpos",        description: "Segmentos distales que amortiguan el impacto en terrenos rocosos." },
      ],
    },
    {
      slug: "organos",
      modelUrl: "/models/vicuna.glb",
      layerTitle: "Función de los órganos",
      layerIntro:
        "Como todos los camélidos sudamericanos, la llama tiene tres compartimentos gástricos. Su fisiología le permite trabajar en altura con alta eficiencia.",
      layerFact:
        "Los eritrocitos de la llama son elípticos (no circulares como en la mayoría de mamíferos), lo que mejora su flujo en la sangre espesa de la altitud.",
      structures: [
        { title: "Pulmones",  description: "Gran capacidad pulmonar para la altura.", slot: "one" },
        { title: "Corazón",   description: "Potente para sostener el esfuerzo físico con carga.", slot: "two" },
        { title: "Estómago",  description: "Tres compartimentos adaptados a forrajes fibrosos.", slot: "three" },
        { title: "Músculos",  description: "Alta proporción de fibras lentas para resistencia.", slot: "four" },
      ],
      keyStructures: [
        { title: "Pulmones",                  description: "Gran capacidad pulmonar para trabajar en la puna." },
        { title: "Corazón",                   description: "Potente para sostener el esfuerzo físico con carga." },
        { title: "C1 - Primer compartimento", description: "Fermentación inicial de fibra con microorganismos." },
        { title: "C3 - Abomaso",              description: "Digestión enzimática final del alimento." },
        { title: "Hígado",                    description: "Procesa los nutrientes absorbidos durante la digestión." },
        { title: "Riñones",                   description: "Eficientes en la conservación de agua en la puna." },
        { title: "Eritrocitos elípticos",     description: "Glóbulos rojos ovalados que mejoran el flujo sanguíneo a gran altitud." },
      ],
      systems: [
        { icon: "leaf",     label: "Digestión",   text: "Tres compartimentos gástricos procesan pastos y forrajes andinos." },
        { icon: "waves",    label: "Respiración", text: "Pulmones grandes para trabajar con carga en la altura." },
        { icon: "heart",    label: "Circulación", text: "Eritrocitos elípticos de alta afinidad por el oxígeno." },
        { icon: "activity", label: "Excreción",   text: "Riñones eficientes conservan agua en ambientes secos." },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        text: "¿Para qué actividad es conocida principalmente la llama en los Andes?",
        options: [
          { text: "Animal de carga y transporte",       correct: true  },
          { text: "Producción de fibra exclusivamente", correct: false },
          { text: "Animal de tiro para arado",          correct: false },
        ],
        successMsg: "Correcto: la llama es el principal animal de carga de los Andes, capaz de transportar hasta el 30 % de su peso.",
        failMsg:    "La llama es principalmente un animal de carga; aunque produce fibra, su rol principal es el transporte.",
        points: 20,
      },
      {
        text: "¿Cuál es el nombre científico de la llama?",
        options: [
          { text: "Lama glama",      correct: true  },
          { text: "Vicugna pacos",   correct: false },
          { text: "Vicugna vicugna", correct: false },
        ],
        successMsg: "Exacto: Lama glama es el nombre científico de la llama doméstica andina.",
        failMsg:    "La llama es Lama glama. Vicugna pacos es la alpaca y Vicugna vicugna es la vicuña.",
        points: 20,
      },
      {
        text: "¿Qué característica especial tienen los eritrocitos de la llama?",
        options: [
          { text: "Son elípticos en lugar de circulares", correct: true  },
          { text: "Son más grandes que los humanos",      correct: false },
          { text: "Tienen doble membrana celular",        correct: false },
        ],
        successMsg: "Muy bien: sus glóbulos rojos elípticos fluyen mejor en la sangre espesa de la altitud.",
        failMsg:    "Los eritrocitos de los camélidos son elípticos, lo que mejora su flujo sanguíneo a gran altitud.",
        points: 20,
      },
      {
        text: "¿Cuántos compartimentos gástricos tiene la llama?",
        options: [
          { text: "Tres",   correct: true  },
          { text: "Cuatro", correct: false },
          { text: "Dos",    correct: false },
        ],
        successMsg: "Correcto: como todos los camélidos sudamericanos, la llama tiene 3 compartimentos gástricos.",
        failMsg:    "Los camélidos sudamericanos (llama, alpaca, vicuña, guanaco) tienen 3 compartimentos gástricos.",
        points: 20,
      },
      {
        text: "¿Cuál es el porcentaje máximo de su peso que puede cargar una llama sin daño?",
        options: [
          { text: "25–30 %", correct: true  },
          { text: "50–60 %", correct: false },
          { text: "10–15 %", correct: false },
        ],
        successMsg: "Correcto: una llama sana puede cargar entre el 25 y el 30 % de su peso corporal.",
        failMsg:    "La llama puede cargar entre el 25 y el 30 % de su peso; más de eso causa daño al animal.",
        points: 20,
      },
    ],
  },
};
