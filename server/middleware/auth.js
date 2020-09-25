const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    let publicURLS = [
      {url: '/api/auth/', method: 'POST'}
    ]

    let isPublic = false;


    for(var i = 0; i < publicURLS.length; i++) {
      const {url, method} = publicURLS[i];
        // if we have a url thats a public url, set isPublic to true
      if(req.url.includes(url) && req.method === method){
        isPublic = true;
        break;
      }
    }

    // if there are public URLS then no need to run the middleware so next()
    if(isPublic) {
      next();
      return;
    }

    // on protected URLS check for json web token coming from the clients req headers
    const token = req.header('x-auth-token');
    if(!token) {
      res.status(401).json({ msg: "Invalid token. Access Denied"});
      return;
    }

    try {
        const decoded = jwt.verify(JSON.parse(token), process.env.SECRET);
        req.username = decoded;
        next();
    } catch {
      res.status(400).json({msg: 'Token is not valid.'});
    }

}

module.exports = authMiddleware;