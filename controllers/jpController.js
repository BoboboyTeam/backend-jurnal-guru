import JP from "../models/jadwal_pelajaran.js";

class JPController {
    static async findAll(req, res, next) {
        try {
        if (req.user.role === 'admin') {
            const jp = await JP.findAll();
            return jp ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        }
        else if (req.user.role === 'teacher') {
            const jp = await JP.findAllByObj({guru:req.user.username});
            return jp ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        }

        } catch (err) {
        next(err);
        }
    }
    
    static async findOne(req, res, next) {
        try {
        const jp = await JP.findById(req.params.id);
        return jp ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }

    static async create(req, res, next) {
        try {
        const { hari, mapel, kelas, jamKe, mataPelajaran, guru, guruPengganti, materi, jumlahJP } = req.body;
        
        const jp = await JP.create({
            hari,
            mapel,
            kelas,
            jamKe,
            mataPelajaran,
            guru,
            guruPengganti,
            materi,
            jumlahJP
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
        return jp ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }
    
    static async deleteOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const jp = await JP.deleteOne(filter);
        return jp ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }
}

export default JPController;