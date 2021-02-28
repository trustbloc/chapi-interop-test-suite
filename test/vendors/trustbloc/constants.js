'use strict';

const constants = {};
module.exports = constants;

constants.dids = {
  trustbloc: {
    name: 'DID_TRUSTBLOC',
    keyType: 'Ed25519',
    signatureType: 'Ed25519Signature2018',
  },
  key: {
    name: 'DID_KEY',
    did: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
    pkjwk: '{"kty": "OKP","d": "B6LAGGr-fqK1xb8dS_M4TBEJr2U-X1PPwhGjPkiZofE","crv": "Ed25519","x": "AgQMioVk8C3VhcSnK7bwOjwu5eiyEe3nMaDSkNt2H70","kid":"z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd"}',
    keyID: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
    signatureType: 'Ed25519Signature2018'
  },
  v1: {
    name: 'DID_V1',
    did: 'did:v1:test:nym:z6Mkg1G7NEzfu7Wc937oeQuZjerX4jM1kvBMWQWX3oFoUvTR',
    pkjwk: '{"kty": "OKP","d":"Dq5t2WS3OMzcpkh8AyVxJs5r9v4L39ocIz9CpUOqM40","crv": "Ed25519","x": "ODaPFurJgFcoVCUYEmgOJpWOtPlOYbHSugasscKWqDM","kid":"z6MkiEh8RQL83nkPo8ehDeE7cPHPEkA5dDUeFHbtJJF8Sc2v"}',
    keyID: 'did:v1:test:nym:z6Mkg1G7NEzfu7Wc937oeQuZjerX4jM1kvBMWQWX3oFoUvTR#z6MkiEh8RQL83nkPo8ehDeE7cPHPEkA5dDUeFHbtJJF8Sc2v',
    signatureType: 'Ed25519Signature2018'
  }
};


constants.urls = new Map();

// change below URLs to use different environment
const WALLET_NAME = 'myagent.trustbloc.local'
const WALLET_URL = 'https://myagent.trustbloc.local/';
const ISSUER_URL = 'https://issuer.trustbloc.local/';
const VERIFIER_URL = 'https://rp.trustbloc.local/';

constants.urls.set('2020-05-07-dhs-prc', {
  wallet: WALLET_URL,
  issuer: ISSUER_URL,
  verifier: VERIFIER_URL
});

constants.urls.set('2020-05-07-dhs-cmtr', {
  wallet: WALLET_URL,
  issuer: ISSUER_URL,
  verifier: VERIFIER_URL
});

constants.walletName = WALLET_NAME
