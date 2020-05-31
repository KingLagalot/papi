// Removes all key-value pairs from object where value is null
exports.clean = obj => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
};

// Must be run at the end of a query
exports.paginate = (query, page, size) => {
  var body = {};
  const offset = (page - 1) * size;
  return Promise.all([
    query.count('* as count').first(),
    query
      .select('*')
      .offset(offset)
      .limit(size),
  ]).then(([total, rows]) => {
    var count = total.count;
    body.total = count;
    body.per_page = size;
    body.offset = offset;
    body.to = offset + rows.length;
    body.last_page = Math.ceil(count / size);
    body.current_page = page;
    body.from = offset;
    body.data = rows;
    return body;
  });
};
