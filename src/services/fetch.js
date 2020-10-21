import URls from '../constants/urls';
import axios from 'axios';

export default async (props) => {
  let { endPoint, params='', method='get' } = props;
  let validEndpoint = URls[endPoint];

  if(validEndpoint === undefined) {
    return false;
  }

  return axios.request({
    baseURL: URls.baseURl,
    method,
    url: validEndpoint,
    params
  }).then(response =>  response.data)
    .catch((error) => {
      console.log(error.response);
    });
};