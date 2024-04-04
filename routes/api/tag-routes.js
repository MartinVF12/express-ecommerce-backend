const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags with their associated product data
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag, // Añade esta línea para especificar el modelo intermedio
        as: 'products', // Asegúrate de que este alias esté definido en tus asociaciones
      }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one tag by its id with its associated product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag, // Añade esta línea aquí también
        as: 'products', // Y asegúrate de que el alias 'products' esté definido
      }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found with this id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a tag by its id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData[0]) {
      res.status(404).json({ message: 'Tag not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE delete a tag by its id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
