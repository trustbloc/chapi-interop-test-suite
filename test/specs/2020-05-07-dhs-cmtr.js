'use strict';

const {chapi, getVendors, getVendorTitle, getTestProfile, skip} = require('../helpers');
const path = require('path');
const uuid = require('uuid-random');
const vendors = require('../vendors');

const TITLE = 'DHS/CBP Certified Mill Test Report';
const SCENARIO_KEY = path.parse(__filename).name;

const {walletVendors, issuerVendors, verifierVendors} = getVendors({
  vendors,
  scenarioKey: SCENARIO_KEY,
});

const BASE_CTX = {
  credentials: ['CertifiedMillTestReport'],
  key: SCENARIO_KEY,
  name: 'Jane Doe',
  familyName: 'Doe',
  givenName: 'Jane',
  email: '',
  walletVendor: '',
  issuerVendor: '',
  verifierVendor: '',
};

walletVendors.forEach(walletVendor => {
  issuerVendors.forEach(issuerVendor => {
    verifierVendors.forEach(verifierVendor => {

      const VENDOR_TITLE = getVendorTitle({
        walletVendor,
        issuerVendor,
        verifierVendor,
      });


      const TEST_PROFILE = getTestProfile({
        issuerVendor,
        verifierVendor,
      });

      // intentionally disabled test due to interop issues
      let skipTest = skip({
        issuerVendor,
        verifierVendor,
        scenario: SCENARIO_KEY,
      });

      describe(`[${TITLE}] ${VENDOR_TITLE} ${skipTest}`, () => {
        const ctx = {
          ...BASE_CTX,
          email: `${uuid()}@example.com`,
          walletVendor: walletVendor.meta.name,
          issuerVendor: issuerVendor.meta.name,
          verifierVendor: verifierVendor.meta.name,
          did: TEST_PROFILE.did,
          profile: TEST_PROFILE.issuerProfile,
          skipStatusCheck: TEST_PROFILE.skipVCStatusCheck,
        };

        // runs once before the first test in this block
        before(async () => {
          await browser.reloadSession();
          await browser.maximizeWindow();
        });

        beforeEach(function() {
          if(skipTest) {
            this.skip();
          }
        });

        it('creates a wallet', async function() {
          this.timeout(300000);

          // 1. Navigate to Wallet Website
          const url = await walletVendor.wallet.api.getUrl(ctx);
          await browser.navigateTo(url);

          // 2. Initialize Wallet (register/sign-up/etc.)
          await walletVendor.wallet.api.init(ctx);
        });

        it('issues a CMTR credential', async () => {
          // 1. Navigate to Issuer Website
          const url = await issuerVendor.issuer.api.getUrl(ctx);
          await browser.newWindow(url);

          // 2. Authenticate at Issuer Website with Wallet
          await issuerVendor.issuer.api.authenticate(ctx);
          await chapi.chooseWallet({
            name: walletVendor.wallet.meta.name,
          });
          await walletVendor.wallet.api.authenticate(ctx);
          await browser.switchToFrame(null);

          // 3. Issue credential to authenticated DID at Issuer Website
          await issuerVendor.issuer.api.issue(ctx);

          // 4. Store credential with Wallet
          await chapi.chooseWallet({
            name: walletVendor.wallet.meta.name,
          });
          await walletVendor.wallet.api.storeCredentials(ctx);
          await browser.switchToFrame(null);

          // 5. Show success message at Issuer Website
          await issuerVendor.issuer.api.finish(ctx);
        });

        it('verifies a CMTR credential', async () => {
          // 1. Navigate to Verifier Website
          const url = await verifierVendor.verifier.api.getUrl(ctx);
          await browser.newWindow(url);

          // 2. Verify credentials at Verifier Website with Wallet
          await verifierVendor.verifier.api.verify(ctx);
          await chapi.chooseWallet({
            name: walletVendor.wallet.meta.name,
          });
          await walletVendor.wallet.api.presentCredentials(ctx);
          await browser.switchToFrame(null);

          // 3. Show success message at Verifier Website
          await verifierVendor.verifier.api.finish(ctx);
        });
      });
    });
  });
});
