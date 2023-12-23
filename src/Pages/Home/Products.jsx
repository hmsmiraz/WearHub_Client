import useProducts from "../../Hooks/useProducts";
import { Link } from "react-router-dom";
const Products = () => {
  const [products] = useProducts();
  //   console.log(products);
  return (
    <div className="my-4 mx-2">
      <div className="mx-auto text-center my-8 md:w-4/12 font-medium">
        <h2 className="text-xl font-bold uppercase py-4  border-y-4 border-dotted">
          Our Products
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="card  bg-base-100 shadow-xl">
            <figure>
              <img
                src={product.image}
                alt="product"
                className="h-40 rounded-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description.slice(0, 80)}...</p>
              <div className="card-actions justify-center">
                <Link to={`products/${product._id}`}>
                  <button className="btn btn-info">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
