import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductAsync,
  clearErrors,
  clearSuccess,
} from "../../features/Product/productSlice";
import Loader from "../Loader";
import { clearAlert, showAlert } from "../../features/Alert/alertSlice";

function AddProduct() {
  const dispatch = useDispatch();
  const { error, pending, success } = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreivew, setImagesPreview] = useState([]);

  function handleImagesChange(e) {
    let files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }

  function handleAddProduct(e) {
    e.preventDefault();
    let productForm = new FormData();

    productForm.set("name", name);
    productForm.set("price", price);
    productForm.set("description", description);
    productForm.set("stock", stock);
    productForm.set("category", category);

    images.forEach((image) => {
      productForm.append("images", image);
    });

    dispatch(addNewProductAsync(productForm));
  }

  useEffect(() => {
    if (error) {
      dispatch(showAlert({ message: error.message, type: "error" }));
      dispatch(clearErrors());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 100);
      return;
    }

    if (success) {
      dispatch(
        showAlert({
          message: "Products is added Successfully",
          type: "success",
        })
      );
      dispatch(clearSuccess());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 100);
    }
  }, [dispatch, error, success]);

  return (
    <>
      <div className="container flex md:flex-row flex-col gap-3">
        <div className="sidebar md:w-[20%] w-full md:border-r-2 border-gray-600">
          <SideBar />
        </div>
        <div className="add-product-container md:w-[80%] w-full p-3">
          <h2 className="text-2xl text-center font-medium my-5">Add Product</h2>
          {pending && <Loader />}
          {!pending && (
            <form
              className="w-[70%] mx-auto bg-white shadow-md p-3"
              onSubmit={handleAddProduct}
            >
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                className="w-[90%] mx-auto block border-2 py-2 px-2 my-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Product Price"
                className="w-[90%] mx-auto block border-2 py-2 px-2 my-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <textarea
                type="text"
                name="description"
                rows={5}
                placeholder="Product Description"
                className="w-[90%] mx-auto block border-2 py-2 px-2 my-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <input
                type="number"
                placeholder="Product Stock"
                name="stock"
                className="w-[90%] mx-auto block border-2 py-2 px-2 my-3"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
              <input
                name="category"
                className="w-[90%] mx-auto block border-2 py-2 px-2 my-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                required
              />

              <input
                type="file"
                name="avatar"
                className="w-[90%] mx-auto block border-2 py-2 px-2 my-3"
                multiple
                onChange={handleImagesChange}
                accept="image/*"
                required
              />

              <div className="images-preview flex overflow-auto gap-2">
                {imagesPreivew &&
                  imagesPreivew.map((image, index) => (
                    <img
                      src={image}
                      alt="Product Preview"
                      key={index}
                      className="w-1/6 object-cover object-center"
                    />
                  ))}
              </div>

              <button
                className="w-[90%] mx-auto block text-white text-lg rounded py-2 px-2 my-5 bg-red-600 hover:bg-red-500"
                type="submit"
              >
                Add
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default AddProduct;
