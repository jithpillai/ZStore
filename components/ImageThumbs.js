import Image from 'next/image'
import React from 'react'

export default function ImageThumbs({imageArray, onSelect}) {
  if (!imageArray) {
    return (<span></span>);
  }
  if (!onSelect) {
    onSelect = () => {}
  }
  return (
    <div className='grid grid-cols-4'>
        {imageArray.map((imageUrl, i)=>(
            <div key={"previewImagePanel"+i} className="flex m-1 mt-5 p-1 border-solid border-2 border-gray-300 cursor-pointer rounded image-thumb-ct justify-center items-center">
                <Image src={imageUrl} alt={"Preview Image "+i} width={70} height={70} onClick={()=>onSelect(imageUrl)}></Image>
            </div>
        ))}
    </div>
  )
}
