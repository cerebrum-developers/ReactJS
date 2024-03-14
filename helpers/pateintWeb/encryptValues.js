import Hashids from "hashids";
var key = import.meta.env.VITE_APP_URL_ENCODE_KEY;
var hashids = new Hashids(key, 9);

/**
 * @function encryptId
 * @param id
 * @param encrypted_id
 * @desc This handles encryption of an id using Hashids
 */
export const encryptId = id => {
  var encrypted_id = id;
  if (parseInt(id, 10)) {
    encrypted_id = hashids.encode(id);
  }
  return encrypted_id;
};

/**
 * @function decryptId
 * @param id
 * @param decrypted_id
 * @desc This handles decryption of an id using Hashids
 */
export const decryptId = id => {
  var decrypted_id = hashids.decode(id);
  return decrypted_id[0];
};
