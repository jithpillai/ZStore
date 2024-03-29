import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';
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

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [appendImages, setAppendImages] = useState(true);
  const [{ loading, error, loadingUpdate, loadingUpload, errorUpdate, errorUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      loadingUpdate: false,
      loadingUpload: false,
      errorUpdate: '',
      errorUpload: ''
    });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    let previewImages;
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('category', data.category);
        setValue('brand', data.brand);
        setValue('countInStock', data.countInStock);
        setValue('description', data.description);
        setValue('banner', data.banner);
        setValue('isFeatured', data.isFeatured);
        setValue('isLatest', data.isLatest || false);
        setValue('onSale', data.onSale || false);
        if (data.previewImages) {
          previewImages = data.previewImages.join(';');
          previewImages = previewImages === "" ? data.image : previewImages;
        } else {
          previewImages = data.image;
        }
        setValue('previewImages', previewImages);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const previewUploadHandler = async (e, previewImageFile = "previewImages") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    var previewUrls = [];
    const previousUrls = getValues("previewImages") || "";
    try {
      publish('showLoadMask', { message: 'Uploading...', show: true });
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const files = e.target.files;
      const arrayOfFiles = [...files];//Array.from(files);
      const uploaders = arrayOfFiles.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        return axios.post(url, formData).then(response => {
          previewUrls.push(response.data.secure_url);
        });
      });

      axios.all(uploaders).then(() => {
        let newUrls = previewUrls.join(';');
        if (newUrls === "") {
          return;
        }
        dispatch({ type: 'UPLOAD_SUCCESS' });
        publish('showLoadMask', { message: 'Upload Success', show: false });
        if (appendImages) {
          newUrls = previousUrls.concat(";", newUrls);
        }
        setValue(previewImageFile, newUrls);
        toast.success('File uploaded successfully');
      });
      
      
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      publish('showLoadMask', { message: 'Upload failed', show: false });
      toast.error(getError(err));
    }
  }

  const uploadHandler = async (e, imageField = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };


  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
    banner,
    isFeatured,
    isLatest,
    onSale,
    previewImages
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      publish('showLoadMask', { message: 'Updating...', show: true });
      previewImages = previewImages ? previewImages.split(";") : [];
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
        isFeatured,
        isLatest,
        banner,
        onSale,
        previewImages
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      publish('showLoadMask', { show: false });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      publish('showLoadMask', { show: false });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link className="font-bold" href="/admin/products">
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
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
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="w-full"
                  id="slug"
                  {...register('slug', {
                    required: 'Please enter slug',
                  })}
                />
                {errors.slug && (
                  <div className="text-red-500">{errors.slug.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="price"
                  {...register('price', {
                    required: 'Please enter price',
                  })}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="w-full"
                  id="image"
                  {...register('image', {
                    required: 'Please enter image',
                  })}
                />
                {errors.image && (
                  <div className="text-red-500">{errors.image.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageFile">Upload image</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onChange={uploadHandler}
                />

                {loadingUpload && <div>Uploading....</div>}
              </div>
              {errorUpload && <div className="mb-4 alert-error">Image Upload Error: {errorUpload}</div>}
              <div className='mb-4'>
                <label htmlFor="previewImageTextArea">Preview Images</label>
                <textarea id='previewImageTextArea' className='w-full' {...register('previewImages', {
                    required: 'Please enter image',
                  })}/>
              </div>
              <div className="mb-4">
                <label htmlFor="appendImagesFlag">Append Previous Images?</label>
                <input
                  type="checkbox"
                  className='m-4'
                  checked={appendImages}
                  onChange={(e)=> { setAppendImages(e.target.checked)}}
                  id="appendImagesFlag"/>
            </div>
              <div className="mb-4">
                <label htmlFor="previewImageFiles">Upload Preview Images</label>
                <input
                  type="file"
                  className="w-full"
                  id="previewImageFiles"
                  multiple
                  onChange={previewUploadHandler}
                />
                <div><p className='text-xs text-gray-500'>If you want to retain the old values of the preview images, Copy the previous values and paste it in the last, starting with a semicolon ; after uploading new files</p></div>
                {loadingUpload && <div>Uploading....</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="w-full"
                  id="category"
                  {...register('category', {
                    required: 'Please enter category',
                  })}
                />
                {errors.category && (
                  <div className="text-red-500">{errors.category.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="w-full"
                  id="brand"
                  {...register('brand', {
                    required: 'Please enter brand',
                  })}
                />
                {errors.brand && (
                  <div className="text-red-500">{errors.brand.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="text"
                  className="w-full"
                  id="countInStock"
                  {...register('countInStock', {
                    required: 'Please enter countInStock',
                  })}
                />
                {errors.countInStock && (
                  <div className="text-red-500">
                    {errors.countInStock.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="w-full"
                  id="description"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="banner">Banner Image Path</label>
                <input
                  type="text"
                  className="w-full"
                  id="banner"
                  {...register('banner', {
                  })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="isFeatured">Is featured?</label>
                <input
                  type="checkbox"
                  className='m-4'
                  id="isFeatured"
                  {...register('isFeatured', {})}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="isLatest">Is Latest?</label>
                <input
                  type="checkbox"
                  className='m-4'
                  id="isLatest"
                  {...register('isLatest', {})}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="onSale">Is On Sale?</label>
                <input
                  type="checkbox"
                  className='m-4'
                  id="onSale"
                  {...register('onSale', {})}
                />
              </div>
              {errorUpdate && <div className="mb-4 alert-error">Update Error: {errorUpdate}</div>}
              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/products`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
