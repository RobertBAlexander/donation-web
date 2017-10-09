/**
 * Created by Robert Alexander on 19/09/2017.
 */
const Donations = require('./app/controllers/donations');
const Assets = require('./app/controllers/assets');
const Accounts = require('./app/controllers/accounts');

module.exports = [

  { method: 'GET', path: '/home', config: Donations.home },
  { method: 'GET', path: '/report', config: Donations.report },
  { method: 'POST', path: '/donate', config: Donations.donate },

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/register', config: Accounts.register },

  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];