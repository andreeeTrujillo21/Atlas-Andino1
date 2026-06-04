-- Nuevas especies: Alpaca, Llama, Vizcacha, Zambullidor

INSERT INTO categories (slug, name) VALUES
  ('acuatico', 'Especie acuatica')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO species (slug, name, scientific_name, category_id, iucn_status,
  origin, size, weight, diet, habitat, social, lifespan,
  accent, is_featured, title_html, intro, learning_title, learning,
  model_scale, camera, rotation_y, position)
VALUES
  ('alpaca', 'Alpaca andina', 'Vicugna pacos',
   (SELECT id FROM categories WHERE slug='domestico'), 'LC',
   'Andes (3.500-5.000 msnm)', '0.9-1.1 m (altura a la cruz)', '55-75 kg',
   'Pastos altoandinos y forrajes',
   'Puna, bofedales y comunidades altoandinas',
   'Manejo en rebanos familiares', '15-20 anos',
   '#c8a97a', true,
   'Alpaca <span>andina</span>',
   'Camelido domesticado simbolo de los Andes. Su fibra fina es uno de los recursos textiles mas valiosos del mundo.',
   'Fibra y adaptacion',
   'La alpaca permite estudiar termorregulacion, digestion de pastos fibrosos y la importancia economica de los camelidos andinos.',
   2.2, '[0,1.45,5.7]', -0.15, 3),

  ('llama', 'Llama', 'Lama glama',
   (SELECT id FROM categories WHERE slug='domestico'), 'LC',
   'Andes (sur del Peru y Bolivia)', '1.7-1.9 m (altura total)', '130-200 kg',
   'Pastos, arbustos y forrajes',
   'Puna, valles andinos y comunidades rurales',
   'Rebanos con estructura jerarquica', '15-25 anos',
   '#9c8866', false,
   '<span>Llama</span> andina',
   'El camelido de carga mas importante de los Andes. Companera de trabajo y simbolo de la civilizacion andina.',
   'Animal de trabajo andino',
   'La llama permite estudiar locomocion en terrenos irregulares y la fisiologia de camelidos en altura.',
   2.3, '[0,1.55,6.0]', -0.2, 4),

  ('vizcacha', 'Vizcacha andina', 'Lagidium viscacia',
   (SELECT id FROM categories WHERE slug='silvestre'), 'LC',
   'Andes (3.000-5.000 msnm)', '30-45 cm + cola', '1.5-3.5 kg',
   'Pastos, hojas y cortezas',
   'Roquedales altoandinos',
   'Diurna y social, vive en grupos entre rocas', '7-12 anos',
   '#8b7355', true,
   'Vizcacha <span>andina</span>',
   'Roedor endemico de los Andes adaptado a la vida entre rocas y a gran altitud.',
   'Roedor altoandino',
   'La vizcacha permite estudiar adaptaciones de pequenos mamiferos a entornos rocosos y frios.',
   2.0, '[0,1.2,5.0]', 0.2, 5),

  ('zambullidor', 'Zambullidor del Titicaca', 'Rollandia microptera',
   (SELECT id FROM categories WHERE slug='acuatico'), 'EN',
   'Lago Titicaca (3.800 msnm)', '28-45 cm', '250-400 g',
   'Peces pequenos, crustaceos e insectos acuaticos',
   'Aguas abiertas, totorales y bahias del Titicaca',
   'Solitario o en parejas durante la reproduccion', '6-12 anos',
   '#5b7a8c', true,
   'Zambullidor del <span>Titicaca</span>',
   'Ave acuatica endemica del Lago Titicaca. Su adaptacion al buceo la convierte en una especie unica en el mundo.',
   'Adaptacion al buceo',
   'El zambullidor ilustra adaptaciones extremas al habitat acuatico en altura.',
   1.8, '[0,1.0,4.8]', 0.1, 6)
ON CONFLICT (slug) DO NOTHING;

-- Focus points
INSERT INTO species_focus (species_id, position, text)
SELECT s.id, f.pos, f.txt FROM species s
JOIN (VALUES
  ('alpaca',       0, 'Distingue alpaca huacaya de suri por su fibra.'),
  ('alpaca',       1, 'Relaciona su anatomia digestiva con la alimentacion en altura.'),
  ('alpaca',       2, 'Comprende el valor cultural y economico de su fibra.'),
  ('llama',        0, 'Identifica rasgos anatomicos adaptados al trabajo de carga.'),
  ('llama',        1, 'Comprende su rol historico en el transporte andino.'),
  ('llama',        2, 'Distingue la llama de la alpaca por tamano y funcion.'),
  ('vizcacha',     0, 'Reconoce adaptaciones al habitat rocoso altoandino.'),
  ('vizcacha',     1, 'Relaciona denticion de crecimiento continuo con dieta fibrosa.'),
  ('vizcacha',     2, 'Comprende el rol ecologico de los roedores en el ecosistema andino.'),
  ('zambullidor',  0, 'Identifica adaptaciones morfologicas para el buceo en agua fria.'),
  ('zambullidor',  1, 'Comprende el estado de amenaza de esta especie endemica.'),
  ('zambullidor',  2, 'Relaciona su dieta con el ecosistema del Lago Titicaca.')
) AS f(slug, pos, txt) ON s.slug = f.slug
ON CONFLICT DO NOTHING;

-- Did you know
INSERT INTO did_you_know (species_id, position, text)
SELECT s.id, d.pos, d.txt FROM species s
JOIN (VALUES
  ('alpaca',      0, 'Existen dos razas: huacaya (fibra rizada) y suri (fibra lacia en mechones).'),
  ('alpaca',      1, 'La fibra de alpaca puede tener entre 18 y 30 micras segun la raza y edad.'),
  ('alpaca',      2, 'El Peru concentra el 80 % de la poblacion mundial de alpacas.'),
  ('llama',       0, 'Pueden cargar hasta el 25-30 % de su peso corporal sin dano.'),
  ('llama',       1, 'Sus eritrocitos son elipticos, no circulares, para mejor flujo sanguineo.'),
  ('llama',       2, 'El estiercol de llama fue el principal combustible en comunidades altoandinas.'),
  ('vizcacha',    0, 'Puede saltar mas de 1 metro entre rocas con sus patas traseras musculosas.'),
  ('vizcacha',    1, 'Practica cecotrofia: reingiere sus propias heces blandas para absorber vitaminas.'),
  ('vizcacha',    2, 'Son diurnas y se asolean en las rocas para regular su temperatura corporal.'),
  ('zambullidor', 0, 'Es una de las pocas aves acuaticas que no puede volar; sus alas son aletas.'),
  ('zambullidor', 1, 'Puede permanecer bajo el agua mas de un minuto y bucear hasta 40 metros.'),
  ('zambullidor', 2, 'Es endemica del Lago Titicaca: no existe en ningun otro lugar del planeta.')
) AS d(slug, pos, txt) ON s.slug = d.slug
ON CONFLICT DO NOTHING;

-- Razas
INSERT INTO breeds (species_id, name, description)
SELECT s.id, b.name, b.desc FROM species s
JOIN (VALUES
  ('alpaca', 'Huacaya', 'Fibra densa y esponjosa con apariencia rizada. La raza mas comun.'),
  ('alpaca', 'Suri',    'Fibra larga, lacia y sedosa en mechones. Mas escasa y valorada.'),
  ('llama',  'Ccara',   'Cuello descubierto, mas grande y utilizada principalmente para carga.'),
  ('llama',  'Lanuda',  'Con fibra mas densa en el cuello, apta para produccion de fibra y carga.')
) AS b(slug, name, desc) ON s.slug = b.slug
ON CONFLICT DO NOTHING;

-- Species layers
INSERT INTO species_layers (species_id, layer_id, model_url, layer_title, layer_intro, layer_fact)
SELECT s.id, l.id, sl.model_url, sl.title, sl.intro, sl.fact
FROM species s
JOIN (VALUES
  ('alpaca',      'general', '/models/vicuna.glb', NULL, NULL, NULL),
  ('alpaca',      'partes',  '/models/vicuna.glb', NULL, NULL, NULL),
  ('alpaca',      'huesos',  '/models/vicuna.glb',
   'Sistema oseo de la alpaca',
   'El esqueleto de la alpaca sostiene su cuerpo, permite flexibilidad y movimiento en terrenos irregulares.',
   'La alpaca tiene 50 vertebras en su columna vertebral.'),
  ('alpaca',      'organos', '/models/vicuna.glb',
   'Funcion de los organos',
   'La alpaca es rumiante con tres compartimentos estomacales adaptados para pastos altoandinos.',
   'Los camelidos sudamericanos tienen 3 compartimentos gastricos, no 4 como los bovinos.'),
  ('llama',       'general', '/models/vicuna.glb', NULL, NULL, NULL),
  ('llama',       'partes',  '/models/vicuna.glb', NULL, NULL, NULL),
  ('llama',       'huesos',  '/models/vicuna.glb',
   'Sistema oseo de la llama',
   'El esqueleto combina robustez para el trabajo de carga con ligereza para moverse en terrenos andinos.',
   'Las vertebras lumbares de la llama estan reforzadas para soportar cargas sin lesionar la columna.'),
  ('llama',       'organos', '/models/vicuna.glb',
   'Funcion de los organos',
   'Como todos los camelidos sudamericanos, tiene tres compartimentos gastricos. Sus eritrocitos son elipticos.',
   'Los eritrocitos elipticos mejoran el flujo sanguineo en la sangre espesa de la altitud.'),
  ('vizcacha',    'general', '/models/cuy.glb', NULL, NULL, NULL),
  ('vizcacha',    'partes',  '/models/cuy.glb', NULL, NULL, NULL),
  ('vizcacha',    'huesos',  '/models/cuy.glb',
   'Sistema oseo de la vizcacha',
   'El esqueleto esta disenado para la vida en roquedales: columna flexible y extremidades posteriores potentes.',
   'Sus tibias son proporcionalmente mas largas que el femur para mayor impulso al saltar.'),
  ('vizcacha',    'organos', '/models/cuy.glb',
   'Funcion de los organos',
   'Sistema digestivo adaptado para vegetacion de bajo valor nutricional. Practica cecotrofia.',
   'La cecotrofia permite reingierir heces blandas para absorber vitaminas del complejo B.'),
  ('zambullidor', 'general', '/models/cuy.glb', NULL, NULL, NULL),
  ('zambullidor', 'partes',  '/models/cuy.glb', NULL, NULL, NULL),
  ('zambullidor', 'huesos',  '/models/cuy.glb',
   'Sistema oseo del zambullidor',
   'Esqueleto altamente modificado para el buceo: huesos mas densos para reducir flotabilidad.',
   'A diferencia de otras aves, el zambullidor tiene huesos densos (no neumaticos) para sumergirse mejor.'),
  ('zambullidor', 'organos', '/models/cuy.glb',
   'Funcion de los organos',
   'Organos adaptados para buceo prolongado en aguas frias a 3.800 msnm con escasez de oxigeno.',
   'Sus musculos tienen alta concentracion de mioglobina para almacenar oxigeno durante el buceo.')
) AS sl(sp_slug, l_slug, model_url, title, intro, fact)
  ON s.slug = sl.sp_slug
JOIN anatomical_layers l ON l.slug = sl.l_slug
ON CONFLICT (species_id, layer_id) DO NOTHING;

-- Quizzes para nuevas especies
INSERT INTO quizzes (species_id, title)
SELECT id, 'Quiz - ' || name FROM species
WHERE slug IN ('alpaca','llama','vizcacha','zambullidor')
ON CONFLICT DO NOTHING;
