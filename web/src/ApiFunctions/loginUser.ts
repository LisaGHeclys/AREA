const loginUser = async (userData: any) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export default loginUser;
