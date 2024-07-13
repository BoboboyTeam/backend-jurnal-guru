const {User} = require('../models/index');
const {verifyToken} = require('../helpers/jwt')

module.exports = {
    async authentication(req,res,next){
        try{
            const {authorization} = req.headers;
            if(!access_token){
                throw {name: 'Invalid Token'}
            }
            else{
                const [type, access_token] = authorization.split(' ');
                
                if(type !== 'Bearer'){
                    throw {name: 'Invalid Token'}
                }
                const {id} = verifyToken(access_token);
                
                if(!id){
                    throw {name: 'AuthenticationFailed'}
                }
                
                else{
                    const user = await User.findByPk(id);
                    if(!user){
                        throw {name: 'User Not Found'}
                    }
                    else{
                        req.user = {
                            id: user.id,
                            role: user.role
                        };
                        next()
                    }
                }
            }
        }
        catch(err){
            next(err)
        }
    }
}