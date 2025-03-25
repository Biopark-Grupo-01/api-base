import httpStatus from "http-status";

export default (req, res, next) => {
  res.CREATED = () => {
    res.status(httpStatus.CREATED).send();
  };

  res.OK = () => {
    res.status(httpStatus.OK).send();
  };

  next();
}