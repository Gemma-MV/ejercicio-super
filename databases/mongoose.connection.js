// Importamos mongoose
import mongoose from 'mongoose';

// Metemos la conexion de Mongo para poder exportarla. Conectamos a mongodb y a la base de datos que contiene que ya hemos creado. Si conecta correctamente nos dara "Conectado a MongoDB" por consola, sino pasara al catch de error de conexion
export function connectionmongoose() {
    return mongoose.connect('mongodb://127.0.0.1:27017/SuperPlus', {
    }).then(() => {
      console.log('Conectado a MongoDB');
    }).catch(err => {
      console.error('Error de conexión a MongoDB:', err);
    });   
}

// Guardamos en la constante userSchema un nuevo esquema de Mongoose. Un esquema define la estructura de los documentos en una colección de MongoDB, en este caso los datos que va a contener nuestra coleccion de mongo son id, user que contendra un email que sera unico y una contraseña que seran requeridos (NOT NULL)
const userSchema = new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    user: {
      type: String,
      required: true,
      unique: true
    },
    pass: {
      type: String,
      required: true,
      unique: true
    }
  });

const users = mongoose.model('users', userSchema);