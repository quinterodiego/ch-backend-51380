import mongoose from 'mongoose'

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://d86webs:Diego859@cluster0.ahna6cz.mongodb.net/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada!')
    } catch (error) {
        console.log('Error al conectarse a la base de datos', error)
    }
}

export default connectMongoDB