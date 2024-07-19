import JurnalGuru from "../models/jurnal_guru";

export default class JurnalGuruController {
    static async findAll(req, res, next) {
        try {
        const jurnalGuru = await JurnalGuru.findAll();
        return jurnalGuru ? res.status(200).json(jurnalGuru): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }
    
    static async findOne(req, res, next) {
        try {
        const jurnalGuru = await JurnalGuru.findById(req.params.id);
        return jurnalGuru ? res.status(200).json(jurnalGuru): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }
    
    static async create(req, res, next) {
        try {
        const { hari, mapel, kelas, jamKe, mataPelajaran, guru, guruPengganti, materi, jumlahJP } = req.body;
    
        const jurnalGuru = await JurnalGuru.create({
            hari,
            mapel,
            kelas,
            jamKe,
            createAt: new Date(),
            updateAt: new Date(),
            mataPelajaran,
            guru,
            guruPengganti,
            materi,
            jumlahJP
        });
    
        res.status(201).json(jurnalGuru);
        } catch (err) {
        next(err);
        }
    }
    
    static async updateOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const update = { $set: {...req.body,updateAt:new Date()} };
        const jurnalGuru = await JurnalGuru.updateOne(filter, update);
        return jurnalGuru ? res.status(200).json(jurnalGuru): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }
    
    static async deleteOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const jurnalGuru = await JurnalGuru.deleteOne(filter);
        return jurnalGuru ? res.status(200).json(jurnalGuru): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
        next(err);
        }
    }
}
