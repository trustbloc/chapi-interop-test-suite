'use strict';

const danubetech = require('./danubetech');
const digitalbazaar = require('./digitalbazaar');
const transmute = require('./transmute');
const trustbloc = require('./trustbloc');

const vendors = {};

vendors['danubetech'] = danubetech;
vendors['digitalbazaar'] = digitalbazaar;
vendors['transmute'] = transmute;
vendors['trustbloc'] = trustbloc;

module.exports = vendors;
