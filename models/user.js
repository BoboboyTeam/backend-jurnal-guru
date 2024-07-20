import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class User {
  static col() {
    return db.collection("users");
  }

  static async findAll(){
    return await this.col().find({}).toArray();
  }

  static async findOne(obj){
    return await this.col().findOne(obj);
  }

  static async findById(id){
    return await this.col().findOne({ _id:new ObjectId(id) });
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

