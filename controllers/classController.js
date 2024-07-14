const {Class} = require('../models/index');

class ClassController {
    static async getAllClass(req,res,next){
        try{
            const classes = await Class.findAll();
            res.status(200).json(classes)
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = ClassController