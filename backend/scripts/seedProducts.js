console.log("Seed script started...");

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

const products = [
    {
        name: "Casual Dress",
        description: "Simple casual dress for everyday wear",
        price: 45,
        category: "casual",
        sizes: ["S", "M", "L"],
        stock: 10,
        isNewArrival: true,
        images: [{ url: "https://via.placeholder.com/300", public_id: "casual1" }]
    },
    {
        name: "Evening Gown",
        description: "Elegant evening gown for special occasions",
        price: 150,
        category: "evening",
        sizes: ["M", "L"],
        stock: 5,
        isFeatured: true,
        images: [{ url: "https://via.placeholder.com/300", public_id: "evening1" }]
    },
    {
        name: "Cocktail Dress",
        description: "Stylish cocktail dress for parties",
        price: 120,
        category: "cocktail",
        sizes: ["S", "M", "L"],
        stock: 8,
        images: [{ url: "https://via.placeholder.com/300", public_id: "cocktail1" }]
    }
];

const seedProducts = async () => {
    await connectDB();

    try {
        console.log("Deleting old products...");
        await Product.deleteMany({});
        console.log("Old products deleted.");

        console.log("Inserting new products...");
        const inserted = await Product.insertMany(products);
        console.log(`${inserted.length} products seeded successfully!`);

        mongoose.disconnect();
    } catch (err) {
        console.error("Seeding error:", err);
        mongoose.disconnect();
    }
};

seedProducts();