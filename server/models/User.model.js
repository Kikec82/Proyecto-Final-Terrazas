const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      },
      message: 'Ingresa un email válido'
    }
  },
  image: {
    type: String,
    required: false,
    default: ""
  },
  path:{
    type:String
  }
},
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
