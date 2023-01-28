import {getItem} from '../components/storage/localStorage';

export const updateProvider = async (
  providerName: string,
  accessToken: string,
  refreshToken: string,
) => {
  const jwt = await getItem('jwt');

  const response = await fetch(
    `http://area.eu-west-3.elasticbeanstalk.com/provider/update/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt?.split(`"`)[1]}`,
      },
      body: JSON.stringify({providerName, accessToken, refreshToken}),
    },
  );
  return response.json();
};
