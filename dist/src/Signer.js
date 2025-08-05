import { WcSigner } from "mainnet-js";
import { CsSigner } from "./CsSigner.js";
export class Signer extends WcSigner {
    csSigner;
    constructor(wallet, connector) {
        super(wallet, connector);
        this.csSigner = new CsSigner(connector);
    }
    async cashscriptSend(builder, options) {
        return this.csSigner.cashscriptSend(builder, options);
    }
}
//# sourceMappingURL=Signer.js.map