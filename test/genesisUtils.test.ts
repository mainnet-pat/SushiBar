import { upload } from "../src";


describe("GenesisUtils", () => {
  test("UploadFile", async () => {
    const response = await upload("test");
    console.log(response);
  });
});
