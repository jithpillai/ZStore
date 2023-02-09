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
                                className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md shadow-yellow-300 bg-white hover:shadow-xl hover:shadow-amber-600 transition-shadow duration-300 ease-in-out"
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
                                            <h2 className="text-lg font-semibold whitespace-nowrap">{product.name}</h2>
                                        </Link>
                                        <p className="mb-2">{product.brand}</p>
                                        <p className="font-semibold"> ₹ {product.price}</p>
                                        <button
                                            className="primary-button"
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
