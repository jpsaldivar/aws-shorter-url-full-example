
const handler = async (req:any, res:any) => {
  if (req.method === "POST") {
    const data = req.body;

    if(data.email == "jpsr@bx.cl" && data.password == "123456" ){
        res.status(200).json({ message: "Login successful!" });
    }else{
        res.status(403).json({ message: "Login failed!" });
    }

    
  }
};

export default handler;
