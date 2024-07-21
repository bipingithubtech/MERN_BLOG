import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Get the JWT token from cookies or headers
  const token =
    req.cookies?.jwtToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.jwt);

    // Attach the decoded user information to the request object
    req.user = decoded;
    console.log("Decoded token data:", decoded);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
