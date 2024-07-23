import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class JurnalGuru {
  static col() {
    return db.collection("jurnal_guru");
  }

  static async findAll() {
    return await this.col().find({}).toArray();
  }

  static async findAllByObj(obj) {
    return await this.col().find(obj).toArray();
  }
  static async findAllByGuru(guru) {
    return await this.col()
      .find({ "guru.nama": { $regex: "" + guru, $options: "i" } })
      .toArray();
  }
  static async findAllByGuruNow(guru, startDate, endDate) {
    console.log(startDate);
    return await this.col()
      .find({
        "guru.nama": { $regex: "" + guru, $options: "i" },
        $or: [
          {
            createAt: { $gte: startDate, $lt: endDate },
          },
          { 
            updateAt: { $gte: startDate, $lt: endDate } 
          },
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
    return await this.col().deleteOne(filter);
  }
}
