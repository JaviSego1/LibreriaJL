# Proyecto librería Javier y Luis
## Descripción
Nuestro programa consiste en una librería online para la venta de libros, la funcionalidad del programa 
ha sido realizada con Node.js, como motor gráfico hemos utilizado pug, y como sistema gestor de base de datos hemos utilizado mysql.

<br><br>
Para este proyecto hemos utilzado estas dependencias:
- body-parser
- dotenv
- express
- express-session
- mysql2
- pug
<br><br>


### Dependencias
Para la instalación de las dependencias hemos utilizado este comando:

```bash
npm install --save body-parser dotenv express express-session mysql2 pug
```
<br>

### Diagrama de entidades
![alt text](docs/image.png)

<br>

### Tablas SQL
A partir del fichero .xlsx hemos elaborado el código SQL
```SQL
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
    FOREIGN KEY (id_libro) REFERENCES libro(id_libro)
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
```


### Creación contenedor Docker

Para la creación de nuestro contenedor hemos tenido que elaborar un fichero <font color="#0d87cc">**docker-compose.yml**</font>.<br>
Hemos usado adminer como Gestor de Bases de Datos, también hemos usado el comando de *volumes* para que cuando se lance el contendor docker se ejecute en el adminer el fichero initdb, que es el fichero donde tenemos el SQL.
<br>

```yml
version: '3.1'

services:

  adminer:
    image: adminer
    restart: "no"
    ports:
      - ${ADMINER_PORT}:8080

  db-libreria:
    image: mysql:latest
    restart: "no"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - ${MYSQL_PORT}:3306
    volumes:
      - ./scripts:/docker-entrypoint-initdb.d
```
<br>
Además hemos creado un fichero env en el que definimos variables de entorno que pueden utilizarse en los contendores


```.env
MYSQL_ROOT_PASSWORD=javiluis4
MYSQL_USERNAME=root
MYSQL_PORT=33307
MYSQL_HOST=localhost
MYSQL_DATABASE=libreria
ADMINER_PORT=8182
SERVICE_PORT=8000
```
<br><br>


## **CRUD Libros**
<br><br>

| RUTA | VERBO | ACCIÓN | DESCRIPCIÓN |
|----------|----------|----------|----------|
| /    | GET   |    | Muestra información general de la librería   |
| /libro    | GET   | findAll()   | Muestra todos los libros   |
| /libro/add/    | GET   | save()   | Formulario para añadir libro   |
| /libro/add/    | POST   | save()   | Envía el formulario para añadir libro   |
| /libro/edit/:id    | GET   | update()   | Formulario para editar un libro ya existente   |
| /libro/edit/:id    | POST   | update()   | Envía el formulario para editar un libro   |
| /libro/del/:id    | GET   | delete()   | Pregunta si quiere borrar el libro con ese ID   |
| /libro/del/:id    | POST   | delete()   | Elimina al libro con ese ID   |