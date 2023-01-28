import {getItem} from '../components/storage/localStorage';

const getUser = async () => {
  const jwt = await getItem('jwt');

  const response = await fetch(
    `http://area.eu-west-3.elasticbeanstalk.com/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt?.split(`"`)[1]}`,
      },
    },
  );
  return response.json();
};

const loginUser = async (userData: any) => {
  const response = await fetch(
    `http://area.eu-west-3.elasticbeanstalk.com/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(userData),
    },
  );
  return response.json();
};

const registerUser = async (userData: any) => {
  const response = await fetch(
    `http://area.eu-west-3.elasticbeanstalk.com/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(userData),
    },
  );
  return response.json();
};

export {getUser, loginUser, registerUser};
