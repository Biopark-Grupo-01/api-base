import httpStatus from "http-status";

export default (req, res, next) => {
  res.hateos_item = (data) => {
    res.status(httpStatus.OK).json({
      ...data._doc,
      _links: [
        {
          rel: "self",
          href: req.originalUrl,
          method: req.method,
        },
        {
          rel: "list",
          href: req.baseUrl,
          method: "GET",
        },
        {
          rel: "update",
          href: `${req.baseUrl}/${req.params._id}`,
          method: "PUT",
        },
        {
          rel: "delete",
          href: `${req.baseUrl}/${req.params._id}`,
          method: "DELETE",
        },
      ],
    });
  };

  res.hateos_list = (data) => {
    res.status(httpStatus.OK).json({
      users: data.map((user) => ({
        ...user._doc,
        _links: [
          {
            rel: "self",
            href: `${req.baseUrl}/${user._id}`,
            method: "GET",
          },
        ],
      })),
      _links: [
        {
          rel: "self",
          href: req.originalUrl,
          method: req.method,
        },
        {
          rel: "create",
          href: req.baseUrl,
          method: "POST",
        },
      ],
      meta: {
        count: data.length,
      },
    });
  };

  next();
};
