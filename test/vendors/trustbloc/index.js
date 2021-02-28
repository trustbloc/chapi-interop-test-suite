'use strict';

const issuerApi = require('./issuer');
const walletApi = require('./wallet');
const verifierApi = require('./verifier');
const constants = require('./constants')

module.exports = {
  meta: {
    key: 'trustbloc',
    name: 'TrustBloc'
  },
  wallet: {
    api: walletApi,
    meta: {
      name: constants.walletName,
      supportedFlows: ['2020-05-07-dhs-prc', '2020-05-07-dhs-cmtr']
    }
  },
  issuer: {
    api: issuerApi,
    meta: {
      name: 'Trustbloc Issuer',
      supportedFlows: ['2020-05-07-dhs-prc', '2020-05-07-dhs-cmtr']
    }
  },
  verifier: {
    api: verifierApi,
    meta: {
      name: 'Trustbloc Verifier',
      supportedFlows: ['2020-05-07-dhs-prc', '2020-05-07-dhs-cmtr']
    }
  }
};
