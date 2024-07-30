import { ObjectId } from "mongodb";
import JurnalGuru from "../models/jurnal_guru.js";

export default class JurnalGuruController {
  static async findAll(req, res, next) {
    try {
      let jurnalGuru;
      console.log(req.user, "<<");
      if (req.user.role === "admin") {
        // Filter Feature
        if (req.query.guru) {
          console.log(req.query.guru);
          jurnalGuru = await JurnalGuru.findAllByGuru(req.query.guru);
          console.log(jurnalGuru);
        } else if (req.query.kelas) {
          jurnalGuru = await JurnalGuru.findAllByObj({
            kelas: req.query.kelas,
          });
        } else if (req.query.hari) {
          jurnalGuru = await JurnalGuru.findAllByObj({
            hari: req.query.hari,
          });
        } else {
          jurnalGuru = await JurnalGuru.findAll();
        }
      } else if (req.user.role === "guru") {
        jurnalGuru = await JurnalGuru.findAllByGuruId(req.user.id);
      }
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      // Main Feature
      return jurnalGuru.length > 0
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async findAllByRangeDate(req, res, next) {
    try {
      console.log(
        req.query,
        "<<<<<<<<<<<<<<<RANGNGNGNGN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
      );
      const month = req.query?.month ? req.query?.month : new Date().getMonth()>9 ? new Date().getMonth()+1 : `0${new Date().getMonth()+1}`;
      const year = req.query?.year ? req.query?.year : new Date().getFullYear();

      const from = req.query.from ? req.query.from : null;
      const to = req.query.to ? req.query.to : null;

      console.log( req.query.year ? req.query.month : new Date().getFullYear(), to, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      console.log( req.query.month, req.query.year, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      console.log(month, year, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

      const startDate = from ? new Date(from) : new Date(`${year}-${month}`);
      const endDate = to ? new Date(to) : new Date(`${year}`,`${month}`,0);

      console.log(startDate);
      console.log(endDate);

      const guru = req.user.role === "admin" ? new ObjectId(req.params.id) : req.user.id;
      console.log(guru ? guru : "", "<<<<<<<<<<<<<<<<GURUURUR");
      console.log(req.params.id, "<<");
      const jurnalGuru = await JurnalGuru.findAllByGuruDateRange(
        guru ? guru : "",
        startDate,
        endDate
      );
      console.log(jurnalGuru, "<<AAAAAAAAAAAAAA");

      let totalJP = 0;
      let dataJP = {};
      jurnalGuru.forEach((jurnal) => {
        if (
          jurnal?.jumlahJP &&
          (jurnal?.guruPengganti === "") |
            (jurnal?.guruPengganti?._id === jurnal?.guru?._id)
        ) {
          totalJP += parseInt(jurnal.jumlahJP);
        }
        console.log(
          jurnal.jumlahJP,
          "<<<<<<<<<<<<<<<<<<<SSSSSSSSSSSs<<<<<<<<<<<<<<<<<"
        );
        const monthKey = jurnal.createAt.getMonth();
        const jumlahJP = jurnal.jumlahJP ? parseInt(jurnal.jumlahJP) : 0;
        if (dataJP[monthKey]) {
          dataJP[monthKey]["jumlahJP"] += jumlahJP;
          dataJP[monthKey]["gaji"] += jumlahJP * 8000;
        } else {
          dataJP[monthKey] = {};
          dataJP[monthKey]["jumlahJP"] = jumlahJP;
          dataJP[monthKey]["gaji"] = jumlahJP * 8000;
        }
      });
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      const gaji = totalJP * 8000;

      console.log("DEBUG", dataJP);
      return jurnalGuru.length > 0
        ? res.status(200).json({
            totalJP,
            gaji,
            dataJP,
            data: jurnalGuru,
          })
        : res.status(404).json({ message: "Data not found" });
    } catch (error) {
      next(error);
    }
  }

  static async findNow(req, res, next) {
    try {
      const startDate = req.user.startDate;
      const endDate = req.user.endDate;
      const guru = req.user.nama;
      const jurnalGuru = await JurnalGuru.findAllByGuruDateRange(
        guru,
        startDate,
        endDate
      );
      console.log(jurnalGuru, "JURNOAL OW");
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      return res.status(200).json(jurnalGuru);
    } catch (err) {
      next(err);
    }
  }
  static async findAllByGuruId(req, res, next) {
    try {
      console.log(req.params.id, "<<<<<<<<<<<<<<<<<<<<<<<<<<,");
      const jurnalGuru = await JurnalGuru.findAllByGuruId(req.params.id);
      jurnalGuru?.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
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
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
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
      jurnalGuru.createAt = new Date(jurnalGuru.createAt).toDateString();
      jurnalGuru.updateAt = new Date(jurnalGuru.updateAt).toDateString();
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
      guru._id = new ObjectId(guru._id);
      if (guruPengganti?._id) {
        guruPengganti._id = new ObjectId(guruPengganti._id);
      }
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
      req.body.guru._id = new ObjectId(req.body.guru._id);
      if(req.body.guruPengganti?._id){
        req.body.guruPengganti._id = new ObjectId(req.body.guruPengganti._id);
      }
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
