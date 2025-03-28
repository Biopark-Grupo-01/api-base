export default (req, res, next) => {
  res.hateoas_item = (data) => {
    res.OK({
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

  res.hateoas_list = (data) => {
    res.OK({
      data: data.map((item) => ({
        ...item._doc,
        _links: [
          {
            rel: "self",
            href: `${req.baseUrl}/${item._id}`,
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
