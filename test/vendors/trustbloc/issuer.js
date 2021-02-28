'use strict';

const constants = require('./constants');

const FLOW_URLS = constants.urls;
const timeout = 60000;

const FLOW_IDS = {
  'PermanentResidentCard' : '#prCard',
  'CertifiedMillTestReport': '#cmtr',
}

/*************************** Public API ******************************/

exports.getUrl = async ({key}) => {
  const urls = FLOW_URLS.get(key);
  if(!(urls && urls.issuer)) {
    throw new Error(`No URL found for ${key}`);
  }
  return urls.issuer;
};

exports.authenticate = async ({credentials, profile}) => {
  // profile setting if required
  await _changeProfile({profile})

  // dashboard
  const btnID = FLOW_IDS[credentials[0]]
  const issuePrcBtn = await $(btnID);
  await issuePrcBtn.waitForExist();
  await issuePrcBtn.click();

  // login
  const loginButton = await $('#accept');
  await loginButton.click();

  // consent
  const consentButton = await $('#accept');
  await consentButton.click();

  // did auth
  const authenticateBtn = await $('#authBtn');
  await authenticateBtn.waitForClickable();
  await authenticateBtn.click();
};

exports.issue = async () => {
  const storeBtn = await $('#storeVCBtn');
  await storeBtn.waitForClickable();
  await storeBtn.click();
};

exports.finish = async () => {
  const successMsgIcon = await $('#success-img');
  await successMsgIcon.waitForExist();

  const successMsg = await $('div*=Credential is saved successfully');
  await successMsg.waitForExist();

  console.log('saved credential successfully !!')
};

/*************************** Helper functions ******************************/

async function _changeProfile({profile}) {
  if (profile) {
    const profileSettings = await $('#profileSettings')
    await profileSettings.waitForExist();
    await profileSettings.click();

    const selectProfile = await $(`#${profile}`);
    await selectProfile.waitForExist({timeout});
    await selectProfile.click();

    const saveProfile = await $('#saveProfile')
    await saveProfile.waitForExist();
    await saveProfile.click();
  }
}
