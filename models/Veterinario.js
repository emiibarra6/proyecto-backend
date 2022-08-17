import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from "../helpers/generarId.js";

const veterinaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    password: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true,
    },
    telefono:{
        type: String,
        default:null,
        trim:true
    },
    web:{
        type: String,
        deault:null
    },
    token:{
        type: String,
        default:generarId(),
    },
    confirmado: {
        type: Boolean,
        default:false
    }
});

//aca no utilizamos arrows functions por que tenemos que utilizar
//la palabra reservada this. 
//antes de insertar datos:
veterinaSchema.pre('save', async function(next){
    //si un password ya esta hash no lo vuelva a hash
    if (!this.isModified('password')){
        //next es: vete al siguiente middleware
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinaSchema.methods.comprobarPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password)
}

const Veterinario = mongoose.model('Veterinario',veterinaSchema);
export default Veterinario;