# REST Api de gestion de concesionarios y coches

Este proyecto se basa en la creacion de una API rest que gestiona concesionarios con diferentes coches que se pueden
agregar eliminar o actualizar, todo esto esta hecho en express

## Estreuctura del repositorio

El repositorio se compone de una rama de produccion main, una de desarrollo llamada develop y dos feature

### Ramas feature

#### routerConcesionario

En esta rama se desarrolla el router primcipal, el de los concesionarios

#### routerCoches

En esta rama de desarrolla las subramas de los coches de los concesionarios

### Rama develop

En esta rama se suben las 2 features y se comprueba que funcionen juntas

## Modelo de Datos

las requests solo aceptaran json con los datos indicados, para concesionarios [nombre, direccion, coches] y para los coches [modelo, cv, precio]

## Endpoints
### Concesionarios
* GET /concesionarios: Obtiene todos los concesionarios.
* POST /concesionarios: Crea un nuevo concesionario.
* GET /concesionarios/:id: Obtiene un concesionario por su ID.
* PUT /concesionarios/:id: Actualiza un concesionario por su ID.
* DELETE /concesionarios/:id: Borra un concesionario por su ID.
### Coches
* GET /concesionarios/:id/coches: Devuelve todos los coches de un concesionario.
* POST /concesionarios/:id/coches: Añade un nuevo coche a un concesionario.
* GET /concesionarios/:id/coches/:cocheId: Obtiene un coche por su ID dentro de un concesionario.
* PUT /concesionarios/:id/coches/:cocheId: Actualiza un coche por su ID dentro de un concesionario.
* DELETE /concesionarios/:id/coches/:cocheId: Borra un coche por su ID dentro de un concesionario.

