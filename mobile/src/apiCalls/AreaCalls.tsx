import {getItem} from '../components/storage/localStorage';

const getAreas = async () => {
  const jwt = await getItem('jwt');

  const response = await fetch(
    `http://area.eu-west-3.elasticbeanstalk.com/areas`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'no-cors',
        Authorization: `Bearer ${jwt?.split(`"`)[1]}`,
      },
    },
  );
  return response.json();
};

const createArea = async (areaData: any) => {
  const jwt = await getItem('jwt');

  const response = await fetch(
    `http://area.eu-west-3.elasticbeanstalk.com/createArea/${
      areaData?.action.id ?? 0
    }/${areaData?.reaction.id ?? 0}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt?.split(`"`)[1]}`,
      },
      body: JSON.stringify(areaData),
    },
  );
  return response.json();
};

export {getAreas, createArea};
