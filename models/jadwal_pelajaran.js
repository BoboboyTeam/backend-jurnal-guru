import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class JP {
  static col() {
    return db.collection("jp");
  }

  static async findAll(){
    return await this.col().find({}).toArray();
  }

  static async findAllByObj(obj){
    return await this.col().find(obj).toArray();
  }

  static async findOne(obj){
    return await this.col().findOne(obj);
  }

  static async findById(id){
    return await this.col().findOne({ _id:new ObjectId(id) });
  }

  static async findByObjId(obj){
    if (obj._id){
      obj._id =new ObjectId(obj._id);
    }
    return await this.col().findOne(obj);
  }
  
  static async create(obj){
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update){
    return await this.col().updateOne(filter, update);
  }

  static async deleteOne(filter){
    return await this.col().deleteOne(filter);
  }
  
}

