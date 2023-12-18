
const handler = async (req:any, res:any) => {
  if (req.method === "POST") {
    const data = req.body;
    console.log("DATA",data);
    const response = await fetch('http://backend.sbx4.blue.cl/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url: data.url}),
    });
    const dataRes = await response.json();
    res.status(200).json(dataRes);
    
  }
};

export default handler;
