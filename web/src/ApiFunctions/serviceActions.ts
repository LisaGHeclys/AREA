export const serviceSubscribe = async (id: number) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/services/subscribe/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
    return response.json();
};

export const serviceUnsubscribe = async (id: number) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/services/unsubscribe/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
    return response.json();
};
