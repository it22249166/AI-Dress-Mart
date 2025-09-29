const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['casual', 'evening', 'cocktail', 'professional', 'formal', 'party']
    },
    sizes: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    }],
    colors: [{
        name: String,
        hexCode: String
    }],
    images: [{
        url: String,
        public_id: String
    }],
    brand: {
        type: String,
        default: 'AI Dress Mart'
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [reviewSchema],
    occasion: {
        type: String,
        enum: ['casual', 'formal', 'party', 'business', 'wedding', 'beach', 'cocktail']
    },
    material: {
        type: String,
        default: ''
    },
    features: [String],
    aiTags: [String], // For AI recommendation system
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);