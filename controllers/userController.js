const {User} = require('../models/index');

class userController{
    static async getAllUser(req,res,next){
        try{
            const users = await User.findAll();
            res.status(200).json(users)
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = userController