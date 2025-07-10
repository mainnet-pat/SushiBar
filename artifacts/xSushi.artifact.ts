export default {
  contractName: "xSushi",
  constructorInputs: [
    {
      name: "xSushiCategory",
      type: "bytes"
    },
    {
      name: "sushiBarCategory",
      type: "bytes"
    }
  ],
  abi: [
    {
      name: "spend",
      inputs: []
    },
    {
      name: "merge",
      inputs: []
    }
  ],
  bytecode: "OP_2 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_2 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUAL OP_NIP OP_ELSE OP_ROT OP_1 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_TXOUTPUTCOUNT OP_2 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_ADD OP_0 OP_OUTPUTTOKENAMOUNT OP_NUMEQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUAL OP_NIP OP_ENDIF",
  source: "// A simple contract to contain xSushi tokens which ensures its self-preservation under some rules.\ncontract xSushi(bytes xSushiCategory, bytes sushiBarCategory) {\n  // This function is to move sushi tokens in context of SushiBar contract.\n  // Token amounts are ensured in SushiBar contract.\n  function spend() {\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar contract\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar locking bytecode\");\n\n    require(this.activeInputIndex == 2, \"Invalid input index for xSushi\");\n    require(tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n    require(tx.inputs[this.activeInputIndex].lockingBytecode == tx.outputs[this.activeInputIndex].lockingBytecode, \"Invalid xSushi locking bytecode\");\n  }\n\n  // This function is used to merge xSushi tokens on different contract instances.\n  // tx layout:\n  //  inputs:\n  //   0: contract: xSushi input\n  //   1: contract: xSushi input\n  //   2: BCH funding input, no token\n  //  outputs:\n  //   0: contract: xSushi output, token amounts summed\n  //   1: BCH change\n  function merge() {\n    // inputs\n    require(tx.inputs.length == 3, \"Invalid number of inputs for merge\");\n\n    require(tx.inputs[0].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid xSushi locking bytecode\");\n\n    require(tx.inputs[1].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid xSushi locking bytecode\");\n\n    require(tx.inputs[2].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // outputs\n    require(tx.outputs.length == 2, \"Invalid number of outputs for merge\");\n\n    require(tx.inputs[0].tokenAmount + tx.inputs[1].tokenAmount == tx.outputs[0].tokenAmount, \"Input xSushi amount must be greater than or equal to output xSushi amount\");\n\n    require(tx.outputs[1].tokenCategory == 0x, \"BCH change output must not have a token\");\n\n    // do not burden the change output and let the user pay the fees\n  }\n}\n",
  debug: {
    bytecode: "5279009c6300ce01207f757b8800c700cd88c0529dc0ce01207f7588c0c7c0cd8777677b519dc3539d00ce01207f75788800c700cd8851ce01207f758851c751cd8852ce0088c4529d00d051d09300d39d51d100877768",
    sourceMap: "5:2:12:3;;;;;6:22:6:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::100:1;7:22:7:23:0;:12::40:1;:55::56:0;:44::73:1;:4::112;9:12:9:33:0;:37::38;:4::74:1;10:22:10:43:0;:12::58:1;:65::67:0;:12::68:1;:::71;:4::113;11:22:11:43:0;:12::60:1;:75::96:0;:64::113:1;:4::150;5:2:12:3;;23::43::0;;;25:12:25:28;:32::33;:4::73:1;27:22:27:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;:4::93:1;28:22:28:23:0;:12::40:1;:55::56:0;:44::73:1;:4::110;30:22:30:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::93;31:22:31:23:0;:12::40:1;:55::56:0;:44::73:1;:4::110;33:22:33:23:0;:12::38:1;:42::44:0;:4::89:1;36:12:36:29:0;:33::34;:4::75:1;38:22:38:23:0;:12::36:1;:49::50:0;:39::63:1;:12;:78::79:0;:67::92:1;:4::171;40:23:40:24:0;:12::39:1;:43::45:0;:4::90:1;23:2:43:3;2:0:44:1",
    logs: [],
    requires: [
      {
        ip: 13,
        line: 6,
        message: "Not a SushiBar contract"
      },
      {
        ip: 18,
        line: 7,
        message: "Invalid SushiBar locking bytecode"
      },
      {
        ip: 21,
        line: 9,
        message: "Invalid input index for xSushi"
      },
      {
        ip: 27,
        line: 10,
        message: "Not a xSushi token"
      },
      {
        ip: 33,
        line: 11,
        message: "Invalid xSushi locking bytecode"
      },
      {
        ip: 40,
        line: 25,
        message: "Invalid number of inputs for merge"
      },
      {
        ip: 47,
        line: 27,
        message: "Not a xSushi token"
      },
      {
        ip: 52,
        line: 28,
        message: "Invalid xSushi locking bytecode"
      },
      {
        ip: 58,
        line: 30,
        message: "Not a xSushi token"
      },
      {
        ip: 63,
        line: 31,
        message: "Invalid xSushi locking bytecode"
      },
      {
        ip: 67,
        line: 33,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 70,
        line: 36,
        message: "Invalid number of outputs for merge"
      },
      {
        ip: 78,
        line: 38,
        message: "Input xSushi amount must be greater than or equal to output xSushi amount"
      },
      {
        ip: 83,
        line: 40,
        message: "BCH change output must not have a token"
      }
    ]
  },
  compiler: {
    name: "cashc",
    version: "0.11.1"
  },
  updatedAt: "2025-07-09T11:18:47.801Z"
} as const;