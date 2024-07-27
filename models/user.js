import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class User {
  static col() {
    return db.collection("users");
  }

  static async findAll(){
    return await this.col().find({}).toArray();
  }
  static async findAllByRole(role){
    return await this.col().find({ role }).toArray();
  }

  static async findOne(obj){
    if (obj._id){
      obj._id = new ObjectId(obj._id);
    }
    return await this.col().findOne(obj);
  }

  static async findById(id){
    return await this.col().findOne({ _id:new ObjectId(id) });
  }

  static async create(obj){
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update){
    if (filter._id){
      filter._id = new ObjectId(filter._id);
    }
    return await this.col().updateOne(filter, update);
  }

  static async deleteOne(filter){
    if (filter._id){
      filter._id = new ObjectId(filter._id);
    }
    return await this.col().deleteOne(filter);
  }


  
}

