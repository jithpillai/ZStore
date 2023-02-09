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
import HBox from '../components/HBox';
import CategoryButtons from '../components/CategoryButtons';

export default function Home({ latestProducts, featuredProducts , saleProducts}) {
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
      <CategoryButtons></CategoryButtons>
      <HBox title={"Latest Products"} itemList={latestProducts} addToCartHandler={addToCartHandler}></HBox>
      <div className="py-5 px-1 mx-1 font-semibold text-xl text-gray-800">On Sale</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {saleProducts.map((product) => (
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
  const saleProducts = await Product.find({ onSale: true }).lean();
  const latestProducts = await Product.find({ isLatest: true }).lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      latestProducts: latestProducts.map(db.convertDocToObj),
      saleProducts: saleProducts.map(db.convertDocToObj)
    },
  };
}
