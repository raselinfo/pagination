const pagination = (req) => {
  console.log(req.query);
  let { page, limit, skip } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  skip = (page - 1) * (skip || 10);

  return {
    page,
    limit,
    skip,
  };
};

module.exports = pagination;
