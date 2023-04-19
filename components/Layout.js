/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {
  ArrowLeftIcon,
  DesktopComputerIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { ColorRing } from 'react-loader-spinner';
import {subscribe, unsubscribe} from '../utils/events';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const currentYear = new Date().getFullYear();
  const copyrightOwner = 'ZeroTo5';

  const [allValues, setAllValues] = useState({showLoading: true, message: 'Loading...', query: ''});

  setTimeout(() => {
    setAllValues({...allValues, showLoading: false});
  }, 800);

  useEffect(() => {
    const showLoadMask = (e) => {
      setAllValues({...allValues, message: e.detail.message, showLoading: e.detail.show});
      e.detail.show ? document.body.classList.add('hide-scroll-bar') : document.body.classList.remove('hide-scroll-bar');
    }
    subscribe('showLoadMask', showLoadMask);
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    return () => { // Cleanup after component unmount
      unsubscribe('showLoadMask', showLoadMask);
    }
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

  return (
    <>
      <Head>
        <title>
          {title ? title + ' (ZeroTo5 E-Store)' : 'ZeroTo5 E-Store'}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={5} autoClose={750}></ToastContainer>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-16 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
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
                onChange={(e) => setAllValues({...allValues, query: e.target.value})}
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
            <div className="flex">
              <Link href="/cart" className="flex-col p-2">
                <div className="grid grid-cols-2">
                  <ShoppingCartIcon className="h-5 w-5 text-amber-600"></ShoppingCartIcon>
                  {cartItemsCount > 0 && (
                    <span
                      className="ml-1 rounded-full bg-red-600 px-0.25 md:px-0.5 md:py-0.5 cart-mobile md:text-xs font-bold text-white w-2.5 h-2.5 md:w-5 md:h-5
                     text-center"
                    >
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>
              <span className="p-2">
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as={'div'} className="relative inline-block">
                    <Menu.Button className="text-black-600">
                      <UserIcon className="h-5 w-5 text-amber-600"></UserIcon>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="side-menu absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/profile"
                          >
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
                            <span className="text-orange-600">
                              Order History
                            </span>
                          </DropdownLink>
                        </Menu.Item>

                        {session.user.isAdmin && (
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/admin/dashboard"
                            >
                              <DesktopComputerIcon className="text-orange-600 w-5 h-5 m-1"></DesktopComputerIcon>
                              <span className="text-orange-600">
                                Admin Dashboard
                              </span>
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
                    </Transition>
                  </Menu>
                ) : (
                  <Link className="text-black font-semibold ml-2" href="/login">
                    Login
                  </Link>
                  )}
              </span>
            </div>
          </nav>
        </header>
        {allValues.showLoading && <div className="absolute flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-70 w-full z-20">
          <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <div className='text-xl text-gray-600'>{allValues.message}</div>
        </div>}
        
        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer class="bg-amber-300 rounded-lg shadow m-4 dark:bg-amber-300 text-black">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-black sm:text-center dark:text-black font-semibold">
              Copyright &copy; {currentYear + ' ' + copyrightOwner}
            </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                  <a href="https://zeroto5.in" class="mr-4 hover:underline md:mr-6 ">Home</a>
              </li>
              <li>
                  <a href="https://store.zeroto5.in" target="_blank" rel="noreferrer" class="mr-4 hover:underline md:mr-6 ">About</a>
              </li>
              <li>
                  <a href="/informations#contact-us" target="_blank" rel="noreferrer" class="mr-4 hover:underline md:mr-6">Contact</a>
              </li>
              <li>
                  <a href="/informations#cancel-refund" target="_blank" rel="noreferrer" class="mr-4 hover:underline md:mr-6">Refund Policy</a>
              </li>
               <li>
                  <a href="/informations#shipping-delivery" target="_blank" rel="noreferrer" class="mr-4 hover:underline md:mr-6">Shipping Policy</a>
              </li>
              <li>
                  <a href="/informations#privacy-policy" target="_blank" rel="noreferrer" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
              </li>
              <li>
                  <a href="/informations#terms-conditions" target="_blank" rel="noreferrer" class="mr-4 hover:underline md:mr-6">Terms & Conditions</a>
              </li>
          </ul>
          </div>
      </footer>
      </div>
    </>
  );
}
