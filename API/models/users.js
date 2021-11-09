const mongoose = require("mongoose");
const advancedEncryption = require("mongoose-advanced-encryption");
require("dotenv/config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      timestamps: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    document: {
      type: String,
      encrypt: {
        hash: {
          unique: false,
          index: false,
        },
      },
    },
    roleAdmin: {
      type: Boolean,
      required: true,
    },
    assignedHealthHome: {
      type: Schema.Types.ObjectId,
      ref: "HealthHome",
    },
    tokenNotification: {
      type: String,
    },
  },
  { timestamps: true }
);

const encKey = process.env.ENC_KEY;
const sigKey = process.env.SIG_KEY;
const authKey = process.env.AUTH_KEY;

userSchema.plugin(advancedEncryption, {
  encryptionKey: encKey,
  hashingKey: sigKey,
  authenticationKey: authKey,
  encrypt: {
    hash: {
      index: true,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
