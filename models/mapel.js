const db = require("./config/index.js").db;
const ObjectId = require("mongodb").ObjectId;
const JP = require("./jadwal_pelajaran.js");
const JurnalGuru = require("./jurnal_teacher.js");

class Mapel {
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
    return await this.col().findOne({ _id: new ObjectId(id) });
  }

  static async create(obj) {
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    console.log(update, "update");
    const jp = await JP.findAllByObj({ "mapel._id": filter._id });
    console.log(jp[0].mapel, "jp");
    if (jp.length > 0) {
      const updateRespon = await JP.updateMany(
        {
          $or: [{ "mapel._id": filter._id }, { "mapel._id": "" + filter._id }],
        },
        {
          $set: {
            mapel: {
              _id: filter._id,
              nama: update["$set"].nama,
            },
          },
        }
      );
      console.log(updateRespon, "updateRespon");
    }
    const jurnal = await JurnalGuru.findAllByObj({ "mapel._id": filter._id });
    if (jurnal.length > 0) {
      await JurnalGuru.updateMany(
        {
          $or: [{ "mapel._id": filter._id }, { "mapel._id": "" + filter._id }],
        },
        {
          $set: {
            mapel: {
              _id: filter._id,
              nama: update["$set"].nama,
            },
          },
        }
      );
    }
    return await this.col().updateOne(filter, update);
  }

  static async deleteOne(filter) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    const jp = await JP.findAllByObj({ "mapel._id": filter._id });

    if (jp.length > 0) {
      await JP.updateMany(
        {
          $or: [{ "mapel._id": filter._id }, { "mapel._id": "" + filter._id }],
        },
        { $set: { mapel: null } }
      );
    }

    const jurnal = await JurnalGuru.findAllByObj({ "mapel._id": filter._id });

    if (jurnal.length > 0) {
      await JurnalGuru.updateMany(
        {
          $or: [{ "mapel._id": filter._id }, { "mapel._id": "" + filter._id }],
        },
        { $set: { mapel: null } }
      );
    }

    return await this.col().deleteOne(filter);
  }
}
module.exports = Mapel;