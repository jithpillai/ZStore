/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  });

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
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

      <ToastContainer position="bottom-center" limit={1}></ToastContainer>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-16 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              <img src="/images/logo.png" alt="ZeroTo5" />
            </Link>
            <div className="flex">
              <Link href="/cart" className="flex-col p-2">
                <div className="grid grid-cols-2">
                  <img src="/images/icons/cart.png" alt="Cart" width={35} />
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-1 py-1 text-xs font-bold text-white w-6 h-6 text-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>
              <span className="p-2">
                {status === 'loading' ? (
                  'Loaiding'
                ) : session?.user ? (
                  <Menu as={'div'} className="relative inline-block">
                    <Menu.Button className="text-blue-600">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white first-letter:shadow-lg">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </span>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          Copyright &copy; 2022 ZeroTo5
        </footer>
      </div>
    </>
  );
}
