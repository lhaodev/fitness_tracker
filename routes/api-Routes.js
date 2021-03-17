

var db = require("../models");

module.exports = function (app) {

    // Used by api.js to get last workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find(
            {},
        )
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });


    app.post("/api/workouts", (req, res) => {

        db.Workout.create(req.body)
            .then((dbWorkout) => {
                res.json(dbWorkout);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.body)
        db.Workout.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } },
            { new: true }
        ).then((dbWorkout) => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
    });



    app.get("/api/workouts/range", (req, res) => {
        // db.Workout.find({

        // }).limit(7)

        // db.Workout.find().sort({ $natural: -1, _id: 1 }).limit(7)

        db.Workout.aggregate([
            { "$sort": { "_id": -1 } },
            { "$limit": 7 },
            { "$sort": { "_id": 1 } }
        ])

            // db.Workout.find({ $expr: { $limit: 7 } })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
};