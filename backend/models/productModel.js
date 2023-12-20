const {Schema, model, default: mongoose} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product Name"],
    },
    description: {
        type: String,
        required: [true, "Please enter product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product Price"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product Category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product Stock"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },

        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('products', productSchema);