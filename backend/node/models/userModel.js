const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  role: [{
    job: String,
    skill_tier: String,
    tech: [{
      type: {
        type: String,
        options: Boolean
      },
      status: {
        type: Boolean
      },
      duration: {
        type: String
      },
      quiz:[
        {
          "question_schema": String,
          "options": [String],
          "correct_option": String
        }
      ]
    }]
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
