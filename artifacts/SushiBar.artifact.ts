export default {
  contractName: "SushiBar",
  constructorInputs: [
    {
      name: "sushiCategory",
      type: "bytes32"
    },
    {
      name: "sushiLockingBytecode",
      type: "bytes"
    },
    {
      name: "xSushiCategory",
      type: "bytes32"
    }
  ],
  abi: [
    {
      name: "enter",
      inputs: [
        {
          name: "amount",
          type: "int"
        }
      ]
    },
    {
      name: "leave",
      inputs: [
        {
          name: "share",
          type: "int"
        }
      ]
    },
    {
      name: "incentivize",
      inputs: [
        {
          name: "amount",
          type: "int"
        }
      ]
    }
  ],
  bytecode: "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_ROT OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_INPUTINDEX OP_1 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_3 OP_PICK OP_2 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_DUP OP_0 OP_NUMEQUAL OP_2 OP_PICK OP_0 OP_NUMEQUAL OP_BOOLOR OP_IF OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_OUTPUTTOKENAMOUNT OP_5 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_1 OP_OUTPUTTOKENCOMMITMENT OP_4 OP_PICK OP_4 OP_NUM2BIN OP_5 OP_PICK OP_4 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_3 OP_PICK OP_OVER OP_MUL OP_2 OP_PICK OP_DIV OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_OUTPUTTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_1 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_6 OP_PICK OP_ADD OP_4 OP_NUM2BIN OP_2OVER OP_ADD OP_4 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_DROP OP_ENDIF OP_2DROP OP_2DROP OP_1 OP_ELSE OP_3 OP_PICK OP_1 OP_NUMEQUAL OP_IF OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_ROT OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_INPUTINDEX OP_1 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_SUB OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_3 OP_PICK OP_2 OP_PICK OP_MUL OP_OVER OP_DIV OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_OUTPUTTOKENAMOUNT OP_2 OP_PICK OP_ADD OP_NUMEQUALVERIFY OP_1 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_ROLL OP_ROT OP_SUB OP_4 OP_NUM2BIN OP_ROT OP_4 OP_ROLL OP_SUB OP_4 OP_NUM2BIN OP_CAT OP_EQUAL OP_NIP OP_ELSE OP_3 OP_ROLL OP_2 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_ROT OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_INPUTINDEX OP_1 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_2 OP_PICK OP_2 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_1 OP_OUTPUTTOKENCOMMITMENT OP_2SWAP OP_ADD OP_4 OP_NUM2BIN OP_ROT OP_4 OP_NUM2BIN OP_CAT OP_EQUAL OP_ENDIF OP_ENDIF",
  source: "// SushiBar is the coolest bar in town. You come in with some Sushi, and leave with more! The longer you stay, the more Sushi you get.\n//\n// This contract handles swapping to and from xSushi, SushiSwap's staking token.\ncontract SushiBar(bytes32 sushiCategory, bytes sushiLockingBytecode, bytes32 xSushiCategory) {\n  // Enter the bar. Pay some SUSHIs. Earn some shares.\n  // Locks Sushi and mints xSushi\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: Sushi input, holding staked tokens, no NFT\n  //   1: contract: xSushi input, holding entire xSushi supply, mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   2: Sushi token input holding exact Sushi to be staked, no NFT\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: Sushi output, holding staked tokens, no NFT\n  //   1: contract: xSushi output, holding entire xSushi supply, mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   2: BCH change\n  function enter(int amount) {\n    // check sushi input and output\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[0].lockingBytecode == sushiLockingBytecode, \"Invalid Sushi locking bytecode\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output token\");\n    require(tx.outputs[0].tokenAmount == tx.inputs[0].tokenAmount + tx.inputs[2].tokenAmount, \"Sushi input and output amounts do not match\");\n    // do not require sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(this.activeInputIndex == 1, \"Invalid input index for xSushi\");\n    require(tx.inputs[1].tokenCategory == xSushiCategory, \"Not an xSushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid xSushi locking bytecode\");\n\n    // 2 64 bit values in the commitment\n    require(tx.inputs[1].nftCommitment.length == 16, \"Invalid xSushi commitment length\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[1].nftCommitment.split(8);\n    int totalSushi = int(totalSharesBytes);\n    int totalShares = int(totalSushiBytes);\n\n    require(amount == tx.inputs[2].tokenAmount, \"Sushi input amount does not match\");\n\n    // If no xSushi exists, mint it 1:1 to the amount put in\n    if (totalShares == 0 || totalSushi == 0) {\n      require(tx.outputs[1].tokenAmount == tx.outputs[1].tokenAmount - amount, \"xSushi output amount does not match Sushi input amount when doing a first deposit\");\n      require(tx.outputs[1].nftCommitment == bytes4(amount) + bytes4(amount), \"xSushi commitment does not match Sushi input amount when doing a first deposit\");\n    }\n    else {\n      // Calculate and release the amount of xSushi the Sushi is worth. The ratio will change overtime, as xSushi is returned/released and Sushi deposited + gained from fees / withdrawn.\n      int what = amount * totalShares / totalSushi;\n      require(tx.outputs[1].tokenAmount == tx.outputs[1].tokenAmount - what, \"xSushi output amount does not match expected amount after deposit\");\n      require(tx.outputs[1].nftCommitment == bytes4(totalSushi + amount) + bytes4(totalShares + what), \"xSushi commitment does not match expected values after deposit\");\n    }\n\n    // do not burden the change output and let the user pay the fees\n  }\n\n  // Leave the bar. Claim back your Sushi.\n  // Unlocks the staked + gained Sushi and returns xSushi to the contract\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: Sushi input, holding staked tokens, no NFT\n  //   1: contract: xSushi input, holding entire xSushi supply, mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   2: xSushi token input holding exact xSushi to be returned, no NFT\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: Sushi output, holding staked tokens, no NFT\n  //   1: contract: xSushi output, holding entire xSushi supply, mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   2: BCH change\n  function leave(int share) {\n    // check sushi input and output\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[0].lockingBytecode == sushiLockingBytecode, \"Invalid Sushi locking bytecode\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output token\");\n    // do not require sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(this.activeInputIndex == 1, \"Invalid input index for xSushi\");\n    require(tx.inputs[1].tokenCategory == xSushiCategory, \"Not an xSushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid xSushi locking bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount - tx.inputs[2].tokenAmount, \"xSushi input and output amounts do not match\");\n\n    // 2 64 bit values in the commitment\n    require(tx.inputs[1].nftCommitment.length == 16, \"Invalid xSushi commitment length\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[1].nftCommitment.split(8);\n    int totalSushi = int(totalSharesBytes);\n    int totalShares = int(totalSushiBytes);\n\n    // Calculate the amount of Sushi the xSushi is worth\n    int what = share * totalSushi / totalShares;\n\n    require(tx.outputs[0].tokenAmount == tx.outputs[0].tokenAmount + what, \"Sushi output amount does not match expected amount after withdrawal\");\n    require(tx.outputs[1].nftCommitment == bytes4(totalSushi - what) + bytes4(totalShares - share), \"xSushi commitment does not match expected values after deposit\");\n  }\n\n  // This function is not used in the original SushiBar contract, but can be used to deposit Sushi without releasing xSushi.\n  // This is where incentives for xSushi tokens are created, for example, by distributing fees or rewards.\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: Sushi input, holding staked tokens, no NFT\n  //   1: contract: xSushi input, holding entire xSushi supply, mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   2: Sushi token input holding exact Sushi to be deposited, no NFT\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: Sushi output, holding staked tokens, no NFT\n  //   1: contract: xSushi output, holding entire xSushi supply, mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   2: BCH change\n  function incentivize(int amount) {\n    // check sushi input and output\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[0].lockingBytecode == sushiLockingBytecode, \"Invalid Sushi locking bytecode\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output token\");\n    require(tx.outputs[0].tokenAmount == tx.inputs[0].tokenAmount + tx.inputs[2].tokenAmount, \"Sushi input and output amounts do not match\");\n    // do not require sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(this.activeInputIndex == 1, \"Invalid input index for xSushi\");\n    require(tx.inputs[1].tokenCategory == xSushiCategory, \"Not an xSushi token\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid xSushi locking bytecode\");\n\n    // 2 64 bit values in the commitment\n    require(tx.inputs[1].nftCommitment.length == 16, \"Invalid xSushi commitment length\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[1].nftCommitment.split(8);\n    int totalSushi = int(totalSharesBytes);\n    int totalShares = int(totalSushiBytes);\n\n    require(amount == tx.inputs[2].tokenAmount, \"Sushi input amount does not match\");\n\n    require(tx.outputs[1].nftCommitment == bytes4(totalSushi + amount) + bytes4(totalShares), \"xSushi commitment does not match expected values after deposit\");\n    // do not burden the change output and let the user pay the fees\n  }\n}\n",
  debug: {
    bytecode: "5379009c6300ce01207f75788800c77b8800d101207f758800d300d052d0939dc0519d51ce8851c751cd8851cf8277609d51cf587f817c81537952d09d76009c5279009c9b6351d351d35579949d51d254795480557954807e88675379789552799651d351d35279949d51d253795679935480709354807e8875686d6d51675379519c6300ce01207f75788800c77b8800d101207f7588c0519d51ce8851c751cd8851d351d052d0949d51cf8277609d51cf587f817c815379527995789600d300d35279939d51d2537a7b9454807b547a9454807e877767537a529d00ce01207f75788800c77b8800d101207f758800d300d052d0939dc0519d51ce8851c751cd8851cf8277609d51cf587f817c81527952d09d51d2729354807b54807e876868",
    sourceMap: "18:2:54:3;;;;;20:22:20:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::91:1;21:22:21:23:0;:12::40:1;:44::64:0;:4::100:1;22:23:22:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::99;23:23:23:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::141;27:12:27:33:0;:37::38;:4::74:1;28:22:28:23:0;:12::38:1;:4::81;29:22:29:23:0;:12::40:1;:55::56:0;:44::73:1;:4::110;32:22:32:23:0;:12::38:1;:::45;;:49::51:0;:4::89:1;35:62:35:63:0;:52::78:1;:85::86:0;:52::87:1;36:21:36:42;37:26:37:41:0;:22::42:1;39:12:39:18:0;;:32::33;:22::46:1;:4::85;42:8:42:19:0;:23::24;:8:::1;:28::38:0;;:42::43;:28:::1;:8;:45:45:5:0;43:25:43:26;:14::39:1;:54::55:0;:43::68:1;:71::77:0;;:43:::1;:6::164;44:25:44:26:0;:14::41:1;:52::58:0;;:45::59:1;;:69::75:0;;:62::76:1;;:45;:6::160;46:9:51:5:0;48:17:48:23;;:26::37;:17:::1;:40::50:0;;:17:::1;49:25:49:26:0;:14::39:1;:54::55:0;:43::68:1;:71::75:0;;:43:::1;:6::146;50:25:50:26:0;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::100:0;::::1;:75::101;;:45;:6::169;46:9:51:5;;18:2:54:3;;;;69::95::0;;;;;71:22:71:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::91:1;72:22:72:23:0;:12::40:1;:44::64:0;:4::100:1;73:23:73:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::99;77:12:77:33:0;:37::38;:4::74:1;78:22:78:23:0;:12::38:1;:4::81;79:22:79:23:0;:12::40:1;:55::56:0;:44::73:1;:4::110;80:23:80:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::142;83:22:83:23:0;:12::38:1;:::45;;:49::51:0;:4::89:1;86:62:86:63:0;:52::78:1;:85::86:0;:52::87:1;87:21:87:42;88:26:88:41:0;:22::42:1;91:15:91:20:0;;:23::33;;:15:::1;:36::47:0;:15:::1;93:23:93:24:0;:12::37:1;:52::53:0;:41::66:1;:69::73:0;;:41:::1;:4::146;94:23:94:24:0;:12::39:1;:50::60:0;;:63::67;:50:::1;:43::68;;:78::89:0;:92::97;;:78:::1;:71::98;;:43;:4::166;69:2:95:3;;110::135::0;;;;112:22:112:23;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::91:1;113:22:113:23:0;:12::40:1;:44::64:0;:4::100:1;114:23:114:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::99;115:23:115:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::141;119:12:119:33:0;:37::38;:4::74:1;120:22:120:23:0;:12::38:1;:4::81;121:22:121:23:0;:12::40:1;:55::56:0;:44::73:1;:4::110;124:22:124:23:0;:12::38:1;:::45;;:49::51:0;:4::89:1;127:62:127:63:0;:52::78:1;:85::86:0;:52::87:1;128:21:128:42;129:26:129:41:0;:22::42:1;131:12:131:18:0;;:32::33;:22::46:1;:4::85;133:23:133:24:0;:12::39:1;:50::69:0;::::1;:43::70;;:80::91:0;:73::92:1;;:43;:4::160;4:0:136:1;",
    logs: [],
    requires: [
      {
        ip: 14,
        line: 20,
        message: "Not a Sushi token"
      },
      {
        ip: 18,
        line: 21,
        message: "Invalid Sushi locking bytecode"
      },
      {
        ip: 24,
        line: 22,
        message: "Not a Sushi output token"
      },
      {
        ip: 32,
        line: 23,
        message: "Sushi input and output amounts do not match"
      },
      {
        ip: 35,
        line: 27,
        message: "Invalid input index for xSushi"
      },
      {
        ip: 38,
        line: 28,
        message: "Not an xSushi token"
      },
      {
        ip: 43,
        line: 29,
        message: "Invalid xSushi locking bytecode"
      },
      {
        ip: 49,
        line: 32,
        message: "Invalid xSushi commitment length"
      },
      {
        ip: 61,
        line: 39,
        message: "Sushi input amount does not match"
      },
      {
        ip: 78,
        line: 43,
        message: "xSushi output amount does not match Sushi input amount when doing a first deposit"
      },
      {
        ip: 90,
        line: 44,
        message: "xSushi commitment does not match Sushi input amount when doing a first deposit"
      },
      {
        ip: 106,
        line: 49,
        message: "xSushi output amount does not match expected amount after deposit"
      },
      {
        ip: 121,
        line: 50,
        message: "xSushi commitment does not match expected values after deposit"
      },
      {
        ip: 139,
        line: 71,
        message: "Not a Sushi token"
      },
      {
        ip: 143,
        line: 72,
        message: "Invalid Sushi locking bytecode"
      },
      {
        ip: 149,
        line: 73,
        message: "Not a Sushi output token"
      },
      {
        ip: 152,
        line: 77,
        message: "Invalid input index for xSushi"
      },
      {
        ip: 155,
        line: 78,
        message: "Not an xSushi token"
      },
      {
        ip: 160,
        line: 79,
        message: "Invalid xSushi locking bytecode"
      },
      {
        ip: 168,
        line: 80,
        message: "xSushi input and output amounts do not match"
      },
      {
        ip: 174,
        line: 83,
        message: "Invalid xSushi commitment length"
      },
      {
        ip: 196,
        line: 93,
        message: "Sushi output amount does not match expected amount after withdrawal"
      },
      {
        ip: 213,
        line: 94,
        message: "xSushi commitment does not match expected values after deposit"
      },
      {
        ip: 225,
        line: 112,
        message: "Not a Sushi token"
      },
      {
        ip: 229,
        line: 113,
        message: "Invalid Sushi locking bytecode"
      },
      {
        ip: 235,
        line: 114,
        message: "Not a Sushi output token"
      },
      {
        ip: 243,
        line: 115,
        message: "Sushi input and output amounts do not match"
      },
      {
        ip: 246,
        line: 119,
        message: "Invalid input index for xSushi"
      },
      {
        ip: 249,
        line: 120,
        message: "Not an xSushi token"
      },
      {
        ip: 254,
        line: 121,
        message: "Invalid xSushi locking bytecode"
      },
      {
        ip: 260,
        line: 124,
        message: "Invalid xSushi commitment length"
      },
      {
        ip: 272,
        line: 131,
        message: "Sushi input amount does not match"
      },
      {
        ip: 284,
        line: 133,
        message: "xSushi commitment does not match expected values after deposit"
      }
    ]
  },
  compiler: {
    name: "cashc",
    version: "0.11.1"
  },
  updatedAt: "2025-07-08T13:50:48.044Z"
} as const;