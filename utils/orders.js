import { useQuery } from "@tanstack/react-query";
// import api from './index';

import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.7:1337", // Set your base URL
});

export const postOrder = (values) =>
  api
    .post("/api/orders", {
        data:{
          ...values,
        }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error("Error:", error.response.data.errors); // Log the error response
    });

 
export const cancleOrder = async(id) => {
try {
  const data = await axios.delete(`http://192.168.1.7:1337/api/orders/${id}`)
  console.log(data)
  if(data) return true
   return false
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
