// Importamos del archivo user.model la funcion que conecta con ambas bases de datos y las funciones para crear el contenido de la base de datos
import {connectToDatabase, createClient, createProduct, createSale} from "../models/user.model.js";

// Creamos una funcion que contenga a la funcion que conecta con la conexion a las bases de datos de user.model que sera lo que nos llevemos al enpoint del server
export async function connection (req, res) {
    await connectToDatabase();
    res.send('Conexiones realizadas');
}

// Creamos una funcion que nos llevamos al enpoint del server para crear un usuario
export async function createNewClient (req, res) {
    await createClient(req.body.dni, req.body.firstname, req.body.lastname, req.body.card_mumber)
    res.json({message: "Cliente creado"});
}

// Creamos una funcion que nos llevamos al enpoint del server para crear un producto
export async function createNewProduct (req, res) {
    await createProduct(req.body.bar_code, req.body.name, req.body.price)
    res.json({message: "Producto creado"});
}

// Creamos una funcion que nos llevamos al enpoint del server para crear una venta
export async function createNewSale (req, res) {
    await createSale(req.body.bar_code, req.body.name, req.body.price)
    res.json({message: "Venta creada"});
}