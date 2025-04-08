import httpStatus from "http-status";

export default (req, res, next) => {
  res.CREATED = () => {
    res.status(httpStatus.CREATED).send();
  };

  res.OK = (data) => {
    res.status(httpStatus.OK).json(data);
  };

  res.NO_CONTENT = () => {
    res.status(httpStatus.NO_CONTENT).send();
  };

  res.BAD_REQUEST = (err) => {
    res.status(httpStatus.BAD_REQUEST).json(err);
  };

  res.INTERNAL_SERVER_ERROR = (err) => {
  /*
    #swagger.responses[500] = {
      schema: {
       $ref: "#/definitions/InternalServerError",
      },
    }
  */
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  };

  res.UNAUTHORIZED = () => {
    res.status(httpStatus.UNAUTHORIZED).send();
  }


  next();
}