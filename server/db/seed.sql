-- ══════════════════════════════════════════════════════════════════
--  Atlas Andino 3D — Seed inicial
--  Ejecutar DESPUÉS de schema.sql
--  psql -U postgres -d atlas_andino -f seed.sql
-- ══════════════════════════════════════════════════════════════════

-- ────────────────────────────────────────
-- Usuarios de prueba (contraseñas: Test1234)
-- hash bcrypt generado con saltRounds=10
-- ────────────────────────────────────────
INSERT INTO users (email, password_hash, full_name, role) VALUES
  ('docente@finesi.edu.pe', '$2b$10$K8vYnZ1O2pQ3rS4tU5vW6OX.example.hash.teacher', 'Prof. María Quispe', 'teacher'),
  ('alumno@finesi.edu.pe',  '$2b$10$K8vYnZ1O2pQ3rS4tU5vW6OX.example.hash.student', 'Juan Mamani',        'student')
ON CONFLICT (email) DO NOTHING;

-- ────────────────────────────────────────
-- Categorías
-- ────────────────────────────────────────
INSERT INTO categories (slug, name) VALUES
  ('domestico',  'Doméstico'),
  ('silvestre',  'Fauna silvestre'),
  ('produccion', 'Producción rural'),
  ('acuatico',   'Especie acuática')
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────
-- Capas anatómicas
-- ────────────────────────────────────────
INSERT INTO anatomical_layers (slug, name, icon, position) VALUES
  ('general', 'Vista general',   'eye',    0),
  ('partes',  'Partes externas', 'target', 1),
  ('huesos',  'Huesos',          'bone',   2),
  ('organos', 'Órganos',         'heart',  3)
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────
-- Especies
-- ────────────────────────────────────────
INSERT INTO species (slug, name, scientific_name, category_id, iucn_status,
  origin, size, weight, diet, habitat, social, lifespan,
  accent, is_featured, title_html, intro,
  learning_title, learning, model_scale, camera, rotation_y, position)
VALUES
  (
    'cuy', 'Cuy andino', 'Cavia porcellus',
    (SELECT id FROM categories WHERE slug='domestico'), 'LC',
    'Andes', '20–30 cm', '0.7–1.2 kg', 'Herbívoro',
    'Valles altoandinos, zonas agrícolas y quebradas',
    'Vive en grupos familiares jerárquicos', '4–6 años (en cautiverio)',
    '#a45f2b', true,
    'Cuy <span>andino</span>',
    'El cuy andino es un mamífero domesticado desde hace miles de años en los Andes. Fuente de alimento, tradición y conocimiento ancestral.',
    'Importancia en los Andes',
    'El cuy (Cavia porcellus) es esencial en la seguridad alimentaria, la economía familiar y las prácticas culturales de comunidades andinas desde hace más de 3.000 años.',
    2.2, '[0,1.35,5.2]', -0.25, 0
  ),
  (
    'vicuna', 'Vicuña', 'Vicugna vicugna',
    (SELECT id FROM categories WHERE slug='silvestre'), 'LC',
    'Altiplano', '1.45–1.60 m', '35–65 kg', 'Pastos altoandinos',
    'Puna y bofedales (3.500–5.000 msnm)',
    'Grupos familiares vigilantes', '12–20 años',
    '#b7864c', true,
    '<span>Vicuña</span> altoandina',
    'Camélido silvestre de fibra fina, veloz y elegante. Vive en zonas frías de gran altitud y es símbolo de conservación.',
    'Adaptación a la altura',
    'Permite estudiar termorregulación, locomoción ligera y supervivencia en ambientes de baja temperatura y escaso oxígeno.',
    2.15, '[0,1.45,5.7]', -0.1, 1
  ),
  (
    'vaca', 'Vaca andina', 'Bos taurus',
    (SELECT id FROM categories WHERE slug='produccion'), 'LC',
    'Sierra rural', '1.2–1.5 m (altura)', '350–650 kg', 'Forrajes y pastos',
    'Praderas y comunidades ganaderas andinas',
    'Manejo en hatos familiares', '15–20 años',
    '#6f5b45', true,
    'Vaca <span>andina</span>',
    'Bovino de importancia productiva para leche, carne y trabajo rural. Su anatomía conecta biología, salud animal y economía familiar.',
    'Producción y bienestar',
    'Su estudio ayuda a comprender rumiación, locomoción, condición corporal y prácticas responsables de manejo animal en contexto andino.',
    3.1, '[0,1.35,5.3]', 0.35, 2
  )
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────
-- Focus por especie
-- ────────────────────────────────────────
INSERT INTO species_focus (species_id, position, text)
SELECT s.id, f.pos, f.txt FROM species s
JOIN (VALUES
  ('cuy', 0, 'Reconoce partes externas y su función.'),
  ('cuy', 1, 'Relaciona dentición continua con dieta vegetal.'),
  ('cuy', 2, 'Compara órganos digestivos con otras especies.'),
  ('vicuna', 0, 'Identifica rasgos de camélidos silvestres.'),
  ('vicuna', 1, 'Analiza su relación con la puna y los bofedales.'),
  ('vicuna', 2, 'Comprende por qué su fibra requiere manejo sostenible.'),
  ('vaca', 0, 'Distingue estructuras de soporte en animales de gran tamaño.'),
  ('vaca', 1, 'Relaciona el rumen y la rumiación con la alimentación en forrajes.'),
  ('vaca', 2, 'Evalúa bienestar y productividad en el contexto rural.')
) AS f(slug, pos, txt) ON s.slug = f.slug
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────
-- Did you know
-- ────────────────────────────────────────
INSERT INTO did_you_know (species_id, position, text)
SELECT s.id, d.pos, d.txt FROM species s
JOIN (VALUES
  ('cuy', 0, 'Sus incisivos crecen continuamente durante toda su vida.'),
  ('cuy', 1, 'El ciego representa más del 60 % de su tracto digestivo.'),
  ('cuy', 2, 'Ha sido domesticado en los Andes hace más de 3.000 años.'),
  ('vicuna', 0, 'Su fibra tiene menos de 12 micras de diámetro: una de las más finas del mundo.'),
  ('vicuna', 1, 'Su hemoglobina tiene mayor afinidad por el oxígeno, adaptación para la gran altitud.'),
  ('vicuna', 2, 'El chaku es la práctica ancestral inca de captura y esquila colectiva de vicuñas.'),
  ('vaca', 0, 'Tiene cuatro compartimentos estomacales: rumen, retículo, omaso y abomaso.'),
  ('vaca', 1, 'Puede consumir hasta 70 kg de forraje fresco al día.'),
  ('vaca', 2, 'La rumiación ocurre aproximadamente 8 horas diarias.')
) AS d(slug, pos, txt) ON s.slug = d.slug
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────
-- Razas
-- ────────────────────────────────────────
INSERT INTO breeds (species_id, name, description)
SELECT s.id, b.name, b.desc FROM species s
JOIN (VALUES
  ('cuy', 'Perú',           'Raza de alto rendimiento cárnico, pelaje corto y liso.'),
  ('cuy', 'Andino',         'Adaptado a zonas frías y de gran altitud, robusto y resistente.'),
  ('vaca', 'Holstein',      'Alta producción lechera, color blanco y negro.'),
  ('vaca', 'Brown Swiss',   'Adaptada a la sierra, buena producción de leche y carne.'),
  ('vaca', 'Criollo andino','Rústica y resistente a la altura, de tamaño más pequeño.')
) AS b(slug, name, desc) ON s.slug = b.slug
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────
-- Species layers (model URLs por capa)
-- ────────────────────────────────────────
INSERT INTO species_layers (species_id, layer_id, model_url, layer_title, layer_intro, layer_fact)
SELECT s.id, l.id, sl.model_url, sl.title, sl.intro, sl.fact
FROM species s
JOIN (VALUES
  ('cuy','general', '/models/cuy.glb',    NULL, NULL, NULL),
  ('cuy','partes',  '/models/cuy.glb',    NULL, NULL, NULL),
  ('cuy','huesos',  '/models/cuy.glb',
    'Sistema óseo del cuy',
    'El esqueleto del cuy sostiene su cuerpo, permite el movimiento y protege los órganos vitales.',
    'El cuy tiene alrededor de 258 huesos. Su columna vertebral flexible le permite moverse con rapidez en espacios reducidos.'),
  ('cuy','organos', '/models/cuy.glb',
    'Función de los órganos',
    'El cuy es herbívoro. Su sistema digestivo está adaptado para procesar plantas ricas en fibra.',
    'El ciego del cuy representa más del 60 % de su tracto digestivo y produce vitaminas del complejo B.'),
  ('vicuna','general','/models/vicuna.glb', NULL, NULL, NULL),
  ('vicuna','partes', '/models/vicuna.glb', NULL, NULL, NULL),
  ('vicuna','huesos', '/models/vicuna.glb',
    'Sistema óseo de la vicuña',
    'El esqueleto de la vicuña es ligero pero robusto, diseñado para la velocidad y resistencia en el altiplano.',
    'La vicuña puede alcanzar 45 km/h gracias a su esqueleto ligero y sus largas extremidades.'),
  ('vicuna','organos','/models/vicuna.glb',
    'Función de los órganos',
    'Los órganos de la vicuña están especializados para funcionar en la puna, donde el oxígeno es escaso.',
    'Su hemoglobina capta oxígeno con mayor eficiencia que la de mamíferos de tierras bajas.'),
  ('vaca','general', '/models/vaca.glb',  NULL, NULL, NULL),
  ('vaca','partes',  '/models/vaca.glb',  NULL, NULL, NULL),
  ('vaca','huesos',  '/models/vaca.glb',
    'Sistema óseo de la vaca',
    'El esqueleto bovino sostiene una gran masa corporal y es base del estudio de bienestar, locomoción y condición corporal.',
    'El esqueleto de una vaca adulta cuenta con aproximadamente 207 huesos, incluyendo los huesos del casco.'),
  ('vaca','organos', '/models/vaca.glb',
    'Función de los órganos',
    'La vaca es rumiante. Su sistema digestivo de cuatro compartimentos le permite fermentar y aprovechar forrajes.',
    'El rumen puede contener hasta 150 litros de contenido en una vaca adulta.')
) AS sl(sp_slug, l_slug, model_url, title, intro, fact)
  ON s.slug = sl.sp_slug
JOIN anatomical_layers l ON l.slug = sl.l_slug
ON CONFLICT (species_id, layer_id) DO NOTHING;

-- ────────────────────────────────────────
-- Estructuras (callouts + estructuras clave)
-- ────────────────────────────────────────
-- CUY - GENERAL
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
SELECT s.id, l.id, st.title, st.desc, st.pos, st.slot, st.is_key
FROM species s, anatomical_layers l,
(VALUES
  ('cuy','general','Pelaje',       'Denso y suave, conserva el calor en ambientes fríos.',             0,'one',  false),
  ('cuy','general','Cabeza',       'Posee sentidos agudos para detectar peligros y comunicarse.',      1,'two',  false),
  ('cuy','general','Tronco',       'Cuerpo compacto y robusto, adaptado para la vida en tierra.',      2,'three',false),
  ('cuy','general','Extremidades', 'Patas cortas pero fuertes, con garras que brindan estabilidad.',   3,'four', false),
  ('cuy','partes', 'Orejas',       'Perciben sonidos y ayudan a reaccionar ante amenazas.',            0,'one',  false),
  ('cuy','partes', 'Bigotes',      'Vibrisas táctiles que orientan al animal en espacios estrechos.', 1,'two',  false),
  ('cuy','partes', 'Dentición',    'Incisivos de crecimiento continuo, ideales para roer fibra.',     2,'three',false),
  ('cuy','partes', 'Patas',        'Fuertes y ágiles para cambios rápidos de dirección.',             3,'four', false),
  ('cuy','huesos', 'Cráneo',            'Protege el encéfalo y sostiene las piezas dentales.',        0,'one',  false),
  ('cuy','huesos', 'Columna vertebral', 'Eje óseo flexible para postura y movimiento ágil.',          1,'two',  false),
  ('cuy','huesos', 'Costillas',         'Protegen pulmones y corazón dentro de la caja torácica.',    2,'three',false),
  ('cuy','huesos', 'Fémur y tibia',     'Permiten soporte del peso corporal y locomoción estable.',   3,'four', false),
  ('cuy','huesos', 'Cráneo',            'Protege el encéfalo y sostiene las piezas dentales de crecimiento continuo.', 0,NULL,true),
  ('cuy','huesos', 'Columna vertebral', 'Eje óseo flexible que permite postura y movimiento ágil.',                    1,NULL,true),
  ('cuy','huesos', 'Costillas',         'Protegen pulmones y corazón en la caja torácica.',                            2,NULL,true),
  ('cuy','huesos', 'Pelvis',            'Conecta la columna con las extremidades posteriores y da estabilidad.',       3,NULL,true),
  ('cuy','huesos', 'Húmero',            'Hueso del brazo que conecta el hombro con el codo.',                         4,NULL,true),
  ('cuy','huesos', 'Radio-cúbito',      'Huesos del antebrazo que permiten el movimiento de la pata delantera.',      5,NULL,true),
  ('cuy','huesos', 'Fémur',             'Hueso más largo del cuerpo; soporta el peso y permite el movimiento.',       6,NULL,true),
  ('cuy','huesos', 'Tibia',             'Hueso principal de la pierna; junto con el fémur permite la locomoción.',    7,NULL,true),
  ('cuy','organos','Pulmones',     'Realizan el intercambio de gases: oxígeno entra, CO₂ sale.',      0,'one',  false),
  ('cuy','organos','Corazón',      'Bombea sangre aportando oxígeno y nutrientes a todo el cuerpo.',  1,'two',  false),
  ('cuy','organos','Ciego',        'Fermenta fibra vegetal y produce vitaminas del complejo B.',       2,'three',false),
  ('cuy','organos','Riñones',      'Filtran la sangre y eliminan desechos mediante la orina.',        3,'four', false),
  ('cuy','organos','Pulmones',          'Realizan el intercambio de gases: oxígeno entra, dióxido de carbono sale.',  0,NULL,true),
  ('cuy','organos','Corazón',           'Bombea la sangre aportando oxígeno y nutrientes a todo el cuerpo.',          1,NULL,true),
  ('cuy','organos','Hígado',            'Metaboliza nutrientes, desintoxica y produce sustancias esenciales.',        2,NULL,true),
  ('cuy','organos','Riñones',           'Filtran la sangre y eliminan desechos mediante la orina.',                   3,NULL,true),
  ('cuy','organos','Estómago',          'Inicia la digestión y mezcla el alimento con los jugos gástricos.',          4,NULL,true),
  ('cuy','organos','Ciego',             'Fermenta la fibra vegetal y produce vitaminas del complejo B.',              5,NULL,true),
  ('cuy','organos','Intestino grueso',  'Absorbe agua y forma las heces.',                                            6,NULL,true),
  ('cuy','organos','Intestino delgado', 'Digiere los alimentos y absorbe la mayoría de los nutrientes.',              7,NULL,true),
  ('cuy','organos','Vejiga',            'Almacena la orina antes de su eliminación.',                                 8,NULL,true)
) AS st(sp_slug, l_slug, title, desc, pos, slot, is_key)
WHERE s.slug = st.sp_slug AND l.slug = st.l_slug
ON CONFLICT DO NOTHING;

-- VICUÑA - estructuras principales
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
SELECT s.id, l.id, st.title, st.desc, st.pos, st.slot, st.is_key
FROM species s, anatomical_layers l,
(VALUES
  ('vicuna','general','Orejas',       'Largas y móviles para captar sonidos a distancia.',                   0,'one',  false),
  ('vicuna','general','Fibra',        'Fina y térmica, protege del frío altoandino.',                        1,'two',  false),
  ('vicuna','general','Cuello',       'Flexible para vigilancia y alimentación.',                             2,'three',false),
  ('vicuna','general','Pezuñas',      'Aptas para suelos duros y rocosos de la puna.',                       3,'four', false),
  ('vicuna','partes', 'Ojos',         'Campo visual amplio para detectar depredadores.',                     0,'one',  false),
  ('vicuna','partes', 'Lomo',         'Línea dorsal ligera que favorece la carrera.',                        1,'two',  false),
  ('vicuna','partes', 'Pecho',        'Capacidad respiratoria adaptada a la baja presión de oxígeno.',       2,'three',false),
  ('vicuna','partes', 'Extremidades', 'Delgadas y resistentes para desplazarse con rapidez.',                3,'four', false),
  ('vicuna','huesos', 'Cráneo',            'Estructura liviana con mandíbula adaptada para pastoreo.',       0,'one',  false),
  ('vicuna','huesos', 'Vértebras',         'Sostienen el cuello largo y permiten postura alerta.',           1,'two',  false),
  ('vicuna','huesos', 'Cintura pélvica',   'Transfiere fuerza durante la carrera.',                         2,'three',false),
  ('vicuna','huesos', 'Metacarpos',        'Segmentos largos que reducen el peso distal.',                   3,'four', false),
  ('vicuna','huesos', 'Columna vertebral', 'Sostiene el cuello largo y permite postura alerta y flexible.',  1,NULL,   true),
  ('vicuna','huesos', 'Costillas',         'Caja torácica amplia para mayor capacidad pulmonar en la altura.',2,NULL,  true),
  ('vicuna','huesos', 'Pelvis',            'Conecta la columna con las extremidades; transfiere fuerza.',    3,NULL,   true),
  ('vicuna','huesos', 'Fémur',             'Poderoso hueso del muslo que impulsa la carrera.',               6,NULL,   true),
  ('vicuna','huesos', 'Tibia',             'Hueso principal de la pierna posterior, largo y resistente.',    7,NULL,   true),
  ('vicuna','organos','Pulmones',     'Favorecen el intercambio gaseoso en gran altitud.',                   0,'one',  false),
  ('vicuna','organos','Corazón',      'Sostiene la circulación durante desplazamientos rápidos.',            1,'two',  false),
  ('vicuna','organos','Estómago',     'Procesa pastos de baja calidad nutricional.',                        2,'three',false),
  ('vicuna','organos','Bazo',         'Reserva eritrocitos especializados de alta afinidad por el oxígeno.',3,'four', false),
  ('vicuna','organos','Pulmones',          'Ampliados para favorecer el intercambio gaseoso en la puna.',   0,NULL,   true),
  ('vicuna','organos','Corazón',           'Latido potente que sostiene la circulación en desplazamientos exigentes.',1,NULL,true),
  ('vicuna','organos','Estómago',          'Procesa pastos altoandinos de baja calidad mediante fermentación.',2,NULL, true),
  ('vicuna','organos','Bazo',              'Reserva de eritrocitos con alta afinidad por el oxígeno.',      3,NULL,   true),
  ('vicuna','organos','Riñones',           'Regulan el balance hídrico en ambientes secos y de alta altitud.',4,NULL, true),
  ('vicuna','organos','Hígado',            'Metaboliza los nutrientes absorbidos de los pastos fibrosos.',  5,NULL,   true)
) AS st(sp_slug, l_slug, title, desc, pos, slot, is_key)
WHERE s.slug = st.sp_slug AND l.slug = st.l_slug
ON CONFLICT DO NOTHING;

-- VACA - estructuras principales
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
SELECT s.id, l.id, st.title, st.desc, st.pos, st.slot, st.is_key
FROM species s, anatomical_layers l,
(VALUES
  ('vaca','general','Cabeza',   'Mandíbula fuerte para pastoreo y rumiación constante.',          0,'one',  false),
  ('vaca','general','Dorso',    'Soporta el peso corporal y conecta el tren anterior y posterior.',1,'two',  false),
  ('vaca','general','Ubre',     'Órgano productivo clave para la lactancia.',                     2,'three',false),
  ('vaca','general','Pezuñas',  'Requieren cuidado preventivo para evitar lesiones.',             3,'four', false),
  ('vaca','partes', 'Orejas',   'Señales visibles para manejo sanitario e identificación.',       0,'one',  false),
  ('vaca','partes', 'Hocico',   'Explora el alimento y facilita la prensión del pasto.',         1,'two',  false),
  ('vaca','partes', 'Rabo',     'Ayuda a espantar insectos y expresa la conducta del animal.',   2,'three',false),
  ('vaca','partes', 'Patas',    'Soporte robusto para terreno irregular de la sierra.',          3,'four', false),
  ('vaca','huesos', 'Cráneo',   'Base de mandíbula, ojos y cavidad nasal.',                     0,'one',  false),
  ('vaca','huesos', 'Columna',  'Sostiene la gran masa corporal del animal.',                    1,'two',  false),
  ('vaca','huesos', 'Costillar','Protege los órganos torácicos.',                                2,'three',false),
  ('vaca','huesos', 'Pelvis',   'Importante para locomoción y reproducción.',                   3,'four', false),
  ('vaca','huesos', 'Columna vertebral','Sostiene la gran masa corporal y protege la médula espinal.',1,NULL,true),
  ('vaca','huesos', 'Costillar',       '13 pares de costillas que protegen los órganos torácicos.',   2,NULL,true),
  ('vaca','huesos', 'Pelvis',          'Estructura clave para locomoción, reproducción y parto.',      3,NULL,true),
  ('vaca','huesos', 'Fémur',           'Hueso más largo del cuerpo, soporta el peso trasero.',        6,NULL,true),
  ('vaca','organos','Rumen',    'Fermenta forrajes mediante microorganismos simbióticos.',        0,'one',  false),
  ('vaca','organos','Retículo', 'Selecciona partículas y apoya la rumiación.',                  1,'two',  false),
  ('vaca','organos','Corazón',  'Mantiene la circulación en un cuerpo de gran tamaño.',         2,'three',false),
  ('vaca','organos','Pulmones', 'Oxigenan la sangre durante actividad y reposo.',               3,'four', false),
  ('vaca','organos','Rumen',          'Primer compartimento; fermenta forrajes con microorganismos.',  0,NULL,true),
  ('vaca','organos','Retículo',       'Segundo compartimento; selecciona partículas y devuelve bolo.', 1,NULL,true),
  ('vaca','organos','Omaso',          'Tercer compartimento; absorbe agua y reduce el bolo.',          2,NULL,true),
  ('vaca','organos','Abomaso',        'Cuarto compartimento; estómago verdadero con enzimas.',         3,NULL,true),
  ('vaca','organos','Intestino delgado','Absorbe la mayoría de los nutrientes del alimento digerido.', 4,NULL,true),
  ('vaca','organos','Hígado',         'Procesa nutrientes absorbidos y desintoxica el organismo.',     5,NULL,true),
  ('vaca','organos','Corazón',        'Gran corazón que mantiene la circulación en un cuerpo masivo.', 7,NULL,true),
  ('vaca','organos','Pulmones',       'Amplia superficie de intercambio gaseoso para un animal grande.',8,NULL,true)
) AS st(sp_slug, l_slug, title, desc, pos, slot, is_key)
WHERE s.slug = st.sp_slug AND l.slug = st.l_slug
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────
-- Sistemas fisiológicos
-- ────────────────────────────────────────
INSERT INTO organ_systems (species_id, layer_id, icon, label, text, position)
SELECT s.id, l.id, os.icon, os.label, os.txt, os.pos
FROM species s, anatomical_layers l,
(VALUES
  ('cuy','organos','leaf',    'Digestión',   'Transforma la fibra vegetal en nutrientes aprovechables.',         0),
  ('cuy','organos','waves',   'Respiración', 'Los pulmones oxigenan la sangre y el organismo.',                  1),
  ('cuy','organos','heart',   'Circulación', 'El corazón distribuye sangre a todo el cuerpo.',                   2),
  ('cuy','organos','activity','Excreción',   'Riñones y vejiga eliminan desechos y regulan líquidos.',           3),
  ('vicuna','organos','leaf',    'Digestión',   'Fermenta pastos altoandinos de bajo valor nutricional.',        0),
  ('vicuna','organos','waves',   'Respiración', 'Pulmones adaptados a la escasez de oxígeno en la puna.',       1),
  ('vicuna','organos','heart',   'Circulación', 'Hemoglobina especializada transporta oxígeno con eficiencia.', 2),
  ('vicuna','organos','activity','Excreción',   'Riñones regulan líquidos en ambientes secos y fríos.',         3),
  ('vaca','organos','leaf',    'Digestión',   'El rumen fermenta forrajes con microorganismos simbióticos.',     0),
  ('vaca','organos','waves',   'Respiración', 'Pulmones de gran volumen para oxigenar un cuerpo de 400+ kg.',   1),
  ('vaca','organos','heart',   'Circulación', 'El corazón bombea sangre a cada tejido del cuerpo bovino.',      2),
  ('vaca','organos','activity','Excreción',   'Riñones y tracto urinario regulan el balance hídrico.',          3)
) AS os(sp_slug, l_slug, icon, label, txt, pos)
WHERE s.slug = os.sp_slug AND l.slug = os.l_slug
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────
-- Quizzes y preguntas (5 por especie)
-- ────────────────────────────────────────
-- CUY
INSERT INTO quizzes (species_id, title)
SELECT id, 'Quiz – Cuy andino' FROM species WHERE slug='cuy'
ON CONFLICT DO NOTHING;

WITH quiz AS (SELECT q.id FROM quizzes q JOIN species s ON q.species_id=s.id WHERE s.slug='cuy')
INSERT INTO questions (quiz_id, position, text, success_msg, fail_msg, points)
SELECT quiz.id, q.pos, q.txt, q.suc, q.fail, 20 FROM quiz,
(VALUES
  (0,'¿Qué estructura ayuda al cuy a procesar una dieta rica en fibra?',
   'Correcto: el ciego fermenta fibra vegetal y produce vitaminas del complejo B.',
   'Revisa la digestión: el ciego es clave para aprovechar la fibra vegetal.'),
  (1,'¿Cuál es el nombre científico del cuy andino?',
   'Exacto: Cavia porcellus es el nombre científico del cuy doméstico andino.',
   'El cuy pertenece al género Cavia, distinto de los camélidos.'),
  (2,'¿Qué característica tienen los incisivos del cuy?',
   'Correcto: sus incisivos crecen continuamente, adaptados para roer fibra vegetal.',
   'Piensa en lo que necesita un roedor para mantener sus dientes con una dieta de fibra.'),
  (3,'¿Cuánto pesa aproximadamente un cuy adulto?',
   '¡Bien! El cuy es un pequeño roedor que pesa entre 0.7 y 1.2 kg en estado adulto.',
   'El cuy es mucho más pequeño que un camélido andino.'),
  (4,'¿Qué sistema corporal está más desarrollado en el cuy gracias a su dieta herbívora?',
   'Correcto: su aparato digestivo, especialmente el ciego, está altamente adaptado para procesar fibra.',
   'Piensa en qué sistema trabaja más en un animal que solo come plantas ricas en fibra.')
) AS q(pos, txt, suc, fail)
ON CONFLICT DO NOTHING;

-- Opciones preguntas cuy
INSERT INTO question_options (question_id, position, text, is_correct)
SELECT q.id, o.pos, o.txt, o.correct FROM questions q
JOIN quizzes qz ON q.quiz_id = qz.id
JOIN species s ON qz.species_id = s.id,
(VALUES
  (0, 0, 'Ciego',              true ),
  (0, 1, 'Cuernos',            false),
  (0, 2, 'Aletas',             false),
  (1, 0, 'Cavia porcellus',    true ),
  (1, 1, 'Vicugna vicugna',    false),
  (1, 2, 'Lagidium viscacia',  false),
  (2, 0, 'Crecimiento continuo', true),
  (2, 1, 'Se renuevan una vez',  false),
  (2, 2, 'Son retráctiles',      false),
  (3, 0, '0.7–1.2 kg',  true ),
  (3, 1, '5–8 kg',       false),
  (3, 2, '35–65 kg',     false),
  (4, 0, 'Sistema digestivo', true ),
  (4, 1, 'Sistema muscular',  false),
  (4, 2, 'Sistema nervioso',  false)
) AS o(q_pos, pos, txt, correct)
WHERE s.slug = 'cuy' AND q.position = o.q_pos
ON CONFLICT DO NOTHING;

-- VICUÑA
INSERT INTO quizzes (species_id, title)
SELECT id, 'Quiz – Vicuña' FROM species WHERE slug='vicuna'
ON CONFLICT DO NOTHING;

WITH quiz AS (SELECT q.id FROM quizzes q JOIN species s ON q.species_id=s.id WHERE s.slug='vicuna')
INSERT INTO questions (quiz_id, position, text, success_msg, fail_msg, points)
SELECT quiz.id, q.pos, q.txt, q.suc, q.fail, 20 FROM quiz,
(VALUES
  (0,'¿Qué rasgo ayuda a la vicuña a vivir en el altiplano frío?',
   'Muy bien: su fibra fina conserva el calor en la puna.',
   'Piensa en el abrigo natural que protege del frío altoandino.'),
  (1,'¿Cuál es el nombre científico de la vicuña?',
   'Correcto: Vicugna vicugna es el nombre científico de este camélido silvestre.',
   'La vicuña pertenece al género Vicugna, distinto de los cuyes o bovinos.'),
  (2,'¿Cuál es la característica especial de la hemoglobina de la vicuña?',
   'Exacto: su hemoglobina capta oxígeno con mayor eficiencia, adaptación clave para la puna.',
   'Piensa en cómo un mamífero puede sobrevivir donde hay menos oxígeno.'),
  (3,'¿En qué hábitat vive principalmente la vicuña?',
   'Correcto: la vicuña habita la puna y los bofedales entre 3.500 y 5.000 msnm.',
   'La vicuña está adaptada a las zonas altas y frías de los Andes.'),
  (4,'¿Qué práctica ancestral consiste en capturar y esquilar vicuñas de forma sostenible?',
   'Muy bien: el chaku es la práctica andina de rodeo y esquila sostenible de vicuñas.',
   'El chaku es la técnica ancestral inca de captura colectiva de vicuñas.')
) AS q(pos, txt, suc, fail)
ON CONFLICT DO NOTHING;

INSERT INTO question_options (question_id, position, text, is_correct)
SELECT q.id, o.pos, o.txt, o.correct FROM questions q
JOIN quizzes qz ON q.quiz_id = qz.id
JOIN species s ON qz.species_id = s.id,
(VALUES
  (0, 0, 'Fibra fina y térmica',       true ),
  (0, 1, 'Piel acuático-marina',        false),
  (0, 2, 'Garras arborícolas',          false),
  (1, 0, 'Vicugna vicugna',   true ),
  (1, 1, 'Cavia porcellus',   false),
  (1, 2, 'Bos taurus',        false),
  (2, 0, 'Mayor afinidad por el oxígeno', true ),
  (2, 1, 'Menor cantidad de hierro',      false),
  (2, 2, 'Produce más calor corporal',    false),
  (3, 0, 'Puna y bofedales altoandinos', true ),
  (3, 1, 'Selva amazónica',              false),
  (3, 2, 'Desierto costero',             false),
  (4, 0, 'Chaku', true ),
  (4, 1, 'Minka', false),
  (4, 2, 'Ayni',  false)
) AS o(q_pos, pos, txt, correct)
WHERE s.slug = 'vicuna' AND q.position = o.q_pos
ON CONFLICT DO NOTHING;

-- VACA
INSERT INTO quizzes (species_id, title)
SELECT id, 'Quiz – Vaca andina' FROM species WHERE slug='vaca'
ON CONFLICT DO NOTHING;

WITH quiz AS (SELECT q.id FROM quizzes q JOIN species s ON q.species_id=s.id WHERE s.slug='vaca')
INSERT INTO questions (quiz_id, position, text, success_msg, fail_msg, points)
SELECT quiz.id, q.pos, q.txt, q.suc, q.fail, 20 FROM quiz,
(VALUES
  (0,'¿Qué órgano permite a la vaca fermentar forrajes antes de digerirlos?',
   'Exacto: el rumen fermenta forrajes con ayuda de microorganismos simbióticos.',
   'Vuelve a revisar el sistema digestivo bovino: la clave es el rumen.'),
  (1,'¿Cuántos compartimentos estomacales tiene la vaca?',
   'Correcto: rumen, retículo, omaso y abomaso forman el sistema digestivo bovino.',
   'Los bovinos son rumiantes con cuatro compartimentos estomacales.'),
  (2,'¿Para qué sirve la rumiación en la vaca?',
   'Muy bien: la rumiación permite re-masticar el bolo alimenticio para mejor fermentación.',
   'La rumiación es el proceso de regurgitar y volver a masticar el alimento.'),
  (3,'¿Cuál es el nombre científico de la vaca doméstica?',
   'Correcto: Bos taurus es la especie bovina doméstica.',
   'Los bovinos pertenecen al género Bos, distinto de los camélidos o roedores.'),
  (4,'¿Qué estructura ósea es clave para la reproducción y el parto en la vaca?',
   'Exacto: la pelvis es fundamental para la locomoción, reproducción y el proceso del parto.',
   'Piensa en qué estructura conecta el tren posterior del animal y facilita el nacimiento.')
) AS q(pos, txt, suc, fail)
ON CONFLICT DO NOTHING;

INSERT INTO question_options (question_id, position, text, is_correct)
SELECT q.id, o.pos, o.txt, o.correct FROM questions q
JOIN quizzes qz ON q.quiz_id = qz.id
JOIN species s ON qz.species_id = s.id,
(VALUES
  (0, 0, 'Rumen',               true ),
  (0, 1, 'Vejiga natatoria',    false),
  (0, 2, 'Buche',               false),
  (1, 0, 'Cuatro (rumen, retículo, omaso, abomaso)', true),
  (1, 1, 'Uno, igual que los humanos',               false),
  (1, 2, 'Dos: rumen y abomaso',                     false),
  (2, 0, 'Re-masticar el alimento para mejor digestión', true ),
  (2, 1, 'Almacenar agua en el rumen',                    false),
  (2, 2, 'Expulsar gases tóxicos',                        false),
  (3, 0, 'Bos taurus',       true ),
  (3, 1, 'Vicugna vicugna',  false),
  (3, 2, 'Cavia porcellus',  false),
  (4, 0, 'Pelvis',    true ),
  (4, 1, 'Cráneo',    false),
  (4, 2, 'Costillas', false)
) AS o(q_pos, pos, txt, correct)
WHERE s.slug = 'vaca' AND q.position = o.q_pos
ON CONFLICT DO NOTHING;
