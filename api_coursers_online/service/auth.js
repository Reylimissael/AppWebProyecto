import token from './token';

export default {
    verifyTienda: async (req, res, next) => {
        if(!req.headers.token){
            res.status(404).send({
                message: 'NO SE ENVIO EL TOKEN'
            });
        }
        const response = await token.decode(req.headers.token);
        if (response) {
            if (response.rol === 'cliente' || response.rol === 'admin') {
                next();
            } else {
                res.status(403).send({
                    message: 'NO ESTÁ PERMITIDO VISITAR ESTA PÁGINA'
                });
            }
        } else {
            res.status(403).send({
                message: 'EL TOKEN ES INVÁLIDO'
            });
        }
    },
    verifyAdmin: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'NO SE ENVIO EL TOKEN'
            });
        }
        const response = await token.decode(req.headers.token);
        if (response) {
            if (response.rol === 'admin') {
                next();
            } else {
                res.status(403).send({
                    message: 'NO ESTÁ PERMITIDO VISITAR ESTA PÁGINA'
                });
            }
        } else {
            res.status(403).send({
                message: 'EL TOKEN ES INVÁLIDO'
            });
        }
    }
};
