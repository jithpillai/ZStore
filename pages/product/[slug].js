import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import ImageThumbs from '../../components/ImageThumbs';
import Layout from '../../components/Layout';
import QuantityBox from '../../components/QuantityBox';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [allValues, setAllValues] = useState({
    quantity: 0,
    previewImageUrl: product.image
  });
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }
  const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
  const existingQty = existItem ? existItem.quantity : 0;

  const updateCartQuantity = (qty) => {
    setAllValues({...allValues, quantity: qty});
  }

  const onPreviewImageSelect = (imageUrl) => {
    setAllValues({...allValues, previewImageUrl: imageUrl});
  }

  const addToCartHandler = async () => {
    let cartQuantity = allValues.quantity;
    if (cartQuantity === 0) {
      cartQuantity = 1; //When user clicks add to cart, atleast 1 quantity will be added
    }
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < cartQuantity) {
      return toast.error('Sorry product is out of stock.');
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: cartQuantity },
    });
    router.push('/cart');
  };

  return (
    <Layout tite={product.name}>
      <div className="py-2 font-semibold">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={allValues.previewImageUrl}
            width={640}
            height={640}
            alt={product.name}
            priority
          />
        </div>
        <div>
          <ul>
            <li>
              <ImageThumbs imageArray={product.previewImages} onSelect={onPreviewImageSelect}></ImageThumbs>
            </li>
            <li>
              <h1 className="text-2xl mt-5 mb-2 font-semibold">{product.name}</h1>
            </li>
            <li>
              <span className="font-bold">Category:</span> {product.category}
            </li>
            <li>
              <span className="font-bold">Brand:</span> {product.brand}
            </li>
            <li>
              {product.rating} of {product.numReviews}{' '}
              <span className="font-bold">Reviews</span>
            </li>
            <li>
              <span className="font-bold">Description:</span>{' '}
              {product.description}
            </li>
          </ul>
        </div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div className="font-bold">Price</div>
            <div>₹ {product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div className="font-bold">Status</div>
            <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </div>
          <QuantityBox minValue={1} maxValue={product.countInStock} initValue={existingQty} setQuantity={updateCartQuantity}></QuantityBox>
          <button className="primary-button w-full" onClick={addToCartHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
