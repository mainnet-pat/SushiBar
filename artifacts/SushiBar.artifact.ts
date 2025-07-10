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
  bytecode: "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_3 OP_PICK OP_OVER OP_MUL OP_2 OP_PICK OP_DIV OP_OVER OP_1 OP_LESSTHANOREQUAL OP_IF OP_4 OP_PICK OP_NIP OP_ENDIF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_ROLL OP_5 OP_ROLL OP_ADD OP_8 OP_NUM2BIN OP_2OVER OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_ADD OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00e8764817 OP_NUMEQUAL OP_NIP OP_ELSE OP_3 OP_PICK OP_1 OP_NUMEQUAL OP_IF OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_3 OP_PICK OP_2 OP_PICK OP_MUL OP_OVER OP_DIV OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_ROLL OP_2 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_3 OP_PICK OP_6 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_NUMEQUALVERIFY OP_ROT OP_SUB OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00e8764817 OP_NUMEQUAL OP_NIP OP_ELSE OP_3 OP_ROLL OP_2 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_ROT OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_DUP OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_0 OP_OUTPUTTOKENCOMMITMENT OP_2SWAP OP_ADD OP_8 OP_NUM2BIN OP_ROT OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_OUTPUTTOKENAMOUNT OP_NUMEQUAL OP_ENDIF OP_ENDIF",
  source: "// SushiBar is the coolest bar in town. You come in with some Sushi, and leave with more! The longer you stay, the more Sushi you get.\n//\n// This contract handles swapping to and from xSushi, SushiSwap's staking token.\ncontract SushiBar(bytes32 sushiBarCategory, bytes32 sushiCategory, bytes32 xSushiCategory) {\n  // Enter the bar. Pay some SUSHIs. Earn some shares.\n  // Locks Sushi and mints xSushi\n\n  // At all times the amount of xSushi released + amount of xSushi tokens in xSushiContract must be equal to MaxSushiBarShares\n  // const int MaxSushiBarShares = 100000000000; // 100 billion shares\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire xSushi supply, no NFT\n  //   3: xSushi released to the depositor, no NFT\n  //   4: BCH change\n  function enter(int amount) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enter\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enter\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check Sushi staking input\n    require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid staking Sushi input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n    // check xSushi staking output\n    require(tx.outputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    // Calculate and release the amount of xSushi the Sushi is worth. The ratio will change overtime, as xSushi is returned/released and Sushi deposited + gained from fees / withdrawn.\n    int what = amount * totalShares / totalSushi;\n    if (totalShares <= 1) {\n      what = amount; // if this is the first deposit, we just release the same amount of xSushi as Sushi\n    }\n    require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares + what), \"SushiBar commitment does not match expected values after deposit\");\n    require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount - what, \"xSushi output amount does not match expected amount after deposit\");\n    require(tx.outputs[3].tokenAmount == what, \"xSushi output amount does not match Sushi input amount\");\n\n    require(totalShares + what + tx.outputs[2].tokenAmount == 100000000000, \"Total shares must not exceed 100 billion\"); // MaxSushiBarShares\n    // do not burden the change output and let the user pay the fees\n  }\n\n  // Leave the bar. Claim back your Sushi.\n  // Unlocks the staked + gained Sushi and returns xSushi to the contract\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire xSushi supply, no NFT\n  //   3: xSushi token input holding exact xSushi to be returned, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire xSushi supply, no NFT\n  //   3: Sushi returned to the depositor, no NFT\n  //   4: BCH change\n  function leave(int share) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enter\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enter\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n    require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount + tx.inputs[3].tokenAmount, \"xSushi input and output amounts do not match\");\n\n    // check xSushi unstaking input\n    require(tx.inputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a Sushi input category\");\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid unstaking xSushi input amount\");\n    require(share == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n    // check Sushi unstaking output\n    require(tx.outputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    // Calculate the amount of Sushi the xSushi is worth\n    int what = share * totalSushi / totalShares;\n\n    require(tx.outputs[0].nftCommitment == bytes8(totalSushi - what) + bytes8(totalShares - share), \"SushiBar commitment does not match expected values after withdrawal\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount - what, \"Sushi output amount does not match expected amount after withdrawal\");\n    require(tx.outputs[3].tokenAmount == what, \"Sushi output amount does not match xSushi input amount\");\n\n    require(totalShares - share + tx.outputs[2].tokenAmount == 100000000000, \"Total shares must not exceed 100 billion\"); // MaxSushiBarShares\n  }\n\n  // This function is not used in the original SushiBar contract, but can be used to deposit Sushi without releasing xSushi.\n  // This is where incentives for xSushi tokens are created, for example, by distributing fees or rewards.\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire xSushi supply, no NFT\n  //   3: BCH change\n  function incentivize(int amount) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enter\");\n    require(tx.outputs.length == 4, \"Invalid number of outputs for SushiBar enter\");\n\n    // check sushi input and output\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check Sushi staking input\n    require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid staking Sushi input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares), \"SushiBar commitment does not match expected values after deposit\");\n    require(tx.inputs[2].tokenAmount == tx.outputs[2].tokenAmount, \"xSushi input and output amounts do not match\");\n    // do not burden the change output and let the user pay the fees\n  }\n}\n",
  debug: {
    bytecode: "5379009c63c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8851d351d053d0939d52ce01207f7552798852d101207f7552798852c752cd8853ce01207f758853d000a069527953d09d53d101207f758854ce008800cf587f7c817c81537978955279967851a1635479776800d2537a557a935880709358807e8852d352d05279949d53d3789d9352d3930500e87648179c77675379519c63c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8852ce01207f7552798852d101207f7552798852c752cd8852d352d053d0939d53ce01207f757b8853d000a069527953d09d53d101207f758854ce008800cf587f7c817c815379527995789600d2537a5279945880537956799458807e8851d351d05279949d53d39d7b9452d3930500e87648179c7767537a529dc2529dc3559dc4549dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8851d351d053d0939d52ce01207f7552798852d101207f757b8852c752cd8853ce01207f758853d000a0697653d09d54ce008800cf587f7c817c8100d2729358807b58807e8852d052d39c6868",
    sourceMap: "24:2:76:3;;;;;25:12:25:22;:26::27;:4::72:1;26:12:26:28:0;:32::33;:4::82:1;27:12:27:29:0;:33::34;:4::84:1;30:12:30:33:0;:37::38;:4::76:1;31:22:31:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;32:23:32:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;33:22:33:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;35:22:35:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;38:22:38:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;39:23:39:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;40:22:40:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;41:23:41:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::141;45:22:45:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;46:23:46:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;47:22:47:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;50:22:50:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::100;51:22:51:23:0;:12::36:1;:39::40:0;:12:::1;:4::80;52:12:52:18:0;;:32::33;:22::46:1;:4::85;55:23:55:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::104;58:22:58:23:0;:12::38:1;:42::44:0;:4::89:1;61:62:61:63:0;:52::78:1;:85::86:0;:52::87:1;62:25:62:40:0;:21::41:1;63:26:63:42:0;:22::43:1;66:15:66:21:0;;:24::35;:15:::1;:38::48:0;;:15:::1;67:8:67:19:0;:23::24;:8:::1;:26:69:5:0;68:13:68:19;;:6::20:1;67:26:69:5;70:23:70:24:0;:12::39:1;:50::60:0;;:63::69;;:50:::1;:43::70;;:80::98:0;::::1;:73::99;;:43;:4::169;71:23:71:24:0;:12::37:1;:51::52:0;:41::65:1;:68::72:0;;:41:::1;:4::143;72:23:72:24:0;:12::37:1;:41::45:0;:4::105:1;74:12:74:30;:44::45:0;:33::58:1;:12;:62::74:0;:4::120:1;24:2:76:3;;94::143::0;;;;;95:12:95:22;:26::27;:4::72:1;96:12:96:28:0;:32::33;:4::82:1;97:12:97:29:0;:33::34;:4::84:1;100:12:100:33:0;:37::38;:4::76:1;101:22:101:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;102:23:102:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;103:22:103:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;105:22:105:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;108:22:108:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;109:23:109:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;110:22:110:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;114:22:114:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;115:23:115:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;116:22:116:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;117:23:117:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::142;120:22:120:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;:4::101:1;121:22:121:23:0;:12::36:1;:39::40:0;:12:::1;:4::83;122:12:122:17:0;;:31::32;:21::45:1;:4::84;125:23:125:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::102;128:22:128:23:0;:12::38:1;:42::44:0;:4::89:1;131:62:131:63:0;:52::78:1;:85::86:0;:52::87:1;132:25:132:40:0;:21::41:1;133:26:133:42:0;:22::43:1;136:15:136:20:0;;:23::33;;:15:::1;:36::47:0;:15:::1;138:23:138:24:0;:12::39:1;:50::60:0;;:63::67;;:50:::1;:43::68;;:78::89:0;;:92::97;;:78:::1;:71::98;;:43;:4::171;139:23:139:24:0;:12::37:1;:51::52:0;:41::65:1;:68::72:0;;:41:::1;:4::145;140:23:140:24:0;:12::37:1;:4::105;142:26:142:31:0;:12:::1;:45::46:0;:34::59:1;:12;:63::75:0;:4::121:1;94:2:143:3;;160::202::0;;;;161:12:161:22;:26::27;:4::72:1;162:12:162:28:0;:32::33;:4::82:1;163:12:163:29:0;:33::34;:4::84:1;167:12:167:33:0;:37::38;:4::76:1;168:22:168:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;169:23:169:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;170:22:170:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;172:22:172:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;175:22:175:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;176:23:176:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;177:22:177:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;178:23:178:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::141;182:22:182:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;183:23:183:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;:4::104:1;184:22:184:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;187:22:187:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::100;188:22:188:23:0;:12::36:1;:39::40:0;:12:::1;:4::80;189:12:189:18:0;:32::33;:22::46:1;:4::85;192:22:192:23:0;:12::38:1;:42::44:0;:4::89:1;195:62:195:63:0;:52::78:1;:85::86:0;:52::87:1;196:25:196:40:0;:21::41:1;197:26:197:42:0;:22::43:1;199:23:199:24:0;:12::39:1;:50::69:0;::::1;:43::70;;:80::91:0;:73::92:1;;:43;:4::162;200:22:200:23:0;:12::36:1;:51::52:0;:40::65:1;:4::115;4:0:203:1;",
    logs: [],
    requires: [
      {
        ip: 10,
        line: 25,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 13,
        line: 26,
        message: "Invalid number of inputs for SushiBar enter"
      },
      {
        ip: 16,
        line: 27,
        message: "Invalid number of outputs for SushiBar enter"
      },
      {
        ip: 19,
        line: 30,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 26,
        line: 31,
        message: "Not a SushiBar input category"
      },
      {
        ip: 32,
        line: 32,
        message: "Not a SushiBar output category"
      },
      {
        ip: 37,
        line: 33,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 43,
        line: 35,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 50,
        line: 38,
        message: "Not a Sushi input category"
      },
      {
        ip: 57,
        line: 39,
        message: "Not a Sushi output category"
      },
      {
        ip: 62,
        line: 40,
        message: "Invalid Sushi output bytecode"
      },
      {
        ip: 70,
        line: 41,
        message: "Sushi input and output amounts do not match"
      },
      {
        ip: 78,
        line: 45,
        message: "Not a xSushi input category"
      },
      {
        ip: 86,
        line: 46,
        message: "Not a xSushi output category"
      },
      {
        ip: 91,
        line: 47,
        message: "Invalid xSushi output bytecode"
      },
      {
        ip: 97,
        line: 50,
        message: "Not a Sushi input category"
      },
      {
        ip: 102,
        line: 51,
        message: "Invalid staking Sushi input amount"
      },
      {
        ip: 107,
        line: 52,
        message: "Sushi input amount does not match"
      },
      {
        ip: 113,
        line: 55,
        message: "Not a xSushi output category"
      },
      {
        ip: 117,
        line: 58,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 155,
        line: 70,
        message: "SushiBar commitment does not match expected values after deposit"
      },
      {
        ip: 163,
        line: 71,
        message: "xSushi output amount does not match expected amount after deposit"
      },
      {
        ip: 167,
        line: 72,
        message: "xSushi output amount does not match Sushi input amount"
      },
      {
        ip: 174,
        line: 74,
        message: "Total shares must not exceed 100 billion"
      },
      {
        ip: 183,
        line: 95,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 186,
        line: 96,
        message: "Invalid number of inputs for SushiBar enter"
      },
      {
        ip: 189,
        line: 97,
        message: "Invalid number of outputs for SushiBar enter"
      },
      {
        ip: 192,
        line: 100,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 199,
        line: 101,
        message: "Not a SushiBar input category"
      },
      {
        ip: 205,
        line: 102,
        message: "Not a SushiBar output category"
      },
      {
        ip: 210,
        line: 103,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 216,
        line: 105,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 223,
        line: 108,
        message: "Not a Sushi input category"
      },
      {
        ip: 230,
        line: 109,
        message: "Not a Sushi output category"
      },
      {
        ip: 235,
        line: 110,
        message: "Invalid Sushi output bytecode"
      },
      {
        ip: 243,
        line: 114,
        message: "Not a xSushi input category"
      },
      {
        ip: 251,
        line: 115,
        message: "Not a xSushi output category"
      },
      {
        ip: 256,
        line: 116,
        message: "Invalid xSushi output bytecode"
      },
      {
        ip: 264,
        line: 117,
        message: "xSushi input and output amounts do not match"
      },
      {
        ip: 271,
        line: 120,
        message: "Not a Sushi input category"
      },
      {
        ip: 276,
        line: 121,
        message: "Invalid unstaking xSushi input amount"
      },
      {
        ip: 281,
        line: 122,
        message: "Sushi input amount does not match"
      },
      {
        ip: 287,
        line: 125,
        message: "Not a Sushi output category"
      },
      {
        ip: 291,
        line: 128,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 324,
        line: 138,
        message: "SushiBar commitment does not match expected values after withdrawal"
      },
      {
        ip: 332,
        line: 139,
        message: "Sushi output amount does not match expected amount after withdrawal"
      },
      {
        ip: 335,
        line: 140,
        message: "Sushi output amount does not match xSushi input amount"
      },
      {
        ip: 343,
        line: 142,
        message: "Total shares must not exceed 100 billion"
      },
      {
        ip: 351,
        line: 161,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 354,
        line: 162,
        message: "Invalid number of inputs for SushiBar enter"
      },
      {
        ip: 357,
        line: 163,
        message: "Invalid number of outputs for SushiBar enter"
      },
      {
        ip: 360,
        line: 167,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 367,
        line: 168,
        message: "Not a SushiBar input category"
      },
      {
        ip: 373,
        line: 169,
        message: "Not a SushiBar output category"
      },
      {
        ip: 378,
        line: 170,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 384,
        line: 172,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 391,
        line: 175,
        message: "Not a Sushi input category"
      },
      {
        ip: 398,
        line: 176,
        message: "Not a Sushi output category"
      },
      {
        ip: 403,
        line: 177,
        message: "Invalid Sushi output bytecode"
      },
      {
        ip: 411,
        line: 178,
        message: "Sushi input and output amounts do not match"
      },
      {
        ip: 419,
        line: 182,
        message: "Not a xSushi input category"
      },
      {
        ip: 426,
        line: 183,
        message: "Not a xSushi output category"
      },
      {
        ip: 431,
        line: 184,
        message: "Invalid xSushi output bytecode"
      },
      {
        ip: 437,
        line: 187,
        message: "Not a Sushi input category"
      },
      {
        ip: 442,
        line: 188,
        message: "Invalid staking Sushi input amount"
      },
      {
        ip: 446,
        line: 189,
        message: "Sushi input amount does not match"
      },
      {
        ip: 450,
        line: 192,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 469,
        line: 199,
        message: "SushiBar commitment does not match expected values after deposit"
      },
      {
        ip: 475,
        line: 200,
        message: "xSushi input and output amounts do not match"
      }
    ]
  },
  compiler: {
    name: "cashc",
    version: "0.11.1"
  },
  updatedAt: "2025-07-10T10:45:19.253Z"
} as const;