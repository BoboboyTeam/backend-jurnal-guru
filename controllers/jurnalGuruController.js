import JurnalGuru from "../models/jurnal_guru.js";

export default class JurnalGuruController {
  static async findAll(req, res, next) {
    try {
      if (req.user.role === "admin") {
        // Filter Feature
        if (req.query.guru) {
          console.log(req.query.guru);
          const jurnalGuru = await JurnalGuru.findAllByGuru(req.query.guru);
          console.log(jurnalGuru);
          return jurnalGuru.length > 0
            ? res.status(200).json(jurnalGuru)
            : res.status(404).json({ message: "Data not found" });
        } else if (req.query.kelas) {
          const jurnalGuru = await JurnalGuru.findAllByObj({
            kelas: req.query.kelas,
          });
          return jurnalGuru.length > 0
            ? res.status(200).json(jurnalGuru)
            : res.status(404).json({ message: "Data not found" });
        } else if (req.query.hari) {
          const jurnalGuru = await JurnalGuru.findAllByObj({
            hari: req.query.hari,
          });
          return jurnalGuru.length > 0
            ? res.status(200).json(jurnalGuru)
            : res.status(404).json({ message: "Data not found" });
        }

        // Main Feature
        const jurnalGuru = await JurnalGuru.findAll();
        return jurnalGuru.length > 0
          ? res.status(200).json(jurnalGuru)
          : res.status(404).json({ message: "Data not found" });
      } else if (req.user.role === "guru") {
        const jurnalGuru = await JurnalGuru.findAllByObj({
          guru: req.user.username,
        });
        return jurnalGuru.length > 0
          ? res.status(200).json(jurnalGuru)
          : res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async findNow(req, res, next) {
    try {
      const startDate = req.user.startDate;
      const endDate = req.user.endDate;
      const guru = req.user.nama;
      const jurnalGuru = await JurnalGuru.findAllByGuruNow(guru,startDate, endDate);
      return jurnalGuru.length > 0
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async findAllByGuru(req, res, next) {
    try {
      const jurnalGuru = await JurnalGuru.findAllByGuru(req.params.guru);
      return jurnalGuru.length > 0
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const jurnalGuru = await JurnalGuru.findById(req.params.id);
      return jurnalGuru
        ? res.status(200).json(jurnalGuru)
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
      console.log(req.body);
      const jurnalGuru = await JurnalGuru.create({
        hari,
        mapel,
        kelas,
        jamKe,
        createAt: new Date(),
        updateAt: new Date(),
        guru,
        guruPengganti,
        materi,
        jumlahJP,
      });

      res.status(201).json(jurnalGuru);
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const filter = { _id: req.params.id };
      const update = { $set: { ...req.body, updateAt: new Date() } };
      console.log(update);
      const jurnalGuru = await JurnalGuru.updateOne(filter, update);
      console.log(jurnalGuru);
      return jurnalGuru
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const filter = { _id: req.params.id };
      const jurnalGuru = await JurnalGuru.deleteOne(filter);
      return jurnalGuru
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }
}
