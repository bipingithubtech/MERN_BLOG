import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const { jwtToken } = req.cookies;
  console.log(jwtToken);

  try {
    const AuthStatus = jwt.verify(jwtToken, process.env.jwt);
    req.userId = AuthStatus.userId;
  } catch (err) {
    console.log(err, " cLLING VERIFY TOKEN");
  }
};

export default verifyToken;
