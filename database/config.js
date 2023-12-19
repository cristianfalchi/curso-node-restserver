const mongoose = require('mongoose');

// En un futuro puedo tener mas de una conexion


const dbConnection = async() => {

    try {

        // Esperar que la conexion se haga
        await mongoose.connect(process.env.MONGODB_ATLAS_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Base de datos online');
        
    } catch (error) {
     
        console.log(error);
        throw new Error('Error a la hora de inicial la Base de Datos');
        
    }


}



module.exports = {
    dbConnection
}