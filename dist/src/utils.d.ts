import { Contract, NetworkProvider, Utxo } from "cashscript";
import { UtxoI } from "mainnet-js";
import { Signer } from "./Signer.js";
export declare const min: (...args: bigint[]) => bigint;
export declare const require: (predicate: boolean, message: string) => void;
export declare const padVmNumber: (num: bigint, length: number) => Uint8Array<ArrayBuffer>;
export declare const vmToBigInt: (vmNumber: string) => bigint;
export declare function addressToLockScript(address: string): Uint8Array;
export declare const toCashAddress: (address: string) => string;
export declare const toTokenAddress: (address: string) => string;
export declare const getSushiContract: (sushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => Contract<{
    readonly contractName: "Sushi";
    readonly constructorInputs: readonly [{
        readonly name: "sushiCategory";
        readonly type: "bytes";
    }, {
        readonly name: "sushiBarCategory";
        readonly type: "bytes";
    }];
    readonly abi: readonly [{
        readonly name: "spend";
        readonly inputs: readonly [];
    }, {
        readonly name: "merge";
        readonly inputs: readonly [];
    }];
    readonly bytecode: "OP_2 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_1 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUAL OP_NIP OP_ELSE OP_ROT OP_1 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_1 OP_3 OP_WITHIN OP_VERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_1 OP_OUTPUTTOKENAMOUNT OP_NUMEQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUAL OP_ENDIF";
    readonly source: "// A simple contract to contain Sushi tokens which ensures its self-preservation under some rules.\ncontract Sushi(bytes sushiCategory, bytes sushiBarCategory) {\n  // This function is to move sushi tokens in context of SushiBar contract.\n  // Token amounts are ensured in SushiBar contract.\n  function spend() {\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar contract\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(this.activeInputIndex == 1, \"Invalid input index for Sushi\");\n    require(tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[this.activeInputIndex].lockingBytecode == tx.outputs[this.activeInputIndex].lockingBytecode, \"Invalid Sushi locking bytecode\");\n  }\n\n  // This function is used to merge Sushi tokens on different contract instances.\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input\n  //   1: contract: Sushi input\n  //   2: p2pkh or contract: Sushi input\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar input\n  //   1: contract: Sushi output, token amounts summed\n  //   2: BCH change\n  function merge() {\n    // inputs\n    require(tx.version == 2, \"Invalid transaction version for merge\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for merge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for merge\");\n    require(within(this.activeInputIndex, 1, 3));\n\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar token\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi locking bytecode\");\n\n    require(tx.inputs[2].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // outputs\n    require(tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount == tx.outputs[1].tokenAmount, \"Input Sushi amount must be greater than or equal to output Sushi amount\");\n\n    require(tx.outputs[2].tokenCategory == 0x, \"BCH change output must not have a token\");\n\n    // do not burden the change output and let the user pay the fees\n  }\n}\n";
    readonly debug: {
        readonly bytecode: "5279009c6300ce01207f757b8800c700cd88c0519dc0ce01207f7588c0c7c0cd8777677b519dc2529dc3549dc4539dc05153a56900ce01207f757b8800c700cd8851ce01207f75788851c751cd8852ce01207f758853ce008851d052d09351d39d52d1008768";
        readonly sourceMap: "5:2:12:3;;;;;6:22:6:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::100:1;7:22:7:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;9:12:9:33:0;:37::38;:4::73:1;10:22:10:43:0;:12::58:1;:65::67:0;:12::68:1;:::71;:4::111;11:22:11:43:0;:12::60:1;:75::96:0;:64::113:1;:4::149;5:2:12:3;;25::48::0;;;27:12:27:22;:26::27;:4::70:1;28:12:28:28:0;:32::33;:4::73:1;29:12:29:29:0;:33::34;:4::75:1;30:19:30:40:0;:42::43;:45::46;:12::47:1;:4::49;32:22:32:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::97:1;33:22:33:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;35:22:35:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::91:1;36:22:36:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;38:22:38:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::91;40:22:40:23:0;:12::38:1;:42::44:0;:4::89:1;43:22:43:23:0;:12::36:1;:49::50:0;:39::63:1;:12;:78::79:0;:67::92:1;:4::169;45:23:45:24:0;:12::39:1;:43::45:0;:4::90:1;2:0:49:1";
        readonly logs: readonly [];
        readonly requires: readonly [{
            readonly ip: 13;
            readonly line: 6;
            readonly message: "Not a SushiBar contract";
        }, {
            readonly ip: 18;
            readonly line: 7;
            readonly message: "Invalid SushiBar locking bytecode";
        }, {
            readonly ip: 21;
            readonly line: 9;
            readonly message: "Invalid input index for Sushi";
        }, {
            readonly ip: 27;
            readonly line: 10;
            readonly message: "Not a Sushi token";
        }, {
            readonly ip: 33;
            readonly line: 11;
            readonly message: "Invalid Sushi locking bytecode";
        }, {
            readonly ip: 40;
            readonly line: 27;
            readonly message: "Invalid transaction version for merge";
        }, {
            readonly ip: 43;
            readonly line: 28;
            readonly message: "Invalid number of inputs for merge";
        }, {
            readonly ip: 46;
            readonly line: 29;
            readonly message: "Invalid number of outputs for merge";
        }, {
            readonly ip: 51;
            readonly line: 30;
        }, {
            readonly ip: 58;
            readonly line: 32;
            readonly message: "Not a SushiBar token";
        }, {
            readonly ip: 63;
            readonly line: 33;
            readonly message: "Invalid SushiBar locking bytecode";
        }, {
            readonly ip: 70;
            readonly line: 35;
            readonly message: "Not a Sushi token";
        }, {
            readonly ip: 75;
            readonly line: 36;
            readonly message: "Invalid Sushi locking bytecode";
        }, {
            readonly ip: 81;
            readonly line: 38;
            readonly message: "Not a Sushi token";
        }, {
            readonly ip: 85;
            readonly line: 40;
            readonly message: "BCH funding input must not have a token";
        }, {
            readonly ip: 93;
            readonly line: 43;
            readonly message: "Input Sushi amount must be greater than or equal to output Sushi amount";
        }, {
            readonly ip: 98;
            readonly line: 45;
            readonly message: "BCH change output must not have a token";
        }];
    };
    readonly compiler: {
        readonly name: "cashc";
        readonly version: "0.11.1";
    };
    readonly updatedAt: "2025-07-12T10:38:57.373Z";
}, {
    constructorInputs: [string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>];
    functions: {
        spend: () => import("cashscript").Transaction;
        merge: () => import("cashscript").Transaction;
    };
    unlock: {
        spend: () => import("cashscript").Unlocker;
        merge: () => import("cashscript").Unlocker;
    };
}>;
export declare const getXSushiContractContract: (xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => Contract<{
    readonly contractName: "xSushi";
    readonly constructorInputs: readonly [{
        readonly name: "xSushiCategory";
        readonly type: "bytes";
    }, {
        readonly name: "sushiBarCategory";
        readonly type: "bytes";
    }];
    readonly abi: readonly [{
        readonly name: "spend";
        readonly inputs: readonly [];
    }, {
        readonly name: "merge";
        readonly inputs: readonly [];
    }];
    readonly bytecode: "OP_2 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_2 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUAL OP_NIP OP_ELSE OP_ROT OP_1 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_1 OP_3 OP_WITHIN OP_VERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_1 OP_OUTPUTTOKENAMOUNT OP_NUMEQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUAL OP_ENDIF";
    readonly source: "// A simple contract to contain xSushi tokens which ensures its self-preservation under some rules.\ncontract xSushi(bytes xSushiCategory, bytes sushiBarCategory) {\n  // This function is to move sushi tokens in context of SushiBar contract.\n  // Token amounts are ensured in SushiBar contract.\n  function spend() {\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar contract\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(this.activeInputIndex == 2, \"Invalid input index for xSushi\");\n    require(tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n    require(tx.inputs[this.activeInputIndex].lockingBytecode == tx.outputs[this.activeInputIndex].lockingBytecode, \"Invalid xSushi locking bytecode\");\n  }\n\n  // This function is used to merge xSushi tokens on different contract instances.\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input\n  //   1: contract: xSushi input\n  //   2: p2pkh or contract: xSushi input\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar input\n  //   1: contract: xSushi output, token amounts summed\n  //   2: BCH change\n  function merge() {\n    // inputs\n    require(tx.version == 2, \"Invalid transaction version for merge\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for merge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for merge\");\n    require(within(this.activeInputIndex, 1, 3));\n\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar token\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(tx.inputs[1].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid xSushi locking bytecode\");\n\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // outputs\n    require(tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount == tx.outputs[1].tokenAmount, \"Input xSushi amount must be greater than or equal to output xSushi amount\");\n\n    require(tx.outputs[2].tokenCategory == 0x, \"BCH change output must not have a token\");\n\n    // do not burden the change output and let the user pay the fees\n  }\n}\n";
    readonly debug: {
        readonly bytecode: "5279009c6300ce01207f757b8800c700cd88c0529dc0ce01207f7588c0c7c0cd8777677b519dc2529dc3549dc4539dc05153a56900ce01207f757b8800c700cd8851ce01207f75788851c751cd8852ce01207f758853ce008851d052d09351d39d52d1008768";
        readonly sourceMap: "5:2:12:3;;;;;6:22:6:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::100:1;7:22:7:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;9:12:9:33:0;:37::38;:4::74:1;10:22:10:43:0;:12::58:1;:65::67:0;:12::68:1;:::71;:4::113;11:22:11:43:0;:12::60:1;:75::96:0;:64::113:1;:4::150;5:2:12:3;;25::48::0;;;27:12:27:22;:26::27;:4::70:1;28:12:28:28:0;:32::33;:4::73:1;29:12:29:29:0;:33::34;:4::75:1;30:19:30:40:0;:42::43;:45::46;:12::47:1;:4::49;32:22:32:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::97:1;33:22:33:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;35:22:35:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;:4::93:1;36:22:36:23:0;:12::40:1;:55::56:0;:44::73:1;:4::110;38:22:38:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::93;40:22:40:23:0;:12::38:1;:42::44:0;:4::89:1;43:22:43:23:0;:12::36:1;:49::50:0;:39::63:1;:12;:78::79:0;:67::92:1;:4::171;45:23:45:24:0;:12::39:1;:43::45:0;:4::90:1;2:0:49:1";
        readonly logs: readonly [];
        readonly requires: readonly [{
            readonly ip: 13;
            readonly line: 6;
            readonly message: "Not a SushiBar contract";
        }, {
            readonly ip: 18;
            readonly line: 7;
            readonly message: "Invalid SushiBar locking bytecode";
        }, {
            readonly ip: 21;
            readonly line: 9;
            readonly message: "Invalid input index for xSushi";
        }, {
            readonly ip: 27;
            readonly line: 10;
            readonly message: "Not a xSushi token";
        }, {
            readonly ip: 33;
            readonly line: 11;
            readonly message: "Invalid xSushi locking bytecode";
        }, {
            readonly ip: 40;
            readonly line: 27;
            readonly message: "Invalid transaction version for merge";
        }, {
            readonly ip: 43;
            readonly line: 28;
            readonly message: "Invalid number of inputs for merge";
        }, {
            readonly ip: 46;
            readonly line: 29;
            readonly message: "Invalid number of outputs for merge";
        }, {
            readonly ip: 51;
            readonly line: 30;
        }, {
            readonly ip: 58;
            readonly line: 32;
            readonly message: "Not a SushiBar token";
        }, {
            readonly ip: 63;
            readonly line: 33;
            readonly message: "Invalid SushiBar locking bytecode";
        }, {
            readonly ip: 70;
            readonly line: 35;
            readonly message: "Not a xSushi token";
        }, {
            readonly ip: 75;
            readonly line: 36;
            readonly message: "Invalid xSushi locking bytecode";
        }, {
            readonly ip: 81;
            readonly line: 38;
            readonly message: "Not a xSushi token";
        }, {
            readonly ip: 85;
            readonly line: 40;
            readonly message: "BCH funding input must not have a token";
        }, {
            readonly ip: 93;
            readonly line: 43;
            readonly message: "Input xSushi amount must be greater than or equal to output xSushi amount";
        }, {
            readonly ip: 98;
            readonly line: 45;
            readonly message: "BCH change output must not have a token";
        }];
    };
    readonly compiler: {
        readonly name: "cashc";
        readonly version: "0.11.1";
    };
    readonly updatedAt: "2025-07-12T10:38:57.385Z";
}, {
    constructorInputs: [string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>];
    functions: {
        spend: () => import("cashscript").Transaction;
        merge: () => import("cashscript").Transaction;
    };
    unlock: {
        spend: () => import("cashscript").Unlocker;
        merge: () => import("cashscript").Unlocker;
    };
}>;
export declare const getSushiBarContract: (sushiCategory: string, xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => Contract<{
    readonly contractName: "SushiBar";
    readonly constructorInputs: readonly [{
        readonly name: "sushiBarCategory";
        readonly type: "bytes32";
    }, {
        readonly name: "sushiCategory";
        readonly type: "bytes32";
    }, {
        readonly name: "xSushiCategory";
        readonly type: "bytes32";
    }];
    readonly abi: readonly [{
        readonly name: "enterOrLeave";
        readonly inputs: readonly [{
            readonly name: "amount";
            readonly type: "int";
        }, {
            readonly name: "enter";
            readonly type: "bool";
        }];
    }, {
        readonly name: "incentivizeOrMerge";
        readonly inputs: readonly [{
            readonly name: "amount";
            readonly type: "int";
        }];
    }];
    readonly bytecode: "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_4 OP_PICK OP_0 OP_GREATERTHAN OP_VERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_3 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_6 OP_ROLL OP_IF OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_5 OP_PICK OP_OVER OP_MUL OP_2 OP_PICK OP_DIV OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_OVER e803 OP_LESSTHANOREQUAL OP_IF e803 OP_7 OP_PICK OP_MUL OP_NIP OP_ENDIF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_2OVER OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_2DUP OP_ADD OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00407a10f35a OP_NUMEQUALVERIFY OP_DROP OP_ELSE OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY e803 OP_6 OP_PICK OP_MUL OP_2 OP_PICK OP_MUL OP_OVER OP_DIV e803 OP_DIV OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_2 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_3 OP_PICK OP_9 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_OVER OP_7 OP_PICK OP_SUB OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00407a10f35a OP_NUMEQUALVERIFY OP_DROP OP_ENDIF OP_2DROP OP_2DROP OP_2DROP OP_1 OP_ELSE OP_3 OP_ROLL OP_1 OP_NUMEQUALVERIFY OP_3 OP_PICK OP_0 OP_GREATERTHAN OP_VERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY OP_1 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_2 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_2 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_DUP OP_4 OP_ROLL OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_6 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_3 OP_PICK OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_DUP OP_4 OP_PICK OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_NUM2BIN OP_3 OP_PICK OP_7 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_0 OP_VERIFY OP_ENDIF OP_ENDIF OP_2DROP OP_2DROP OP_DROP OP_1 OP_ENDIF";
    readonly source: "// SushiBar is the coolest bar in town. You come in with some Sushi, and leave with more! The longer you stay, the more Sushi you get.\n//\n// This contract handles swapping to and from xSushi, SushiSwap's staking token.\ncontract SushiBar(bytes32 sushiBarCategory, bytes32 sushiCategory, bytes32 xSushiCategory) {\n  // At all times the amount of xSushi released + amount of xSushi tokens in xSushiContract must be equal to MaxSushiBarShares\n  // const int xSushiScale = 1_0_0_0; // 1 Sushi buys 1000 xSushi initially\n  // const int MaxSushiBarShares = 100000000000 * xSushiScale; // 100 billion shares times scale factor\n\n  //// If enter is true:\n  // Enter the bar. Pay some Sushi. Earn some shares.\n  // Locks Sushi and mints xSushi\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: xSushi released to the depositor, no NFT\n  //   4: BCH change\n\n  //// If enter is false:\n  // Leave the bar. Claim back your Sushi.\n  // Unlocks the staked + gained Sushi and returns xSushi to the contract\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: xSushi token input holding exact xSushi to be returned, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: Sushi returned to the depositor, no NFT\n  //   4: BCH change\n  function enterOrLeave(int amount, bool enter) {\n    require(amount > 0, \"Amount must be greater than 0\");\n\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enterOrLeave\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enterOrLeave\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check user token input\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid token input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    if (enter) {\n      // check Sushi staking input\n      require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n\n      // check xSushi staking output\n      require(tx.outputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n\n      // Calculate and release the amount of xSushi the Sushi is worth. The ratio will change overtime, as xSushi is returned/released and Sushi deposited + gained from fees / withdrawn.\n      int what = amount * totalShares / totalSushi; // scale factor is already in\n      require(what > 0, \"Input amount is too small to enter SushiBar\");\n      if (totalShares <= 1_0_0_0) {\n        // with scale factor\n        what = 1_0_0_0 * amount; // if this is the first deposit, we just release the same amount of xSushi as Sushi\n      }\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares + what), \"SushiBar commitment does not match expected values after deposit\");\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount - what, \"xSushi output amount does not match expected amount after deposit\");\n      require(tx.outputs[3].tokenAmount == what, \"xSushi output amount does not match Sushi input amount\");\n\n      require(totalShares + what + tx.outputs[2].tokenAmount == 100000000000000, \"Total shares must not exceed MaxSushiBarShares\"); // with scale factor\n    } else {\n      // check xSushi unstaking input category\n      require(tx.inputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a Sushi input category\");\n\n      // check Sushi unstaking output category\n      require(tx.outputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount + tx.inputs[3].tokenAmount, \"xSushi input and output amounts do not match\");\n\n      // Calculate the amount of Sushi the xSushi is worth\n      int what = 1_0_0_0 * amount * totalSushi / totalShares / 1_0_0_0; // with scale factor\n      require(what > 0, \"Input amount is too small to leave SushiBar\");\n\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi - what) + bytes8(totalShares - amount), \"SushiBar commitment does not match expected values after withdrawal\");\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount - what, \"Sushi output amount does not match expected amount after withdrawal\");\n      require(tx.outputs[3].tokenAmount == what, \"Sushi output amount does not match xSushi input amount\");\n\n      require(totalShares - amount + tx.outputs[2].tokenAmount == 100000000000000, \"Total shares must not exceed MaxSushiBarShares\"); // with scale factor\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n\n  // This function is not used in the original SushiBar contract, but can be used to deposit Sushi without releasing xSushi.\n  // This is where incentives for xSushi tokens are created, for example, by distributing fees or rewards.\n  // Also due to the nature of UTXO system, anyone can deposit their Sushi or xSushi into Sushi or xSushi contracts which will not be accpeted by the SushiBar contract.\n  // This method allows to merge these Sushi or xSushi tokens into the SushiBar contract, properly updating its state.\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi input, holding staked tokens, no NFT\n  //   2: p2pkh or contract: (x)Sushi token input holding exact (x)Sushi to be staked, no NFT\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi output, holding staked tokens, no NFT\n  //   2: BCH change\n  function incentivizeOrMerge(int amount) {\n    require(amount > 0, \"Amount must be greater than 0\");\n\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for SushiBar incentivizeOrMerge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for SushiBar incentivizeOrMerge\");\n\n    // check sushi input and output\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check (x)Sushi contract input and output\n    require(tx.inputs[1].tokenCategory == tx.outputs[1].tokenCategory, \"Token category mismatch for (x)Sushi input and output\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid (x)Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount, \"(x)Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check (x)Sushi input and output\n    require(tx.inputs[2].tokenCategory == tx.inputs[1].tokenCategory, \"Token category mismatch for user (x)Sushi input\");\n    require(tx.inputs[2].tokenAmount > 0, \"Invalid staking (x)Sushi input amount\");\n    require(amount == tx.inputs[2].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    bytes inputTokenCategory = tx.inputs[1].tokenCategory.split(32)[0];\n    if (inputTokenCategory == sushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares), \"SushiBar commitment does not match expected values after deposit\");\n    } else if (inputTokenCategory == xSushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi) + bytes8(totalShares + amount), \"SushiBar commitment does not match expected values after deposit\");\n    } else {\n      require(false, \"Invalid (x)Sushi input category\");\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n}\n";
    readonly debug: {
        readonly bytecode: "5379009c63547900a069c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8852ce01207f7552798852d101207f7552798852c752cd8853d000a069537953d09d54ce008800cf587f7c817c81567a6353ce01207f7553798853d101207f7554798851d351d053d0939d557978955279967600a0697802e803a16302e803577995776800d253795879935880709358807e8852d352d05279949d53d3789d6e9352d3930600407a10f35a9d756753ce01207f7554798853d101207f7553798852d352d053d0939d02e803567995527995789602e803967600a06900d253795279945880537959799458807e8851d351d05279949d53d3789d7857799452d3930600407a10f35a9d75686d6d6d5167537a519d537900a069c2529dc3549dc4539dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce51d18851c751cd8851d351d052d0939d52ce51ce8852d000a069527952d09d53ce008800cf587f7c817c8151ce01207f7576547a876300d253795679935880537958807e8867765479876300d253795880537957799358807e8867006968686d6d755168";
        readonly sourceMap: "44:2:123:3;;;;;45:12:45:18;;:21::22;:12:::1;:4::57;47:12:47:22:0;:26::27;:4::72:1;48:12:48:28:0;:32::33;:4::89:1;49:12:49:29:0;:33::34;:4::91:1;52:12:52:33:0;:37::38;:4::76:1;53:22:53:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;54:23:54:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;55:22:55:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;57:22:57:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;60:22:60:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;61:23:61:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;62:22:62:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;66:22:66:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;67:23:67:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;68:22:68:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;71:22:71:23:0;:12::36:1;:39::40:0;:12:::1;:4::72;72:12:72:18:0;;:32::33;:22::46:1;:4::88;75:22:75:23:0;:12::38:1;:42::44:0;:4::89:1;78:62:78:63:0;:52::78:1;:85::86:0;:52::87:1;79:25:79:40:0;:21::41:1;80:26:80:42:0;:22::43:1;82:8:82:13:0;;:15:103:5;84:24:84:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::70:0;;:6::102:1;87:25:87:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::72:0;;:6::106:1;89:25:89:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::143;92:17:92:23:0;;:26::37;:17:::1;:40::50:0;;:17:::1;93:14:93:18:0;:21::22;:14:::1;:6::71;94:10:94:21:0;:25::32;:10:::1;:34:97:7:0;96:15:96:22;:25::31;;:15:::1;:8::32;94:34:97:7;98:25:98:26:0;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::100:0;::::1;:75::101;;:45;:6::171;99:25:99:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::145;100:25:100:26:0;:14::39:1;:43::47:0;:6::107:1;102:14:102:32:0;::::1;:46::47:0;:35::60:1;:14;:64::79:0;:6::131:1;82:15:103:5;103:11:121::0;105:24:105:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::71:0;;:6::103:1;108:25:108:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::71:0;;:6::104:1;110:25:110:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::144;113:17:113:24:0;:27::33;;:17:::1;:36::46:0;;:17:::1;:49::60:0;:17:::1;:63::70:0;:17:::1;114:14:114:18:0;:21::22;:14:::1;:6::71;116:25:116:26:0;:14::41:1;:52::62:0;;:65::69;;:52:::1;:45::70;;:80::91:0;;:94::100;;:80:::1;:73::101;;:45;:6::174;117:25:117:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::147;118:25:118:26:0;:14::39:1;:43::47:0;:6::107:1;120:14:120:25:0;:28::34;;:14:::1;:48::49:0;:37::62:1;:14;:66::81:0;:6::133:1;103:11:121:5;;44:2:123:3;;;;;140::184::0;;;;141:12:141:18;;:21::22;:12:::1;:4::57;143:12:143:22:0;:26::27;:4::72:1;144:12:144:28:0;:32::33;:4::95:1;145:12:145:29:0;:33::34;:4::97:1;149:12:149:33:0;:37::38;:4::76:1;150:22:150:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;151:23:151:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;152:22:152:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;154:22:154:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;157:22:157:23:0;:12::38:1;:53::54:0;:42::69:1;:4::128;158:22:158:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;159:23:159:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::144;163:22:163:23:0;:12::38:1;:52::53:0;:42::68:1;:4::121;164:22:164:23:0;:12::36:1;:39::40:0;:12:::1;:4::83;165:12:165:18:0;;:32::33;:22::46:1;:4::88;168:22:168:23:0;:12::38:1;:42::44:0;:4::89:1;171:62:171:63:0;:52::78:1;:85::86:0;:52::87:1;172:25:172:40:0;:21::41:1;173:26:173:42:0;:22::43:1;175:41:175:42:0;:31::57:1;:64::66:0;:31::67:1;:::70;176:8:176:26:0;:30::43;;:8:::1;:45:178:5:0;177:25:177:26;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::93:0;;:75::94:1;;:45;:6::164;178:11:182:5:0;:15:178:33;:37::51;;:15:::1;:53:180:5:0;179:25:179:26;:14::41:1;:52::62:0;;:45::63:1;;:73::84:0;;:87::93;;:73:::1;:66::94;;:45;:6::164;180:11:182:5:0;181:14:181:19;:6::56:1;180:11:182:5;178;140:2:184:3;;;;4:0:185:1";
        readonly logs: readonly [];
        readonly requires: readonly [{
            readonly ip: 12;
            readonly line: 45;
            readonly message: "Amount must be greater than 0";
        }, {
            readonly ip: 15;
            readonly line: 47;
            readonly message: "SushiBar requires transaction version 2";
        }, {
            readonly ip: 18;
            readonly line: 48;
            readonly message: "Invalid number of inputs for SushiBar enterOrLeave";
        }, {
            readonly ip: 21;
            readonly line: 49;
            readonly message: "Invalid number of outputs for SushiBar enterOrLeave";
        }, {
            readonly ip: 24;
            readonly line: 52;
            readonly message: "Invalid input index for SushiBar";
        }, {
            readonly ip: 31;
            readonly line: 53;
            readonly message: "Not a SushiBar input category";
        }, {
            readonly ip: 37;
            readonly line: 54;
            readonly message: "Not a SushiBar output category";
        }, {
            readonly ip: 42;
            readonly line: 55;
            readonly message: "Invalid SushiBar output bytecode";
        }, {
            readonly ip: 48;
            readonly line: 57;
            readonly message: "Invalid SushiBar commitment length";
        }, {
            readonly ip: 55;
            readonly line: 60;
            readonly message: "Not a Sushi input category";
        }, {
            readonly ip: 62;
            readonly line: 61;
            readonly message: "Not a Sushi output category";
        }, {
            readonly ip: 67;
            readonly line: 62;
            readonly message: "Invalid Sushi output bytecode";
        }, {
            readonly ip: 75;
            readonly line: 66;
            readonly message: "Not a xSushi input category";
        }, {
            readonly ip: 83;
            readonly line: 67;
            readonly message: "Not a xSushi output category";
        }, {
            readonly ip: 88;
            readonly line: 68;
            readonly message: "Invalid xSushi output bytecode";
        }, {
            readonly ip: 93;
            readonly line: 71;
            readonly message: "Invalid token input amount";
        }, {
            readonly ip: 98;
            readonly line: 72;
            readonly message: "(x)Sushi input amount does not match";
        }, {
            readonly ip: 102;
            readonly line: 75;
            readonly message: "BCH funding input must not have a token";
        }, {
            readonly ip: 121;
            readonly line: 84;
            readonly message: "Not a Sushi input category";
        }, {
            readonly ip: 129;
            readonly line: 87;
            readonly message: "Not a xSushi output category";
        }, {
            readonly ip: 137;
            readonly line: 89;
            readonly message: "Sushi input and output amounts do not match";
        }, {
            readonly ip: 148;
            readonly line: 93;
            readonly message: "Input amount is too small to enter SushiBar";
        }, {
            readonly ip: 173;
            readonly line: 98;
            readonly message: "SushiBar commitment does not match expected values after deposit";
        }, {
            readonly ip: 181;
            readonly line: 99;
            readonly message: "xSushi output amount does not match expected amount after deposit";
        }, {
            readonly ip: 185;
            readonly line: 100;
            readonly message: "xSushi output amount does not match Sushi input amount";
        }, {
            readonly ip: 192;
            readonly line: 102;
            readonly message: "Total shares must not exceed MaxSushiBarShares";
        }, {
            readonly ip: 202;
            readonly line: 105;
            readonly message: "Not a Sushi input category";
        }, {
            readonly ip: 210;
            readonly line: 108;
            readonly message: "Not a Sushi output category";
        }, {
            readonly ip: 218;
            readonly line: 110;
            readonly message: "xSushi input and output amounts do not match";
        }, {
            readonly ip: 233;
            readonly line: 114;
            readonly message: "Input amount is too small to leave SushiBar";
        }, {
            readonly ip: 251;
            readonly line: 116;
            readonly message: "SushiBar commitment does not match expected values after withdrawal";
        }, {
            readonly ip: 259;
            readonly line: 117;
            readonly message: "Sushi output amount does not match expected amount after withdrawal";
        }, {
            readonly ip: 263;
            readonly line: 118;
            readonly message: "Sushi output amount does not match xSushi input amount";
        }, {
            readonly ip: 272;
            readonly line: 120;
            readonly message: "Total shares must not exceed MaxSushiBarShares";
        }, {
            readonly ip: 288;
            readonly line: 141;
            readonly message: "Amount must be greater than 0";
        }, {
            readonly ip: 291;
            readonly line: 143;
            readonly message: "SushiBar requires transaction version 2";
        }, {
            readonly ip: 294;
            readonly line: 144;
            readonly message: "Invalid number of inputs for SushiBar incentivizeOrMerge";
        }, {
            readonly ip: 297;
            readonly line: 145;
            readonly message: "Invalid number of outputs for SushiBar incentivizeOrMerge";
        }, {
            readonly ip: 300;
            readonly line: 149;
            readonly message: "Invalid input index for SushiBar";
        }, {
            readonly ip: 307;
            readonly line: 150;
            readonly message: "Not a SushiBar input category";
        }, {
            readonly ip: 313;
            readonly line: 151;
            readonly message: "Not a SushiBar output category";
        }, {
            readonly ip: 318;
            readonly line: 152;
            readonly message: "Invalid SushiBar output bytecode";
        }, {
            readonly ip: 324;
            readonly line: 154;
            readonly message: "Invalid SushiBar commitment length";
        }, {
            readonly ip: 329;
            readonly line: 157;
            readonly message: "Token category mismatch for (x)Sushi input and output";
        }, {
            readonly ip: 334;
            readonly line: 158;
            readonly message: "Invalid (x)Sushi output bytecode";
        }, {
            readonly ip: 342;
            readonly line: 159;
            readonly message: "(x)Sushi input and output amounts do not match";
        }, {
            readonly ip: 347;
            readonly line: 163;
            readonly message: "Token category mismatch for user (x)Sushi input";
        }, {
            readonly ip: 352;
            readonly line: 164;
            readonly message: "Invalid staking (x)Sushi input amount";
        }, {
            readonly ip: 357;
            readonly line: 165;
            readonly message: "(x)Sushi input amount does not match";
        }, {
            readonly ip: 361;
            readonly line: 168;
            readonly message: "BCH funding input must not have a token";
        }, {
            readonly ip: 394;
            readonly line: 177;
            readonly message: "SushiBar commitment does not match expected values after deposit";
        }, {
            readonly ip: 415;
            readonly line: 179;
            readonly message: "SushiBar commitment does not match expected values after deposit";
        }, {
            readonly ip: 418;
            readonly line: 181;
            readonly message: "Invalid (x)Sushi input category";
        }];
    };
    readonly compiler: {
        readonly name: "cashc";
        readonly version: "0.11.3";
    };
    readonly updatedAt: "2025-08-02T11:07:06.747Z";
}, {
    constructorInputs: [string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>];
    functions: {
        enterOrLeave: (functionParameters_0: bigint, functionParameters_1: boolean) => import("cashscript").Transaction;
        incentivizeOrMerge: (functionParameters_0: bigint) => import("cashscript").Transaction;
    };
    unlock: {
        enterOrLeave: (functionParameters_0: bigint, functionParameters_1: boolean) => import("cashscript").Unlocker;
        incentivizeOrMerge: (functionParameters_0: bigint) => import("cashscript").Unlocker;
    };
}>;
export declare const getContracts: (sushiCategory: string, xSushiCategory: string, sushiBarCategory: string, provider: NetworkProvider) => {
    sushi: Contract<{
        readonly contractName: "Sushi";
        readonly constructorInputs: readonly [{
            readonly name: "sushiCategory";
            readonly type: "bytes";
        }, {
            readonly name: "sushiBarCategory";
            readonly type: "bytes";
        }];
        readonly abi: readonly [{
            readonly name: "spend";
            readonly inputs: readonly [];
        }, {
            readonly name: "merge";
            readonly inputs: readonly [];
        }];
        readonly bytecode: "OP_2 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_1 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUAL OP_NIP OP_ELSE OP_ROT OP_1 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_1 OP_3 OP_WITHIN OP_VERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_1 OP_OUTPUTTOKENAMOUNT OP_NUMEQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUAL OP_ENDIF";
        readonly source: "// A simple contract to contain Sushi tokens which ensures its self-preservation under some rules.\ncontract Sushi(bytes sushiCategory, bytes sushiBarCategory) {\n  // This function is to move sushi tokens in context of SushiBar contract.\n  // Token amounts are ensured in SushiBar contract.\n  function spend() {\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar contract\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(this.activeInputIndex == 1, \"Invalid input index for Sushi\");\n    require(tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[this.activeInputIndex].lockingBytecode == tx.outputs[this.activeInputIndex].lockingBytecode, \"Invalid Sushi locking bytecode\");\n  }\n\n  // This function is used to merge Sushi tokens on different contract instances.\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input\n  //   1: contract: Sushi input\n  //   2: p2pkh or contract: Sushi input\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar input\n  //   1: contract: Sushi output, token amounts summed\n  //   2: BCH change\n  function merge() {\n    // inputs\n    require(tx.version == 2, \"Invalid transaction version for merge\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for merge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for merge\");\n    require(within(this.activeInputIndex, 1, 3));\n\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar token\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi locking bytecode\");\n\n    require(tx.inputs[2].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // outputs\n    require(tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount == tx.outputs[1].tokenAmount, \"Input Sushi amount must be greater than or equal to output Sushi amount\");\n\n    require(tx.outputs[2].tokenCategory == 0x, \"BCH change output must not have a token\");\n\n    // do not burden the change output and let the user pay the fees\n  }\n}\n";
        readonly debug: {
            readonly bytecode: "5279009c6300ce01207f757b8800c700cd88c0519dc0ce01207f7588c0c7c0cd8777677b519dc2529dc3549dc4539dc05153a56900ce01207f757b8800c700cd8851ce01207f75788851c751cd8852ce01207f758853ce008851d052d09351d39d52d1008768";
            readonly sourceMap: "5:2:12:3;;;;;6:22:6:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::100:1;7:22:7:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;9:12:9:33:0;:37::38;:4::73:1;10:22:10:43:0;:12::58:1;:65::67:0;:12::68:1;:::71;:4::111;11:22:11:43:0;:12::60:1;:75::96:0;:64::113:1;:4::149;5:2:12:3;;25::48::0;;;27:12:27:22;:26::27;:4::70:1;28:12:28:28:0;:32::33;:4::73:1;29:12:29:29:0;:33::34;:4::75:1;30:19:30:40:0;:42::43;:45::46;:12::47:1;:4::49;32:22:32:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::97:1;33:22:33:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;35:22:35:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::91:1;36:22:36:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;38:22:38:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::91;40:22:40:23:0;:12::38:1;:42::44:0;:4::89:1;43:22:43:23:0;:12::36:1;:49::50:0;:39::63:1;:12;:78::79:0;:67::92:1;:4::169;45:23:45:24:0;:12::39:1;:43::45:0;:4::90:1;2:0:49:1";
            readonly logs: readonly [];
            readonly requires: readonly [{
                readonly ip: 13;
                readonly line: 6;
                readonly message: "Not a SushiBar contract";
            }, {
                readonly ip: 18;
                readonly line: 7;
                readonly message: "Invalid SushiBar locking bytecode";
            }, {
                readonly ip: 21;
                readonly line: 9;
                readonly message: "Invalid input index for Sushi";
            }, {
                readonly ip: 27;
                readonly line: 10;
                readonly message: "Not a Sushi token";
            }, {
                readonly ip: 33;
                readonly line: 11;
                readonly message: "Invalid Sushi locking bytecode";
            }, {
                readonly ip: 40;
                readonly line: 27;
                readonly message: "Invalid transaction version for merge";
            }, {
                readonly ip: 43;
                readonly line: 28;
                readonly message: "Invalid number of inputs for merge";
            }, {
                readonly ip: 46;
                readonly line: 29;
                readonly message: "Invalid number of outputs for merge";
            }, {
                readonly ip: 51;
                readonly line: 30;
            }, {
                readonly ip: 58;
                readonly line: 32;
                readonly message: "Not a SushiBar token";
            }, {
                readonly ip: 63;
                readonly line: 33;
                readonly message: "Invalid SushiBar locking bytecode";
            }, {
                readonly ip: 70;
                readonly line: 35;
                readonly message: "Not a Sushi token";
            }, {
                readonly ip: 75;
                readonly line: 36;
                readonly message: "Invalid Sushi locking bytecode";
            }, {
                readonly ip: 81;
                readonly line: 38;
                readonly message: "Not a Sushi token";
            }, {
                readonly ip: 85;
                readonly line: 40;
                readonly message: "BCH funding input must not have a token";
            }, {
                readonly ip: 93;
                readonly line: 43;
                readonly message: "Input Sushi amount must be greater than or equal to output Sushi amount";
            }, {
                readonly ip: 98;
                readonly line: 45;
                readonly message: "BCH change output must not have a token";
            }];
        };
        readonly compiler: {
            readonly name: "cashc";
            readonly version: "0.11.1";
        };
        readonly updatedAt: "2025-07-12T10:38:57.373Z";
    }, {
        constructorInputs: [string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>];
        functions: {
            spend: () => import("cashscript").Transaction;
            merge: () => import("cashscript").Transaction;
        };
        unlock: {
            spend: () => import("cashscript").Unlocker;
            merge: () => import("cashscript").Unlocker;
        };
    }>;
    xSushi: Contract<{
        readonly contractName: "xSushi";
        readonly constructorInputs: readonly [{
            readonly name: "xSushiCategory";
            readonly type: "bytes";
        }, {
            readonly name: "sushiBarCategory";
            readonly type: "bytes";
        }];
        readonly abi: readonly [{
            readonly name: "spend";
            readonly inputs: readonly [];
        }, {
            readonly name: "merge";
            readonly inputs: readonly [];
        }];
        readonly bytecode: "OP_2 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_2 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUAL OP_NIP OP_ELSE OP_ROT OP_1 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_1 OP_3 OP_WITHIN OP_VERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_1 OP_OUTPUTTOKENAMOUNT OP_NUMEQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUAL OP_ENDIF";
        readonly source: "// A simple contract to contain xSushi tokens which ensures its self-preservation under some rules.\ncontract xSushi(bytes xSushiCategory, bytes sushiBarCategory) {\n  // This function is to move sushi tokens in context of SushiBar contract.\n  // Token amounts are ensured in SushiBar contract.\n  function spend() {\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar contract\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(this.activeInputIndex == 2, \"Invalid input index for xSushi\");\n    require(tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n    require(tx.inputs[this.activeInputIndex].lockingBytecode == tx.outputs[this.activeInputIndex].lockingBytecode, \"Invalid xSushi locking bytecode\");\n  }\n\n  // This function is used to merge xSushi tokens on different contract instances.\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input\n  //   1: contract: xSushi input\n  //   2: p2pkh or contract: xSushi input\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar input\n  //   1: contract: xSushi output, token amounts summed\n  //   2: BCH change\n  function merge() {\n    // inputs\n    require(tx.version == 2, \"Invalid transaction version for merge\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for merge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for merge\");\n    require(within(this.activeInputIndex, 1, 3));\n\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar token\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(tx.inputs[1].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid xSushi locking bytecode\");\n\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // outputs\n    require(tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount == tx.outputs[1].tokenAmount, \"Input xSushi amount must be greater than or equal to output xSushi amount\");\n\n    require(tx.outputs[2].tokenCategory == 0x, \"BCH change output must not have a token\");\n\n    // do not burden the change output and let the user pay the fees\n  }\n}\n";
        readonly debug: {
            readonly bytecode: "5279009c6300ce01207f757b8800c700cd88c0529dc0ce01207f7588c0c7c0cd8777677b519dc2529dc3549dc4539dc05153a56900ce01207f757b8800c700cd8851ce01207f75788851c751cd8852ce01207f758853ce008851d052d09351d39d52d1008768";
            readonly sourceMap: "5:2:12:3;;;;;6:22:6:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::100:1;7:22:7:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;9:12:9:33:0;:37::38;:4::74:1;10:22:10:43:0;:12::58:1;:65::67:0;:12::68:1;:::71;:4::113;11:22:11:43:0;:12::60:1;:75::96:0;:64::113:1;:4::150;5:2:12:3;;25::48::0;;;27:12:27:22;:26::27;:4::70:1;28:12:28:28:0;:32::33;:4::73:1;29:12:29:29:0;:33::34;:4::75:1;30:19:30:40:0;:42::43;:45::46;:12::47:1;:4::49;32:22:32:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::97:1;33:22:33:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;35:22:35:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;:4::93:1;36:22:36:23:0;:12::40:1;:55::56:0;:44::73:1;:4::110;38:22:38:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::93;40:22:40:23:0;:12::38:1;:42::44:0;:4::89:1;43:22:43:23:0;:12::36:1;:49::50:0;:39::63:1;:12;:78::79:0;:67::92:1;:4::171;45:23:45:24:0;:12::39:1;:43::45:0;:4::90:1;2:0:49:1";
            readonly logs: readonly [];
            readonly requires: readonly [{
                readonly ip: 13;
                readonly line: 6;
                readonly message: "Not a SushiBar contract";
            }, {
                readonly ip: 18;
                readonly line: 7;
                readonly message: "Invalid SushiBar locking bytecode";
            }, {
                readonly ip: 21;
                readonly line: 9;
                readonly message: "Invalid input index for xSushi";
            }, {
                readonly ip: 27;
                readonly line: 10;
                readonly message: "Not a xSushi token";
            }, {
                readonly ip: 33;
                readonly line: 11;
                readonly message: "Invalid xSushi locking bytecode";
            }, {
                readonly ip: 40;
                readonly line: 27;
                readonly message: "Invalid transaction version for merge";
            }, {
                readonly ip: 43;
                readonly line: 28;
                readonly message: "Invalid number of inputs for merge";
            }, {
                readonly ip: 46;
                readonly line: 29;
                readonly message: "Invalid number of outputs for merge";
            }, {
                readonly ip: 51;
                readonly line: 30;
            }, {
                readonly ip: 58;
                readonly line: 32;
                readonly message: "Not a SushiBar token";
            }, {
                readonly ip: 63;
                readonly line: 33;
                readonly message: "Invalid SushiBar locking bytecode";
            }, {
                readonly ip: 70;
                readonly line: 35;
                readonly message: "Not a xSushi token";
            }, {
                readonly ip: 75;
                readonly line: 36;
                readonly message: "Invalid xSushi locking bytecode";
            }, {
                readonly ip: 81;
                readonly line: 38;
                readonly message: "Not a xSushi token";
            }, {
                readonly ip: 85;
                readonly line: 40;
                readonly message: "BCH funding input must not have a token";
            }, {
                readonly ip: 93;
                readonly line: 43;
                readonly message: "Input xSushi amount must be greater than or equal to output xSushi amount";
            }, {
                readonly ip: 98;
                readonly line: 45;
                readonly message: "BCH change output must not have a token";
            }];
        };
        readonly compiler: {
            readonly name: "cashc";
            readonly version: "0.11.1";
        };
        readonly updatedAt: "2025-07-12T10:38:57.385Z";
    }, {
        constructorInputs: [string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>];
        functions: {
            spend: () => import("cashscript").Transaction;
            merge: () => import("cashscript").Transaction;
        };
        unlock: {
            spend: () => import("cashscript").Unlocker;
            merge: () => import("cashscript").Unlocker;
        };
    }>;
    sushiBar: Contract<{
        readonly contractName: "SushiBar";
        readonly constructorInputs: readonly [{
            readonly name: "sushiBarCategory";
            readonly type: "bytes32";
        }, {
            readonly name: "sushiCategory";
            readonly type: "bytes32";
        }, {
            readonly name: "xSushiCategory";
            readonly type: "bytes32";
        }];
        readonly abi: readonly [{
            readonly name: "enterOrLeave";
            readonly inputs: readonly [{
                readonly name: "amount";
                readonly type: "int";
            }, {
                readonly name: "enter";
                readonly type: "bool";
            }];
        }, {
            readonly name: "incentivizeOrMerge";
            readonly inputs: readonly [{
                readonly name: "amount";
                readonly type: "int";
            }];
        }];
        readonly bytecode: "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_4 OP_PICK OP_0 OP_GREATERTHAN OP_VERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_3 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_6 OP_ROLL OP_IF OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_5 OP_PICK OP_OVER OP_MUL OP_2 OP_PICK OP_DIV OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_OVER e803 OP_LESSTHANOREQUAL OP_IF e803 OP_7 OP_PICK OP_MUL OP_NIP OP_ENDIF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_2OVER OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_2DUP OP_ADD OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00407a10f35a OP_NUMEQUALVERIFY OP_DROP OP_ELSE OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY e803 OP_6 OP_PICK OP_MUL OP_2 OP_PICK OP_MUL OP_OVER OP_DIV e803 OP_DIV OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_2 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_3 OP_PICK OP_9 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_OVER OP_7 OP_PICK OP_SUB OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00407a10f35a OP_NUMEQUALVERIFY OP_DROP OP_ENDIF OP_2DROP OP_2DROP OP_2DROP OP_1 OP_ELSE OP_3 OP_ROLL OP_1 OP_NUMEQUALVERIFY OP_3 OP_PICK OP_0 OP_GREATERTHAN OP_VERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY OP_1 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_2 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_2 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_DUP OP_4 OP_ROLL OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_6 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_3 OP_PICK OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_DUP OP_4 OP_PICK OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_NUM2BIN OP_3 OP_PICK OP_7 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_0 OP_VERIFY OP_ENDIF OP_ENDIF OP_2DROP OP_2DROP OP_DROP OP_1 OP_ENDIF";
        readonly source: "// SushiBar is the coolest bar in town. You come in with some Sushi, and leave with more! The longer you stay, the more Sushi you get.\n//\n// This contract handles swapping to and from xSushi, SushiSwap's staking token.\ncontract SushiBar(bytes32 sushiBarCategory, bytes32 sushiCategory, bytes32 xSushiCategory) {\n  // At all times the amount of xSushi released + amount of xSushi tokens in xSushiContract must be equal to MaxSushiBarShares\n  // const int xSushiScale = 1_0_0_0; // 1 Sushi buys 1000 xSushi initially\n  // const int MaxSushiBarShares = 100000000000 * xSushiScale; // 100 billion shares times scale factor\n\n  //// If enter is true:\n  // Enter the bar. Pay some Sushi. Earn some shares.\n  // Locks Sushi and mints xSushi\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: xSushi released to the depositor, no NFT\n  //   4: BCH change\n\n  //// If enter is false:\n  // Leave the bar. Claim back your Sushi.\n  // Unlocks the staked + gained Sushi and returns xSushi to the contract\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: xSushi token input holding exact xSushi to be returned, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: Sushi returned to the depositor, no NFT\n  //   4: BCH change\n  function enterOrLeave(int amount, bool enter) {\n    require(amount > 0, \"Amount must be greater than 0\");\n\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enterOrLeave\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enterOrLeave\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check user token input\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid token input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    if (enter) {\n      // check Sushi staking input\n      require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n\n      // check xSushi staking output\n      require(tx.outputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n\n      // Calculate and release the amount of xSushi the Sushi is worth. The ratio will change overtime, as xSushi is returned/released and Sushi deposited + gained from fees / withdrawn.\n      int what = amount * totalShares / totalSushi; // scale factor is already in\n      require(what > 0, \"Input amount is too small to enter SushiBar\");\n      if (totalShares <= 1_0_0_0) {\n        // with scale factor\n        what = 1_0_0_0 * amount; // if this is the first deposit, we just release the same amount of xSushi as Sushi\n      }\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares + what), \"SushiBar commitment does not match expected values after deposit\");\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount - what, \"xSushi output amount does not match expected amount after deposit\");\n      require(tx.outputs[3].tokenAmount == what, \"xSushi output amount does not match Sushi input amount\");\n\n      require(totalShares + what + tx.outputs[2].tokenAmount == 100000000000000, \"Total shares must not exceed MaxSushiBarShares\"); // with scale factor\n    } else {\n      // check xSushi unstaking input category\n      require(tx.inputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a Sushi input category\");\n\n      // check Sushi unstaking output category\n      require(tx.outputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount + tx.inputs[3].tokenAmount, \"xSushi input and output amounts do not match\");\n\n      // Calculate the amount of Sushi the xSushi is worth\n      int what = 1_0_0_0 * amount * totalSushi / totalShares / 1_0_0_0; // with scale factor\n      require(what > 0, \"Input amount is too small to leave SushiBar\");\n\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi - what) + bytes8(totalShares - amount), \"SushiBar commitment does not match expected values after withdrawal\");\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount - what, \"Sushi output amount does not match expected amount after withdrawal\");\n      require(tx.outputs[3].tokenAmount == what, \"Sushi output amount does not match xSushi input amount\");\n\n      require(totalShares - amount + tx.outputs[2].tokenAmount == 100000000000000, \"Total shares must not exceed MaxSushiBarShares\"); // with scale factor\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n\n  // This function is not used in the original SushiBar contract, but can be used to deposit Sushi without releasing xSushi.\n  // This is where incentives for xSushi tokens are created, for example, by distributing fees or rewards.\n  // Also due to the nature of UTXO system, anyone can deposit their Sushi or xSushi into Sushi or xSushi contracts which will not be accpeted by the SushiBar contract.\n  // This method allows to merge these Sushi or xSushi tokens into the SushiBar contract, properly updating its state.\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi input, holding staked tokens, no NFT\n  //   2: p2pkh or contract: (x)Sushi token input holding exact (x)Sushi to be staked, no NFT\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi output, holding staked tokens, no NFT\n  //   2: BCH change\n  function incentivizeOrMerge(int amount) {\n    require(amount > 0, \"Amount must be greater than 0\");\n\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for SushiBar incentivizeOrMerge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for SushiBar incentivizeOrMerge\");\n\n    // check sushi input and output\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check (x)Sushi contract input and output\n    require(tx.inputs[1].tokenCategory == tx.outputs[1].tokenCategory, \"Token category mismatch for (x)Sushi input and output\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid (x)Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount, \"(x)Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check (x)Sushi input and output\n    require(tx.inputs[2].tokenCategory == tx.inputs[1].tokenCategory, \"Token category mismatch for user (x)Sushi input\");\n    require(tx.inputs[2].tokenAmount > 0, \"Invalid staking (x)Sushi input amount\");\n    require(amount == tx.inputs[2].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    bytes inputTokenCategory = tx.inputs[1].tokenCategory.split(32)[0];\n    if (inputTokenCategory == sushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares), \"SushiBar commitment does not match expected values after deposit\");\n    } else if (inputTokenCategory == xSushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi) + bytes8(totalShares + amount), \"SushiBar commitment does not match expected values after deposit\");\n    } else {\n      require(false, \"Invalid (x)Sushi input category\");\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n}\n";
        readonly debug: {
            readonly bytecode: "5379009c63547900a069c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8852ce01207f7552798852d101207f7552798852c752cd8853d000a069537953d09d54ce008800cf587f7c817c81567a6353ce01207f7553798853d101207f7554798851d351d053d0939d557978955279967600a0697802e803a16302e803577995776800d253795879935880709358807e8852d352d05279949d53d3789d6e9352d3930600407a10f35a9d756753ce01207f7554798853d101207f7553798852d352d053d0939d02e803567995527995789602e803967600a06900d253795279945880537959799458807e8851d351d05279949d53d3789d7857799452d3930600407a10f35a9d75686d6d6d5167537a519d537900a069c2529dc3549dc4539dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce51d18851c751cd8851d351d052d0939d52ce51ce8852d000a069527952d09d53ce008800cf587f7c817c8151ce01207f7576547a876300d253795679935880537958807e8867765479876300d253795880537957799358807e8867006968686d6d755168";
            readonly sourceMap: "44:2:123:3;;;;;45:12:45:18;;:21::22;:12:::1;:4::57;47:12:47:22:0;:26::27;:4::72:1;48:12:48:28:0;:32::33;:4::89:1;49:12:49:29:0;:33::34;:4::91:1;52:12:52:33:0;:37::38;:4::76:1;53:22:53:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;54:23:54:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;55:22:55:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;57:22:57:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;60:22:60:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;61:23:61:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;62:22:62:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;66:22:66:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;67:23:67:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;68:22:68:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;71:22:71:23:0;:12::36:1;:39::40:0;:12:::1;:4::72;72:12:72:18:0;;:32::33;:22::46:1;:4::88;75:22:75:23:0;:12::38:1;:42::44:0;:4::89:1;78:62:78:63:0;:52::78:1;:85::86:0;:52::87:1;79:25:79:40:0;:21::41:1;80:26:80:42:0;:22::43:1;82:8:82:13:0;;:15:103:5;84:24:84:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::70:0;;:6::102:1;87:25:87:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::72:0;;:6::106:1;89:25:89:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::143;92:17:92:23:0;;:26::37;:17:::1;:40::50:0;;:17:::1;93:14:93:18:0;:21::22;:14:::1;:6::71;94:10:94:21:0;:25::32;:10:::1;:34:97:7:0;96:15:96:22;:25::31;;:15:::1;:8::32;94:34:97:7;98:25:98:26:0;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::100:0;::::1;:75::101;;:45;:6::171;99:25:99:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::145;100:25:100:26:0;:14::39:1;:43::47:0;:6::107:1;102:14:102:32:0;::::1;:46::47:0;:35::60:1;:14;:64::79:0;:6::131:1;82:15:103:5;103:11:121::0;105:24:105:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::71:0;;:6::103:1;108:25:108:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::71:0;;:6::104:1;110:25:110:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::144;113:17:113:24:0;:27::33;;:17:::1;:36::46:0;;:17:::1;:49::60:0;:17:::1;:63::70:0;:17:::1;114:14:114:18:0;:21::22;:14:::1;:6::71;116:25:116:26:0;:14::41:1;:52::62:0;;:65::69;;:52:::1;:45::70;;:80::91:0;;:94::100;;:80:::1;:73::101;;:45;:6::174;117:25:117:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::147;118:25:118:26:0;:14::39:1;:43::47:0;:6::107:1;120:14:120:25:0;:28::34;;:14:::1;:48::49:0;:37::62:1;:14;:66::81:0;:6::133:1;103:11:121:5;;44:2:123:3;;;;;140::184::0;;;;141:12:141:18;;:21::22;:12:::1;:4::57;143:12:143:22:0;:26::27;:4::72:1;144:12:144:28:0;:32::33;:4::95:1;145:12:145:29:0;:33::34;:4::97:1;149:12:149:33:0;:37::38;:4::76:1;150:22:150:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;151:23:151:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;152:22:152:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;154:22:154:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;157:22:157:23:0;:12::38:1;:53::54:0;:42::69:1;:4::128;158:22:158:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;159:23:159:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::144;163:22:163:23:0;:12::38:1;:52::53:0;:42::68:1;:4::121;164:22:164:23:0;:12::36:1;:39::40:0;:12:::1;:4::83;165:12:165:18:0;;:32::33;:22::46:1;:4::88;168:22:168:23:0;:12::38:1;:42::44:0;:4::89:1;171:62:171:63:0;:52::78:1;:85::86:0;:52::87:1;172:25:172:40:0;:21::41:1;173:26:173:42:0;:22::43:1;175:41:175:42:0;:31::57:1;:64::66:0;:31::67:1;:::70;176:8:176:26:0;:30::43;;:8:::1;:45:178:5:0;177:25:177:26;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::93:0;;:75::94:1;;:45;:6::164;178:11:182:5:0;:15:178:33;:37::51;;:15:::1;:53:180:5:0;179:25:179:26;:14::41:1;:52::62:0;;:45::63:1;;:73::84:0;;:87::93;;:73:::1;:66::94;;:45;:6::164;180:11:182:5:0;181:14:181:19;:6::56:1;180:11:182:5;178;140:2:184:3;;;;4:0:185:1";
            readonly logs: readonly [];
            readonly requires: readonly [{
                readonly ip: 12;
                readonly line: 45;
                readonly message: "Amount must be greater than 0";
            }, {
                readonly ip: 15;
                readonly line: 47;
                readonly message: "SushiBar requires transaction version 2";
            }, {
                readonly ip: 18;
                readonly line: 48;
                readonly message: "Invalid number of inputs for SushiBar enterOrLeave";
            }, {
                readonly ip: 21;
                readonly line: 49;
                readonly message: "Invalid number of outputs for SushiBar enterOrLeave";
            }, {
                readonly ip: 24;
                readonly line: 52;
                readonly message: "Invalid input index for SushiBar";
            }, {
                readonly ip: 31;
                readonly line: 53;
                readonly message: "Not a SushiBar input category";
            }, {
                readonly ip: 37;
                readonly line: 54;
                readonly message: "Not a SushiBar output category";
            }, {
                readonly ip: 42;
                readonly line: 55;
                readonly message: "Invalid SushiBar output bytecode";
            }, {
                readonly ip: 48;
                readonly line: 57;
                readonly message: "Invalid SushiBar commitment length";
            }, {
                readonly ip: 55;
                readonly line: 60;
                readonly message: "Not a Sushi input category";
            }, {
                readonly ip: 62;
                readonly line: 61;
                readonly message: "Not a Sushi output category";
            }, {
                readonly ip: 67;
                readonly line: 62;
                readonly message: "Invalid Sushi output bytecode";
            }, {
                readonly ip: 75;
                readonly line: 66;
                readonly message: "Not a xSushi input category";
            }, {
                readonly ip: 83;
                readonly line: 67;
                readonly message: "Not a xSushi output category";
            }, {
                readonly ip: 88;
                readonly line: 68;
                readonly message: "Invalid xSushi output bytecode";
            }, {
                readonly ip: 93;
                readonly line: 71;
                readonly message: "Invalid token input amount";
            }, {
                readonly ip: 98;
                readonly line: 72;
                readonly message: "(x)Sushi input amount does not match";
            }, {
                readonly ip: 102;
                readonly line: 75;
                readonly message: "BCH funding input must not have a token";
            }, {
                readonly ip: 121;
                readonly line: 84;
                readonly message: "Not a Sushi input category";
            }, {
                readonly ip: 129;
                readonly line: 87;
                readonly message: "Not a xSushi output category";
            }, {
                readonly ip: 137;
                readonly line: 89;
                readonly message: "Sushi input and output amounts do not match";
            }, {
                readonly ip: 148;
                readonly line: 93;
                readonly message: "Input amount is too small to enter SushiBar";
            }, {
                readonly ip: 173;
                readonly line: 98;
                readonly message: "SushiBar commitment does not match expected values after deposit";
            }, {
                readonly ip: 181;
                readonly line: 99;
                readonly message: "xSushi output amount does not match expected amount after deposit";
            }, {
                readonly ip: 185;
                readonly line: 100;
                readonly message: "xSushi output amount does not match Sushi input amount";
            }, {
                readonly ip: 192;
                readonly line: 102;
                readonly message: "Total shares must not exceed MaxSushiBarShares";
            }, {
                readonly ip: 202;
                readonly line: 105;
                readonly message: "Not a Sushi input category";
            }, {
                readonly ip: 210;
                readonly line: 108;
                readonly message: "Not a Sushi output category";
            }, {
                readonly ip: 218;
                readonly line: 110;
                readonly message: "xSushi input and output amounts do not match";
            }, {
                readonly ip: 233;
                readonly line: 114;
                readonly message: "Input amount is too small to leave SushiBar";
            }, {
                readonly ip: 251;
                readonly line: 116;
                readonly message: "SushiBar commitment does not match expected values after withdrawal";
            }, {
                readonly ip: 259;
                readonly line: 117;
                readonly message: "Sushi output amount does not match expected amount after withdrawal";
            }, {
                readonly ip: 263;
                readonly line: 118;
                readonly message: "Sushi output amount does not match xSushi input amount";
            }, {
                readonly ip: 272;
                readonly line: 120;
                readonly message: "Total shares must not exceed MaxSushiBarShares";
            }, {
                readonly ip: 288;
                readonly line: 141;
                readonly message: "Amount must be greater than 0";
            }, {
                readonly ip: 291;
                readonly line: 143;
                readonly message: "SushiBar requires transaction version 2";
            }, {
                readonly ip: 294;
                readonly line: 144;
                readonly message: "Invalid number of inputs for SushiBar incentivizeOrMerge";
            }, {
                readonly ip: 297;
                readonly line: 145;
                readonly message: "Invalid number of outputs for SushiBar incentivizeOrMerge";
            }, {
                readonly ip: 300;
                readonly line: 149;
                readonly message: "Invalid input index for SushiBar";
            }, {
                readonly ip: 307;
                readonly line: 150;
                readonly message: "Not a SushiBar input category";
            }, {
                readonly ip: 313;
                readonly line: 151;
                readonly message: "Not a SushiBar output category";
            }, {
                readonly ip: 318;
                readonly line: 152;
                readonly message: "Invalid SushiBar output bytecode";
            }, {
                readonly ip: 324;
                readonly line: 154;
                readonly message: "Invalid SushiBar commitment length";
            }, {
                readonly ip: 329;
                readonly line: 157;
                readonly message: "Token category mismatch for (x)Sushi input and output";
            }, {
                readonly ip: 334;
                readonly line: 158;
                readonly message: "Invalid (x)Sushi output bytecode";
            }, {
                readonly ip: 342;
                readonly line: 159;
                readonly message: "(x)Sushi input and output amounts do not match";
            }, {
                readonly ip: 347;
                readonly line: 163;
                readonly message: "Token category mismatch for user (x)Sushi input";
            }, {
                readonly ip: 352;
                readonly line: 164;
                readonly message: "Invalid staking (x)Sushi input amount";
            }, {
                readonly ip: 357;
                readonly line: 165;
                readonly message: "(x)Sushi input amount does not match";
            }, {
                readonly ip: 361;
                readonly line: 168;
                readonly message: "BCH funding input must not have a token";
            }, {
                readonly ip: 394;
                readonly line: 177;
                readonly message: "SushiBar commitment does not match expected values after deposit";
            }, {
                readonly ip: 415;
                readonly line: 179;
                readonly message: "SushiBar commitment does not match expected values after deposit";
            }, {
                readonly ip: 418;
                readonly line: 181;
                readonly message: "Invalid (x)Sushi input category";
            }];
        };
        readonly compiler: {
            readonly name: "cashc";
            readonly version: "0.11.3";
        };
        readonly updatedAt: "2025-08-02T11:07:06.747Z";
    }, {
        constructorInputs: [string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>, string | Uint8Array<ArrayBufferLike>];
        functions: {
            enterOrLeave: (functionParameters_0: bigint, functionParameters_1: boolean) => import("cashscript").Transaction;
            incentivizeOrMerge: (functionParameters_0: bigint) => import("cashscript").Transaction;
        };
        unlock: {
            enterOrLeave: (functionParameters_0: bigint, functionParameters_1: boolean) => import("cashscript").Unlocker;
            incentivizeOrMerge: (functionParameters_0: bigint) => import("cashscript").Unlocker;
        };
    }>;
};
export declare const toCashScriptUtxo: (utxo: UtxoI) => Utxo;
export declare const consolidateUtxos: ({ signer, minSatoshis, }: {
    signer: Signer;
    minSatoshis?: number;
}) => Promise<import("mainnet-js").WcSendResponse>;
export declare const getTokenGenesisUtxo: ({ signer, }: {
    signer: Signer;
}) => Promise<UtxoI>;
