const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// GET all categories with their associated products
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{
        model: Product,
        include: [{
          model: Tag,
          through: ProductTag,
          as: 'tags',
        }]
      }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by its id with its associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        include: [{
          model: Tag,
          through: ProductTag,
          as: 'tags', // Igual que arriba
        }]
      }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by its id
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE delete a category by its id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
