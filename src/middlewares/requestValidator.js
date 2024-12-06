
function requireTextField(req, res, next) {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text field is required and must be a non-empty string.' });
    }
    next();
  }
  
  module.exports = {
    requireTextField,
  };
  