import JP from "../models/jadwal_pelajaran";

class JPController {
    static async findAll(req, res, next) {
        try {
        
        const jp = await JP.findAll();
        
        res.status(200).json(jp);
        } catch (err) {
        next(err);
        }
    }
    
    static async findOne(req, res, next) {
        try {
        const jp = await JP.findById(req.params.id);
        res.status(200).json(jp);
        } catch (err) {
        next(err);
        }
    }

    static async create(req, res, next) {
        try {
        const { hari, mapel, kelas, jamKe, mataPelajaran, guru, guruPengganti, materi, jumlahJP } = req.body;

        const absen = False
        
        const jp = await JP.create({
            hari,
            mapel,
            kelas,
            jamKe,
            mataPelajaran,
            guru,
            guruPengganti,
            materi,
            jumlahJP,
            absen
        });

        res.status(201).json(jp);
        } catch (err) {
        next(err);
        }
    }
    
    static async updateOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const update = { $set: req.body };
        const jp = await JP.updateOne(filter, update);
        res.status(200).json(jp);
        } catch (err) {
        next(err);
        }
    }
    
    static async deleteOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const jp = await JP.deleteOne(filter);
        res.status(200).json(jp);
        } catch (err) {
        next(err);
        }
    }
}

export default JPController;