const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    pinCode: {
      type: Number,
      required: true,
    },

    phoneNo: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      //   passing reference of product
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Design",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  //   price will be calculated using front end
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },

    // paid or not
    status: {
      type: String,
      required: true,
    },
  },

  // when
  paidAt: {
    type: Date,
    required: true,
  },

  // price of item may be more then one
  ItemPrice: {
    type: String,
    default: 0,
    required: true,
  },

  taxPrice: {
    type: String,
    default: 0,
    required: true,
  },

  shippingPrice: {
    type: String,
    default: 0,
    required: true,
  },

  totalPrice: {
    type: String,
    default: 0,
    required: true,
  },

  // order is either in processing, shipped or delivered
  orderStatus:
  {
    type:String,
    required:true,
    default:"Processing"
  },

  deliveredAt:Date,
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports=new mongoose.model("Order",orderSchema)