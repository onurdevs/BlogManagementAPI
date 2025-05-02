const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB bağlandı: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB bağlantı hatası:", error.message);
    process.exit(1); // Bağlantı hatasında uygulamayı durdur
  }
};

module.exports = connectDB;
