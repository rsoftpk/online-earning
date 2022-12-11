import request from './requests';
import { apis } from './apis';

export const serviceSignIn = async (data) => {
  const response = await request('post', apis.LOG_IN, data);
  return response;
};


export const serviceSignUp = async (data) => {
  const response = await request('post', apis.SIGN_UP, data);
  return response;
};

export const serviceUpdateUser = async (data) => {
  const response = await request('post', apis.USER_UPDATE, data);
  return response;
};

export const serviceDepositAmount = async (uid, uname, amount, dataUri) => {
  console.log('before formdate ',{
    uid, uname, amount, dataUri
  });
  // const blob = await fetch(dataUri).then((res) => res.blob());
  // const formdata = new FormData();
  // formdata.append('fileToUpload', blob, `receiptImage_${uid}_${uname}_${new Date()}.jpg`);
  // formdata.append('amount', amount);
  // formdata.append('uid', uid);
  // formdata.append('uname', uname);

  // const requestOptions = {
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow'
  // };
  // console.log('before request ', formdata);
  // const response = await request('post', apis.Make_DEPOSIT, requestOptions, true);
  // return response;
};