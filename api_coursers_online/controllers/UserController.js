import models from '../models'
import bcrypt from "bcryptjs"
import token from "../service/token"

export default {
    register: async (req, res) => {
        try {
            // Validar que password no sea undefined
            if (!req.body.password) {
                return res.status(400).json({ message: "La contraseña es obligatoria" });
            }

            // Encriptar contraseña
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const User = await models.User.create(req.body);
            res.status(200).json({
                user: User,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "OCURRIÓ UN PROBLEMA"
            });
        }
    },
    login: async(req,res) => {
        try {
            //email y contraseña
            //req.body.email y req.body.password
            const user = await models.User.findOne({
                email: req.body.email,
                state: 1,
            });
            if(user){
                //COMPARAR LAS CONTRASEÑAS
                let compare = await bcrypt.compare(req.body.password,user.password);
                if(compare){
                //UN USUARIO EXISTENTE Y ACTIVO
                let tokenT = await token.encode(user._id,user.rol,user.email);

                const USER_BODY = {
                    token: tokenT,
                    user:{
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        //avatar: user.avatar
                    }
                }
                res.status(200).json({
                    USER: USER_BODY,
                });
                }else{
                    res.status(500).send({
                        message: "EL USUARIO INGRESADO NO EXISTE",
                    });
                }
   
            

            }else{
                res.status(500).send({
                    message: "EL USUARIO INGRESADO NO EXISTE",
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "HUBO UN ERROR",
            });
        }
    }
}
