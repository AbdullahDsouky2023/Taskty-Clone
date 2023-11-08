import axios from 'axios';
export const postOrder = (values) =>
  axios
    .post('http://192.168.1.6:1337/api/orders', {
        data:{
            ...values
        }
    })
    .then((response) => {
     return response.data
    })
    .catch((error) => {
      console.error('Error:', error.response.data); // Log the error response
    });
