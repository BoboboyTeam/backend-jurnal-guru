import {db} from "./config/index.js";
import {ObjectId} from "mongodb";
import JP from "./jadwal_pelajaran.js";
import JurnalGuru from "./jurnal_teacher.js";

export default class Mapel {
    static col() {
        return db.collection("mapel");
    }
    
    static async findAll() {
        return await this.col().find({}).toArray();
    }
    
    static async findOne(obj) {
        return await this.col().findOne(obj);
    }
    
    static async findById(id) {
        return await this.col().findOne({_id: new ObjectId(id)});
    }
    
    static async create(obj) {
        return await this.col().insertOne(obj);
    }
    
    static async updateOne(filter, update) {
        if (filter._id) {
        filter._id = new ObjectId(filter._id);
        }
        const jp = await JP.findAllByObj({"mapel._id": filter._id});
        if (jp.length > 0) {
        await JP.updateOne({"mapel._id": filter._id}, { $set: { "mapel.nama": update.nama } });
        }
        const jurnal = await JurnalGuru.findAllByObj({"mapel._id": filter._id});
        if (jurnal.length > 0) {
        await JurnalGuru.updateOne({"mapel._id": filter._id}, { $set: { "mapel.nama": update.nama } });
        }
        return await this.col().updateOne(filter, update);
    }
    
    static async deleteOne(filter) {
        if (filter._id) {
        filter._id = new ObjectId(filter._id);
        }
        const jp = await JP.findAllByObj({"mapel._id": filter._id});
        
        if (jp.length > 0) {
        await JP.updateOne({"mapel._id":filter._id}, { $set: { "mapel": null } });
        }
        
        const jurnal = await JurnalGuru.findAllByObj({"mapel._id": filter._id});
        
        if (jurnal.length > 0) {
        await JurnalGuru.updateOne({"mapel._id": filter._id}, { $set: { "mapel": null } });
        }

        return await this.col().deleteOne({filter});
    }
    }