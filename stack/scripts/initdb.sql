CREATE DATABASE IF NOT EXISTS `libreria`;

USE `libreria`;

DROP TABLE IF EXISTS venta_libro;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS venta;
DROP TABLE IF EXISTS libro;
DROP TABLE IF EXISTS autor;

CREATE TABLE autor (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    pais VARCHAR(255) NOT NULL
);

CREATE TABLE libro (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_publicacion DATE NOT NULL,
    precio FLOAT NOT NULL
);

CREATE TABLE venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha_venta DATE NOT NULL,
    total FLOAT NOT NULL
);

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL
);

CREATE TABLE venta_libro (
    id_venta INT,
    id_libro INT,
    PRIMARY KEY (id_venta, id_libro),
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_libro) REFERENCES libro(id_libro) ON DELETE CASCADE
);

INSERT INTO `autor` (`nombre`, `pais`) VALUES 
('Ana', 'USA'),
('Sofia', 'Spain'),
('Maria', 'Spain'),
('Luis', 'Spain'),
('Jose', 'USA'),
('Carlos', 'USA'),
('Sofia', 'Spain'),
('Maria', 'Mexico'),
('Jose', 'Mexico'),
('Sofia', 'USA');

commit;

INSERT INTO `libro` (`titulo`, `fecha_publicacion`, `precio`) VALUES
('Libro 1', '2012-12-08', 35.65),
('Libro 2', '2006-01-02', 97.37),
('Libro 3', '2020-11-18', 87.73),
('Libro 4', '2007-09-24', 22.37),
('Libro 5', '1997-09-27', 68.97),
('Libro 6', '2005-05-24', 96.48),
('Libro 7', '2014-05-21', 83.46),
('Libro 8', '2021-06-12', 47.42),
('Libro 9', '1998-01-07', 60.28),
('Libro 10', '2014-02-11', 10.53),
('Libro 11', '2001-01-19', 76.03),
('Libro 12', '1993-07-01', 22.45),
('Libro 13', '2020-02-27', 23.91),
('Libro 14', '1990-03-11', 51.75),
('Libro 15', '2011-04-28', 18.96),
('Libro 16', '1990-11-15', 31.30),
('Libro 17', '2007-09-24', 12.16),
('Libro 18', '2012-10-09', 25.92),
('Libro 19', '2002-09-29', 20.67),
('Libro 20', '2001-04-19', 66.88);

commit;

INSERT `venta` (`fecha_venta`, `total`) VALUES 
('2017-02-23', 45.72),
('2012-03-10', 125.68),
('2015-12-29', 118.80),
('2022-01-01', 180.21),
('2009-08-25', 261.00),
('2018-06-23', 279.77),
('2019-09-14', 66.72),
('2007-06-29', 244.26),
('2011-06-19', 161.50),
('2002-03-26', 117.89),
('1991-01-15', 219.33),
('2014-07-30', 155.37),
('2008-11-26', 70.56),
('2003-07-29', 109.30),
('1991-05-27', 257.80);

commit;

INSERT INTO `cliente` (`nombre`, `correo`) VALUES
('Sofia', 'cliente1@correo.com'),
('Lucía', 'cliente2@correo.com'),
('José', 'cliente3@correo.com'),
('María', 'cliente4@correo.com'),
('John', 'cliente5@correo.com'),
('José', 'cliente6@correo.com'),
('Sofia', 'cliente7@correo.com'),
('María', 'cliente8@correo.com'),
('Sofia', 'cliente9@correo.com'),
('Carlos', 'cliente10@correo.com');

commit;

INSERT INTO `venta_libro` (`id_venta`, `id_libro`) VALUES
(8, 15),
(13, 6),
(10, 17),
(14, 11),
(3, 5),
(1, 6),
(12, 16),
(8, 7),
(6, 7),
(3, 18),
(12, 18),
(8, 4),
(9, 7),
(7, 5),
(13, 14),
(15, 12),
(2, 20),
(1, 5),
(3, 19),
(11, 19),
(11, 4),
(2, 13),
(1, 18),
(9, 9),
(10, 16),
(4, 18),
(6, 9);

commit;




