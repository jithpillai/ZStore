import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HBox({ title, itemList, addToCartHandler }) {

    return (
        <div className="flex flex-col bg-white m-auto p-auto">
            <span
                className="flex py-5 px-1 mx-1 font-semibold text-xl text-gray-800"
            >
                {title}
            </span>
            <div
                className="flex overflow-x-scroll pb-10 hide-scroll-bar"
            >
                <div
                    className="flex flex-nowrap"
                >
                    {itemList.map((product, i) => (
                        <div className="inline-block px-3" key={"hbox-item"+i}>
                            <div
                                className="w-48 h-56 max-w-xs overflow-hidden rounded-lg shadow-md shadow-yellow-300 bg-white hover:shadow-xl hover:shadow-amber-600 transition-shadow duration-300 ease-in-out"
                            >
                                <div>
                                    <Link className="flex flex-col justify-center items-center" href={`/product/${product.slug}`}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            className="rounded shadow aspect-square object-center"
                                            width={100}
                                            height={100}
                                        />
                                    </Link>
                                    <div className="flex flex-col items-center justify-center p-5">
                                        <Link className="text-black" href={`/product/${product.slug}`}>
                                            <span className="text-sm font-semibold whitespace-nowrap">{product.name}</span>
                                        </Link>
                                        <p className="text-xs mb-2">{product.brand}</p>
                                        <p className="text-xs font-semibold"> ₹ {product.price}</p>
                                        <button
                                            className="text-xs primary-button"
                                            type="button"
                                            onClick={() => addToCartHandler(product)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
