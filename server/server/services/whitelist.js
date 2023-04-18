import SignatureManager from "./signatures.js";
import whitelist from '../config/whitelist.js';

class WhitelistManager {
  constructor () {
    this._whitelist = whitelist.map(addr => addr.toLowerCase());
  
  }

  getWhitelistInvitation(chainId, address) {
    const signatureService = new SignatureManager();
    if(this.isWhitelisted(address)) {
      return signatureService.WhitelistSignature(chainId, address);
    } 
    return null;
  }

  isWhitelisted(address) {
    return this._whitelist.includes(address.toLowerCase()) 
  }
}

export default new WhitelistManager();