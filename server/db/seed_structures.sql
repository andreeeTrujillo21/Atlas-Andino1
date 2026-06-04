-- Estructuras: callouts del visor (slot) y estructuras clave (is_key=true)
-- CUY - Vista general
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Pelaje', 'Denso y suave, conserva el calor en ambientes fríos.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Cabeza', 'Posee sentidos agudos para detectar peligros y comunicarse.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Tronco', 'Cuerpo compacto y robusto, adaptado para la vida en tierra.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Extremidades', 'Patas cortas pero fuertes, con garras que brindan estabilidad.', 3, 'four', false);

-- CUY - Partes externas
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Orejas', 'Perciben sonidos y ayudan a reaccionar ante amenazas.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Bigotes', 'Vibrisas táctiles que orientan al animal en espacios estrechos.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Dentición', 'Incisivos de crecimiento continuo, ideales para roer fibra.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Patas', 'Fuertes y ágiles para cambios rápidos de dirección.', 3, 'four', false);

-- CUY - Huesos (callouts)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Cráneo', 'Protege el encéfalo y sostiene las piezas dentales.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Columna vertebral', 'Eje óseo flexible para postura y movimiento ágil.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Costillas', 'Protegen pulmones y corazón dentro de la caja torácica.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Fémur y tibia', 'Permiten soporte del peso corporal y locomoción estable.', 3, 'four', false);

-- CUY - Huesos (estructuras clave)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Cráneo', 'Protege el encéfalo y sostiene las piezas dentales de crecimiento continuo.', 0, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Columna vertebral', 'Eje óseo flexible que permite postura y movimiento ágil.', 1, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Costillas', 'Protegen pulmones y corazón en la caja torácica.', 2, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Pelvis', 'Conecta la columna con las extremidades posteriores y da estabilidad.', 3, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Húmero', 'Hueso del brazo que conecta el hombro con el codo.', 4, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Radio-cúbito', 'Huesos del antebrazo que permiten el movimiento de la pata delantera.', 5, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Fémur', 'Hueso más largo del cuerpo; soporta el peso y permite el movimiento.', 6, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Tibia', 'Hueso principal de la pierna; junto con el fémur permite la locomoción.', 7, NULL, true);

-- CUY - Órganos (callouts)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Pulmones', 'Realizan el intercambio de gases: oxígeno entra, CO₂ sale.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Corazón', 'Bombea sangre aportando oxígeno y nutrientes a todo el cuerpo.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Ciego', 'Fermenta fibra vegetal y produce vitaminas del complejo B.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Riñones', 'Filtran la sangre y eliminan desechos mediante la orina.', 3, 'four', false);

-- CUY - Órganos (estructuras clave)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Pulmones', 'Realizan el intercambio de gases: oxígeno entra, dióxido de carbono sale.', 0, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Corazón', 'Bombea la sangre aportando oxígeno y nutrientes a todo el cuerpo.', 1, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Hígado', 'Metaboliza nutrientes, desintoxica y produce sustancias esenciales.', 2, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Riñones', 'Filtran la sangre y eliminan desechos mediante la orina.', 3, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Estómago', 'Inicia la digestión y mezcla el alimento con los jugos gástricos.', 4, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Ciego', 'Fermenta la fibra vegetal y produce vitaminas del complejo B.', 5, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Intestino grueso', 'Absorbe agua y forma las heces.', 6, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Intestino delgado', 'Digiere los alimentos y absorbe la mayoría de los nutrientes.', 7, NULL, true),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Vejiga', 'Almacena la orina antes de su eliminación.', 8, NULL, true);

-- VICUÑA - Vista general
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Orejas', 'Largas y móviles para captar sonidos a distancia.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Fibra', 'Fina y térmica, protege del frío altoandino.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Cuello', 'Flexible para vigilancia y alimentación.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Pezuñas', 'Aptas para suelos duros y rocosos de la puna.', 3, 'four', false);

-- VICUÑA - Partes
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Ojos', 'Campo visual amplio para detectar depredadores.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Lomo', 'Línea dorsal ligera que favorece la carrera.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Pecho', 'Capacidad respiratoria adaptada a la baja presión de oxígeno.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Extremidades', 'Delgadas y resistentes para desplazarse con rapidez.', 3, 'four', false);

-- VICUÑA - Huesos (callouts)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Cráneo', 'Estructura liviana con mandíbula adaptada para pastoreo.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Vértebras', 'Sostienen el cuello largo y permiten postura alerta.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Cintura pélvica', 'Transfiere fuerza durante la carrera.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Metacarpos', 'Segmentos largos que reducen el peso distal.', 3, 'four', false);

-- VICUÑA - Huesos (estructuras clave)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Cráneo', 'Estructura liviana con mandíbula adaptada para pastoreo de gramíneas.', 0, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Columna vertebral', 'Sostiene el cuello largo y permite postura alerta y flexible.', 1, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Costillas', 'Caja torácica amplia para mayor capacidad pulmonar en la altura.', 2, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Pelvis', 'Conecta la columna con las extremidades; transfiere fuerza en la carrera.', 3, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Fémur', 'Poderoso hueso del muslo que impulsa la carrera.', 4, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Tibia', 'Hueso principal de la pierna posterior, largo y resistente.', 5, NULL, true);

-- VICUÑA - Órganos (callouts)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Pulmones', 'Favorecen el intercambio gaseoso en gran altitud.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Corazón', 'Sostiene la circulación durante desplazamientos rápidos.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Estómago', 'Procesa pastos de baja calidad nutricional.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Bazo', 'Reserva eritrocitos especializados de alta afinidad por el oxígeno.', 3, 'four', false);

-- VICUÑA - Órganos (estructuras clave)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Pulmones', 'Ampliados para favorecer el intercambio gaseoso en la puna.', 0, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Corazón', 'Latido potente que sostiene la circulación en desplazamientos exigentes.', 1, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Estómago', 'Procesa pastos altoandinos de baja calidad mediante fermentación microbiana.', 2, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Bazo', 'Reserva de eritrocitos con alta afinidad por el oxígeno.', 3, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Riñones', 'Regulan el balance hídrico en ambientes secos y de alta altitud.', 4, NULL, true),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Hígado', 'Metaboliza los nutrientes absorbidos de los pastos fibrosos.', 5, NULL, true);

-- VACA - Vista general
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Cabeza', 'Mandíbula fuerte para pastoreo y rumiación constante.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Dorso', 'Soporta el peso corporal y conecta el tren anterior y posterior.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Ubre', 'Órgano productivo clave para la lactancia.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='general'),
   'Pezuñas', 'Requieren cuidado preventivo para evitar lesiones.', 3, 'four', false);

-- VACA - Partes
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Orejas', 'Señales visibles para manejo sanitario e identificación.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Hocico', 'Explora el alimento y facilita la prensión del pasto.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Rabo', 'Ayuda a espantar insectos y expresa la conducta del animal.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='partes'),
   'Patas', 'Soporte robusto para terreno irregular de la sierra.', 3, 'four', false);

-- VACA - Huesos (callouts)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Cráneo', 'Base de mandíbula, ojos y cavidad nasal.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Columna', 'Sostiene la gran masa corporal del animal.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Costillar', 'Protege los órganos torácicos.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Pelvis', 'Importante para locomoción y reproducción.', 3, 'four', false);

-- VACA - Huesos (estructuras clave)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Cráneo', 'Base de la mandíbula, aloja ojos y cavidad nasal.', 0, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Columna vertebral', 'Sostiene la gran masa corporal y protege la médula espinal.', 1, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Costillar', '13 pares de costillas que protegen los órganos torácicos.', 2, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Pelvis', 'Estructura clave para locomoción, reproducción y parto.', 3, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Fémur', 'Hueso más largo del cuerpo, soporta el peso trasero.', 4, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='huesos'),
   'Tibia', 'Hueso principal de la pierna posterior, proporciona estabilidad.', 5, NULL, true);

-- VACA - Órganos (callouts)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Rumen', 'Fermenta forrajes mediante microorganismos simbióticos.', 0, 'one', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Retículo', 'Selecciona partículas y apoya la rumiación.', 1, 'two', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Corazón', 'Mantiene la circulación en un cuerpo de gran tamaño.', 2, 'three', false),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Pulmones', 'Oxigenan la sangre durante actividad y reposo.', 3, 'four', false);

-- VACA - Órganos (estructuras clave)
INSERT INTO structures (species_id, layer_id, title, description, position, slot, is_key)
VALUES
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Rumen', 'Primer compartimento; fermenta forrajes con ayuda de microorganismos.', 0, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Retículo', 'Segundo compartimento; selecciona partículas y regresa el bolo al rumen.', 1, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Omaso', 'Tercer compartimento; absorbe agua y reduce el tamaño del bolo.', 2, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Abomaso', 'Cuarto compartimento; estómago verdadero que digiere con enzimas.', 3, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Intestino delgado', 'Absorbe la mayoría de los nutrientes del alimento digerido.', 4, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Hígado', 'Procesa nutrientes absorbidos y desintoxica el organismo.', 5, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Corazón', 'Gran corazón que mantiene la circulación en un cuerpo masivo.', 6, NULL, true),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'Pulmones', 'Amplia superficie de intercambio gaseoso para un animal de gran tamaño.', 7, NULL, true);

-- Organ systems
INSERT INTO organ_systems (species_id, layer_id, icon, label, text, position)
VALUES
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'leaf', 'Digestión', 'Transforma la fibra vegetal en nutrientes aprovechables.', 0),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'waves', 'Respiración', 'Los pulmones oxigenan la sangre y el organismo.', 1),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'heart', 'Circulación', 'El corazón distribuye sangre a todo el cuerpo.', 2),
  ((SELECT id FROM species WHERE slug='cuy'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'activity', 'Excreción', 'Riñones y vejiga eliminan desechos y regulan líquidos.', 3),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'leaf', 'Digestión', 'Fermenta pastos altoandinos de bajo valor nutricional.', 0),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'waves', 'Respiración', 'Pulmones adaptados a la escasez de oxígeno en la puna.', 1),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'heart', 'Circulación', 'Hemoglobina especializada transporta oxígeno con eficiencia.', 2),
  ((SELECT id FROM species WHERE slug='vicuna'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'activity', 'Excreción', 'Riñones regulan líquidos en ambientes secos y fríos.', 3),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'leaf', 'Digestión', 'El rumen fermenta forrajes con microorganismos simbióticos.', 0),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'waves', 'Respiración', 'Pulmones de gran volumen para oxigenar un cuerpo de 400+ kg.', 1),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'heart', 'Circulación', 'El corazón bombea sangre a cada tejido del cuerpo bovino.', 2),
  ((SELECT id FROM species WHERE slug='vaca'), (SELECT id FROM anatomical_layers WHERE slug='organos'),
   'activity', 'Excreción', 'Riñones y tracto urinario regulan el balance hídrico.', 3);
