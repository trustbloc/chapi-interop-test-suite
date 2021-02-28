'use strict';

module.exports = {
  scenarios: {
    '2020-05-07-dhs-prc': {
      // Uncomment line to use specific vendor(s)
      // walletVendors: ['digitalbazaar'],
      walletVendors: 'all',
      // Uncomment line to use specific vendor(s)
      // issuerVendors: ['danubetech'],
      issuerVendors: 'all',
      // Uncomment line to use specific vendor(s)
      // verifierVendors: ['transmute'],
      verifierVendors: 'all',
    },
    '2020-05-07-dhs-cmtr': {
      walletVendors: 'all',
      issuerVendors: 'all',
      verifierVendors: 'all',
    },
  },
  // Below tests are being skipped since they are failing due to already known issues
  // like, invalid JSON-LD context, offline endpoints etc.
  // Remove entry from this list to include them in scenario
  // structure: skips[test-scenario][issuer-key][verifier-key].reason
  skips: {
    '2020-05-07-dhs-prc': {
      'digitalbazaar': {
        'danubetech': 'Danube Tech verifier not reachable at the moment',
      },
      'transmute': {
        'trustbloc': 'JSON-LD context validation issue with JS library',
        'danubetech': 'Danube Tech verifier not reachable at the moment',
      },
      'trustbloc': {
        'danubetech': 'Danube Tech verifier not reachable at the moment',
      },
      'danubetech': {
        'danubetech': 'Danube Tech verifier not reachable at the moment',
        'trustbloc': 'Danube Tech verifier not reachable at the moment',
        'transmute': 'Danube Tech verifier not reachable at the moment',
        'digitalbazaar': 'Danube Tech verifier not reachable at the moment',
      },
    },
    '2020-05-07-dhs-cmtr': {
      'trustbloc': {
        'transmute': 'JSON-LD context validation issue with JS library',
      },
      'transmute': {
        'trustbloc': 'JSON-LD context validation issue with JS library',
        'transmute': 'JSON-LD context validation issue with JS library',
      },
    },
  },
};
