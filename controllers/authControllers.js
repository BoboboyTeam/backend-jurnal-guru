const {User} = require('../models/index');
const {generateToken} = require('../helpers/jwt');
const {comparePassword, hashPassword} = require('../helpers/bcrypt');

class AuthController {
    static async register(req,res,next){
        try{
            const {name,email,password,role} = req.body;
            const checkUser = await User.findOne({where: {email}});
            
            switch(true){
                case !name:
                    throw {msg: 'Name Is Empty'}
                case !email:
                    throw {msg: 'Email Is Empty'}
                case !password:
                    throw {msg: 'Password Is Empty'}
                case !role:
                    throw {msg: 'Role Is Empty'}
            }


            if(checkUser){
                throw {msg: 'Email Already Exist'}
            }
            
            const user = await User.create({
                name,
                email,
                password: hashPassword(password),
                role});
            res.status(201).json({
                id: user.id, 
                email: user.email, 
                role: user.role
            });
        }
        catch(err){
            next(err)
        }
    }

    static async login(req,res,next){
        try{
            const {email,password} = req.body;

            switch(true){
                case !email:
                    throw {msg: 'Email Is Empty'}
                case !password:
                    throw {msg: 'Password Is Empty'}
            }

            const user = await User.findOne({where: {email}});

            if(!user){
                throw {msg: 'User Not Found'}
            }
            else{
                if(comparePassword(user.password , password)){
                    const access_token = generateToken({id: user.id});
                    res.status(200).json({access_token});
                }
                else{
                    throw {msg: 'Invalid Email Password'}
                }
            }
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = AuthController