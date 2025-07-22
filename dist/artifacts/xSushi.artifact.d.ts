declare const _default: {
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
};
export default _default;
