import { useQuery } from "@tanstack/react-query";
// import api from './index';

import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.7:1337", // Set your base URL
});

export const postOrder = (values,images) =>
  api
    .post("/api/orders", {
        data:{
          ...values
        }
    })
    .then((response) => {
      const orderId = response.data.id
      uploadImage(images,orderId)
    })
    .catch((error) => {
      console.error("Error:", error.response.data); // Log the error response
    });

export const uploadImage=(images,id)=>{
  axios
  .post('http://localhost:1337/upload', images)
  .then((response) => {
    const imageId = response.data[0].id;

    axios
      .post('http://localhost:1337/api/orders', { images: imageId })
      .then((response) => {
        //handle success
      })
      .catch((error) => {
        //handle error
      });
  })
  .catch((error) => {
    //handle error
  });
}  
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
