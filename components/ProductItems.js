/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductItems({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link legacyBehavior href={`/product/${product.slug}`}>
        <a className="flex flex-col justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            className="rounded shadow aspect-square object-center"
            width={180}
            height={180}
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link legacyBehavior href={`/product/${product.slug}`}>
          <a className="text-black">
            <span className="text-sm font-semibold">{product.name}</span>
          </a>
        </Link>
        <p className="mb-2 text-xs">{product.brand}</p>
        <p className="text-xs font-semibold mb-1"> ₹ {product.price}</p>
        <button
          className="primary-button text-xs"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
