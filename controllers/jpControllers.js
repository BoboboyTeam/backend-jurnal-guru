const {JP} = require('../models/index');

class JPController {
    static async getAllJP(req,res,next){
        try{
            const jps = await JP.findAll();
            res.status(200).json(jps)
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = JPController