const {Journal} = require('../models/index');

class JournalController {
    static async createJournal(req,res,next){
        try{
            const body = req.body;
            const newJournal = await Journal.create({...body,createdAt: new Date(),updatedAt: new Date()});
            res.status(201).json(newJournal)
        }
        catch(err){
            next(err)
        }
    }
    static async getJournals(req,res,next){
        try{
            const journals = await Journal.findAll();
            res.status(200).json(journals)
        }
        catch(err){
            next(err)
        }
    }
    static async getJournalById(req,res,next){
        try{
            const id = req.params.id;
            const journal = await Journal.findByPk(id);
            if(!journal){
                throw {name: 'JournalNotFound'}
            }
            res.status(200).json(journal)
        }
        catch(err){
            next(err)
        }
    }
    static async updateJournal(req,res,next){
        try{
            const id = req.params.id;
            const body = req.body;
            const journal = await Journal.findByPk(id);
            if(!journal){
                throw {name: 'JournalNotFound'}
            }
            const res = await journal.update({...body,updatedAt: new Date()});
            res.status(200).json(res)
        }
        catch(err){
            next(err)
        }
    }
    static async deleteJournal(req,res,next){
        try{
            const id = req.params.id;
            const journal = await Journal.findByPk(id);
            if(!journal){
                throw {name: 'JournalNotFound'}
            }
            await journal.destroy();
            res.status(200).json({message: 'Journal deleted successfully'})
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = JournalController