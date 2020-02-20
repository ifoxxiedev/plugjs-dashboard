export default callback => 
  (req, res, next) => callback(req, res, next).next(next)