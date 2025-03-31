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

  res.PAYMENT_REQUIRED = (err) => {
    res.status(httpStatus.PAYMENT_REQUIRED).json();
  };

  next();
}