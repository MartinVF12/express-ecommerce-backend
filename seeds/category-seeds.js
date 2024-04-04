const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// Función para sembrar datos de categorías
const seedCategories = async () => {
  await Category.bulkCreate(categoryData.map(category => ({
    ...category,
    createdAt: new Date(),
    updatedAt: new Date()
  })));
};

module.exports = seedCategories;
