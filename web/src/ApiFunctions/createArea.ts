const createArea = async (areaData: any) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/createArea/${areaData?.actionId ?? 0}/${areaData?.reactionId ?? 0}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(areaData),
    });
    return response.json();
};

export default createArea;
