import jwt from "jsonwebtoken";

const userAuthentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(404).json({ error: "unauthenticated" });
    }
    if (!authorization.startsWith("Bearer")) {
      return res.status(404).json({ error: "couldn't got type of token" });
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    console.error("came in autntication middleware");
    return res.status(404).json({ error: "unauthenticated" });
  }
};

export default userAuthentication;
