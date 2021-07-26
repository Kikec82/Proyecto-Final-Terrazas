const { Schema, model } = require("mongoose")

const experienceSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    terrace: { type: Schema.Types.ObjectId, ref: 'Terrace', required: true },
    comments: {
        isPositive: Boolean,
        type: String,
        required: true,
        default: 'Sin comentarios',
        minlength: 2,
        maxlength: 250,
        trim: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },

    features: {
        tableDistance: {
            type: String,
            required: true,
            default: '--'
        },
        booking: {
            type: Boolean,
            required: true,
            default: false
        },
        image: {
            type: String,
            //TO-DO required: true,
            default: ''
        },

        music: {
            type: Boolean,
            required: true,
            default: false
        },
        outdoors: {
            type: String,
            required: true,
            default: ''
        },

    }
}, { timestamps: true }
)
const Experience = model("Experience", experienceSchema)

module.exports = Experience