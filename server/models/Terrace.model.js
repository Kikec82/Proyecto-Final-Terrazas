const { Schema, model } = require("mongoose")

const terraceSchema = new Schema(
  {
    terraceName: {
      type: String,
      required: true
    },
    terraceCity: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      // required: true,
      min: 1,
      max: 10
    },
    numberOfRatings: {
      type: Number,
      default: 0,
      required: true
    }, 
    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
  },
  { timestamps: true }
)

terraceSchema.index({ location: '2dsphere' });

const Terrace = model("Terrace", terraceSchema)

module.exports = Terrace