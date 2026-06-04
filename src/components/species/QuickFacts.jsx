import React from "react";
import { Mountain, Ruler, Scale, Leaf, MapPin, Users, Clock } from "lucide-react";

export function QuickFacts({ species }) {
  const facts = [
    { icon: Mountain, label: "Origen",  value: species.origin   },
    { icon: Ruler,    label: "Tamaño",  value: species.size     },
    { icon: Scale,    label: "Peso",    value: species.weight   },
    { icon: Leaf,     label: "Dieta",   value: species.diet     },
    { icon: MapPin,   label: "Hábitat", value: species.habitat  },
    { icon: Users,    label: "Social",  value: species.social   },
    { icon: Clock,    label: "Vida",    value: species.lifespan },
  ];

  return (
    <div className="quick-facts">
      {facts.map(({ icon: Icon, label, value }) => (
        <div key={label} className="quick-fact-pill">
          <Icon size={20} className="quick-fact-pill__icon" />
          <span className="quick-fact-pill__body">
            <small>{label}</small>
            <strong>{value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}
