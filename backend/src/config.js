const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 4000
  },
  mongo: {
    url: process.env.MONGO_DB_URI || "mongodb://localhost/backend"
  },
  admin_account: {
    firstName: "Admin",
    lastName: "",
    email: "admin@admin.nu",
    password: process.env.ADMIN_PASSWORD || "admin",
    role: "ADMIN"
  },
  companies: [
    {
      name: "Philips",
      reps: 3,
      productsPerCategory: 3,
      categories: ["TV", "VCR"],
      materialsPerProduct: 3
    },
    {
      name: "Samsung",
      reps: 2,
      productsPerCategory: 5,
      categories: ["TV", "VCR", "Mobile Phone"],
      materialsPerProduct: 2
    }
  ]
};

module.exports = config;
