// Importamos la biblioteca express y los enpoints: connection que contiene desde user.controller las conexiones a las bases de datos, createNewClient que contiene la creacion del nuevo cliente, createNewProduct que contiene la creacion del nuevo producto y createNewSale que contiene la creacion de la nueva venta
import express, {json} from "express";
import {connection, createNewClient, createNewProduct, createNewSale} from '../ejercicio-super/controllers/user.controller.js';

// Almacenamos en una constante app la aplicacion en express para que nos sea mas facil trabajar con ella
const app = express();

// Agregamos el middleware (Un middleware es una función que se ejecuta cada vez que el servidor recibe una solicitud (request)) y le agregamos el json para que nuestra aplicación pueda entender y procesar datos en formato JSON que se envíen en las solicitudes
app.use(json());

//Enpoint de conexion
app.get("/conexion", connection);
//Enpoint de crear cliente
app.post("/create-client", createNewClient);
//Enpoint de crear producto
app.post("/create-product", createNewProduct);
//Enpoint de crear venta
app.post("/create-sale", createNewSale);


// Iniciamos el servidor solo después de establecer la conexión a la base de datos
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});