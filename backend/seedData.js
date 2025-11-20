const mongoose = require("mongoose");
require("dotenv").config();

const Transaction = require("./models/Transaction");
const Card = require("./models/Card");
const Goal = require("./models/Goal");

// Sample data for seeding
const sampleTransactions = [
    {
        type: "payment",
        amount: 45000,
        description: "Payment received from John Doe",
        category: "transfer",
        status: "success",
        transactionDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
        type: "spending",
        amount: 599,
        description: "Subscription - Netflix",
        category: "subscription",
        status: "success",
        transactionDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
        type: "payment",
        amount: 125000,
        description: "Payment received from ABC Corp",
        category: "transfer",
        status: "success",
        transactionDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
        type: "spending",
        amount: 2500,
        description: "Grocery Shopping",
        category: "food",
        status: "success",
        transactionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
        type: "spending",
        amount: 5000,
        description: "Mobile Recharge",
        category: "bills",
        status: "success",
        transactionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
];

const sampleCards = [
    {
        cardType: "debit",
        cardNumber: "1234567890122879",
        last4: "2879",
        cardHolder: "John Doe",
        expiryDate: "12/25",
        cvv: "123",
        balance: 285720000, // 28,57,200 in paisa
        status: "active",
        limit: 10000000,
        label: "Domestic",
    },
    {
        cardType: "credit",
        cardNumber: "1234567890121034",
        last4: "1034",
        cardHolder: "John Doe",
        expiryDate: "08/26",
        cvv: "456",
        balance: 121480000, // 12,14,800 in paisa
        status: "disabled",
        limit: 5000000,
        label: "Forex",
    },
    {
        cardType: "virtual",
        cardNumber: "1234567890125621",
        last4: "5621",
        cardHolder: "ABC Corp",
        expiryDate: "03/27",
        cvv: "789",
        balance: 586290000, // 58,62,900 in paisa
        status: "active",
        limit: 20000000,
        label: "Corporate",
    },
];

const sampleGoals = [
    {
        title: "Emergency Fund",
        targetAmount: 50000000, // 5,00,000 in paisa
        currentAmount: 30000000, // 3,00,000 in paisa
        deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
        status: "active",
        category: "savings",
        description: "Building emergency fund for unexpected expenses",
    },
    {
        title: "Vacation to Bali",
        targetAmount: 20000000, // 2,00,000 in paisa
        currentAmount: 5000000, // 50,000 in paisa
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        status: "active",
        category: "travel",
        description: "Dream vacation to Bali",
    },
    {
        title: "New Laptop",
        targetAmount: 10000000, // 1,00,000 in paisa
        currentAmount: 7500000, // 75,000 in paisa
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
        status: "active",
        category: "purchase",
        description: "MacBook Pro for work",
    },
];

async function seedDatabase(userId) {
    try {
        console.log("🌱 Starting database seeding...");

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing data for this user
        await Transaction.deleteMany({ userId });
        await Card.deleteMany({ userId });
        await Goal.deleteMany({ userId });
        console.log("🗑️  Cleared existing data");

        // Seed Transactions
        const transactions = sampleTransactions.map((t) => ({ ...t, userId }));
        await Transaction.insertMany(transactions);
        console.log(`✅ Seeded ${transactions.length} transactions`);

        // Seed Cards (without encryption for seed data)
        const cards = sampleCards.map((c) => ({ ...c, userId }));
        await Card.insertMany(cards);
        console.log(`✅ Seeded ${cards.length} cards`);

        // Seed Goals
        const goals = sampleGoals.map((g) => ({ ...g, userId }));
        await Goal.insertMany(goals);
        console.log(`✅ Seeded ${goals.length} goals`);

        console.log("\n🎉 Database seeding completed successfully!");
        console.log("\nSeeded data summary:");
        console.log(`- Transactions: ${transactions.length}`);
        console.log(`- Cards: ${cards.length}`);
        console.log(`- Goals: ${goals.length}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

// Get userId from command line argument
const userId = process.argv[2];

if (!userId) {
    console.error("❌ Please provide userId as argument");
    console.log("Usage: node seedData.js <userId>");
    process.exit(1);
}

seedDatabase(userId);
