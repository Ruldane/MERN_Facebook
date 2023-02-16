const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let temporaryToken = req.header("Authorization");
    // remove the word 'Bearer' from the token
    const token = temporaryToken
      ? temporaryToken.slice(7, temporaryToken.length)
      : "";

    if (!token) {
      return res
        .status(400)
        .json({ message: "Invalid Authentication without Token" });
    }
    // verify the token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Invalid Authentication with Token: " + err });
      }
      // continue if no error
      req.user = user;
      next();
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};