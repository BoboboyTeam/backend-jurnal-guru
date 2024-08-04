const User = require('../models/user');
const { hashPassword, decryptPassword } = require('../helper/bcrypt');

class UserController {
    static async findAll(req, res, next) {
        try {
            let query = {};
            if(req.query){
                if(req.query.teacher){
                    query["teacher.nama"] = {
                        $regex: req.query.teacher, $options: "i"
                    }
                }
            }
            console.log(query);
            const user = query ? await User.findByObj(query) : await User.findAll();
            return user ? res.status(200).json(user): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }
    static async findAllByRole(req, res, next) {
        try {
            const user = await User.findAllByRole(req.params.role);
            return user ? res.status(200).json(user): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }
    static async findSelf(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user.id });
            return user ? res.status(200).json({...user,password:decryptPassword(user.password)}): res.status(404).json({ message: 'Data not found' });
        }
        catch (err) {
            next(err);
        }
    }
    
    static async findOne(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            return user ? res.status(200).json({...user,password:decryptPassword(user.password)}): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { nama, email, password, role } = req.body;
            if (!nama || !email || !password || !role) {
                throw { msg: 'Data Is Not Complete' };
            }
            const user = await User.create({
                nama,
                email,
                password,
                role: role.toLowerCase(),
            });
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    static async updateOne(req, res, next) {
        try {
            const filter = { _id: req.params.id };
            if(req?.body?.password){
                req.body.password = hashPassword(req.body.password);
            }
            const update = { $set: req.body };
            const user = await User.updateOne(filter, update);
            return user ? res.status(200).json(user): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }

    static async deleteOne(req, res, next) {
        try {
            const filter = { _id: req.params.id };
            // const userTest = await User.findById(req.params.id);
            // console.log(userTest);
            // throw { msg: 'User Not Found' };
            const user = await User.deleteOne(filter);
            return user ? res.status(200).json(user): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;