INSERT INTO breeds (species_id, name, description) VALUES
  ((SELECT id FROM species WHERE slug='cuy'), 'Peru', 'Raza de alto rendimiento carnico, pelaje corto y liso.'),
  ((SELECT id FROM species WHERE slug='cuy'), 'Andino', 'Adaptado a zonas frias y de gran altitud, robusto y resistente.'),
  ((SELECT id FROM species WHERE slug='vaca'), 'Holstein', 'Alta produccion lechera, color blanco y negro.'),
  ((SELECT id FROM species WHERE slug='vaca'), 'Brown Swiss', 'Adaptada a la sierra, buena produccion de leche y carne.'),
  ((SELECT id FROM species WHERE slug='vaca'), 'Criollo andino', 'Rustica y resistente a la altura, de tamano mas pequeno.');
