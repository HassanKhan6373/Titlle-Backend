const mongoose = require('mongoose');

// Define a schema for user orders
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    // required: true,
    unique: true,
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
    required: true,
  },product:{
    type:String,
    required:true
  },comm:{
    type:String,
    required:true
  },totalReturn:{
    type:String,
    required:false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
});

// Create a model for user orders based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;