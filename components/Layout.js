/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {
  ArrowLeftIcon,
  DesktopComputerIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { ColorRing } from 'react-loader-spinner';
import { subscribe, unsubscribe } from '../utils/events';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const currentYear = new Date().getFullYear();
  const copyrightOwner = 'ZeroTo5';

  const [allValues, setAllValues] = useState({
    showLoading: true,
    message: 'Loading...',
    query: '',
  });

  setTimeout(() => {
    setAllValues({ ...allValues, showLoading: false });
  }, 800);

  useEffect(() => {
    const showLoadMask = (e) => {
      setAllValues({
        ...allValues,
        message: e.detail.message,
        showLoading: e.detail.show,
      });
      e.detail.show
        ? document.body.classList.add('hide-scroll-bar')
        : document.body.classList.remove('hide-scroll-bar');
    };
    subscribe('showLoadMask', showLoadMask);
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    return () => {
      // Cleanup after component unmount
      unsubscribe('showLoadMask', showLoadMask);
    };
  }, [cart.cartItems, allValues]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${allValues.query}`);
  };

  const navigateToHome = () => {
    router.push('/');
  };

  const navigateToCart = () => {
    router.push('/cart');
  };

  const onProfileClick = () => {
    if (session?.user) {
      alert('Logged in');
    } else {
      router.push('/login');
    }
  };

  const toggleSideNav = () => {
    var sideBar = document.getElementById("sidebar-multi-level-sidebar");
    if (sideBar.classList.contains('hidden')) {
      sideBar.classList.remove('hidden');
    } else {
      sideBar.classList.add('hidden');
    }
  }
  return (
    <>
      <Head>
        <title>
          {title ? title + ' (ZeroTo5 E-Store)' : 'ZeroTo5 E-Store'}
        </title>
        <meta name="description" content="ZeroTo5 Online Baby Shopping" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer
        position="bottom-center"
        limit={5}
        autoClose={750}
      ></ToastContainer>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-16 items-center px-4 justify-between shadow-md">
            <Link href="/" className="justify-center flex md:ml-28">
              <img
                className="headerLogo"
                src="/images/ZeroTo5Logo.png"
                alt="ZeroTo5"
              />
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto w-full justify-center flex ml-3"
            >
              <input
                onChange={(e) =>
                  setAllValues({ ...allValues, query: e.target.value })
                }
                type="text"
                className="search-field md:w-1/2 w-4/5 rounded rounded-tr-none rounded-br-none p-1 text-base focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black search-btn"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>
          </nav>
        </header>
        {allValues.showLoading && (
          <div className="absolute flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-70 w-full z-20">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <div className="text-xl text-gray-600">{allValues.message}</div>
          </div>
        )}
        <aside
          id="sidebar-multi-level-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform hidden"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-amber-600 dark:bg-amber-600">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span
                    className="flex-1 ml-3 text-left whitespace-nowrap"
                  >
                    E-commerce
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Billing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Invoice
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Products
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-white dark:bg-amber-400 dark:border-white">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <button
              type="button"
              onClick={toggleSideNav}
              className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-white dark:hover:bg-amber-600 group dark:border-white"
            >
              <svg
                className="w-6 h-6 mb-1 text-white dark:text-white group-hover:text-white dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
                  stroke="#FFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-white-500 dark:text-white group-hover:text-white dark:group-hover:text-white">
                Menu
              </span>
            </button>
            <button
              type="button"
              onClick={navigateToHome}
              className="inline-flex flex-col items-center justify-center px-5 border-r border-gray-200 hover:bg-white dark:hover:bg-amber-600 group dark:border-white"
            >
              <svg
                className="w-6 h-6 mb-1 text-white dark:text-white group-hover:text-white dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              <span className="text-sm text-white dark:text-white group-hover:text-white dark:group-hover:text-white">
                Home
              </span>
            </button>
            <button
              type="button"
              onClick={navigateToCart}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-white dark:hover:bg-amber-600 group"
            >
              <svg
                className="w-6 h-6 mb-1 text-white dark:text-white group-hover:text-white dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4H2.47241C2.92336 4 3.31852 4.30182 3.43717 4.73688L3.85342 6.26312L6 14.1339V16C6 16.6935 6.23533 17.3321 6.63048 17.8402C6.23824 18.2816 6 18.863 6 19.5C6 20.8807 7.11929 22 8.5 22C9.88071 22 11 20.8807 11 19.5C11 19.3288 10.9828 19.1616 10.95 19H14.05C14.0172 19.1616 14 19.3288 14 19.5C14 20.8807 15.1193 22 16.5 22C17.8807 22 19 20.8807 19 19.5C19 19.1715 18.9366 18.8578 18.8215 18.5704C18.934 18.4086 19 18.212 19 18C19 17.4477 18.5523 17 18 17H16.5H9C8.44772 17 8 16.5523 8 16V15H18.236C19.1381 15 19.9285 14.3962 20.1657 13.5258L21.8007 7.52583C22.1473 6.25364 21.1896 5 19.871 5H5.58198L5.3667 4.21065C5.01074 2.90547 3.82526 2 2.47241 2H2ZM16.5 19C16.2239 19 16 19.2239 16 19.5C16 19.7761 16.2239 20 16.5 20C16.7761 20 17 19.7761 17 19.5C17 19.2239 16.7761 19 16.5 19ZM18.236 13H7.7638L6.12743 7H19.871L18.236 13ZM8.5 19C8.22386 19 8 19.2239 8 19.5C8 19.7761 8.22386 20 8.5 20C8.77614 20 9 19.7761 9 19.5C9 19.2239 8.77614 19 8.5 19Z"
                  fill="#fff"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span
                  className="ml-1 rounded-full bg-red-600 px-0.25 md:px-0.5 md:py-0.5 cart-mobile md:text-xs font-bold text-white w-2.5 h-2.5 md:w-5 md:h-5
                    text-center cart-counter"
                >
                  {cartItemsCount}
                </span>
              )}
              <span className="text-sm text-white dark:text-white group-hover:text-white dark:group-hover:text-white">
                Cart
              </span>
            </button>
            {status === 'loading' ? (
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-white dark:hover:bg-amber-600 group border-x dark:border-white"
              >
                <svg
                  className="w-6 h-6 mb-1 text-white dark:text-white group-hover:text-white dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M23,12A11,11,0,0,1,4.963,20.451l-.256.256A1,1,0,0,1,4,21a.987.987,0,0,1-.383-.076A1,1,0,0,1,3,20V18a1,1,0,0,1,1-1H6a1,1,0,0,1,.707,1.707l-.322.322A9,9,0,1,0,3,12a9.107,9.107,0,0,0,.18,1.8,1,1,0,0,1-1.96.4A11,11,0,1,1,23,12ZM12,5a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h5a1,1,0,0,0,0-2H13V6A1,1,0,0,0,12,5Z" />
                </svg>
                <span className="text-sm text-white dark:text-white group-hover:text-white dark:group-hover:text-white">
                  Loading
                </span>
              </button>
            ) : session?.user ? (
              <Menu
                as={'div'}
                className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-white dark:hover:bg-amber-600 group border-x dark:border-white"
              >
                <Menu.Button className="items-center justify-center">
                  <svg
                    className="w-6 h-6 mb-1 ml-2 text-white dark:text-white group-hover:text-white dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    ></path>
                  </svg>
                  <span className="text-sm text-white dark:text-white group-hover:text-white dark:group-hover:text-white">
                    Profile
                  </span>
                </Menu.Button>
                <Menu.Items className="side-menu absolute mb-6 mr-20 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/profile">
                      <UserCircleIcon className="text-orange-600 w-5 h-5 m-1"></UserCircleIcon>
                      <span className="text-orange-600">
                        {session.user.name} Profile
                      </span>
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/order-history"
                    >
                      <ShoppingBagIcon className="text-orange-600 w-5 h-5 m-1"></ShoppingBagIcon>
                      <span className="text-orange-600">Order History</span>
                    </DropdownLink>
                  </Menu.Item>

                  {session.user.isAdmin && (
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/admin/dashboard"
                      >
                        <DesktopComputerIcon className="text-orange-600 w-5 h-5 m-1"></DesktopComputerIcon>
                        <span className="text-orange-600">Admin Dashboard</span>
                      </DropdownLink>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      <ArrowLeftIcon className="text-orange-600 w-5 h-5 m-1"></ArrowLeftIcon>
                      <span className="text-orange-600">Logout</span>
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <button
                type="button"
                onClick={onProfileClick}
                className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-white dark:hover:bg-amber-600 group border-x dark:border-white"
              >
                <svg
                  className="w-6 h-6 mb-1 text-white dark:text-white group-hover:text-white dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  ></path>
                </svg>
                <span className="text-sm text-white dark:text-white group-hover:text-white dark:group-hover:text-white">
                  Login
                </span>
              </button>
            )}
          </div>
        </div>
        <footer className="bg-amber-300 rounded-lg shadow m-4 mb-24 dark:bg-amber-300 text-black">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-black sm:text-center dark:text-black font-semibold">
              Copyright &copy; {currentYear + ' ' + copyrightOwner}
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a
                  href="https://zeroto5.in"
                  className="mr-4 hover:underline md:mr-6 "
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://store.zeroto5.in"
                  target="_blank"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6 "
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/informations#contact-us"
                  target="_blank"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/informations#cancel-refund"
                  target="_blank"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="/informations#shipping-delivery"
                  target="_blank"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="/informations#privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/informations#terms-conditions"
                  target="_blank"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
