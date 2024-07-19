import User from '../models/user.js';

class UserController {
    static async findAll(req, res, next) {
        try {
            const user = await User.findAll();
            return user ? res.status(200).json(user): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }

    static async findOne(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            return user ? res.status(200).json(user): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                throw { msg: 'Data Is Not Complete' };
            }
            const user = await User.create({
                name,
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
            const user = await User.deleteOne(filter);
            return user ? res.status(200).json(user): res.status(404).json({ message: 'Data not found' });
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;