import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../../../utils/error';
import axios from 'axios';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { publish } from '../../../utils/events';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    default:
      return state;
  }
}

export default function EditUserScreen() {
  const { query } = useRouter();
  const userId = query.id;
  const [{ loading, error, loadingUpdate, errorUpdate}, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      loadingUpdate: false,
      errorUpdate: ''
    });
  
  const [updatePassword, setUpdatePassword] = useState(false);  
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  useEffect(() => {

    const fetchData = async () => {
      try {
        publish('showLoadMask', { message: 'Loading...', show: true });
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/user/${userId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        publish('showLoadMask', { show: false });
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('isAdmin', data.isAdmin);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        publish('showLoadMask', { show: false });
      }
    };

    fetchData();
  }, [userId, setValue]);

  const submitHandler = async ({ name, email, password, isAdmin }) => {
    try {
      publish('showLoadMask', { message: 'Updating...', show: true });
      dispatch({ type: 'UPDATE_REQUEST' });
      let payload = {name, email, isAdmin};
      if (updatePassword) {
        payload.password = password;
      }
      await axios.put(`/api/admin/user/${userId}`, payload);
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('User updated successfully');
      router.push('/admin/users');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      publish('showLoadMask', { show: false });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      { loading ? 
      (<div>Loading...</div>) : error ?
      (<div className="alert-error">{error}</div>): 
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Update Profile</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Please enter name',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
            <label htmlFor="updatePassword">Update Password?</label>
            <input
              type="checkbox"
              className='m-4'
              checked={updatePassword}
              onChange={(e)=> setUpdatePassword(e.target.checked)}
              id="updatePassword"/>
        </div>
        {updatePassword && <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="w-full"
              type="password"
              id="password"
              {...register('password', {
                minLength: { value: 6, message: 'password is more than 5 chars' },
              })}
            />
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
        }
        
        
        <div className="mb-4">
                <label htmlFor="isAdmin">Is Admin?</label>
                <input
                  type="checkbox"
                  className='m-4'
                  id="isAdmin"
                  {...register('isAdmin', {})}
          />
        </div>
        {errorUpdate && <div className="mb-4 alert-error">Update Error: {errorUpdate}</div>}
        <div className="mb-4">
          <button disabled={loadingUpdate} className="primary-button">{loadingUpdate? "Updating": "Update User"}</button>
        </div>
      </form>}
    </Layout>
  );
}

EditUserScreen.auth = true;
