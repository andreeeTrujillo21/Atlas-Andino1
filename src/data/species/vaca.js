export default {
  slug: "vaca",
  name: "Vaca andina",
  scientific: "Bos taurus",
  category: "produccion",
  iucnStatus: "LC",
  origin: "Sierra rural",
  size: "1.4–1.5 m (altura)",
  weight: "350–700 kg",
  diet: "Forrajes y pastos",
  habitat: "Praderas y comunidades ganaderas andinas",
  social: "Manejo en hatos familiares",
  lifespan: "15–20 años",
  accent: "#6f5b45",
  isFeatured: true,
  titleHtml: "Vaca <span>andina</span>",
  intro:
    "Bovino de importancia productiva para leche, carne y trabajo rural. Su anatomía conecta biología, salud animal y economía familiar.",
  learningTitle: "Producción y bienestar",
  learning:
    "Su estudio ayuda a comprender rumiación, locomoción, condición corporal y prácticas responsables de manejo animal en contexto andino.",
  focus: [
    "Distingue estructuras de soporte en animales de gran tamaño.",
    "Relaciona el rumen y la rumiación con la alimentación en forrajes.",
    "Evalúa bienestar y productividad en el contexto rural.",
  ],
  didYouKnow: [
    "La vaca tiene cuatro compartimentos estomacales: rumen, retículo, omaso y abomaso.",
    "La Holstein puede producir hasta 9.000 litros de leche al año con buena alimentación.",
    "La rumiación ocurre aproximadamente 8 horas diarias.",
  ],
  breeds: [
    { name: "Holstein",       description: "Origen holandés. Peso 600–700 kg (hembras), producción diaria 18–25 L de leche, gestación 280 días. Alta eficiencia en sistemas tecnificados." },
    { name: "Brown Swiss",    description: "Adaptada a la sierra, doble propósito: leche y carne. Tolerante a la altura." },
    { name: "Criollo andino", description: "Rústica y resistente a la altura, de tamaño más pequeño y menor requerimiento nutricional." },
  ],
  infoImg: "/info/vaca.png",
  viewer: { scale: 3.1, camera: [0, 1.35, 5.3], rotationY: 0.35 },

  layers: [
    {
      slug: "general",
      modelUrl: "/models/vaca.glb",
      structures: [
        { title: "Cabeza",    description: "Mandíbula fuerte para pastoreo y rumiación constante.", slot: "one" },
        { title: "Dorso",     description: "Soporta el peso corporal y conecta el tren anterior y posterior.", slot: "two" },
        { title: "Ubre",      description: "Órgano productivo clave para la lactancia.", slot: "three" },
        { title: "Pezuñas",   description: "Requieren cuidado preventivo para evitar lesiones.", slot: "four" },
      ],
    },
    {
      slug: "partes",
      modelUrl: "/models/vaca.glb",
      structures: [
        { title: "Orejas",  description: "Señales visibles para manejo sanitario e identificación.", slot: "one" },
        { title: "Hocico",  description: "Explora el alimento y facilita la prensión del pasto.", slot: "two" },
        { title: "Rabo",    description: "Ayuda a espantar insectos y expresa la conducta del animal.", slot: "three" },
        { title: "Patas",   description: "Soporte robusto para terreno irregular de la sierra.", slot: "four" },
      ],
    },
    {
      slug: "huesos",
      modelUrl: "/models/vaca.glb",
      layerTitle: "Sistema óseo de la vaca",
      layerIntro:
        "El esqueleto bovino sostiene una gran masa corporal y es base del estudio de bienestar, locomoción y condición corporal.",
      layerFact:
        "El esqueleto de una vaca adulta cuenta con aproximadamente 207 huesos, incluyendo los huesos del casco.",
      structures: [
        { title: "Cráneo",    description: "Base de mandíbula, ojos y cavidad nasal.", slot: "one" },
        { title: "Columna",   description: "Sostiene la gran masa corporal del animal.", slot: "two" },
        { title: "Costillar", description: "Protege los órganos torácicos.", slot: "three" },
        { title: "Pelvis",    description: "Importante para locomoción y reproducción.", slot: "four" },
      ],
      keyStructures: [
        { title: "Cráneo",            description: "Base de la mandíbula, aloja ojos y cavidad nasal." },
        { title: "Columna vertebral", description: "Sostiene la gran masa corporal y protege la médula espinal." },
        { title: "Costillar",         description: "13 pares de costillas que protegen los órganos torácicos." },
        { title: "Pelvis",            description: "Estructura clave para locomoción, reproducción y parto." },
        { title: "Húmero",            description: "Hueso del miembro anterior, une el hombro con el codo." },
        { title: "Radio-cúbito",      description: "Huesos fusionados del antebrazo que dan soporte al peso." },
        { title: "Fémur",             description: "Hueso más largo del cuerpo, soporta el peso trasero." },
        { title: "Tibia",             description: "Hueso de la pierna posterior, junto con el fémur da estabilidad." },
      ],
    },
    {
      slug: "organos",
      modelUrl: "/models/vaca.glb",
      layerTitle: "Función de los órganos",
      layerIntro:
        "La vaca es rumiante. Su sistema digestivo de cuatro compartimentos le permite fermentar y aprovechar forrajes de baja calidad nutricional.",
      layerFact:
        "El rumen puede contener hasta 150 litros de contenido en una vaca adulta.",
      structures: [
        { title: "Rumen",    description: "Fermenta forrajes mediante microorganismos simbióticos.", slot: "one" },
        { title: "Retículo", description: "Selecciona partículas y apoya la rumiación.", slot: "two" },
        { title: "Corazón",  description: "Mantiene la circulación en un cuerpo de gran tamaño.", slot: "three" },
        { title: "Pulmones", description: "Oxigenan la sangre durante actividad y reposo.", slot: "four" },
      ],
      keyStructures: [
        { title: "Rumen",             description: "Primer compartimento; fermenta forrajes con ayuda de microorganismos." },
        { title: "Retículo",          description: "Segundo compartimento; selecciona partículas y regresa el bolo al rumen." },
        { title: "Omaso",             description: "Tercer compartimento; absorbe agua y reduce el tamaño del bolo." },
        { title: "Abomaso",           description: "Cuarto compartimento; estómago verdadero que digiere con enzimas." },
        { title: "Intestino delgado", description: "Absorbe la mayoría de los nutrientes del alimento digerido." },
        { title: "Hígado",            description: "Procesa nutrientes absorbidos y desintoxica el organismo." },
        { title: "Riñones",           description: "Filtran la sangre y regulan los líquidos corporales." },
        { title: "Corazón",           description: "Gran corazón que mantiene la circulación en un cuerpo masivo." },
        { title: "Pulmones",          description: "Amplia superficie de intercambio gaseoso para un animal de gran tamaño." },
      ],
      systems: [
        { icon: "leaf",     label: "Digestión",   text: "El rumen fermenta forrajes con ayuda de microorganismos simbióticos." },
        { icon: "waves",    label: "Respiración", text: "Pulmones de gran volumen para oxigenar un cuerpo de 400+ kg." },
        { icon: "heart",    label: "Circulación", text: "El corazón bombea sangre a cada tejido del cuerpo bovino." },
        { icon: "activity", label: "Excreción",   text: "Riñones y tracto urinario regulan el balance hídrico y eliminan desechos." },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        text: "¿Qué órgano permite a la vaca fermentar forrajes antes de digerirlos?",
        options: [
          { text: "Rumen",            correct: true  },
          { text: "Vejiga natatoria", correct: false },
          { text: "Buche",            correct: false },
        ],
        successMsg: "Exacto: el rumen fermenta forrajes con ayuda de microorganismos simbióticos.",
        failMsg:    "Vuelve a revisar el sistema digestivo bovino: la clave es el rumen.",
        points: 20,
      },
      {
        text: "¿Cuántos compartimentos estomacales tiene la vaca?",
        options: [
          { text: "Cuatro (rumen, retículo, omaso, abomaso)", correct: true  },
          { text: "Uno, igual que los humanos",               correct: false },
          { text: "Dos: rumen y abomaso",                     correct: false },
        ],
        successMsg: "Correcto: rumen, retículo, omaso y abomaso forman el sistema digestivo bovino.",
        failMsg:    "Los bovinos son rumiantes con cuatro compartimentos estomacales.",
        points: 20,
      },
      {
        text: "¿Para qué sirve el proceso de rumiación en la vaca?",
        options: [
          { text: "Re-masticar el alimento para mejor digestión", correct: true  },
          { text: "Almacenar agua en el rumen",                   correct: false },
          { text: "Expulsar gases tóxicos",                       correct: false },
        ],
        successMsg: "Muy bien: la rumiación permite re-masticar el bolo alimenticio para una mejor fermentación.",
        failMsg:    "La rumiación es el proceso de regurgitar y volver a masticar el alimento.",
        points: 20,
      },
      {
        text: "¿Cuál es el nombre científico de la vaca doméstica?",
        options: [
          { text: "Bos taurus",      correct: true  },
          { text: "Vicugna vicugna", correct: false },
          { text: "Cavia porcellus", correct: false },
        ],
        successMsg: "Correcto: Bos taurus es la especie bovina doméstica.",
        failMsg:    "Los bovinos pertenecen al género Bos, distinto de los camélidos o roedores.",
        points: 20,
      },
      {
        text: "¿Cuántos litros de leche puede producir diariamente una vaca Holstein bien manejada?",
        options: [
          { text: "18–25 litros",  correct: true  },
          { text: "5–8 litros",    correct: false },
          { text: "50–60 litros",  correct: false },
        ],
        successMsg: "Exacto: la Holstein produce entre 18 y 25 litros diarios con buena alimentación y manejo.",
        failMsg:    "La Holstein es la raza lechera más productiva: produce entre 18 y 25 litros por día.",
        points: 20,
      },
    ],
  },
};
