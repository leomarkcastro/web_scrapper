import { combineMultipleJSONToOneJSON } from "./utils/combineMultipleJSONToOneJSONv2";

async function main() {
  await combineMultipleJSONToOneJSON("./output", "./output.json");
}

main();
