import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'Sample',
    slug: 'slug' + Math.random(),
    image: '/images/testing.jpg',
    price: 0,
    category: 'Infants',
    brand: 'General',
    countInStock: 0,
    description: 'Add Description',
    rating: 0,
    numReviews: 0,
    banner:'/images/banner1.jpg',
    isFeatured: false,
    isLatest: false,
    onSale: false,
    previewImages: []
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;
