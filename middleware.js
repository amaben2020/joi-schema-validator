const Joi = require('joi');

const middleware = (schema, property) => {
  return (req, res, next) => {
    req.requestTime = Date.now();
    const { error } = Joi.validate(req[property], schema);

    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({
        error: message,
      });
    }
  };
};

const mware2 = (schema, reqType) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[reqType], schema);

    const noError = error == null;

    if (noError) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({
        error: message,
      });
    }
  };
};

module.exports = { middleware, mware2 };
