const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: [true, "Please provide an organization name."],
    unique: true,
    trim: true,
    maxlength: [100, "Organization name cannot be more than 100 words."],
  },
  locatedIn: [
    {
      state: {
        type: String,
        required: [
          true,
          "Please provide the state in which organization is located in.",
        ],
      },
      country: {
        type: String,
        required: [
          true,
          "Please provide the country in which organization is located in.",
        ],
      },
    },
  ],
  foundedIn: {
    type: Date,
    required: [
      true,
      "Please provide the date on which organization was established.",
    ],
  },
  logo: {
    type: String,
  },
});

module.exports = mongoose.model("Organization", orgSchema);
