// Importamos sequelize
import { Sequelize } from "sequelize";

// Creamos una funcion que exportamos que conecte sequelize con la base de datos mysql que en este caso se llamara SuperPlus y que tiene como usuario root y como contraseña root 
export function connectionmysql() {
        return new Sequelize('SuperPlus', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false // Desactiva los logs SQL;
    });
};