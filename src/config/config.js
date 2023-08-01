import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()
program.option('--mode <mode>', 'Modo de Trabajo', 'DEVELOPMENT')
program.parse()

console.log(program.opts().mode)

dotenv.config({
    path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production'
})

export default {
    PORT: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    secretCode: process.env.SECRET_CODE,
    persistence: process.env.PERSISTENCE
}

