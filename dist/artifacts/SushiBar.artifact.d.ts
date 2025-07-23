declare const _default: {
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
    readonly bytecode: "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_5 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_2 OP_PICK OP_EQUALVERIFY OP_2 OP_UTXOBYTECODE OP_2 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_3 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_3 OP_PICK OP_3 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_4 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_6 OP_ROLL OP_IF OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_5 OP_PICK OP_OVER OP_MUL OP_2 OP_PICK OP_DIV OP_OVER OP_1 OP_LESSTHANOREQUAL OP_IF OP_6 OP_PICK OP_NIP OP_ENDIF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_2OVER OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_2DUP OP_ADD OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00e8764817 OP_NUMEQUALVERIFY OP_DROP OP_ELSE OP_3 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_4 OP_PICK OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_3 OP_PICK OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_3 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_5 OP_PICK OP_2 OP_PICK OP_MUL OP_OVER OP_DIV OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_2 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_3 OP_PICK OP_9 OP_PICK OP_SUB OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_PICK OP_SUB OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT OP_OVER OP_NUMEQUALVERIFY OP_OVER OP_7 OP_PICK OP_SUB OP_2 OP_OUTPUTTOKENAMOUNT OP_ADD 00e8764817 OP_NUMEQUALVERIFY OP_DROP OP_ENDIF OP_2DROP OP_2DROP OP_2DROP OP_1 OP_ELSE OP_3 OP_ROLL OP_1 OP_NUMEQUALVERIFY OP_TXVERSION OP_2 OP_NUMEQUALVERIFY OP_TXINPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_OVER OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_NIP OP_16 OP_NUMEQUALVERIFY OP_1 OP_UTXOTOKENCATEGORY OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_1 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_1 OP_UTXOTOKENAMOUNT OP_2 OP_UTXOTOKENAMOUNT OP_ADD OP_NUMEQUALVERIFY OP_2 OP_UTXOTOKENCATEGORY OP_1 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_2 OP_UTXOTOKENAMOUNT OP_0 OP_GREATERTHAN OP_VERIFY OP_2 OP_PICK OP_2 OP_UTXOTOKENAMOUNT OP_NUMEQUALVERIFY OP_3 OP_UTXOTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_8 OP_SPLIT OP_SWAP OP_BIN2NUM OP_SWAP OP_BIN2NUM OP_1 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_DUP OP_4 OP_ROLL OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_6 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_3 OP_PICK OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_DUP OP_4 OP_PICK OP_EQUAL OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_3 OP_PICK OP_8 OP_NUM2BIN OP_3 OP_PICK OP_7 OP_PICK OP_ADD OP_8 OP_NUM2BIN OP_CAT OP_EQUALVERIFY OP_ELSE OP_0 OP_VERIFY OP_ENDIF OP_ENDIF OP_2DROP OP_2DROP OP_DROP OP_1 OP_ENDIF";
    readonly source: "// SushiBar is the coolest bar in town. You come in with some Sushi, and leave with more! The longer you stay, the more Sushi you get.\n//\n// This contract handles swapping to and from xSushi, SushiSwap's staking token.\ncontract SushiBar(bytes32 sushiBarCategory, bytes32 sushiCategory, bytes32 xSushiCategory) {\n  // At all times the amount of xSushi released + amount of xSushi tokens in xSushiContract must be equal to MaxSushiBarShares\n  // const int MaxSushiBarShares = 100000000000; // 100 billion shares\n\n  //// If enter is true:\n  // Enter the bar. Pay some Sushi. Earn some shares.\n  // Locks Sushi and mints xSushi\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: Sushi token input holding exact Sushi to be staked, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: xSushi released to the depositor, no NFT\n  //   4: BCH change\n\n  //// If enter is false:\n  // Leave the bar. Claim back your Sushi.\n  // Unlocks the staked + gained Sushi and returns xSushi to the contract\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi input, holding staked tokens, no NFT\n  //   2: contract: xSushi input, holding entire locked xSushi supply, no NFT\n  //   3: xSushi token input holding exact xSushi to be returned, no NFT\n  //   4: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: Sushi output, holding staked tokens, no NFT\n  //   2: contract: xSushi output, holding entire locked xSushi supply, no NFT\n  //   3: Sushi returned to the depositor, no NFT\n  //   4: BCH change\n  function enterOrLeave(int amount, bool enter) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 5, \"Invalid number of inputs for SushiBar enterOrLeave\");\n    require(tx.outputs.length == 5, \"Invalid number of outputs for SushiBar enterOrLeave\");\n\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check Sushi input and output\n    require(tx.inputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n    require(tx.outputs[1].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid Sushi output bytecode\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check xSushi input and output\n    require(tx.inputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi input category\");\n    require(tx.outputs[2].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n    require(tx.inputs[2].lockingBytecode == tx.outputs[2].lockingBytecode, \"Invalid xSushi output bytecode\");\n\n    // check user token input\n    require(tx.inputs[3].tokenAmount > 0, \"Invalid token input amount\");\n    require(amount == tx.inputs[3].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[4].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    if (enter) {\n      // check Sushi staking input\n      require(tx.inputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi input category\");\n      // require(tx.inputs[3].tokenAmount > 0, \"Invalid staking Sushi input amount\");\n      // require(amount == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n      // check xSushi staking output\n      require(tx.outputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a xSushi output category\");\n\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[3].tokenAmount, \"Sushi input and output amounts do not match\");\n\n      // Calculate and release the amount of xSushi the Sushi is worth. The ratio will change overtime, as xSushi is returned/released and Sushi deposited + gained from fees / withdrawn.\n      int what = amount * totalShares / totalSushi;\n      if (totalShares <= 1) {\n        what = amount; // if this is the first deposit, we just release the same amount of xSushi as Sushi\n      }\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares + what), \"SushiBar commitment does not match expected values after deposit\");\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount - what, \"xSushi output amount does not match expected amount after deposit\");\n      require(tx.outputs[3].tokenAmount == what, \"xSushi output amount does not match Sushi input amount\");\n\n      require(totalShares + what + tx.outputs[2].tokenAmount == 100000000000, \"Total shares must not exceed 100 billion\"); // MaxSushiBarShares\n\n    } else {\n      // check xSushi unstaking input category\n      require(tx.inputs[3].tokenCategory.split(32)[0] == xSushiCategory, \"Not a Sushi input category\");\n      // require(tx.inputs[3].tokenAmount > 0, \"Invalid unstaking xSushi input amount\");\n      // require(share == tx.inputs[3].tokenAmount, \"Sushi input amount does not match\");\n\n      // check Sushi unstaking output category\n      require(tx.outputs[3].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi output category\");\n\n      require(tx.outputs[2].tokenAmount == tx.inputs[2].tokenAmount + tx.inputs[3].tokenAmount, \"xSushi input and output amounts do not match\");\n\n      // Calculate the amount of Sushi the xSushi is worth\n      int what = amount * totalSushi / totalShares;\n\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi - what) + bytes8(totalShares - amount), \"SushiBar commitment does not match expected values after withdrawal\");\n      require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount - what, \"Sushi output amount does not match expected amount after withdrawal\");\n      require(tx.outputs[3].tokenAmount == what, \"Sushi output amount does not match xSushi input amount\");\n\n      require(totalShares - amount + tx.outputs[2].tokenAmount == 100000000000, \"Total shares must not exceed 100 billion\"); // MaxSushiBarShares\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n\n  // This function is not used in the original SushiBar contract, but can be used to deposit Sushi without releasing xSushi.\n  // This is where incentives for xSushi tokens are created, for example, by distributing fees or rewards.\n  // Also due to the nature of UTXO system, anyone can deposit their Sushi or xSushi into Sushi or xSushi contracts which will not be accpeted by the SushiBar contract.\n  // This method allows to merge these Sushi or xSushi tokens into the SushiBar contract, properly updating its state.\n\n  // tx layout:\n  //  inputs:\n  //   0: contract: SushiBar input, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi input, holding staked tokens, no NFT\n  //   2: p2pkh or contract: (x)Sushi token input holding exact (x)Sushi to be staked, no NFT\n  //   3: BCH funding input, no token\n  //  outputs:\n  //   0: contract: SushiBar output, holding mutable NFT, commitment [Sushi staked amount, xSushi released supply]\n  //   1: contract: (x)Sushi output, holding staked tokens, no NFT\n  //   2: BCH change\n  function incentivizeOrMerge(int amount) {\n    require(tx.version == 2, \"SushiBar requires transaction version 2\");\n    require(tx.inputs.length == 4, \"Invalid number of inputs for SushiBar incentivizeOrMerge\");\n    require(tx.outputs.length == 3, \"Invalid number of outputs for SushiBar incentivizeOrMerge\");\n\n    // check sushi input and output\n    // check SushiBar input and output\n    require(this.activeInputIndex == 0, \"Invalid input index for SushiBar\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar input category\");\n    require(tx.outputs[0].tokenCategory.split(32)[0] == sushiBarCategory, \"Not a SushiBar output category\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid SushiBar output bytecode\");\n    // 2 64 bit values in the commitment\n    require(tx.inputs[0].nftCommitment.length == 16, \"Invalid SushiBar commitment length\");\n\n    // check (x)Sushi contract input and output\n    require(tx.inputs[1].tokenCategory == tx.outputs[1].tokenCategory, \"Token category mismatch for (x)Sushi input and output\");\n    require(tx.inputs[1].lockingBytecode == tx.outputs[1].lockingBytecode, \"Invalid (x)Sushi output bytecode\");\n    require(tx.outputs[1].tokenAmount == tx.inputs[1].tokenAmount + tx.inputs[2].tokenAmount, \"(x)Sushi input and output amounts do not match\");\n    // do not require Sushi to be pure FT, allow to have an NFT with a capability and commitment\n\n    // check (x)Sushi input and output\n    require(tx.inputs[2].tokenCategory == tx.inputs[1].tokenCategory, \"Token category mismatch for user (x)Sushi input\");\n    require(tx.inputs[2].tokenAmount > 0, \"Invalid staking (x)Sushi input amount\");\n    require(amount == tx.inputs[2].tokenAmount, \"(x)Sushi input amount does not match\");\n\n    // check funding input\n    require(tx.inputs[3].tokenCategory == 0x, \"BCH funding input must not have a token\");\n\n    // Gets the amount of Sushi locked in the contract and the amount of xSushi released\n    bytes totalSushiBytes, bytes totalSharesBytes = tx.inputs[0].nftCommitment.split(8);\n    int totalSushi = int(totalSushiBytes);\n    int totalShares = int(totalSharesBytes);\n\n    bytes inputTokenCategory = tx.inputs[1].tokenCategory.split(32)[0];\n    if (inputTokenCategory == sushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi + amount) + bytes8(totalShares), \"SushiBar commitment does not match expected values after deposit\");\n    } else if (inputTokenCategory == xSushiCategory) {\n      require(tx.outputs[0].nftCommitment == bytes8(totalSushi) + bytes8(totalShares + amount), \"SushiBar commitment does not match expected values after deposit\");\n    } else {\n      require(false, \"Invalid (x)Sushi input category\");\n    }\n    // do not burden the change output and let the user pay the fees\n  }\n}\n";
    readonly debug: {
        readonly bytecode: "5379009c63c2529dc3559dc4559dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce01207f75788851d101207f75788851c751cd8852ce01207f7552798852d101207f7552798852c752cd8853d000a069537953d09d54ce008800cf587f7c817c81567a6353ce01207f7553798853d101207f7554798851d351d053d0939d557978955279967851a1635679776800d253795879935880709358807e8852d352d05279949d53d3789d6e9352d3930500e87648179d756753ce01207f7554798853d101207f7553798852d352d053d0939d5579527995789600d253795279945880537959799458807e8851d351d05279949d53d3789d7857799452d3930500e87648179d75686d6d6d5167537a519dc2529dc3549dc4539dc0009d00ce01207f75788800d101207f758800c700cd8800cf8277609d51ce51d18851c751cd8851d351d052d0939d52ce51ce8852d000a069527952d09d53ce008800cf587f7c817c8151ce01207f7576547a876300d253795679935880537958807e8867765479876300d253795880537957799358807e8867006968686d6d755168";
        readonly sourceMap: "43:2:122:3;;;;;44:12:44:22;:26::27;:4::72:1;45:12:45:28:0;:32::33;:4::89:1;46:12:46:29:0;:33::34;:4::91:1;49:12:49:33:0;:37::38;:4::76:1;50:22:50:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;51:23:51:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;52:22:52:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;54:22:54:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;57:22:57:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::68:0;:4::100:1;58:23:58:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::69:0;:4::102:1;59:22:59:23:0;:12::40:1;:55::56:0;:44::73:1;:4::108;63:22:63:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::69:0;;:4::102:1;64:23:64:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:56::70:0;;:4::104:1;65:22:65:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109;68:22:68:23:0;:12::36:1;:39::40:0;:12:::1;:4::72;69:12:69:18:0;;:32::33;:22::46:1;:4::88;72:22:72:23:0;:12::38:1;:42::44:0;:4::89:1;75:62:75:63:0;:52::78:1;:85::86:0;:52::87:1;76:25:76:40:0;:21::41:1;77:26:77:42:0;:22::43:1;79:8:79:13:0;;:15:101:5;81:24:81:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::70:0;;:6::102:1;86:25:86:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::72:0;;:6::106:1;88:25:88:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::143;91:17:91:23:0;;:26::37;:17:::1;:40::50:0;;:17:::1;92:10:92:21:0;:25::26;:10:::1;:28:94:7:0;93:15:93:21;;:8::22:1;92:28:94:7;95:25:95:26:0;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::100:0;::::1;:75::101;;:45;:6::171;96:25:96:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::145;97:25:97:26:0;:14::39:1;:43::47:0;:6::107:1;99:14:99:32:0;::::1;:46::47:0;:35::60:1;:14;:64::76:0;:6::122:1;79:15:101:5;101:11:120::0;103:24:103:25;:14::40:1;:47::49:0;:14::50:1;:::53;:57::71:0;;:6::103:1;108:25:108:26:0;:14::41:1;:48::50:0;:14::51:1;:::54;:58::71:0;;:6::104:1;110:25:110:26:0;:14::39:1;:53::54:0;:43::67:1;:80::81:0;:70::94:1;:43;:6::144;113:17:113:23:0;;:26::36;;:17:::1;:39::50:0;:17:::1;115:25:115:26:0;:14::41:1;:52::62:0;;:65::69;;:52:::1;:45::70;;:80::91:0;;:94::100;;:80:::1;:73::101;;:45;:6::174;116:25:116:26:0;:14::39:1;:53::54:0;:43::67:1;:70::74:0;;:43:::1;:6::147;117:25:117:26:0;:14::39:1;:43::47:0;:6::107:1;119:14:119:25:0;:28::34;;:14:::1;:48::49:0;:37::62:1;:14;:66::78:0;:6::124:1;101:11:120:5;;43:2:122:3;;;;;139::181::0;;;;140:12:140:22;:26::27;:4::72:1;141:12:141:28:0;:32::33;:4::95:1;142:12:142:29:0;:33::34;:4::97:1;146:12:146:33:0;:37::38;:4::76:1;147:22:147:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:55::71:0;:4::106:1;148:23:148:24:0;:12::39:1;:46::48:0;:12::49:1;:::52;:4::108;149:22:149:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;151:22:151:23:0;:12::38:1;:::45;;:49::51:0;:4::91:1;154:22:154:23:0;:12::38:1;:53::54:0;:42::69:1;:4::128;155:22:155:23:0;:12::40:1;:55::56:0;:44::73:1;:4::111;156:23:156:24:0;:12::37:1;:51::52:0;:41::65:1;:78::79:0;:68::92:1;:41;:4::144;160:22:160:23:0;:12::38:1;:52::53:0;:42::68:1;:4::121;161:22:161:23:0;:12::36:1;:39::40:0;:12:::1;:4::83;162:12:162:18:0;;:32::33;:22::46:1;:4::88;165:22:165:23:0;:12::38:1;:42::44:0;:4::89:1;168:62:168:63:0;:52::78:1;:85::86:0;:52::87:1;169:25:169:40:0;:21::41:1;170:26:170:42:0;:22::43:1;172:41:172:42:0;:31::57:1;:64::66:0;:31::67:1;:::70;173:8:173:26:0;:30::43;;:8:::1;:45:175:5:0;174:25:174:26;:14::41:1;:52::62:0;;:65::71;;:52:::1;:45::72;;:82::93:0;;:75::94:1;;:45;:6::164;175:11:179:5:0;:15:175:33;:37::51;;:15:::1;:53:177:5:0;176:25:176:26;:14::41:1;:52::62:0;;:45::63:1;;:73::84:0;;:87::93;;:73:::1;:66::94;;:45;:6::164;177:11:179:5:0;178:14:178:19;:6::56:1;177:11:179:5;175;139:2:181:3;;;;4:0:182:1";
        readonly logs: readonly [];
        readonly requires: readonly [{
            readonly ip: 10;
            readonly line: 44;
            readonly message: "SushiBar requires transaction version 2";
        }, {
            readonly ip: 13;
            readonly line: 45;
            readonly message: "Invalid number of inputs for SushiBar enterOrLeave";
        }, {
            readonly ip: 16;
            readonly line: 46;
            readonly message: "Invalid number of outputs for SushiBar enterOrLeave";
        }, {
            readonly ip: 19;
            readonly line: 49;
            readonly message: "Invalid input index for SushiBar";
        }, {
            readonly ip: 26;
            readonly line: 50;
            readonly message: "Not a SushiBar input category";
        }, {
            readonly ip: 32;
            readonly line: 51;
            readonly message: "Not a SushiBar output category";
        }, {
            readonly ip: 37;
            readonly line: 52;
            readonly message: "Invalid SushiBar output bytecode";
        }, {
            readonly ip: 43;
            readonly line: 54;
            readonly message: "Invalid SushiBar commitment length";
        }, {
            readonly ip: 50;
            readonly line: 57;
            readonly message: "Not a Sushi input category";
        }, {
            readonly ip: 57;
            readonly line: 58;
            readonly message: "Not a Sushi output category";
        }, {
            readonly ip: 62;
            readonly line: 59;
            readonly message: "Invalid Sushi output bytecode";
        }, {
            readonly ip: 70;
            readonly line: 63;
            readonly message: "Not a xSushi input category";
        }, {
            readonly ip: 78;
            readonly line: 64;
            readonly message: "Not a xSushi output category";
        }, {
            readonly ip: 83;
            readonly line: 65;
            readonly message: "Invalid xSushi output bytecode";
        }, {
            readonly ip: 88;
            readonly line: 68;
            readonly message: "Invalid token input amount";
        }, {
            readonly ip: 93;
            readonly line: 69;
            readonly message: "(x)Sushi input amount does not match";
        }, {
            readonly ip: 97;
            readonly line: 72;
            readonly message: "BCH funding input must not have a token";
        }, {
            readonly ip: 116;
            readonly line: 81;
            readonly message: "Not a Sushi input category";
        }, {
            readonly ip: 124;
            readonly line: 86;
            readonly message: "Not a xSushi output category";
        }, {
            readonly ip: 132;
            readonly line: 88;
            readonly message: "Sushi input and output amounts do not match";
        }, {
            readonly ip: 162;
            readonly line: 95;
            readonly message: "SushiBar commitment does not match expected values after deposit";
        }, {
            readonly ip: 170;
            readonly line: 96;
            readonly message: "xSushi output amount does not match expected amount after deposit";
        }, {
            readonly ip: 174;
            readonly line: 97;
            readonly message: "xSushi output amount does not match Sushi input amount";
        }, {
            readonly ip: 181;
            readonly line: 99;
            readonly message: "Total shares must not exceed 100 billion";
        }, {
            readonly ip: 191;
            readonly line: 103;
            readonly message: "Not a Sushi input category";
        }, {
            readonly ip: 199;
            readonly line: 108;
            readonly message: "Not a Sushi output category";
        }, {
            readonly ip: 207;
            readonly line: 110;
            readonly message: "xSushi input and output amounts do not match";
        }, {
            readonly ip: 232;
            readonly line: 115;
            readonly message: "SushiBar commitment does not match expected values after withdrawal";
        }, {
            readonly ip: 240;
            readonly line: 116;
            readonly message: "Sushi output amount does not match expected amount after withdrawal";
        }, {
            readonly ip: 244;
            readonly line: 117;
            readonly message: "Sushi output amount does not match xSushi input amount";
        }, {
            readonly ip: 253;
            readonly line: 119;
            readonly message: "Total shares must not exceed 100 billion";
        }, {
            readonly ip: 267;
            readonly line: 140;
            readonly message: "SushiBar requires transaction version 2";
        }, {
            readonly ip: 270;
            readonly line: 141;
            readonly message: "Invalid number of inputs for SushiBar incentivizeOrMerge";
        }, {
            readonly ip: 273;
            readonly line: 142;
            readonly message: "Invalid number of outputs for SushiBar incentivizeOrMerge";
        }, {
            readonly ip: 276;
            readonly line: 146;
            readonly message: "Invalid input index for SushiBar";
        }, {
            readonly ip: 283;
            readonly line: 147;
            readonly message: "Not a SushiBar input category";
        }, {
            readonly ip: 289;
            readonly line: 148;
            readonly message: "Not a SushiBar output category";
        }, {
            readonly ip: 294;
            readonly line: 149;
            readonly message: "Invalid SushiBar output bytecode";
        }, {
            readonly ip: 300;
            readonly line: 151;
            readonly message: "Invalid SushiBar commitment length";
        }, {
            readonly ip: 305;
            readonly line: 154;
            readonly message: "Token category mismatch for (x)Sushi input and output";
        }, {
            readonly ip: 310;
            readonly line: 155;
            readonly message: "Invalid (x)Sushi output bytecode";
        }, {
            readonly ip: 318;
            readonly line: 156;
            readonly message: "(x)Sushi input and output amounts do not match";
        }, {
            readonly ip: 323;
            readonly line: 160;
            readonly message: "Token category mismatch for user (x)Sushi input";
        }, {
            readonly ip: 328;
            readonly line: 161;
            readonly message: "Invalid staking (x)Sushi input amount";
        }, {
            readonly ip: 333;
            readonly line: 162;
            readonly message: "(x)Sushi input amount does not match";
        }, {
            readonly ip: 337;
            readonly line: 165;
            readonly message: "BCH funding input must not have a token";
        }, {
            readonly ip: 370;
            readonly line: 174;
            readonly message: "SushiBar commitment does not match expected values after deposit";
        }, {
            readonly ip: 391;
            readonly line: 176;
            readonly message: "SushiBar commitment does not match expected values after deposit";
        }, {
            readonly ip: 394;
            readonly line: 178;
            readonly message: "Invalid (x)Sushi input category";
        }];
    };
    readonly compiler: {
        readonly name: "cashc";
        readonly version: "0.11.1";
    };
    readonly updatedAt: "2025-07-12T09:45:41.867Z";
};
export default _default;
