import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import Script from 'next/script';
import myUtils from '../../utils/Utils';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}
function OrderScreen() {
  const { data: session } = useSession();
  // order/:id
  const { query } = useRouter();
  const orderId = query.id;
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    }
  }, [order, orderId, successDeliver, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }

  const initializeRazorPay = () => {
    setRazorpayLoaded(true);
  }

  const razorPayNowHandler = async () => {
    if (!razorpayLoaded) {
      return;
    }
    const key_id = process.env.NEXT_PUBLIC_RAZOR_PAY_TEST_KEY;
    const key_secret = process.env.NEXT_PUBLIC_RAZOR_PAY_TEST_SECRET;
    var options = {
      key: key_id, // Enter the Key ID generated from the Dashboard
      key_secret: key_secret,
      name: "shop.zeroto5.in",
      currency: "INR",
      amount: totalPrice * 100,
      //order_id: orderId,
      description: "Thank you for shopping with Zeroto5",
      image: "https://shop.zeroto5.in/images/ZeroTo5Logo.png",
      handler: onApprove,
      prefill: {
        name: shippingAddress.fullName,
        email: session.user.email,
        contact: ''
      },
      notes: {
        address: "Zeroto5, Mananthavady, Kerala"
      },
      theme: {
        color: '#FFBF00'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  };

  const onApprove = async (response) => {
    if (response.razorpay_payment_id) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          response.razorpay_payment_id
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successgully');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={initializeRazorPay}></Script>
      <Layout title={`Order ${orderId}`}>
        <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">

              <div className="card p-5">
                <h2 className="mb-2 text-lg">Payment Method</h2>
                <div>{paymentMethod}</div>
                {isPaid ? (
                  <div className="alert-success">Paid at {myUtils.formatDateAndTime(paidAt)}</div>
                ) : (
                  <div className="alert-error">Not paid</div>
                )}
              </div>

              <div className="card  p-5">
                <h2 className="mb-2 text-lg">Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </div>
                {isDelivered ? (
                  <div className="alert-success">Delivered at {deliveredAt}</div>
                ) : (
                  <div className="alert-error">Not delivered</div>
                )}
              </div>

              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg">Order Items</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="    p-5 text-right">Quantity</th>
                      <th className="  p-5 text-right">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link
                            className="flex items-center"
                            href={`/product/${item.slug}`}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className=" p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">₹ {item.price}</td>
                        <td className="p-5 text-right">
                          ₹ {item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="card  p-5">
                <h2 className="mb-2 text-lg">Order Summary</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Items</div>
                      <div>₹ {itemsPrice}</div>
                    </div>
                  </li>{' '}
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div>₹ {taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Shipping</div>
                      <div>₹ {shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Total</div>
                      <div>₹ {totalPrice}</div>
                    </div>
                  </li>
                  {!isPaid && paymentMethod === 'Razorpay' && (
                    <div className='w-full'>
                      <button
                        disabled={loading}
                        onClick={razorPayNowHandler}
                        className="primary-button w-full"
                      > 
                        Pay Now
                      </button>
                      <div className='w-full grid grid-cols-2'>
                        <span className='text-sm grid-col text-right mr-2 font-semibold' style={{marginTop:'29px'}}>Secured By </span>
                        <Image
                          className='grid-col'
                          src='/images/razorpay.png'
                          alt='Razorpay Logo'
                          width={80}
                          height={40}
                        ></Image>
                      </div>
                    </div>
                  )}
                  {isPaid && !order.isDelivered && (
                    <div className="info-card">Your order will be delivered soon. Thank you for shopping!</div>
                  )}
                  {session.user.isAdmin && isPaid && !order.isDelivered && (
                    <li>
                      {loadingDeliver && <div>Loading...</div>}
                      <button
                        className="primary-button w-full"
                        onClick={deliverOrderHandler}
                      >
                        Deliver Order
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
