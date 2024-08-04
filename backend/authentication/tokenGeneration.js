import jwt from "jsonwebtoken";

const tokenGeneration = (userid, req) => {
  try {
    const payload = { userid };
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return token;
  } catch (error) {
    console.error("error occured in authntication route " + error.message);
    return res.status(404).json({ error: error.message });
  }
};

export default tokenGeneration;
