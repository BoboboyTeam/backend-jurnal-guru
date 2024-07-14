const {Mapel} = require('../models/index');

class MapelController {
    static async getAllMapel(req,res,next){
        try{
            const mapels = await Mapel.findAll();
            res.status(200).json(mapels)
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = MapelController