import React from "react";
import { Eye, Target, Bone, HeartPulse, Skull } from "lucide-react";
import { LAYERS } from "../../data/layers.js";

const ICONS = {
  general: Eye,
  partes:  Target,
  huesos:  Bone,
  organos: HeartPulse,
  craneo:  Skull,
};

export function LayerTabs({ activeLayer, onChange, species }) {
  const availableSlugs = species?.layers?.map(l => l.slug) ?? null;
  const tabs = availableSlugs
    ? LAYERS.filter(l => availableSlugs.includes(l.slug))
    : LAYERS.filter(l => l.slug !== "craneo");

  return (
    <div className="viewer-toolbar">
      <div
        className="segmented"
        role="tablist"
        aria-label="Capas anatómicas"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map(layer => {
          const Icon = ICONS[layer.slug] ?? Eye;
          return (
            <button
              key={layer.slug}
              type="button"
              role="tab"
              className={`segmented__tab${activeLayer === layer.slug ? " active" : ""}`}
              aria-selected={activeLayer === layer.slug}
              onClick={() => onChange(layer.slug)}
            >
              <Icon size={15} />
              {layer.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
