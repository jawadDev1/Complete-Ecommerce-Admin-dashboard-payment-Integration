const { Schema, model, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Shipping Info is requried"]
        },
        city: {
            type: String,
            required: [true, "City is requried"]
        },
        state: {
            type: String,
            required: [true, "State is requried"]
        },
        country: {
            type: String,
            required: [true, "Country is requried"]
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            images: [
                {
                    public_id: String,
                    url: String,
                    _id: String
                }
            ],
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      taxPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      orderStatus: {
        type: String,
        required: true,
        default: "Processing",
      },
      deliveredAt: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = model('orders', orderSchema);