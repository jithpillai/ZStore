import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Product out of stock!');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
  };

  return (
    <Layout tite={product.name}>
      <div className="py-2 font-semibold">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            width={640}
            height={640}
            alt={product.name}
            priority
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg font-semibold">{product.name}</h1>
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
          <button className="primary-button w-full" onClick={addToCartHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}
