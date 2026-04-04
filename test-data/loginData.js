module.exports = {
  valid: {
    username: 'admin',
    password: 'admin'
  },
  invalidUsername: {
    username: 'invalidUser',
    password: 'admin'
  },
  invalidPassword: {
    username: 'admin',
    password: 'invalidPass'
  },
  invalidBoth: {
    username: 'invalidUser',
    password: 'invalidPass'
  },
  emptyUsername: {
    username: '',
    password: 'admin'
  },
  emptyPassword: {
    username: 'admin',
    password: ''
  }
};
