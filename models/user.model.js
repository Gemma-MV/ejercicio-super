// Aqui estamos importando una parte específica del paquete sequelize, en este caso, estamos importando DataTypes, los tipos de datos de sequelize. DataTypes es un objeto en Sequelize que contiene varios tipos de datos que puedes utilizar cuando defines los campos de tus modelos (como STRING, INTEGER, BOOLEAN, etc.).
import { DataTypes } from 'sequelize';
// Importamos la conexion a mysql y a mongo que esta en la carpeta de databases
import {connectionmysql} from '../databases/mysql.connection.js';
import {connectionmongoose} from '../databases/mongoose.connection.js';

// Creamos una instancia de Sequelize que conecta con la conexion a mysql
const sequelize = connectionmysql();

// Aqui metemos el enlace a las conexiones de mysql y mongo a la vez para que conecte con las 2 juntas en una funcion que vamos a exportar
export async function connectToDatabase () {
    try {
        // Autenticamos la conexión a la base de datos mysql
        await sequelize.authenticate();
        console.log('Conectado a MySQL');

        // Sincronizamos con la base de datos
        await sequelize.sync();
        console.log('Modelos sincronizados');
      
        // Hacemos un await que conecta con mongo
        await connectionmongoose();
        console.log('Conectado a Mongoose');
  
      } catch (err) {
        console.error('Error de conexión a MySQL:', err);
      }
};

// Aqui creamos la tabla clientes, le damos un id con INT, hacemos que sea la primarykey y sea autoincrementada y le damos un dni, nombre, apellidos y numero de tarjeta que sean NOT NULL y creamos la tabla
const client = sequelize.define('client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  card_mumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'client'
});

const product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bar_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
}, {
    tableName: 'product'
});

// Aqui creamos la tabla de ventas con un id que sea INT, AUTO_INCREMENT y que tenga unas forenkey que sean el id del cliente y el id del producto
const sale = sequelize.define('sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientid: {
      type: DataTypes.STRING,
      references: {
        model: client,
        key: 'id'
      }
    },
    productid: {
      type: DataTypes.STRING,
      references: {
        model: product,
        key: 'id'
      }
    }
}, {
    tableName: 'sale'
});

// Relación: Un Cliente puede tener muchas Compras
client.hasMany(sale, { foreignKey: 'clientid' });
// Relación: Una Compra pertenece a un Cliente
sale.belongsTo(client, { foreignKey: 'clientid' });

// Relación: Un Producto puede ser comprado en una Compra
product.hasOne(sale, { foreignKey: 'productid' });
// Relación: Una Compra tiene un Producto
sale.belongsTo(product, { foreignKey: 'pproductid' });

// Funcion para crear el nuevo cliente donde le pasamos como parametro los valores que tiene que contener la tabla (dni, nombre, apellidos y numero de tarjeta)
export async function createClient(dni, firstname, lastname, card_mumber) {
  try {
    const newClient = await client.create({ dni, firstname, lastname, card_mumber });
    console.log('Usuario creado:', newClient.toJSON());
    return newClient;
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

// Funcion para crear el nuevo producto donde le pasamos como parametro los valores que tiene que contener la tabla (codigo de barras, nombre y precio)
export async function createProduct(bar_code, name, price) {
  try {
    const newProduct = await product.create({ bar_code, name, price });
    console.log('Producto creado:', newProduct.toJSON());
    return newProduct;
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
}

// Funcion para crear la nueva venta donde le pasamos como parametro los valores que tiene que contener la tabla (los forenkey del id del cliente y el id del producto)
export async function createSale(clientid, productid) {
  try {
    const newSale = await sale.create({ clientid, productid });
    console.log('Venta creada:', newSale.toJSON());
    return newSale;
  } catch (error) {
    console.error('Error al crear la venta:', error);
  }
}