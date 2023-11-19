import { useQuery } from "@tanstack/react-query";
// import api from './index';

import api from './index'

export const postOrder = async (values) => {
  try {
    const res = await api.post("/api/orders", {
      data: {
        ...values,
        status:"pending"
      },
    });
    return res?.data?.data?.id ? res?.data?.data?.id : null;
  } catch (error) {
    console.error("Error:", error.message); // Log the error response
  }
};

export const cancleOrder = async (id) => {
  try {
    const data = await api.delete(`/api/orders/${id}`);
    if (data?.data?.data?.id) return data?.data?.data?.id;
    return false;
  } catch (error) {
    console.error("Error deleting the item :", error.message); // Log the error response
  }
};
export const PayOrder = async (id) => {
  try {
    const data = await api.put(`/api/orders/${id}`,{
      data:{
        PaymentStatus:"payed",
        status:"finished"
      }
    });
    if ( data?.data?.data?.id) return true
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};
export default function useOrders() {
  const fetchOrders = async () => {
    try {
      const response = await api.get(`/api/orders?populate=*`);

      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order"],
    queryFn: fetchOrders,
  }); // Changed the query key to 'superheroes'

  return {
    data,
    isLoading,
    isError,
  };
}
