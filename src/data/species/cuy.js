export default {
  slug: "cuy",
  name: "Cuy andino",
  scientific: "Cavia porcellus",
  category: "domestico",
  iucnStatus: "LC",
  origin: "Andes",
  size: "20–30 cm",
  weight: "0.7–1.2 kg",
  diet: "Herbívoro",
  habitat: "Valles altoandinos, zonas agrícolas y quebradas",
  social: "Vive en grupos familiares jerárquicos",
  lifespan: "4–6 años (en cautiverio)",
  accent: "#a45f2b",
  isFeatured: true,
  titleHtml: "Cuy <span>andino</span>",
  intro:
    "El cuy andino es un mamífero domesticado desde hace miles de años en los Andes. Fuente de alimento, tradición y conocimiento ancestral.",
  learningTitle: "Importancia en los Andes",
  learning:
    "El cuy (Cavia porcellus) es esencial en la seguridad alimentaria, la economía familiar y las prácticas culturales de comunidades andinas desde hace más de 3.000 años.",
  focus: [
    "Reconoce partes externas y su función.",
    "Relaciona dentición continua con dieta vegetal.",
    "Compara órganos digestivos con otras especies.",
  ],
  didYouKnow: [
    "Sus incisivos crecen continuamente durante toda su vida.",
    "El ciego representa más del 60 % de su tracto digestivo.",
    "Ha sido domesticado en los Andes hace más de 3.000 años.",
  ],
  breeds: [
    { name: "Perú",   description: "Raza de alto rendimiento cárnico, pelaje corto y liso." },
    { name: "Andino", description: "Adaptado a zonas frías y de gran altitud, robusto y resistente." },
  ],
  infoImg: "/info/cuy.png",
  viewer: { scale: 2.2, camera: [0, 1.35, 5.2], rotationY: -0.25 },

  layers: [
    {
      slug: "general",
      modelUrl: "/models/cuy.glb",
      structures: [
        { title: "Pelaje",       description: "Denso y suave, conserva el calor en ambientes fríos. Presenta diversos patrones de color.", slot: "one" },
        { title: "Cabeza",       description: "Posee sentidos agudos que le permiten detectar peligros y comunicarse.", slot: "two" },
        { title: "Tronco",       description: "Cuerpo compacto y robusto, adaptado para la vida en tierra y en espacios seguros.", slot: "three" },
        { title: "Extremidades", description: "Patas cortas pero fuertes, con garras que le brindan estabilidad y agilidad.", slot: "four" },
      ],
    },
    {
      slug: "partes",
      modelUrl: "/models/cuy.glb",
      structures: [
        { title: "Orejas",    description: "Perciben sonidos y ayudan a reaccionar ante amenazas del entorno.", slot: "one" },
        { title: "Bigotes",   description: "Vibrisas táctiles que orientan al animal en espacios estrechos.", slot: "two" },
        { title: "Dentición", description: "Incisivos de crecimiento continuo, ideales para roer fibra vegetal.", slot: "three" },
        { title: "Patas",     description: "Fuertes y ágiles para cambios rápidos de dirección.", slot: "four" },
      ],
    },
    {
      slug: "huesos",
      modelUrl: "/models/cuy/huesos.glb",
      layerTitle: "Sistema óseo del cuy",
      layerIntro:
        "El esqueleto del cuy sostiene su cuerpo, permite el movimiento y protege los órganos vitales.",
      layerFact:
        "El cuy tiene alrededor de 258 huesos. Su columna vertebral flexible le permite moverse con rapidez en espacios reducidos.",
      structures: [
        { title: "Cráneo",            description: "Protege el encéfalo y sostiene las piezas dentales de crecimiento continuo.", slot: "one" },
        { title: "Columna vertebral", description: "Eje óseo flexible para postura y movimiento ágil.", slot: "two" },
        { title: "Costillas",         description: "Protegen pulmones y corazón dentro de la caja torácica.", slot: "three" },
        { title: "Fémur y tibia",     description: "Permiten soporte del peso corporal y locomoción estable.", slot: "four" },
      ],
      keyStructures: [
        { title: "Cráneo",            description: "Protege el encéfalo y sostiene las piezas dentales de crecimiento continuo." },
        { title: "Columna vertebral", description: "Eje óseo flexible que permite postura y movimiento ágil." },
        { title: "Costillas",         description: "Protegen pulmones y corazón en la caja torácica." },
        { title: "Pelvis",            description: "Conecta la columna con las extremidades posteriores y da estabilidad." },
        { title: "Húmero",            description: "Hueso del brazo que conecta el hombro con el codo." },
        { title: "Radio-cúbito",      description: "Huesos del antebrazo que permiten el movimiento de la pata delantera." },
        { title: "Fémur",             description: "Hueso más largo del cuerpo; soporta el peso y permite el movimiento." },
        { title: "Tibia",             description: "Hueso principal de la pierna; junto con el fémur permite la locomoción." },
      ],
    },
    {
      slug: "organos",
      modelUrl: "/models/cuy.glb",
      layerTitle: "Función de los órganos",
      layerIntro:
        "El cuy es herbívoro. Su sistema digestivo está adaptado para procesar plantas ricas en fibra. El ciego es clave para la fermentación y absorción de nutrientes esenciales.",
      layerFact:
        "El ciego del cuy representa más del 60 % de su tracto digestivo y produce vitaminas del complejo B.",
      structures: [
        { title: "Pulmones", description: "Realizan el intercambio de gases: oxígeno entra, dióxido de carbono sale.", slot: "one" },
        { title: "Corazón",  description: "Bombea la sangre aportando oxígeno y nutrientes a todo el cuerpo.", slot: "two" },
        { title: "Ciego",    description: "Fermenta la fibra vegetal y produce vitaminas del complejo B.", slot: "three" },
        { title: "Riñones",  description: "Filtran la sangre y eliminan desechos mediante la orina.", slot: "four" },
      ],
      keyStructures: [
        { title: "Pulmones",           description: "Realizan el intercambio de gases: oxígeno entra, dióxido de carbono sale." },
        { title: "Corazón",            description: "Bombea la sangre aportando oxígeno y nutrientes a todo el cuerpo." },
        { title: "Hígado",             description: "Metaboliza nutrientes, desintoxica y produce sustancias esenciales." },
        { title: "Riñones",            description: "Filtran la sangre y eliminan desechos mediante la orina." },
        { title: "Estómago",           description: "Inicia la digestión y mezcla el alimento con los jugos gástricos." },
        { title: "Ciego",              description: "Fermenta la fibra vegetal y produce vitaminas del complejo B." },
        { title: "Intestino grueso",   description: "Absorbe agua y forma las heces." },
        { title: "Intestino delgado",  description: "Digiere los alimentos y absorbe la mayoría de los nutrientes." },
        { title: "Vejiga",             description: "Almacena la orina antes de su eliminación." },
      ],
      systems: [
        { icon: "leaf",     label: "Digestión",   text: "Transforma la fibra vegetal en nutrientes aprovechables." },
        { icon: "waves",    label: "Respiración", text: "Los pulmones oxigenan la sangre y el organismo." },
        { icon: "heart",    label: "Circulación", text: "El corazón distribuye sangre a todo el cuerpo." },
        { icon: "activity", label: "Excreción",   text: "Riñones y vejiga eliminan desechos y regulan líquidos." },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        text: "¿Qué estructura ayuda al cuy a procesar una dieta rica en fibra?",
        options: [
          { text: "Ciego",    correct: true  },
          { text: "Cuernos",  correct: false },
          { text: "Aletas",   correct: false },
        ],
        successMsg: "Correcto: el ciego fermenta fibra vegetal y produce vitaminas del complejo B.",
        failMsg:    "Revisa la digestión: el ciego es clave para aprovechar la fibra vegetal.",
        points: 20,
      },
      {
        text: "¿Cuál es el nombre científico del cuy andino?",
        options: [
          { text: "Cavia porcellus",  correct: true  },
          { text: "Vicugna vicugna",  correct: false },
          { text: "Lagidium viscacia", correct: false },
        ],
        successMsg: "Exacto: Cavia porcellus es el nombre científico del cuy doméstico andino.",
        failMsg:    "El cuy pertenece al género Cavia, distinto de los camélidos.",
        points: 20,
      },
      {
        text: "¿Qué característica tienen los incisivos del cuy?",
        options: [
          { text: "Crecimiento continuo",  correct: true  },
          { text: "Se renuevan una sola vez", correct: false },
          { text: "Son retráctiles",        correct: false },
        ],
        successMsg: "Correcto: sus incisivos crecen continuamente, adaptados para roer fibra vegetal.",
        failMsg:    "Piensa en lo que necesita un roedor para mantener sus dientes con una dieta de fibra.",
        points: 20,
      },
      {
        text: "¿Cuánto pesa aproximadamente un cuy adulto?",
        options: [
          { text: "0.7–1.2 kg",  correct: true  },
          { text: "5–8 kg",      correct: false },
          { text: "35–65 kg",    correct: false },
        ],
        successMsg: "¡Bien! El cuy es un pequeño roedor que pesa entre 0.7 y 1.2 kg en estado adulto.",
        failMsg:    "El cuy es mucho más pequeño que un camélido andino.",
        points: 20,
      },
      {
        text: "¿Qué sistema corporal está más desarrollado en el cuy gracias a su dieta herbívora?",
        options: [
          { text: "Sistema digestivo",  correct: true  },
          { text: "Sistema muscular",   correct: false },
          { text: "Sistema nervioso",   correct: false },
        ],
        successMsg: "Correcto: su aparato digestivo, especialmente el ciego, está altamente adaptado para procesar fibra.",
        failMsg:    "Piensa en qué sistema trabaja más en un animal que solo come plantas ricas en fibra.",
        points: 20,
      },
    ],
  },
};
