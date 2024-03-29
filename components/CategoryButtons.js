import Link from 'next/link';
import React from 'react';
import data from '../utils/data';
export default function CategoryButtons() {
    return (
        <div className='flex items-center md:justify-center overflow-x-auto hide-scroll-bar mt-5 mb-5'>
            <div className="inline-flex" role="group">
                {data.categories.map((categoryName, i) => (
                    <Link
                        href={`/search/?query=&pageType=category&category=${categoryName}`}
                        key={"category"+i}
                        className="bg-amber-300 hover:bg-amber-500 text-black hover:text-white font-bold py-3 px-4">
                        {categoryName}
                    </Link>
                ))}
            </div>

        </div>
    )
}
