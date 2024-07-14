const { Journal } = require('../models/index');

class JournalController {
    static async createJournal(req, res, next) {
        try {
            const body = req.body;
            const { role } = req.user; // Assuming the user role is stored in req.user.role
            let newJournal;
            
            newJournal = await Journal.create({ ...body, createdAt: new Date(), updatedAt: new Date() });
            
            

            res.status(201).json(newJournal);
        } catch (err) {
            next(err);
        }
    }

    static async getAllJournal(req, res, next) {
        try {
            const { role } = req.user; // Assuming the user role is stored in req.user.role
            let journals;

            if (role === 'teacher') {
                const date = new Date();
                journals = await Journal.findAll({
                    where: {
                        createdAt: date,
                        guru: req.user.id
                    }
                });
            } else if (role === 'admin') {
                journals = await Journal.findAll();
            } else {
                throw { name: 'Unauthorized' };
            }

            res.status(200).json(journals);
        } catch (err) {
            next(err);
        }
    }

    static async getJournalById(req, res, next) {
        try {
            const id = req.params.id;
            const { role } = req.user; // Assuming the user role is stored in req.user.role
            let journal;

            if (role === 'teacher') {
                journal = await Journal.findOne({
                    where: {
                        id,
                        guru: req.user.id
                    }
                });
            } else if (role === 'admin') {
                journal = await Journal.findByPk(id);
            } else {
                throw { name: 'Unauthorized' };
            }

            if (!journal) {
                throw { name: 'JournalNotFound' };
            }

            res.status(200).json(journal);
        } catch (err) {
            next(err);
        }
    }

    static async updateJournal(req, res, next) {
        try {
            const id = req.params.id;
            const body = req.body;
            const { role } = req.user; // Assuming the user role is stored in req.user.role
            let journal;

            if (role === 'teacher') {
                journal = await Journal.findOne({
                    where: {
                        id,
                        guru: req.user.id
                    }
                });
            } else if (role === 'admin') {
                journal = await Journal.findByPk(id);
            } else {
                throw { name: 'Unauthorized' };
            }

            if (!journal) {
                throw { name: 'JournalNotFound' };
            }

            const res = await journal.update({ ...body, updatedAt: new Date() });
            res.status(200).json(res);
        } catch (err) {
            next(err);
        }
    }

    static async deleteJournal(req, res, next) {
        try {
            const id = req.params.id;
            const { role } = req.user; // Assuming the user role is stored in req.user.role
            let journal;

            if (role === 'teacher') {
                journal = await Journal.findOne({
                    where: {
                        id,
                        guru: req.user.id
                    }
                });
            } else if (role === 'admin') {
                journal = await Journal.findByPk(id);
            } else {
                throw { name: 'Unauthorized' };
            }

            if (!journal) {
                throw { name: 'JournalNotFound' };
            }

            await journal.destroy();
            res.status(200).json({ message: 'Journal deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = JournalController;