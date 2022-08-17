import express from 'express';
import cors from 'cors';
import conectarDB from './config/db.js'
import dotenv from 'dotenv';
import veterinarioRoutes from './routes/veterinariosRoutes.js'
import pacientesRoutes from './routes/pacientesRoutes.js'

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();


//CONFIGURACION DE CORS
const dominiosPermitidos = ['http://localhost:3000'];
const corsOptions = {
    origin: function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origin del request esta permitido
            callback(null,true);
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors( corsOptions ));
// FIN CONFIGURACION DE CORS
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacientesRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('servidor funcionando el puerto' + PORT)
})