import logger from '#config/logger.js';
import { Product } from '#models/index.js';

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: 'Success',
      product,
    });
  } catch (e) {
    logger.error('Create products error', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json({
      message: 'Success',
      products,
    });
  } catch (e) {
    logger.error('Get products error', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [updatedRows] = await Product.update(req.body, {
      where: { id },
    });

    if (!updatedRows) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await Product.findByPk(id);

    return res.status(200).json({
      message: 'Success',
      product: updatedProduct,
    });
  } catch (e) {
    logger.error('Edit products error', e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
