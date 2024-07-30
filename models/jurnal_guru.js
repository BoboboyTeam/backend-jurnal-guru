import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class JurnalGuru {
  static col() {
    return db.collection("jurnal_guru");
  }

  static async findAll() {
    return await this.col().find({}).toArray();
  }

  static async findAllByGuruId(guruId) {
    console.log(guruId,"MMMMMMMMM");
    return await this.col().find({ "guru._id": new ObjectId(guruId) }).toArray();
  }

  static async findAllByObj(obj) {
    return await this.col().find(obj).toArray();
  }
  static async findAllByGuru(guru) {
    return await this.col()
      .find({ "guru.nama": { $regex: "" + guru, $options: "i" } })
      .toArray();
  }
  static async findAllByGuruDateRange(guru, startDate, endDate) {
    const query={}
    if(guru._id){
      query["guru._id"]=guru._id
    }
    else if(typeof guru === typeof new ObjectId){
      query["guru._id"]=guru
    }
    else{
      query["guru.nama"]={$regex:guru, $options: "i"}
      
    }
    console.log("GURU TYPE",typeof guru);
    console.log("GURU",guru);
    console.log(query);
    console.log(startDate);
    console.log(endDate);
    return await this.col()
      .find({...query,
        $or: [
          { createAt: { $gte: startDate, $lt: endDate } },
          { updateAt: { $gte: startDate, $lt: endDate } },
        ],
      })
      .toArray();
  }
  

  static async findOne(obj) {
    return await this.col().findOne(obj);
  }

  static async findById(id) {
    return await this.col().findOne({ _id: new ObjectId(id) });
  }

  static async create(obj) {
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    return await this.col().updateOne(filter, update);
  }

  static async deleteOne(filter) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    console.log(filter,"<<<<<<<<<<<<");
    return await this.col().deleteOne(filter);
  }
}
