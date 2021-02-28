'use strict';

const issuerApi = require('./issuer');
const walletApi = require('./wallet');
const verifierApi = require('./verifier');

module.exports = {
  meta: {
    key: 'digitalbazaar',
    name: 'Digital Bazaar',
    testProfile: {
      did: 'v1',
      issuerProfile: 'didkey-ed',
      skipVCStatusCheck: true,
    }
  },
  issuer: {
    api: issuerApi,
    meta: {
      name: 'Veres Issuer',
      supportedFlows: ['2020-05-07-dhs-prc'],
    },
  },
  verifier: {
    api: verifierApi,
    meta: {
      name: 'Veres Verifier',
      supportedFlows: ['2020-05-07-dhs-prc']
    },
  },
};
