import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItems from '../components/ProductItems';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry product is out of stock.');
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
    toast.success('Product added to the cart.');
  };

  return (
    <Layout title="Home">
      <Carousel
        showThumbs={false}
        infiniteLoop
        centerMode
        centerSlidePercentage={80}
      >
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link className="flex" href={`/product/${product.slug}`} passHref>
              <img
                className="carousel-image"
                src={product.banner}
                alt={product.name}
              />
              {/* <!--p className="legend">{product.name}</p> */}
            </Link>
          </div>
        ))}
      </Carousel>
      <h2 className="h2 my-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItems
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItems>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
