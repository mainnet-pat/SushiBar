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
      name: "enterOrLeave",
      inputs: [
        {
          name: "amount",
          type: "int"
        },
        {
          name: "enter",
          type: "bool"
        }
      ]
    },
    {
      name: "incentivizeOrMerge",
      inputs: [
        {
          name: "amount",
          type: "int"
        }
      ]
    }
  ],
  bytecode: "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_3 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_6 OP_ROLL OP_IF OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_5 OP_PICK OP_OVER OP_MUL OP_2 OP_PICK OP_DIV OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_OVER OP_1 OP_LESSTHANOREQUAL OP_IF OP_6 OP_PICK OP_NIP OP_ENDIF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_2OVER OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_2DUP OP_ADD OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00e8764817 OP_NUMEQUALVERIFY OP_DROP OP_ELSE OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_5 OP_PICK OP_2 OP_PICK OP_MUL OP_OVER OP_DIV OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_2 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_3 OP_PICK OP_9 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_OVER OP_7 OP_PICK OP_SUB OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00e8764817 OP_NUMEQUALVERIFY OP_DROP OP_ENDIF OP_2DROP OP_2DROP OP_2DROP OP_1 OP_ELSE OP_3 OP_ROLL OP_1 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY OP_1 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_2 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_2 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_DUP OP_4 OP_ROLL OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_6 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_3 OP_PICK OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_DUP OP_4 OP_PICK OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_NUM2BIN OP_3 OP_PICK OP_7 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_0 OP_VERIFY OP_ENDIF OP_ENDIF OP_2DROP OP_2DROP OP_DROP OP_1 OP_ENDIF",
  source: "// SushiBar is the coolest bar in town. You come in with some Sushi, and leave with more! The longer you stay, the more Sushi you get.\n//\n// This contract handles swapping to and from xSushi, SushiSwap's staking token.\ncontract SushiBar(bytes32 sushiBarCategory, bytes32 sushiCategory, bytes32 xSushiCategory) {\n  // At all times the amount of xSushi released + amount of xSushi tokens in xSushiContract must be equal to MaxSushiBarShares\n  // const int MaxSushiBarShares = 100000000000; // 100 billion shares\n\n  //// If enter is true:\n  // Enter the bar. Pay some Sushi. Earn some shares.\n  // Locks Sushi and mints xSushi\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: xSushi released to the depositor, no NFT\n  //   4: BCH change\n\n  //// If enter is false:\n  // Leave the bar. Claim back your Sushi.\n  // Unlocks the staked + gained Sushi and returns xSushi to the contract\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: xSushi token input holding exact xSushi to be returned, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: Sushi returned to the depositor, no NFT\n  //   4: BCH change\n  function enterOrLeave(int amount, bool enter) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enterOrLeave\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enterOrLeave\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check user token input\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid token input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    if (enter) {\n      // check Sushi staking input\n      require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n      // require(tx.inputs[3].tokenAmount > 0, \"Invalid staking Sushi input amount\");\n      // require(amount == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n      // check xSushi staking output\n      require(tx.outputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n\n      // Calculate and release the amount of xSushi the Sushi is worth. The ratio will change overtime, as xSushi is returned/released and Sushi deposited + gained from fees / withdrawn.\n      int what = amount * totalShares / totalSushi;\n      require(what > 0, \"Input amount is too small to enter SushiBar\");\n      if (totalShares <= 1) {\n        what = amount; // if this is the first deposit, we just release the same amount of xSushi as Sushi\n      }\n      console.log(totalSushi, amount, totalShares, what);\n      // bytes commitment = tx.outputs[0].nftCommitment;\n      // bytes8 newSushi = bytes8(totalSushi + amount);\n      // bytes8 newShares = bytes8(totalShares + what);\n      // console.log(commitment, newSushi, newShares);\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares + what), \"SushiBar commitment does not match expected values after deposit\");\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount - what, \"xSushi output amount does not match expected amount after deposit\");\n      require(tx.outputs[3].tokenAmount == what, \"xSushi output amount does not match Sushi input amount\");\n\n      require(totalShares + what + tx.outputs[2].tokenAmount == 100000000000, \"Total shares must not exceed 100 billion\"); // MaxSushiBarShares\n\n    } else {\n      // check xSushi unstaking input category\n      require(tx.inputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a Sushi input category\");\n      // require(tx.inputs[3].tokenAmount > 0, \"Invalid unstaking xSushi input amount\");\n      // require(share == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n      // check Sushi unstaking output category\n      require(tx.outputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount + tx.inputs[3].tokenAmount, \"xSushi input and output amounts do not match\");\n\n      // Calculate the amount of Sushi the xSushi is worth\n      int what = amount * totalSushi / totalShares;\n      require(what > 0, \"Input amount is too small to leave SushiBar\");\n\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi - what) + bytes8(totalShares - amount), \"SushiBar commitment does not match expected values after withdrawal\");\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount - what, \"Sushi output amount does not match expected amount after withdrawal\");\n      require(tx.outputs[3].tokenAmount == what, \"Sushi output amount does not match xSushi input amount\");\n\n      require(totalShares - amount + tx.outputs[2].tokenAmount == 100000000000, \"Total shares must not exceed 100 billion\"); // MaxSushiBarShares\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n\n  // This function is not used in the original SushiBar contract, but can be used to deposit Sushi without releasing xSushi.\n  // This is where incentives for xSushi tokens are created, for example, by distributing fees or rewards.\n  // Also due to the nature of UTXO system, anyone can deposit their Sushi or xSushi into Sushi or xSushi contracts which will not be accpeted by the SushiBar contract.\n  // This method allows to merge these Sushi or xSushi tokens into the SushiBar contract, properly updating its state.\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi input, holding staked tokens, no NFT\n  //   2: p2pkh or contract: (x)Sushi token input holding exact (x)Sushi to be staked, no NFT\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi output, holding staked tokens, no NFT\n  //   2: BCH change\n  function incentivizeOrMerge(int amount) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for SushiBar incentivizeOrMerge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for SushiBar incentivizeOrMerge\");\n\n    // check sushi input and output\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check (x)Sushi contract input and output\n    require(tx.inputs[1].tokenCategory == tx.outputs[1].tokenCategory, \"Token category mismatch for (x)Sushi input and output\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid (x)Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount, \"(x)Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check (x)Sushi input and output\n    require(tx.inputs[2].tokenCategory == tx.inputs[1].tokenCategory, \"Token category mismatch for user (x)Sushi input\");\n    require(tx.inputs[2].tokenAmount > 0, \"Invalid staking (x)Sushi input amount\");\n    require(amount == tx.inputs[2].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    bytes inputTokenCategory = tx.inputs[1].tokenCategory.split(32)[0];\n    if (inputTokenCategory == sushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares), \"SushiBar commitment does not match expected values after deposit\");\n    } else if (inputTokenCategory == xSushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi) + bytes8(totalShares + amount), \"SushiBar commitment does not match expected values after deposit\");\n    } else {\n      require(false, \"Invalid (x)Sushi input category\");\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n}\n",
  debug: {
    bytecode: "5379009c63c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8852ce01207f7552798852d101207f7552798852c752cd8853d000a069537953d09d54ce008800cf587f7c817c81567a6353ce01207f7553798853d101207f7554798851d351d053d0939d557978955279967600a0697851a1635679776800d253795879935880709358807e8852d352d05279949d53d3789d6e9352d3930500e87648179d756753ce01207f7554798853d101207f7553798852d352d053d0939d557952799578967600a06900d253795279945880537959799458807e8851d351d05279949d53d3789d7857799452d3930500e87648179d75686d6d6d5167537a519dc2529dc3549dc4539dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce51d18851c751cd8851d351d052d0939d52ce51ce8852d000a069527952d09d53ce008800cf587f7c817c8151ce01207f7576547a876300d253795679935880537958807e8867765479876300d253795880537957799358807e8867006968686d6d755168",
    sourceMap: "43:2:129:3;;;;;44:12:44:22;:26::27;:4::72:1;45:12:45:28:0;:32::33;:4::89:1;46:12:46:29:0;:33::34;:4::91:1;49:12:49:33:0;:37::38;:4::76:1;50:22:50:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;51:23:51:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;52:22:52:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;54:22:54:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;57:22:57:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;58:23:58:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;59:22:59:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;63:22:63:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;64:23:64:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;65:22:65:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;68:22:68:23:0;:12::36:1;:39::40:0;:12:::1;:4::72;69:12:69:18:0;;:32::33;:22::46:1;:4::88;72:22:72:23:0;:12::38:1;:42::44:0;:4::89:1;75:62:75:63:0;:52::78:1;:85::86:0;:52::87:1;76:25:76:40:0;:21::41:1;77:26:77:42:0;:22::43:1;79:8:79:13:0;;:15:107:5;81:24:81:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::70:0;;:6::102:1;86:25:86:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::72:0;;:6::106:1;88:25:88:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::143;91:17:91:23:0;;:26::37;:17:::1;:40::50:0;;:17:::1;92:14:92:18:0;:21::22;:14:::1;:6::71;93:10:93:21:0;:25::26;:10:::1;:28:95:7:0;94:15:94:21;;:8::22:1;93:28:95:7;101:25:101:26:0;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::100:0;::::1;:75::101;;:45;:6::171;102:25:102:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::145;103:25:103:26:0;:14::39:1;:43::47:0;:6::107:1;105:14:105:32:0;::::1;:46::47:0;:35::60:1;:14;:64::76:0;:6::122:1;79:15:107:5;107:11:127::0;109:24:109:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::71:0;;:6::103:1;114:25:114:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::71:0;;:6::104:1;116:25:116:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::144;119:17:119:23:0;;:26::36;;:17:::1;:39::50:0;:17:::1;120:14:120:18:0;:21::22;:14:::1;:6::71;122:25:122:26:0;:14::41:1;:52::62:0;;:65::69;;:52:::1;:45::70;;:80::91:0;;:94::100;;:80:::1;:73::101;;:45;:6::174;123:25:123:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::147;124:25:124:26:0;:14::39:1;:43::47:0;:6::107:1;126:14:126:25:0;:28::34;;:14:::1;:48::49:0;:37::62:1;:14;:66::78:0;:6::124:1;107:11:127:5;;43:2:129:3;;;;;146::188::0;;;;147:12:147:22;:26::27;:4::72:1;148:12:148:28:0;:32::33;:4::95:1;149:12:149:29:0;:33::34;:4::97:1;153:12:153:33:0;:37::38;:4::76:1;154:22:154:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;155:23:155:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;156:22:156:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;158:22:158:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;161:22:161:23:0;:12::38:1;:53::54:0;:42::69:1;:4::128;162:22:162:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;163:23:163:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::144;167:22:167:23:0;:12::38:1;:52::53:0;:42::68:1;:4::121;168:22:168:23:0;:12::36:1;:39::40:0;:12:::1;:4::83;169:12:169:18:0;;:32::33;:22::46:1;:4::88;172:22:172:23:0;:12::38:1;:42::44:0;:4::89:1;175:62:175:63:0;:52::78:1;:85::86:0;:52::87:1;176:25:176:40:0;:21::41:1;177:26:177:42:0;:22::43:1;179:41:179:42:0;:31::57:1;:64::66:0;:31::67:1;:::70;180:8:180:26:0;:30::43;;:8:::1;:45:182:5:0;181:25:181:26;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::93:0;;:75::94:1;;:45;:6::164;182:11:186:5:0;:15:182:33;:37::51;;:15:::1;:53:184:5:0;183:25:183:26;:14::41:1;:52::62:0;;:45::63:1;;:73::84:0;;:87::93;;:73:::1;:66::94;;:45;:6::164;184:11:186:5:0;185:14:185:19;:6::56:1;184:11:186:5;182;146:2:188:3;;;;4:0:189:1",
    logs: [
      {
        ip: 152,
        line: 96,
        data: [
          {
            stackIndex: 2,
            type: "int",
            ip: 152
          },
          {
            stackIndex: 6,
            type: "int",
            ip: 152
          },
          {
            stackIndex: 1,
            type: "int",
            ip: 152
          },
          {
            stackIndex: 0,
            type: "int",
            ip: 152
          }
        ]
      }
    ],
    requires: [
      {
        ip: 10,
        line: 44,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 13,
        line: 45,
        message: "Invalid number of inputs for SushiBar enterOrLeave"
      },
      {
        ip: 16,
        line: 46,
        message: "Invalid number of outputs for SushiBar enterOrLeave"
      },
      {
        ip: 19,
        line: 49,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 26,
        line: 50,
        message: "Not a SushiBar input category"
      },
      {
        ip: 32,
        line: 51,
        message: "Not a SushiBar output category"
      },
      {
        ip: 37,
        line: 52,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 43,
        line: 54,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 50,
        line: 57,
        message: "Not a Sushi input category"
      },
      {
        ip: 57,
        line: 58,
        message: "Not a Sushi output category"
      },
      {
        ip: 62,
        line: 59,
        message: "Invalid Sushi output bytecode"
      },
      {
        ip: 70,
        line: 63,
        message: "Not a xSushi input category"
      },
      {
        ip: 78,
        line: 64,
        message: "Not a xSushi output category"
      },
      {
        ip: 83,
        line: 65,
        message: "Invalid xSushi output bytecode"
      },
      {
        ip: 88,
        line: 68,
        message: "Invalid token input amount"
      },
      {
        ip: 93,
        line: 69,
        message: "(x)Sushi input amount does not match"
      },
      {
        ip: 97,
        line: 72,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 116,
        line: 81,
        message: "Not a Sushi input category"
      },
      {
        ip: 124,
        line: 86,
        message: "Not a xSushi output category"
      },
      {
        ip: 132,
        line: 88,
        message: "Sushi input and output amounts do not match"
      },
      {
        ip: 143,
        line: 92,
        message: "Input amount is too small to enter SushiBar"
      },
      {
        ip: 166,
        line: 101,
        message: "SushiBar commitment does not match expected values after deposit"
      },
      {
        ip: 174,
        line: 102,
        message: "xSushi output amount does not match expected amount after deposit"
      },
      {
        ip: 178,
        line: 103,
        message: "xSushi output amount does not match Sushi input amount"
      },
      {
        ip: 185,
        line: 105,
        message: "Total shares must not exceed 100 billion"
      },
      {
        ip: 195,
        line: 109,
        message: "Not a Sushi input category"
      },
      {
        ip: 203,
        line: 114,
        message: "Not a Sushi output category"
      },
      {
        ip: 211,
        line: 116,
        message: "xSushi input and output amounts do not match"
      },
      {
        ip: 222,
        line: 120,
        message: "Input amount is too small to leave SushiBar"
      },
      {
        ip: 240,
        line: 122,
        message: "SushiBar commitment does not match expected values after withdrawal"
      },
      {
        ip: 248,
        line: 123,
        message: "Sushi output amount does not match expected amount after withdrawal"
      },
      {
        ip: 252,
        line: 124,
        message: "Sushi output amount does not match xSushi input amount"
      },
      {
        ip: 261,
        line: 126,
        message: "Total shares must not exceed 100 billion"
      },
      {
        ip: 275,
        line: 147,
        message: "SushiBar requires transaction version 2"
      },
      {
        ip: 278,
        line: 148,
        message: "Invalid number of inputs for SushiBar incentivizeOrMerge"
      },
      {
        ip: 281,
        line: 149,
        message: "Invalid number of outputs for SushiBar incentivizeOrMerge"
      },
      {
        ip: 284,
        line: 153,
        message: "Invalid input index for SushiBar"
      },
      {
        ip: 291,
        line: 154,
        message: "Not a SushiBar input category"
      },
      {
        ip: 297,
        line: 155,
        message: "Not a SushiBar output category"
      },
      {
        ip: 302,
        line: 156,
        message: "Invalid SushiBar output bytecode"
      },
      {
        ip: 308,
        line: 158,
        message: "Invalid SushiBar commitment length"
      },
      {
        ip: 313,
        line: 161,
        message: "Token category mismatch for (x)Sushi input and output"
      },
      {
        ip: 318,
        line: 162,
        message: "Invalid (x)Sushi output bytecode"
      },
      {
        ip: 326,
        line: 163,
        message: "(x)Sushi input and output amounts do not match"
      },
      {
        ip: 331,
        line: 167,
        message: "Token category mismatch for user (x)Sushi input"
      },
      {
        ip: 336,
        line: 168,
        message: "Invalid staking (x)Sushi input amount"
      },
      {
        ip: 341,
        line: 169,
        message: "(x)Sushi input amount does not match"
      },
      {
        ip: 345,
        line: 172,
        message: "BCH funding input must not have a token"
      },
      {
        ip: 378,
        line: 181,
        message: "SushiBar commitment does not match expected values after deposit"
      },
      {
        ip: 399,
        line: 183,
        message: "SushiBar commitment does not match expected values after deposit"
      },
      {
        ip: 402,
        line: 185,
        message: "Invalid (x)Sushi input category"
      }
    ]
  },
  compiler: {
    name: "cashc",
    version: "0.11.3"
  },
  updatedAt: "2025-07-30T13:42:25.451Z"
} as const;