import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req,res,next) => {
    let token;
    //Se comprueba si existe token
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Separamos la primer parte del token, osea, sacamos la primer palabra que es Bearer.
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            //de esta forma creamos la session
            req.veterinario = await Veterinario.findById(decoded.id).select('-password');

            return next();
        } catch (error) {
            const e = new Error ('Token no valido o inexistente');
            return res.status(403).json({msg: e.message});
        }
    }

    if(!token){
        const error = new Error ('Token no valido o inexistente');
        res.status(403).json({msg: error.message});
    }
    next();
}

export default checkAuth;