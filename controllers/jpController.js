import JP from "../models/jadwal_pelajaran.js";
import { ObjectId } from "mongodb";
class JPController {
  static async findAll(req, res, next) {
    try {
        console.log(req.query, "QUERYAAAAAAAAAAAAAAAAaaa<<");
      if (req.user.role === "admin") {
        if (req.query) {
          let query = {};
          if (req.query.guru) {
            query["guru.nama"] = { $regex: "" + req.query.guru, $options: "i" };
          }
          if (req.query.kelas) {
            query["kelas.nama"] = {
              $regex: "" + req.query.kelas,
              $options: "i",
            };
          }
          if (req.query.hari) {
            query["hari"] = { $regex: "" + req.query.hari, $options: "i" };
          }
          const jp = await JP.findAllByObj(query);
          return jp
            ? res.status(200).json(jp)
            : res.status(404).json({ message: "Data not found" });
        }
        const jp = await JP.findAll();
        return jp.length > 0
          ? res.status(200).json(jp)
          : res.status(404).json({ message: "Data not found" });
      } else if (req.user.role === "guru") {
        const jp = await JP.findAllByGuruAndHari(req.user.nama, req.user.hari);
        return jp
          ? res.status(200).json(jp)
          : res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const jp = await JP.findById(req.params.id);
      console.log(!jp);
      return jp
        ? res.status(200).json(jp)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const {
        hari,
        mapel,
        kelas,
        jamKe,
        guru,
        guruPengganti,
        materi,
        jumlahJP,
      } = req.body;

      console.log(guru._id);
      guru._id = new ObjectId(guru._id);
      if (guruPengganti?._id) {
        guruPengganti._id = new ObjectId(guruPengganti._id);
      }
      console.log(guru._id);
      const jp = await JP.create({
        hari,
        mapel,
        kelas,
        jamKe,

        guru,
        guruPengganti,
        materi,
        jumlahJP,
      });

      res.status(201).json(jp);
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      req.body.guru._id = new ObjectId(req.body.guru._id);
      if (req.body.guruPengganti?._id) {
        req.body.guruPengganti._id = new ObjectId(req.body.guruPengganti._id);
      }
      const filter = { _id: req.params.id };
      const update = { $set: req.body };
      const jp = await JP.updateOne(filter, update);
      return jp
        ? res.status(200).json(jp)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const filter = { _id: req.params.id };
      const jp = await JP.deleteOne(filter);
      console.log(jp);
      return jp
        ? res.status(200).json(jp)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }
}

export default JPController;
