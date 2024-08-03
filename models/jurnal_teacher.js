import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class JurnalGuru {
  static col() {
    return db.collection("jurnal_teacher");
  }

  static async findAll() {
    return await this.col().find({}).toArray();
  }

  static async findAllByGuruId(teacherId) {
    console.log(teacherId, "MMMMMMMMM");
    return await this.col()
      .find({ "teacher._id": new ObjectId(teacherId) })
      .toArray();
  }

  static async findAllByObj(obj) {
    return await this.col().find(obj).toArray();
  }
  static async findAllByGuru(teacher) {
    return await this.col()
      .find({ "teacher.nama": { $regex: "" + teacher, $options: "i" } })
      .toArray();
  }
  static async findAllByGuruDateRange(teacher, startDate, endDate) {
    const query = {};
    if (teacher._id) {
      query["teacher._id"] = teacher._id;
    } else if (typeof teacher === typeof new ObjectId()) {
      query["teacher._id"] = teacher;
    } else {
      query["teacher.nama"] = { $regex: teacher, $options: "i" };
    }
    console.log("GURU TYPE", typeof teacher);
    console.log("GURU", teacher);
    console.log(query);
    console.log(startDate);
    console.log(endDate);
    return await this.col()
      .find({
        ...query,
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
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key]!=='string' && Object.keys(obj[key]).length > 0) {
        obj[key]._id = new ObjectId(obj[key]._id);
      }
    });
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    Object.keys(update).forEach((key) => {
      if (update[key] && typeof update[key]!=='string' && Object.keys(update[key]).length > 0) {
        update[key]._id = new ObjectId(update[key]._id);
      }
    });
    return await this.col().updateOne(filter, update);
  }

  static async deleteOne(filter) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    console.log(filter, "<<<<<<<<<<<<");
    return await this.col().deleteOne(filter);
  }
}
