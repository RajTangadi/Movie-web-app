import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(user);
  if (!token) {
    return res.status(401).json({ message: "token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).send("Access Forbidden");
  next();
};
