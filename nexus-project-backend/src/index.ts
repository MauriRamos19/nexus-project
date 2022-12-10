import express, {Express} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.router'
import entityRouter from './routes/entities.router'
import Database from './db/database'
import config from './config';



const app: Express = express()
const PORT = config.port
const database:Database = new Database();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api/auth', authRouter)
app.use('/api/entity', entityRouter)

app.listen(PORT, () => {
    console.log(`El servidor se levanto en el puerto ${PORT}`)
})


