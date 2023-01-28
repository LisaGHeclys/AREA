export const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
    return response.json();
};
