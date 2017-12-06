const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const materialFacade = require("../material/facade");


const materialRatingSchema = new Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materialid: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  rating: { type: Number, required: true }
});

materialRatingSchema.index({userid: 1, materialid: 1}, {unique: true});

//Recalculate average rating from all ratings with same materialid
materialRatingSchema.post('save', function(doc, next) {
  let materialRating = this;
  //Find all ratings with same materialid
  this.constructor.find({materialid: materialRating.materialid})
  .then(rateDocs => {
    //Calculate the average and update the material
    let sum = 0;
    for(let i = 0; i < rateDocs.length; i++) {
        sum += rateDocs[i].rating;
    }
    let denominator = rateDocs.length;
    materialFacade.findOne({_id: materialRating.materialid})
    .then(matDoc => {
        matDoc.avgRating = sum / denominator;
        return matDoc.save();
    })
    .then(() => next())
  });
});

module.exports =  mongoose.model('Rating', materialRatingSchema);
