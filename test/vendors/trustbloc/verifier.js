'use strict';

const constants = require('./constants');

const FLOW_URLS = constants.urls;
const FLOW_IDS = {
  'PermanentResidentCard' : '#prCard',
  'CertifiedMillTestReport': '#cmtr',
}

/*************************** Public API ******************************/

exports.getUrl = async ({key}) => {
  const urls = FLOW_URLS.get(key);
  if(!(urls && urls.verifier)) {
    throw new Error(`No URL found for ${key}`);
  }
  return urls.verifier;
};

exports.verify = async ({skipStatusCheck, credentials}) => {
  if (skipStatusCheck) {
    const settings = await $('#profileSettings');
    await settings.waitForExist();
    await settings.click();

    const skipStatusCheck = await $('#verify-cred-status');
    await skipStatusCheck.waitForExist();
    await skipStatusCheck.waitForClickable();
    await skipStatusCheck.click();
  }

  const btnID = FLOW_IDS[credentials[0]]
  const verifyButton = await $(btnID);
  await verifyButton.waitForClickable();
  await verifyButton.click();
};

exports.finish = async () => {
  const successMsg = await $('#successMsg');
  await successMsg.waitForExist();
  expect(successMsg).toHaveText('Successfully Verified');

  const successMsgH4 = await $('h4=Presented Digital ID');
  await successMsgH4.waitForExist();

  console.log('verified credential successfully !!')
};
