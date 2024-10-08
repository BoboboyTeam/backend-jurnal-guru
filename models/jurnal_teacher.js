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
    return await this.col()
      .find({
        $or: [
          { "teacher._id": new ObjectId(teacherId) },
          { "teacher._id": "" + teacherId },
          { "teacher._id": teacherId },
        ],
      })
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
    let teacherQuery = {};

    // Build the teacher query part
    if (teacher._id) {
      teacherQuery = {
        $or: [
          {
            $or: [
              { "teacher._id": teacher._id },
              { "teacher._id": "" + teacher._id },
            ],
          },
          {
            $or: [
              { "teacherReplacement._id": teacher._id },
              { "teacherReplacement._id": "" + teacher._id },
            ],
          },
        ],
      };
    } else if (typeof teacher === typeof new ObjectId()) {
      teacherQuery = {
        $or: [
          {
            $or: [{ "teacher._id": teacher }, { "teacher._id": "" + teacher }],
          },
          {
            $or: [
              { "teacherReplacement._id": teacher },
              { "teacherReplacement._id": "" + teacher },
            ],
          },
        ],
      };
    } else {
      teacherQuery["$or"] = [
        { "teacher.nama": { $regex: teacher, $options: "i" } },
        { "teacherReplacement.nama": { $regex: teacher, $options: "i" } },
      ];
    }

    Object.keys(teacherQuery).forEach((item) => {});

    // Build the date range query part
    const dateRangeQuery = {
      $or: [
        // { createAt: { $gte: startDate, $lt: endDate } },
        { updateAt: { $gte: startDate, $lt: endDate } },
      ],
    };

    Object.keys(dateRangeQuery).forEach((item) => {});

    // Combine both queries using $and
    const query = {
      $and: [teacherQuery, dateRangeQuery],
    };

    return await this.col().find(query).toArray();
  }

  static async findOne(obj) {
    return await this.col().findOne(obj);
  }

  static async findById(id) {
    return await this.col().findOne({ _id: new ObjectId(id) });
  }

  static async create(obj) {
    Object.keys(obj).forEach((key) => {
      if (
        obj[key] &&
        typeof obj[key] !== "string" &&
        Object.keys(obj[key]).length > 0
      ) {
        obj[key]._id = new ObjectId(obj[key]._id);
      }
    });
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    Object.keys(update["$set"]).forEach((key) => {
      if (
        update["$set"][key] &&
        typeof update["$set"][key] !== "string" &&
        Object.keys(update["$set"][key]).length > 0
      ) {
        update["$set"][key]._id = new ObjectId(update["$set"][key]._id);
      }
    });
    return await this.col().updateOne(filter, update);
  }
  static async updateMany(filter, update) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    return await this.col().updateMany(filter, update);
  }

  static async deleteOne(filter) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    return await this.col().deleteOne(filter);
  }
}
