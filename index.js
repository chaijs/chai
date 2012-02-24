module.exports = process.env.CHAI_COV
  ? require('./lib-cov/chai')
  : require('./lib/chai');
