const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  anime: [
    {
      animeId: {
        type: Number
      },
      title: {
        type: String
      },
      image: {
        type: String
      }
    }
  ],
  movie: [
    {
      movieId: {
        type: Number
      },
      title: {
        type: String
      },
      image: {
        type: String
      }
    }
  ],
  tvshow: [
    {
      tvId: {
        type: Number
      },
      title: {
        type: String
      },
      image: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
