export default {
  contractName: "Sushi",
  constructorInputs: [
    {
      name: "sushiCategory",
      type: "bytes"
    }
  ],
  abi: [
    {
      name: "spend",
      inputs: []
    }
  ],
  bytecode: "OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUAL",
  source: "// A simple contract to contain Sushi tokens which ensures its self-preservation under some rules.\ncontract Sushi(bytes sushiCategory) {\n  function spend() {\n    require(this.activeInputIndex == 0, \"Invalid input index for Sushi\");\n    require(tx.inputs[0].tokenCategory.split(32)[0] == sushiCategory, \"Not a Sushi token\");\n    require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode, \"Invalid Sushi locking bytecode\");\n  }\n}\n",
  debug: {
    bytecode: "c0009d00ce01207f758800c700cd87",
    sourceMap: "4:12:4:33;:37::38;:4::73:1;5:22:5:23:0;:12::38:1;:45::47:0;:12::48:1;:::51;:4::91;6:22:6:23:0;:12::40:1;:55::56:0;:44::73:1;:4::109",
    logs: [],
    requires: [
      {
        ip: 3,
        line: 4,
        message: "Invalid input index for Sushi"
      },
      {
        ip: 9,
        line: 5,
        message: "Not a Sushi token"
      },
      {
        ip: 15,
        line: 6,
        message: "Invalid Sushi locking bytecode"
      }
    ]
  },
  compiler: {
    name: "cashc",
    version: "0.11.1"
  },
  updatedAt: "2025-07-08T13:50:48.003Z"
} as const;