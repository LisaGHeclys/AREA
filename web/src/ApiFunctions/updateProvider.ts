export const updateProvider = async (providerName: string, accessToken: string, refreshToken: string) => {
    const response = await fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:8080') + `/provider/update/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({providerName, accessToken, refreshToken}),
    });
    return response.json();
};
