import JurnalGuru from "../models/jurnal_guru.js";

export default class JurnalGuruController {
  static async findAll(req, res, next) {
    try {
      let jurnalGuru;
      if (req.user.role === "admin") {
        // Filter Feature
        if (req.query.guru) {
          console.log(req.query.guru);
           jurnalGuru = await JurnalGuru.findAllByGuru(req.query.guru);
          console.log(jurnalGuru);
        } 
        
        else if (req.query.kelas) {
           jurnalGuru = await JurnalGuru.findAllByObj({
            kelas: req.query.kelas,
          });
        } 
        
        else if (req.query.hari) {
           jurnalGuru = await JurnalGuru.findAllByObj({
            hari: req.query.hari,
          });
        }
        else{
        jurnalGuru = await JurnalGuru.findAll();
        }
      } else if (req.user.role === "guru") {
          jurnalGuru = await JurnalGuru.findAllByObj({
          guru: req.user.username,
        });
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
    const month = req.query.month | new Date().getMonth();
    const year = req.query.year | new Date().getFullYear();

    const from = req.query.from ? req.query.from : null;
    const to = req.query.to ? req.query.to : null;
    

    const startDate = from ? new Date(from) :new Date(year, month, 2);
    const endDate = to ? new Date(to) :new Date(year, month+1, 0);

    console.log(startDate);
    console.log(endDate);

    const guru = req.user.role === "admin" ? req.params.id : req.user.nama;
    console.log(guru ? guru : "");
    const jurnalGuru = await JurnalGuru.findAllByGuruDateRange(guru ? guru : "", startDate, endDate);

    let totalJP = 0;
    jurnalGuru.forEach((jurnal) => {
      if(jurnal.jumlahJP){
        totalJP += parseInt(jurnal.jumlahJP);
      }
    });
    jurnalGuru.map((jurnal) => {
      jurnal.createAt = new Date(jurnal.createAt).toDateString();
      jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
    });
    const gaji = totalJP * 8000;

    console.log("DEBUG",jurnalGuru);
    return jurnalGuru.length > 0 ? res.status(200).json({
      totalJP,
      gaji,
      data:jurnalGuru,
    }) : res.status(404).json({ message: "Data not found" });

  } catch (error) {
    next(error)
  }
  
  }

  static async findNow(req, res, next) {
    try {
      const startDate = req.user.startDate;
      const endDate = req.user.endDate;
      const guru = req.user.nama;
      const jurnalGuru = await JurnalGuru.findAllByGuruDateRange(guru,startDate, endDate);
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
