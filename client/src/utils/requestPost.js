import axios from 'axios';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

async function request(options) {
    let response;
    try {
        response = await axios(options)
        return response;
    } catch (error) {
        console.log(error)
        return response;
    }
}

export default request;