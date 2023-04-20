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
import data from '../utils/data';

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
    var sideBar = document.getElementById('sidebar-multi-level-sidebar');
    if (sideBar.classList.contains('hidden')) {
      sideBar.classList.remove('hidden');
    } else {
      sideBar.classList.add('hidden');
    }
  };

  const toggleCategories = () => {
    var cList = document.getElementById('categoryList');
    if (cList.classList.contains('hidden')) {
      cList.classList.remove('hidden');
    } else {
      cList.classList.add('hidden');
    }
  };
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
          <div className="h-full px-3 py-4 overflow-y-auto bg-amber-300 dark:bg-amber-300">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="https://store.zeroto5.in"
                  className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">About Us</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-black transition duration-75 rounded-lg group hover:bg-white dark:text-black dark:hover:bg-white"
                  onClick={toggleCategories}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-black transition duration-75 group-hover:text-black dark:text-black dark:group-hover:text-black"
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
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Categories
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
                <ul id="categoryList" className="hidden py-2 space-y-2">
                  {data.categories.map((categoryName, i) => (
                      <li key={"category"+i}>
                        <Link
                          href={`/search/?query=&pageType=category&category=${categoryName}`}
                          onClick={toggleSideNav}
                          className="flex items-center w-full p-2 text-black transition duration-75 rounded-lg pl-11 group hover:bg-white dark:text-black dark:hover:bg-white"
                        >
                          {categoryName}
                        </Link>
                      </li>
                  ))}
                </ul>
              </li>
              {session?.user ? (
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white"
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
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {session.user.name} Profile
                    </span>
                  </Link>
                </li>
              ) : null}
              {session?.user && (
                <li>
                  <Link
                    href="/order-history"
                    className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-black dark:group-hover:text-black"
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
                      Order History
                    </span>
                  </Link>
                </li>
              )}
              {session?.user.isAdmin && (
                <li>
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-black dark:group-hover:text-black"
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
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Admin Dashboard
                    </span>
                  </Link>
                </li>
              )}
              {session?.user ? (
                <li>
                  <a
                    href="#"
                    onClick={logoutClickHandler}
                    className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-black dark:group-hover:text-black"
                      fill="currentColor"
                      viewBox="0 0 23 23"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z"
                        fill="#000000"
                      />
                      <path
                        d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z"
                        fill="#000000"
                      />
                      <path
                        d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z"
                        fill="#000000"
                      />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Logout
                    </span>
                  </a>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-black dark:group-hover:text-black"
                      fill="currentColor"
                      viewBox="0 0 23 23"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 2C10.2386 2 8 4.23858 8 7C8 7.55228 8.44772 8 9 8C9.55228 8 10 7.55228 10 7C10 5.34315 11.3431 4 13 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H13C11.3431 20 10 18.6569 10 17C10 16.4477 9.55228 16 9 16C8.44772 16 8 16.4477 8 17C8 19.7614 10.2386 22 13 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H13Z"
                        fill="#000000"
                      />
                      <path
                        d="M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11.2821C11.1931 13.1098 11.1078 13.2163 11.0271 13.318C10.7816 13.6277 10.5738 13.8996 10.427 14.0945C10.3536 14.1921 10.2952 14.2705 10.255 14.3251L10.2084 14.3884L10.1959 14.4055L10.1915 14.4115C10.1914 14.4116 10.191 14.4122 11 15L10.1915 14.4115C9.86687 14.8583 9.96541 15.4844 10.4122 15.809C10.859 16.1336 11.4843 16.0346 11.809 15.5879L11.8118 15.584L11.822 15.57L11.8638 15.5132C11.9007 15.4632 11.9553 15.3897 12.0247 15.2975C12.1637 15.113 12.3612 14.8546 12.5942 14.5606C13.0655 13.9663 13.6623 13.2519 14.2071 12.7071L14.9142 12L14.2071 11.2929C13.6623 10.7481 13.0655 10.0337 12.5942 9.43937C12.3612 9.14542 12.1637 8.88702 12.0247 8.7025C11.9553 8.61033 11.9007 8.53682 11.8638 8.48679L11.822 8.43002L11.8118 8.41602L11.8095 8.41281C11.4848 7.96606 10.859 7.86637 10.4122 8.19098C9.96541 8.51561 9.86636 9.14098 10.191 9.58778L11 9C10.191 9.58778 10.1909 9.58773 10.191 9.58778L10.1925 9.58985L10.1959 9.59454L10.2084 9.61162L10.255 9.67492C10.2952 9.72946 10.3536 9.80795 10.427 9.90549C10.5738 10.1004 10.7816 10.3723 11.0271 10.682C11.1078 10.7837 11.1931 10.8902 11.2821 11H3Z"
                        fill="#000000"
                      />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Log In
                    </span>
                  </Link>
                </li>
              )}
              {session?.user ? null : (
                <li>
                  <Link
                    href="/register?redirect=/"
                    className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-black dark:group-hover:text-black"
                      fill="currentColor"
                      viewBox="-2 0 16 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path id="Path_184" data-name="Path 184" d="M57.5,41a.5.5,0,0,0-.5.5V43H47V31h2v.5a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5V31h2v.5a.5.5,0,0,0,1,0v-1a.5.5,0,0,0-.5-.5H55v-.5A1.5,1.5,0,0,0,53.5,28h-3A1.5,1.5,0,0,0,49,29.5V30H46.5a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-2A.5.5,0,0,0,57.5,41ZM50,29.5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5V31H50Zm11.854,4.646-2-2a.5.5,0,0,0-.708,0l-6,6A.5.5,0,0,0,53,38.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.354-.146l6-6A.5.5,0,0,0,61.854,34.146ZM54,40V38.707l5.5-5.5L60.793,34.5l-5.5,5.5Zm-2,.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,40.5Zm0-3a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,37.5ZM54.5,35h-5a.5.5,0,0,1,0-1h5a.5.5,0,0,1,0,1Z" transform="translate(-46 -28)"/>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Sign Up
                    </span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/informations#contact-us"
                  className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-black dark:group-hover:text-black"
                    fill="currentColor"
                    viewBox="0 0 35 35"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M31.261 24.113c-0.489-0.344-5.846-3.905-6.502-4.306-0.286-0.175-0.635-0.261-1.015-0.261-0.489 0-1.032 0.142-1.561 0.421-0.515 0.271-2.077 1.16-2.841 1.596-0.673-0.473-2.254-1.683-4.745-4.177-2.476-2.474-3.697-4.068-4.173-4.745 0.435-0.764 1.323-2.325 1.593-2.839 0.511-0.969 0.57-1.937 0.155-2.589-0.389-0.615-3.937-5.994-4.303-6.5-0.345-0.477-0.963-0.736-1.634-0.736-0.529 0-1.091 0.16-1.578 0.499-0.047 0.033-4.753 3.446-4.691 5.386 0.173 5.451 5.471 11.857 9.883 16.271s10.819 9.713 16.292 9.887h0.045c1.916 0 5.284-4.646 5.316-4.692 0.884-1.262 0.562-2.653-0.243-3.217zM29.879 26.165c-1.268 1.757-3.070 3.592-3.774 3.855-3.751-0.176-9.014-3.473-14.84-9.299s-9.121-11.085-9.295-14.823c0.253-0.707 2.088-2.519 3.829-3.779 0.129-0.089 0.288-0.141 0.436-0.141 0.033 0 0.061 0.003 0.082 0.007 0.563 0.817 3.582 5.389 4.13 6.243 0.002 0.090-0.028 0.318-0.2 0.644-0.182 0.348-0.751 1.361-1.559 2.777l-0.629 1.103 0.729 1.039c0.544 0.772 1.838 2.452 4.395 5.009 2.567 2.569 4.241 3.859 5.011 4.399l1.039 0.73 1.102-0.63c1.069-0.611 2.36-1.342 2.779-1.563 0.337-0.177 0.567-0.192 0.63-0.192 0.010 0 0.019 0 0.026 0.001 0.765 0.48 5.436 3.581 6.26 4.146 0.014 0.080 0.001 0.254-0.151 0.471zM20.12 11.766c0.129 0.13 0.311 0.21 0.512 0.205l0.366-0.008c0.007 0 0.012-0.003 0.020-0.003l7.172 0.031c0.404-0.009 0.738-0.344 0.747-0.748l0-0.513c-0.061-0.476-0.436-0.755-0.84-0.746l-4.735-0.012 8.186-8.175c0.39-0.391 0.39-1.024 0-1.415s-1.023-0.39-1.414-0l-8.209 8.197 0.027-4.838c0.009-0.404-0.311-0.756-0.715-0.747l-0.513 0.001c-0.405 0.010-0.739 0.251-0.748 0.655l-0.020 7.219c0 0.007 0.027 0.012 0.027 0.019l-0.040 0.366c-0.004 0.203 0.044 0.384 0.174 0.514z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-amber-400 border-t border-white dark:bg-amber-400 dark:border-white">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <button
              type="button"
              onClick={toggleSideNav}
              className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-amber-600 dark:hover:bg-amber-600 group dark:border-white"
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
              <span className="text-sm text-white dark:text-white group-hover:text-white dark:group-hover:text-white">
                Menu
              </span>
            </button>
            <button
              type="button"
              onClick={navigateToHome}
              className="inline-flex flex-col items-center justify-center px-5 border-r border-gray-200 hover:bg-amber-600 dark:hover:bg-amber-600 group dark:border-white"
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
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-amber-600 dark:hover:bg-amber-600 group"
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
                className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-amber-600 dark:hover:bg-amber-600 group border-x dark:border-white"
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
                className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-amber-600 dark:hover:bg-amber-600 group border-x dark:border-white"
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
                className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-amber-600 dark:hover:bg-amber-600 group border-x dark:border-white"
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
                <Link
                  href="/informations#contact-us"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/informations#cancel-refund"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/informations#shipping-delivery"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/informations#privacy-policy"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/informations#terms-conditions"
                  rel="noreferrer"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
