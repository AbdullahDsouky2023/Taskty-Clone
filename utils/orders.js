import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { client } from '../App';

export const postOrder = async (data) => {
  try {
    const response = await axios.post('http://192.168.1.6:1337/api/orders', {
        headers: {
          "Content-Type": `multipart/form-data;`, // boundary=${dat._boundary}`,
        },
        data: data,
        });
    return response.data; // You can return the response data as needed
  } catch (error) {
    throw error;
  }}

//   const mutation = useMutation(postOrder, {
//     // Additional options for the mutation (e.g., onMutate, onError, onSettled, etc.)
//     onSettled: () => {
//       // Invalidate a query after the mutation is completed
//       client.invalidateQueries('orders');
//     },
//   });

//   export const handlePostData = async (data) => {
//     try {
//       await mutation.mutateAsync(data);
//       // The data is successfully posted
//     } catch (error) {
//       // Handle the error
//     }
//   };