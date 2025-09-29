const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const products = [
    {
        name: 'Elegant Evening Gown',
        description: 'A stunning floor-length evening gown perfect for formal occasions. Features a flattering silhouette and luxurious fabric.',
        price: 299,
        category: 'evening',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [{ name: 'Navy Blue', hexCode: '#000080' }],
        images: [{ url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae', public_id: 'dress1' }],
        stock: 25,
        rating: 4.8,
        numReviews: 45,
        occasion: 'formal',
        material: 'Silk blend',
        features: ['Floor-length', 'Zipper closure', 'Dry clean only'],
        aiTags: ['elegant', 'formal', 'luxury'],
        isFeatured: true
    },
    {
        name: 'Floral Summer Dress',
        description: 'Light and breezy floral dress perfect for summer days. Comfortable fit with a beautiful print.',
        price: 89,
        category: 'casual',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [{ name: 'Pink Floral', hexCode: '#FFB6C1' }],
        images: [{ url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1', public_id: 'dress2' }],
        stock: 40,
        rating: 4.6,
        numReviews: 32,
        occasion: 'casual',
        material: 'Cotton',
        features: ['Floral print', 'Adjustable straps', 'Machine washable'],
        aiTags: ['casual', 'summer', 'floral'],
        isNewArrival: true
    },
    {
        name: 'Classic Little Black Dress',
        description: 'Timeless little black dress that works for any occasion. Versatile and elegant.',
        price: 159,
        category: 'cocktail',
        sizes: ['S', 'M', 'L'],
        colors: [{ name: 'Black', hexCode: '#000000' }],
        images: [{ url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956', public_id: 'dress3' }],
        stock: 30,
        rating: 4.9,
        numReviews: 67,
        occasion: 'cocktail',
        material: 'Polyester blend',
        features: ['Knee-length', 'Side zipper', 'Lined'],
        aiTags: ['classic', 'versatile', 'elegant'],
        isFeatured: true
    },
    {
        name: 'Bohemian Maxi Dress',
        description: 'Free-spirited maxi dress with beautiful patterns. Perfect for beach days and festivals.',
        price: 129,
        category: 'casual',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [{ name: 'Turquoise', hexCode: '#40E0D0' }],
        images: [{ url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', public_id: 'dress4' }],
        stock: 35,
        rating: 4.5,
        numReviews: 28,
        occasion: 'casual',
        material: 'Rayon',
        features: ['Maxi length', 'Tie waist', 'Flowy'],
        aiTags: ['bohemian', 'maxi', 'casual']
    },
    {
        name: 'Red Carpet Gown',
        description: 'Show-stopping red gown perfect for galas and special events. Turn heads wherever you go.',
        price: 449,
        category: 'evening',
        sizes: ['XS', 'S', 'M'],
        colors: [{ name: 'Ruby Red', hexCode: '#E0115F' }],
        images: [{ url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae', public_id: 'dress5' }],
        stock: 15,
        rating: 5.0,
        numReviews: 89,
        occasion: 'formal',
        material: 'Satin',
        features: ['Floor-length', 'Corset back', 'Fully lined'],
        aiTags: ['glamorous', 'red carpet', 'luxury'],
        isFeatured: true
    },
    {
        name: 'Vintage Tea Dress',
        description: 'Charming vintage-inspired tea dress with retro flair. Perfect for garden parties.',
        price: 99,
        category: 'casual',
        sizes: ['S', 'M', 'L'],
        colors: [{ name: 'Mint Green', hexCode: '#98FF98' }],
        images: [{ url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c', public_id: 'dress6' }],
        stock: 28,
        rating: 4.7,
        numReviews: 41,
        occasion: 'casual',
        material: 'Cotton blend',
        features: ['Midi length', 'Button front', 'Pockets'],
        aiTags: ['vintage', 'retro', 'tea dress']
    },
    {
        name: 'Sequin Party Dress',
        description: 'Dazzling sequin dress that shimmers with every move. Be the life of the party!',
        price: 189,
        category: 'cocktail',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [{ name: 'Gold', hexCode: '#FFD700' }],
        images: [{ url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae', public_id: 'dress7' }],
        stock: 22,
        rating: 4.8,
        numReviews: 55,
        occasion: 'party',
        material: 'Sequin fabric',
        features: ['Mini length', 'Fully sequined', 'Lined interior'],
        aiTags: ['party', 'sequin', 'sparkle'],
        isNewArrival: true
    },
    {
        name: 'Business Professional Dress',
        description: 'Polished and professional dress for the modern working woman. Sophisticated and comfortable.',
        price: 139,
        category: 'professional',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [{ name: 'Charcoal Gray', hexCode: '#36454F' }],
        images: [{ url: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f', public_id: 'dress8' }],
        stock: 45,
        rating: 4.6,
        numReviews: 38,
        occasion: 'business',
        material: 'Wool blend',
        features: ['Knee-length', 'Structured fit', 'Pockets'],
        aiTags: ['professional', 'business', 'workwear']
    },
    {
        name: 'Beach Sundress',
        description: 'Lightweight sundress perfect for beach vacations and hot summer days.',
        price: 69,
        category: 'casual',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [{ name: 'Coral', hexCode: '#FF7F50' }],
        images: [{ url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1', public_id: 'dress9' }],
        stock: 50,
        rating: 4.4,
        numReviews: 26,
        occasion: 'beach',
        material: 'Linen blend',
        features: ['Short length', 'Strappy', 'Breathable'],
        aiTags: ['beach', 'summer', 'casual']
    },
    {
        name: 'Lace Wedding Guest Dress',
        description: 'Romantic lace dress perfect for weddings and special celebrations.',
        price: 219,
        category: 'cocktail',
        sizes: ['S', 'M', 'L'],
        colors: [{ name: 'Blush Pink', hexCode: '#FFE4E1' }],
        images: [{ url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', public_id: 'dress10' }],
        stock: 20,
        rating: 4.9,
        numReviews: 73,
        occasion: 'wedding',
        material: 'Lace overlay',
        features: ['Midi length', 'Lace details', 'Fully lined'],
        aiTags: ['romantic', 'lace', 'wedding guest'],
        isFeatured: true
    }
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}