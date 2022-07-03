import { TIMEOUT_SEC } from "./config";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function(url) {
  try {
    const data = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const res = await data.json();

    if (!data.ok) {
      throw new Error(`${res.message} ${data.status}`);
    }
    return res;

  } catch(err) {

    throw err;
  }



}
