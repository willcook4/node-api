const mongoose = require('mongoose');

const fruitSchema = mongoose.Schema({
  itemName: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  quantityAvail: { type: Number, required: true, min: 0},
  packSize: { type: String, required: true },
  onSpecial: { type: Boolean, default: false },
  taxRate: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
}
);

// Pre save to set createdAt time to current time.
fruitSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Fruit', fruitSchema);