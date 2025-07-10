export default {
  contractName: "SushiBar",
  constructorInputs: [
    {
      name: "sushiBarCategory",
      type: "bytes32"
    },
    {
      name: "sushiCategory",
      type: "bytes32"
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
  bytecode: "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_3 OP_PICK OP_OVER OP_MUL OP_2 OP_PICK OP_DIV OP_OVER OP_0 OP_NUMEQUAL OP_IF OP_4 OP_PICK OP_NIP OP_ENDIF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_ROLL OP_5 OP_ROLL OP_ADD OP_8 OP_NUM2BIN OP_3 OP_ROLL OP_3 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_NUMEQUAL OP_NIP OP_ELSE OP_3 OP_PICK OP_1 OP_NUMEQUAL OP_IF OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_3 OP_PICK OP_2 OP_PICK OP_MUL OP_OVER OP_DIV OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_ROLL OP_2 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_3 OP_ROLL OP_5 OP_ROLL OP_SUB OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_NUMEQUAL OP_NIP OP_ELSE OP_3 OP_ROLL OP_2 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_DUP OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_0 OP_OUTPUTTOKENCOMMITMENT OP_2SWAP OP_ADD OP_8 OP_NUM2BIN OP_ROT OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_OUTPUTTOKENAMOUNT OP_NUMEQUAL OP_ENDIF OP_ENDIF",
  source: "// SushiBar is the coolest bar in town. You come in with some Sushi, and leave with more! The longer you stay, the more Sushi you get.\n//\n// This contract handles swapping to and from xSushi, SushiSwap's staking token.\ncontract SushiBar(bytes32 sushiBarCategory, bytes32 sushiCategory, bytes32 xSushiCategory) {\n  // Enter the bar. Pay some SUSHIs. Earn some shares.\n  // Locks Sushi and mints xSushi\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire xSushi supply, no NFT\n  //   3: xSushi released to the depositor, no NFT\n  //   4: BCH change\n  function enter(int amount) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enter\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enter\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check Sushi staking input\n    require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid staking Sushi input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n    // check xSushi staking output\n    require(tx.outputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    // Calculate and release the amount of xSushi the Sushi is worth. The ratio will change overtime, as xSushi is returned/released and Sushi deposited + gained from fees / withdrawn.\n    int what = amount * totalShares / totalSushi;\n    if (totalShares == 0) {\n      what = amount; // if this is the first deposit, we just release the same amount of xSushi as Sushi\n    }\n    require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares + what), \"SushiBar commitment does not match expected values after deposit\");\n    require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount - what, \"xSushi output amount does not match expected amount after deposit\");\n    require(tx.outputs[3].tokenAmount == what, \"xSushi output amount does not match Sushi input amount\");\n\n    // do not burden the change output and let the user pay the fees\n  }\n\n  // Leave the bar. Claim back your Sushi.\n  // Unlocks the staked + gained Sushi and returns xSushi to the contract\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire xSushi supply, no NFT\n  //   3: xSushi token input holding exact xSushi to be returned, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire xSushi supply, no NFT\n  //   3: Sushi returned to the depositor, no NFT\n  //   4: BCH change\n  function leave(int share) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enter\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enter\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n    require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount + tx.inputs[3].tokenAmount, \"xSushi input and output amounts do not match\");\n\n    // check xSushi unstaking input\n    require(tx.inputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a Sushi input category\");\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid unstaking xSushi input amount\");\n    require(share == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n    // check Sushi unstaking output\n    require(tx.outputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    // Calculate the amount of Sushi the xSushi is worth\n    int what = share * totalSushi / totalShares;\n\n    require(tx.outputs[0].nftCommitment == bytes8(totalSushi - what) + bytes8(totalShares - share), \"SushiBar commitment does not match expected values after withdrawal\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount - what, \"Sushi output amount does not match expected amount after withdrawal\");\n    require(tx.outputs[3].tokenAmount == what, \"Sushi output amount does not match xSushi input amount\");\n  }\n\n  // This function is not used in the original SushiBar contract, but can be used to deposit Sushi without releasing xSushi.\n  // This is where incentives for xSushi tokens are created, for example, by distributing fees or rewards.\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire xSushi supply, no NFT\n  //   3: BCH change\n  function incentivize(int amount) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enter\");\n    require(tx.outputs.length == 4, \"Invalid number of outputs for SushiBar enter\");\n\n    // check sushi input and output\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check Sushi staking input\n    require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid staking Sushi input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares), \"SushiBar commitment does not match expected values after deposit\");\n    require(tx.inputs[2].tokenAmount == tx.outputs[2].tokenAmount, \"xSushi input and output amounts do not match\");\n    // do not burden the change output and let the user pay the fees\n  }\n}\n",
  debug: {
    bytecode: "5379009c63c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8851d351d053d0939d52ce01207f7552798852d101207f7552798852c752cd8853ce01207f758853d000a069527953d09d53d101207f758854ce008800cf587f7c817c815379789552799678009c635479776800d2537a557a935880537a53799358807e8852d352d05279949d53d39c77675379519c63c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8852ce01207f7552798852d101207f7552798852c752cd8852d352d053d0939d53ce01207f757b8853d000a069527953d09d53d101207f758854ce008800cf587f7c817c815379527995789600d2537a5279945880537a557a9458807e8851d351d05279949d53d39c7767537a529dc2529dc3559dc4549dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8851d351d053d0939d52ce01207f7552798852d101207f757b8852c752cd8853ce01207f758853d000a0697653d09d54ce008800cf587f7c817c8100d2729358807b58807e8852d052d39c6868",
    sourceMap: "21:2:72:3;;;;;22:12:22:22;:26::27;:4::72:1;23:12:23:28:0;:32::33;:4::82:1;24:12:24:29:0;:33::34;:4::84:1;27:12:27:33:0;:37::38;:4::76:1;28:22:28:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;29:23:29:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;30:22:30:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;32:22:32:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;35:22:35:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;36:23:36:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;37:22:37:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;38:23:38:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::141;42:22:42:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;43:23:43:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;44:22:44:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;47:22:47:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::100;48:22:48:23:0;:12::36:1;:39::40:0;:12:::1;:4::80;49:12:49:18:0;;:32::33;:22::46:1;:4::85;52:23:52:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::104;55:22:55:23:0;:12::38:1;:42::44:0;:4::89:1;58:62:58:63:0;:52::78:1;:85::86:0;:52::87:1;59:25:59:40:0;:21::41:1;60:26:60:42:0;:22::43:1;63:15:63:21:0;;:24::35;:15:::1;:38::48:0;;:15:::1;64:8:64:19:0;:23::24;:8:::1;:26:66:5:0;65:13:65:19;;:6::20:1;64:26:66:5;67:23:67:24:0;:12::39:1;:50::60:0;;:63::69;;:50:::1;:43::70;;:80::91:0;;:94::98;;:80:::1;:73::99;;:43;:4::169;68:23:68:24:0;:12::37:1;:51::52:0;:41::65:1;:68::72:0;;:41:::1;:4::143;69:23:69:24:0;:12::37:1;:4::105;21:2:72:3;;90::137::0;;;;;91:12:91:22;:26::27;:4::72:1;92:12:92:28:0;:32::33;:4::82:1;93:12:93:29:0;:33::34;:4::84:1;96:12:96:33:0;:37::38;:4::76:1;97:22:97:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;98:23:98:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;99:22:99:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;101:22:101:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;104:22:104:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;105:23:105:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;106:22:106:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;110:22:110:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;111:23:111:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;112:22:112:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;113:23:113:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::142;116:22:116:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;:4::101:1;117:22:117:23:0;:12::36:1;:39::40:0;:12:::1;:4::83;118:12:118:17:0;;:31::32;:21::45:1;:4::84;121:23:121:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::102;124:22:124:23:0;:12::38:1;:42::44:0;:4::89:1;127:62:127:63:0;:52::78:1;:85::86:0;:52::87:1;128:25:128:40:0;:21::41:1;129:26:129:42:0;:22::43:1;132:15:132:20:0;;:23::33;;:15:::1;:36::47:0;:15:::1;134:23:134:24:0;:12::39:1;:50::60:0;;:63::67;;:50:::1;:43::68;;:78::89:0;;:92::97;;:78:::1;:71::98;;:43;:4::171;135:23:135:24:0;:12::37:1;:51::52:0;:41::65:1;:68::72:0;;:41:::1;:4::145;136:23:136:24:0;:12::37:1;:4::105;90:2:137:3;;154::196::0;;;;155:12:155:22;:26::27;:4::72:1;156:12:156:28:0;:32::33;:4::82:1;157:12:157:29:0;:33::34;:4::84:1;161:12:161:33:0;:37::38;:4::76:1;162:22:162:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;163:23:163:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;164:22:164:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;166:22:166:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;169:22:169:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;170:23:170:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;171:22:171:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;172:23:172:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::141;176:22:176:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;177:23:177:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;:4::104:1;178:22:178:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;181:22:181:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::100;182:22:182:23:0;:12::36:1;:39::40:0;:12:::1;:4::80;183:12:183:18:0;:32::33;:22::46:1;:4::85;186:22:186:23:0;:12::38:1;:42::44:0;:4::89:1;189:62:189:63:0;:52::78:1;:85::86:0;:52::87:1;190:25:190:40:0;:21::41:1;191:26:191:42:0;:22::43:1;193:23:193:24:0;:12::39:1;:50::69:0;::::1;:43::70;;:80::91:0;:73::92:1;;:43;:4::162;194:22:194:23:0;:12::36:1;:51::52:0;:40::65:1;:4::115;4:0:197:1;",
    logs: [],
    requires: [
      {
        ip: 10,
        line: 22,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 13,
        line: 23,
        message: "Invalid number of inputs for SushiBar enter"
      },
      {
        ip: 16,
        line: 24,
        message: "Invalid number of outputs for SushiBar enter"
      },
      {
        ip: 19,
        line: 27,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 26,
        line: 28,
        message: "Not a SushiBar input category"
      },
      {
        ip: 32,
        line: 29,
        message: "Not a SushiBar output category"
      },
      {
        ip: 37,
        line: 30,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 43,
        line: 32,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 50,
        line: 35,
        message: "Not a Sushi input category"
      },
      {
        ip: 57,
        line: 36,
        message: "Not a Sushi output category"
      },
      {
        ip: 62,
        line: 37,
        message: "Invalid Sushi output bytecode"
      },
      {
        ip: 70,
        line: 38,
        message: "Sushi input and output amounts do not match"
      },
      {
        ip: 78,
        line: 42,
        message: "Not a xSushi input category"
      },
      {
        ip: 86,
        line: 43,
        message: "Not a xSushi output category"
      },
      {
        ip: 91,
        line: 44,
        message: "Invalid xSushi output bytecode"
      },
      {
        ip: 97,
        line: 47,
        message: "Not a Sushi input category"
      },
      {
        ip: 102,
        line: 48,
        message: "Invalid staking Sushi input amount"
      },
      {
        ip: 107,
        line: 49,
        message: "Sushi input amount does not match"
      },
      {
        ip: 113,
        line: 52,
        message: "Not a xSushi output category"
      },
      {
        ip: 117,
        line: 55,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 158,
        line: 67,
        message: "SushiBar commitment does not match expected values after deposit"
      },
      {
        ip: 166,
        line: 68,
        message: "xSushi output amount does not match expected amount after deposit"
      },
      {
        ip: 170,
        line: 69,
        message: "xSushi output amount does not match Sushi input amount"
      },
      {
        ip: 179,
        line: 91,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 182,
        line: 92,
        message: "Invalid number of inputs for SushiBar enter"
      },
      {
        ip: 185,
        line: 93,
        message: "Invalid number of outputs for SushiBar enter"
      },
      {
        ip: 188,
        line: 96,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 195,
        line: 97,
        message: "Not a SushiBar input category"
      },
      {
        ip: 201,
        line: 98,
        message: "Not a SushiBar output category"
      },
      {
        ip: 206,
        line: 99,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 212,
        line: 101,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 219,
        line: 104,
        message: "Not a Sushi input category"
      },
      {
        ip: 226,
        line: 105,
        message: "Not a Sushi output category"
      },
      {
        ip: 231,
        line: 106,
        message: "Invalid Sushi output bytecode"
      },
      {
        ip: 239,
        line: 110,
        message: "Not a xSushi input category"
      },
      {
        ip: 247,
        line: 111,
        message: "Not a xSushi output category"
      },
      {
        ip: 252,
        line: 112,
        message: "Invalid xSushi output bytecode"
      },
      {
        ip: 260,
        line: 113,
        message: "xSushi input and output amounts do not match"
      },
      {
        ip: 267,
        line: 116,
        message: "Not a Sushi input category"
      },
      {
        ip: 272,
        line: 117,
        message: "Invalid unstaking xSushi input amount"
      },
      {
        ip: 277,
        line: 118,
        message: "Sushi input amount does not match"
      },
      {
        ip: 283,
        line: 121,
        message: "Not a Sushi output category"
      },
      {
        ip: 287,
        line: 124,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 320,
        line: 134,
        message: "SushiBar commitment does not match expected values after withdrawal"
      },
      {
        ip: 328,
        line: 135,
        message: "Sushi output amount does not match expected amount after withdrawal"
      },
      {
        ip: 332,
        line: 136,
        message: "Sushi output amount does not match xSushi input amount"
      },
      {
        ip: 340,
        line: 155,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 343,
        line: 156,
        message: "Invalid number of inputs for SushiBar enter"
      },
      {
        ip: 346,
        line: 157,
        message: "Invalid number of outputs for SushiBar enter"
      },
      {
        ip: 349,
        line: 161,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 356,
        line: 162,
        message: "Not a SushiBar input category"
      },
      {
        ip: 362,
        line: 163,
        message: "Not a SushiBar output category"
      },
      {
        ip: 367,
        line: 164,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 373,
        line: 166,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 380,
        line: 169,
        message: "Not a Sushi input category"
      },
      {
        ip: 387,
        line: 170,
        message: "Not a Sushi output category"
      },
      {
        ip: 392,
        line: 171,
        message: "Invalid Sushi output bytecode"
      },
      {
        ip: 400,
        line: 172,
        message: "Sushi input and output amounts do not match"
      },
      {
        ip: 408,
        line: 176,
        message: "Not a xSushi input category"
      },
      {
        ip: 415,
        line: 177,
        message: "Not a xSushi output category"
      },
      {
        ip: 420,
        line: 178,
        message: "Invalid xSushi output bytecode"
      },
      {
        ip: 426,
        line: 181,
        message: "Not a Sushi input category"
      },
      {
        ip: 431,
        line: 182,
        message: "Invalid staking Sushi input amount"
      },
      {
        ip: 435,
        line: 183,
        message: "Sushi input amount does not match"
      },
      {
        ip: 439,
        line: 186,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 458,
        line: 193,
        message: "SushiBar commitment does not match expected values after deposit"
      },
      {
        ip: 464,
        line: 194,
        message: "xSushi input and output amounts do not match"
      }
    ]
  },
  compiler: {
    name: "cashc",
    version: "0.11.1"
  },
  updatedAt: "2025-07-10T09:28:10.266Z"
} as const;