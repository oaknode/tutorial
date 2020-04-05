var express = require("express");

const insert = (db, entry) => {
  return new Promise((resolve, reject) => {
    const col = db.collection("entries");
    col.insert({ entry }, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

const listEntries = (db) => {
  return new Promise((resolve, reject) => {
    const col = db.collection("entries");
    col.find({}).toArray((err, docs) => {
      if (err) reject(err);
      else resolve(docs.map((x) => x.entry));
    });
  });
};

module.exports = function (client) {
  const router = express.Router();
  const db = client.db("guestbook");

  router.get("/", async (req, res, next) => {
    if (req.query.entry) {
      console.log(req.query.entry);
      await insert(db, req.query.entry);
    }
    const entries = await listEntries(db);
    res.render("index", { title: "Moncc tutorial app", entries });
  });

  return router;
};
