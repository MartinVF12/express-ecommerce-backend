const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products with their associated category and tag data
router.get('/', async (req, res) => {
  try {
    const productsData = await Product.findAll({
      include: [
        { model: Category },
        {
          model: Tag,
          through: ProductTag,
          as: 'tags'
        }
      ],
    });
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one product by its id with its associated category and tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        {
          model: Tag,
          through: ProductTag,
          as: 'tags'
        }
      ],
    });

    if (!productData) {
      res.status(404).json({ message: 'Product not found with this id' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(201).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a product by its id
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!productData[0]) {
      res.status(404).json({ message: 'Product not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE delete a product by its id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'Product not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
