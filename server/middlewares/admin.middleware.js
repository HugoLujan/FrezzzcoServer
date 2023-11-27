import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const checkJwt = (req, res, next) => {
  const token = String(req.headers["auth"]);

  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, SECRET_KEY);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    return res.status(401).json({ message: 'Not Authorized' });
  }

  const { userId, userName } = jwtPayload;

  const newToken = jwt.sign({ userId, userName }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);
  next();
};
