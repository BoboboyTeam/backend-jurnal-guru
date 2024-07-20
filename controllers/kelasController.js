import Kelas from "../models/kelas.js";

class KelasController {
    static async findAll(req, res, next) {
        try {
        const kelas = await Kelas.findAll();
        res.status(200).json(kelas);
        } catch (err) {
        next(err);
        }
    }
    
    static async findOne(req, res, next) {
        try {
        const kelas = await Kelas.findById(req.params.id);
        res.status(200).json(kelas);
        } catch (err) {
        next(err);
        }
    }
    
    static async create(req, res, next) {
        try {
        const { nama, mentor, students } = req.body;
        if (!nama || !mentor || !students) {
            throw { msg: "Data Is Not Complete" };
        }
        const kelas = await Kelas.create({
            nama,
            mentor,
            students,
        });
        res.status(201).json(kelas);
        } catch (err) {
        next(err);
        }
    }
    
    static async updateOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const update = { $set: req.body };
        const kelas = await Kelas.updateOne(filter, update);
        res.status(200).json(kelas);
        } catch (err) {
        next(err);
        }
    }
    
    static async deleteOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const kelas = await Kelas.deleteOne(filter);
        res.status(200).json(kelas);
        } catch (err) {
        next(err);
        }
    }
}

export default KelasController;