import React from "react";
import { Bone, HeartPulse, Info, Sparkles, Leaf, Waves, Activity } from "lucide-react";

const LAYER_ICONS  = { huesos: Bone, organos: HeartPulse };
const SYSTEM_ICONS = { leaf: Leaf, waves: Waves, heart: HeartPulse, activity: Activity };

export function StructureList({ layerSlug, layerTitle, layerIntro, layerFact, keyStructures, systems }) {
  if (!keyStructures?.length) return null;

  const Icon = LAYER_ICONS[layerSlug] ?? Sparkles;

  return (
    <section className="panel" style={{ padding: "1.1rem", display: "grid", gap: "1rem" }}>
      <div className="section-title">
        <div>
          <p className="eyebrow"><Icon size={16} /> Anatomia interna</p>
          {layerTitle && (
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "1.35rem" }}>
              {layerTitle}
            </h2>
          )}
        </div>
      </div>

      {layerIntro && (
        <p style={{ color: "var(--muted)", lineHeight: 1.55, fontSize: ".92rem" }}>
          {layerIntro}
        </p>
      )}

      {layerFact && (
        <div className="did-you-know">
          <Info size={18} />
          <p>{layerFact}</p>
        </div>
      )}

      <div className="structure-list">
        {keyStructures.map((s, i) => (
          <div key={s.title ?? i} className="structure-item">
            <span className="structure-item__icon"><Icon size={18} /></span>
            <div>
              <h4>{s.title}</h4>
              <p>{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {systems?.length > 0 && (
        <div className="systems-row">
          {systems.map(sys => {
            const SysIcon = SYSTEM_ICONS[sys.icon] ?? Sparkles;
            return (
              <div key={sys.label} className="system-chip">
                <SysIcon size={22} style={{ color: "var(--olive)", display: "block", margin: "0 auto .3rem" }} />
                <small>{sys.label}</small>
                <p>{sys.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
