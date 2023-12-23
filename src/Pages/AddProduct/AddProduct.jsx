import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    color: "blue", // Default color
    size: "s", // Default size
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = parseInt(formData.price);
    const productData = {
      title: formData.title,
      image: formData.image,
      description: formData.description,
      color: formData.color,
      size: formData.size,
      price: price,
    };
    const result = await axiosPublic.post("/products", productData);
    if (result.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${formData.title} add to DB.`,
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({ // Reset the form data
        title: "",
        image: "",
        description: "",
        color: "blue", // Default color
        size: "s", // Default size
        price: "",
    });
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-blue-500 font-bold text-xl text-center">
          Add a Products!
        </h2>
      </div>

      <form className="max-w-lg mx-auto p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 text-gray-600">
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block mb-2 text-gray-600">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                rows="1"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="color" className="block mb-2 text-gray-600">
                Color
              </label>
              <select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                {/* Add other color options */}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="size" className="block mb-2 text-gray-600">
                Size
              </label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                {/* Add other size options */}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-2 text-gray-600">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
