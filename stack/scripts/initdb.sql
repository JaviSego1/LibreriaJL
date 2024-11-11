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

/* INSERT INTO `autor` (`nombre`, `pais`) VALUES 
('Ana', 'USA'),
('Sofia', 'Spain'),
('Maria', 'Spain'),
('Luis', 'Spain'),
('Jose', 'USA'),
('Carlos', 'USA'),
('Sofia', 'Spain'),
('Maria', 'Mexico'),
('Jose', 'Mexico'),
('Sofia', 'USA'); */

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
    FOREIGN KEY (id_libro) REFERENCES libro(id_libro)
);


