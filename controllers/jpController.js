import JP from "../models/jadwal_pelajaran.js";

class JPController {
    static async findAll(req, res, next) {
        try {
        if (req.user.role === 'admin') {

            const jp = await JP.findAll();
            return jp.length > 0 ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        }
        else if (req.user.role === 'guru') {
            const jp = await JP.findAllByGuruAndHari(req.user.nama, req.user.hari);
            return jp ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        }

        } catch (err) {
        next(err);
        }
    }
    
    static async findOne(req, res, next) {
        try {
        const jp = await JP.findById(req.params.id);
        console.log(!jp);
        return jp ? res.status(200).json(jp) : res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }

    static async create(req, res, next) {
        try {
        const { hari, mapel, kelas, jamKe, guru, guruPengganti, materi, jumlahJP } = req.body;
        
        const jp = await JP.create({
            hari,
            mapel,
            kelas,
            jamKe,
        
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