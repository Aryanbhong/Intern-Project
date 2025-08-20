import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js"; 



export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid token format" });


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user; 
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }
    next();
  };
};
