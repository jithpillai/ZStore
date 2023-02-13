import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function QuantityBox({maxValue, minValue, initValue, setQuantity}) {

    const [allValues, setAllValues] = useState({
        quantity: initValue || 0,
        disableIncrement: false,
        disableDecrement: false
    });
    const increment = () => {
        const newQty = allValues.quantity + 1;
        if (newQty <= maxValue) {
            setAllValues({...allValues, quantity: newQty, disableDecrement: false});
            setQuantity(newQty);
        } else {
            setAllValues({...allValues, disableIncrement: true});
            toast.error("You have reached the maximum quantity for this product");
        }
        
    }

    const decrement = () => {
        const newQty = allValues.quantity - 1;
        if (newQty >= minValue) {
            setAllValues({...allValues, quantity: newQty, disableIncrement: false});
            setQuantity(newQty);
        } else {
            setAllValues({...allValues, disableDecrement: true});
        }
        
    }

    return (
        <div className='flex justify-center m-3'>
            <button type='button' onClick={decrement} className='primary-button w-10 m-1' disabled={allValues.disableDecrement}>-</button>
            <input type='text' readOnly className="w-10 m-1" value={allValues.quantity}></input>
            <button type='button' onClick={increment} className='primary-button w-10 m-1' disabled={allValues.disableIncrement}>+</button>
        </div>
  )
}
