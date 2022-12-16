/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext } from 'react';
import Image from 'next/image';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function ProductItems({ product }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
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
    router.push('/cart');
  };
  return (
    <div className="card">
      <Link legacyBehavior href={`/product/${product.slug}`}>
        <a className="flex flex-col justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            className="rounded shadow aspect-square object-center"
            width={251}
            height={251}
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link legacyBehavior href={`/product/${product.slug}`}>
          <a className="text-black">
            <h2 className="text-lg font-semibold">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="font-semibold"> ₹ {product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={addToCartHandler}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
