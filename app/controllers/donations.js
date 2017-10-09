/**
 * Created by Robert Alexander on 19/09/2017.
 */
'use strict';
const Donation = require('../models/donation');
const User = require('../models/user');

exports.home = {

  handler: function (request, reply) {
    reply.view('home', { title: 'Make a Donation' });
  },

};

exports.report = {

  handler: function (request, reply) {
    Donation.find({}).populate('donor').then(allDonations => {
      reply.view('report', {
        title: 'Donations to Date',
        donations: allDonations,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.donate = {

  handler: function (request, reply) {
    let userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      //data.donor = request.auth.credentials.loggedInUser;
      const donation = new Donation(data);
      donation.donor = user._id;
      return donation.save();
    }).then(newDonation => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.signup = {

  handler: (request, reply) => {
    reply.view('signup', { title: 'Sign up for Donations' });//reply.file('./app/views/signup.hbs');
  },

};

exports.login = {

  handler: (request, reply) => {
    reply.view('login', { title: 'Login to Donations' });//reply.file('./app/views/login.hbs');
  },

};
