export default {
  slug: "zambullidor",
  name: "Zambullidor del Titicaca",
  scientific: "Rollandia microptera",
  category: "acuatico",
  iucnStatus: "EN",
  origin: "Lago Titicaca (3.800 msnm)",
  size: "28–45 cm",
  weight: "250–400 g",
  diet: "Peces pequeños, crustáceos e insectos acuáticos",
  habitat: "Aguas abiertas, totorales y bahías del Titicaca",
  social: "Solitario o en parejas durante la reproducción",
  lifespan: "6–12 años",
  accent: "#5b7a8c",
  isFeatured: true,
  titleHtml: "Zambullidor del <span>Titicaca</span>",
  intro:
    "Ave acuática endémica del Lago Titicaca. Su adaptación al buceo y a las frías aguas del altiplano la convierte en una especie única en el mundo.",
  learningTitle: "Adaptación al buceo",
  learning:
    "El zambullidor del Titicaca ilustra adaptaciones extremas al hábitat acuático en altura: no vuela, bucea con destreza y su fisiología refleja presiones evolutivas únicas.",
  focus: [
    "Identifica adaptaciones morfológicas para el buceo en agua fría.",
    "Comprende el estado de amenaza de esta especie endémica.",
    "Relaciona su dieta con el ecosistema del Lago Titicaca.",
  ],
  didYouKnow: [
    "Es una de las pocas aves acuáticas que no puede volar; sus alas se han reducido a aletas.",
    "Puede permanecer bajo el agua más de un minuto y bucear hasta 40 metros de profundidad.",
    "Es endémica del Lago Titicaca: no existe en ningún otro lugar del planeta.",
  ],
  breeds: [],
  viewer: { scale: 1.8, camera: [0, 1.0, 4.8], rotationY: 0.1 },

  layers: [
    {
      slug: "general",
      modelUrl: "/models/cuy.glb",
      structures: [
        { title: "Pico",            description: "Largo y puntiagudo, ideal para capturar presas bajo el agua.", slot: "one" },
        { title: "Cuello",          description: "Flexible y potente, le permite maniobrar con agilidad al bucear.", slot: "two" },
        { title: "Alas",            description: "Cortas y fuertes, adaptadas para el nado y no para el vuelo.", slot: "three" },
        { title: "Patas lobuladas", description: "Con lóbulos en los dedos que actúan como remos para el buceo.", slot: "four" },
      ],
    },
    {
      slug: "partes",
      modelUrl: "/models/cuy.glb",
      structures: [
        { title: "Plumaje",                  description: "Denso e impermeable, protege del frío y mantiene la flotabilidad.", slot: "one" },
        { title: "Ojos",                     description: "Adaptados para ver bajo el agua con claridad.", slot: "two" },
        { title: "Cuerpo hidrodinámico",     description: "Forma aerodinámica que reduce resistencia al bucear.", slot: "three" },
        { title: "Patas traseras",           description: "Posicionadas en la parte trasera del cuerpo para mejor propulsión acuática.", slot: "four" },
      ],
    },
    {
      slug: "huesos",
      modelUrl: "/models/cuy.glb",
      layerTitle: "Sistema óseo del zambullidor",
      layerIntro:
        "El esqueleto del zambullidor está altamente modificado para el buceo: huesos más densos que la mayoría de las aves para reducir la flotabilidad y facilitar la inmersión.",
      layerFact:
        "A diferencia de la mayoría de aves que tienen huesos neumáticos (huecos) para volar, el zambullidor tiene huesos más densos que le ayudan a sumergirse.",
      structures: [
        { title: "Huesos densos",   description: "Mayor densidad ósea para reducir flotabilidad y facilitar la inmersión.", slot: "one" },
        { title: "Alas reducidas",  description: "Extremidades anteriores muy cortas, adaptadas como aletas.", slot: "two" },
        { title: "Pelvis",          description: "Patas posicionadas muy atrás para máxima propulsión acuática.", slot: "three" },
        { title: "Esternón",        description: "Robusto, permite anclar músculos pectorales para el nado.", slot: "four" },
      ],
      keyStructures: [
        { title: "Cráneo y pico",    description: "Pico largo y puntiagudo para atrapar peces bajo el agua." },
        { title: "Huesos densos",    description: "Mayor densidad que otras aves: facilita la inmersión activa." },
        { title: "Columna vertebral", description: "Flexible para maniobras rápidas bajo el agua." },
        { title: "Esternón robusto", description: "Ancla los músculos pectorales que impulsan el nado." },
        { title: "Húmero reducido",  description: "Ala extremadamente corta, funcional como aleta." },
        { title: "Tarso-metatarso",  description: "Largo para mayor fuerza de propulsión con las patas lobuladas." },
      ],
    },
    {
      slug: "organos",
      modelUrl: "/models/cuy.glb",
      layerTitle: "Función de los órganos",
      layerIntro:
        "Los órganos del zambullidor del Titicaca están adaptados para soportar el buceo prolongado en aguas frías a 3.800 msnm, con escasez de oxígeno en el ambiente.",
      layerFact:
        "Sus músculos tienen alta concentración de mioglobina, la proteína que almacena oxígeno en los tejidos musculares durante el buceo.",
      structures: [
        { title: "Pulmones",  description: "Almacenan aire antes del buceo; vaciados al sumergirse para reducir flotabilidad.", slot: "one" },
        { title: "Corazón",   description: "Con bradicardia de buceo: la frecuencia cardíaca baja al sumergirse.", slot: "two" },
        { title: "Músculos",  description: "Ricos en mioglobina para almacenar oxígeno durante el buceo.", slot: "three" },
        { title: "Riñones",   description: "Regulan el balance osmótico en agua dulce.", slot: "four" },
      ],
      keyStructures: [
        { title: "Pulmones",               description: "Almacenan aire antes del buceo; se vacían al sumergirse." },
        { title: "Corazón",                description: "Bradicardia de buceo: baja la frecuencia al sumergirse para conservar oxígeno." },
        { title: "Músculos (mioglobina)",  description: "Alta concentración de mioglobina para almacenar oxígeno en el tejido muscular." },
        { title: "Bazo",                   description: "Reserva eritrocitos adicionales que se liberan durante el buceo." },
        { title: "Sistema nervioso",       description: "Reflejo de buceo: vasoconstricción periférica automática al contacto con el agua." },
        { title: "Riñones",                description: "Regulan el balance osmótico en agua dulce fría." },
      ],
      systems: [
        { icon: "waves",    label: "Buceo",            text: "Pulmones, corazón y mioglobina trabajan en conjunto para el buceo prolongado." },
        { icon: "heart",    label: "Circulación",      text: "Bradicardia de buceo y esplenomegalia: adaptaciones cardiovasculares al buceo." },
        { icon: "leaf",     label: "Alimentación",     text: "Peces, crustáceos e insectos acuáticos del Lago Titicaca." },
        { icon: "activity", label: "Termorregulación", text: "Plumaje impermeable y denso para el agua fría a 3.800 msnm." },
      ],
    },
  ],

  quiz: {
    questions: [
      {
        text: "¿Cuál es la característica más inusual del zambullidor del Titicaca respecto a otras aves?",
        options: [
          { text: "No puede volar; sus alas se han reducido a aletas", correct: true  },
          { text: "Es completamente nocturno",                         correct: false },
          { text: "Se alimenta exclusivamente de plantas acuáticas",   correct: false },
        ],
        successMsg: "Exacto: el zambullidor del Titicaca ha perdido la capacidad de volar; sus alas son aletas para el buceo.",
        failMsg:    "La característica más notable es que sus alas evolucionaron como aletas para el buceo, perdiendo el vuelo.",
        points: 20,
      },
      {
        text: "¿En qué lago es endémico el zambullidor del Titicaca?",
        options: [
          { text: "Lago Titicaca (3.800 msnm)", correct: true  },
          { text: "Lago Junín",                 correct: false },
          { text: "Lago Poopó",                 correct: false },
        ],
        successMsg: "Correcto: es endémica exclusivamente del Lago Titicaca, el lago navegable más alto del mundo.",
        failMsg:    "El zambullidor solo existe en el Lago Titicaca, ubicado a 3.800 msnm en la frontera Perú-Bolivia.",
        points: 20,
      },
      {
        text: "¿Qué proteína en sus músculos le permite al zambullidor almacenar oxígeno durante el buceo?",
        options: [
          { text: "Mioglobina",  correct: true  },
          { text: "Hemoglobina", correct: false },
          { text: "Albúmina",    correct: false },
        ],
        successMsg: "Muy bien: la mioglobina almacena oxígeno en el tejido muscular para su uso durante el buceo.",
        failMsg:    "La mioglobina (en músculos) almacena oxígeno localmente; la hemoglobina lo transporta en la sangre.",
        points: 20,
      },
      {
        text: "¿Cuál es el estado de conservación del zambullidor del Titicaca según la UICN?",
        options: [
          { text: "En peligro (EN)",         correct: true  },
          { text: "Preocupación menor (LC)", correct: false },
          { text: "Extinto (EX)",            correct: false },
        ],
        successMsg: "Correcto: está clasificado EN (en peligro) por la reducción de su hábitat y la contaminación del lago.",
        failMsg:    "El zambullidor está EN PELIGRO (EN) según la UICN debido a la degradación del Lago Titicaca.",
        points: 20,
      },
      {
        text: "¿Qué tipo de patas tiene el zambullidor del Titicaca para nadar?",
        options: [
          { text: "Patas lobuladas (dedos con lóbulos en los lados)", correct: true  },
          { text: "Patas palmadas como los patos",                    correct: false },
          { text: "Patas con garras como las rapaces",                correct: false },
        ],
        successMsg: "Exacto: sus dedos tienen lóbulos laterales que funcionan como paletas propulsoras al nadar.",
        failMsg:    "El zambullidor tiene patas lobuladas, no palmadas; los lóbulos en los dedos hacen la función de remos.",
        points: 20,
      },
    ],
  },
};
