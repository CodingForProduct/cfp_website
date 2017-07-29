 process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development') {
  require('dotenv').config();
}
