import { Router } from "express";
import {registrar , perfil , confirmar , autenticar, olvidePassword , comprobarToken , nuevoPassword} from '../controller/veterinarioController.js'
import checkAuth from "../middleware/authMiddleware.js";

const router = Router();

//Area publica
router.post('/' , registrar);
router.get('/confirmar/:token' , confirmar);
router.post('/login' , autenticar);

//router olvide contraseña
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


//Area privada
router.get('/perfil', checkAuth, perfil);

export default router;