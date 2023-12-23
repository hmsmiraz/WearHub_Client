import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
const ProductDetails = () => {
  const { user } = useAuth();
  const email = user?.email;
  const productSingle = useLoaderData();
  const axiosPublic = useAxiosPublic();

  const { _id, title, image, color, size, price, description } = productSingle;

  const handleCart = async () => {
    const cartData = {
        email,
        ProductId: _id,
        title,
        price,
        image,
        size,
        color,
    }
    console.log(cartData)
    const result = await axiosPublic.post("/carts", cartData);
    if (result.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${title} add to Cart, Thank You.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold my-5 text-blue-500 ">
        Here is your Product Details:
      </h2>

      <div className="mx-auto md:max-w-7xl my-10">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img src={image} alt="Album" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-stone-500 font-bold">
              Name: {title}
            </h1>
            <h3 className="text-sm font-bold">Color:{color}</h3>
            <h3 className="text-sm font-bold">Size:{size}</h3>
            <h3 className="text-sm font-bold">Price: ${price}</h3>

            <p>
              <span className="text-sm font-bold">Details:</span> {description}
            </p>
            <div className="card-actions justify-center">
              <button
                onClick={handleCart}
                className="btn btn-info text-gray-700 text-sm"
              >
                Add to cart <BsFillCartPlusFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
