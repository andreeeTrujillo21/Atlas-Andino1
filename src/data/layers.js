export const LAYERS = [
  { slug: "general", label: "Vista general",   icon: "eye"    },
  { slug: "partes",  label: "Partes externas",  icon: "target" },
  { slug: "huesos",  label: "Huesos",           icon: "bone"   },
  { slug: "organos", label: "Órganos",          icon: "heart"  },
  { slug: "craneo",  label: "Cráneo",           icon: "skull"  },
];

export function getLayer(slug) {
  return LAYERS.find(l => l.slug === slug) ?? LAYERS[0];
}
