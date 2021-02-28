'use strict';

const issuerApi = require('./issuer');
const verifierApi = require('./verifier');

module.exports = {
  meta: {
    key: 'danubetech',
    name: 'Danube Tech',
    testProfile: {
      did: 'v1',
      issuerProfile: 'didkey-ed',
      skipVCStatusCheck: true,
    }
  },
  issuer: {
    api: issuerApi,
    meta: {
      supportedFlows: ['2020-05-07-dhs-prc']
    }
  },
  verifier: {
    api: verifierApi,
    meta: {
      supportedFlows: ['2020-05-07-dhs-prc']
    }
  }
};
