import { useQuery } from "@tanstack/react-query";
import api from './index';



export const postOrder = (values) =>
  api
    .post("/api/orders", {
        ...values,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response.data); // Log the error response
    });
export const cancleOrder = async(id) => {
try {
  const data = await api.delete(`/api/orders/${id}`)
  console.log(data)
  if(data) return true
    else return false
  } catch (error) {
  console.error("Error deleting the item :", error); // Log the error response
  
}
  }
    
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
