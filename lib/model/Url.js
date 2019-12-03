const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  customUrl: {
    type: String,
    unique: true
  },
  hits: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

schema.virtual('shortUrl').get(function() {
  return this.customUrl ? this.customUrl : this._id;
});

module.exports = mongoose.model('URL', schema);
