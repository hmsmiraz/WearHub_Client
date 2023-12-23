import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCart = () => {
    const axiosPublic = useAxiosPublic();
    const {
      data: carts = [],
      isPending: loading,
      refetch,
    } = useQuery({
      queryKey: ["carts"],
      queryFn: async () => {
        const res = await axiosPublic.get("/carts");
      //console.log(carts);
        return res.data;
      },
    });
    return [carts, loading, refetch];
};

export default useCart;