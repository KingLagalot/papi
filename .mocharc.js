module.exports = {
  recursive: true,
  color: true,
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  ui: 'bdd',
  file: ['./test/setup/db.setup.js'],
};
