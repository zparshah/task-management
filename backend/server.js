const config = require('./config');
const app = require('./app');

const port = config.get('port');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port: ${port}`);
});
