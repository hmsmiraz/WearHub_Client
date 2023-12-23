import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";
import { BsFillTrashFill, BsCheckCircleFill } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const email = user?.email;
  const [carts, , refetch] = useCart();
  const filteredCart = carts.filter((cart) => cart.email == email);
  //   console.log(carts);

  const handleBuy = () => {
    Swal.fire({
      title: "Success!",
      text: "Buy Successfully, Thank you",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };
  const handleDelete = (item) => {
    console.log(item._id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/carts/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.title} has been deleted!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };
  return (
    <div className="m-5">
      <h2 className="text-center text-3xl font-bold my-5 text-blue-500 ">
        Your Carts:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
        {filteredCart.map((item) => (
          <div
            key={item._id}
            className="card lg:card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img src={item.image} alt="Album" className="h-40" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <div className="flex gap-2">
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p>
                <p>Price: ${item.price}</p>
              </div>
              <div className="card-actions">
                <button
                  onClick={handleBuy}
                  className="btn btn-info text-gray-700 text-sm"
                >
                  Buy <BsCheckCircleFill />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="btn btn-info text-gray-700 text-sm"
                >
                  Delete <BsFillTrashFill />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
