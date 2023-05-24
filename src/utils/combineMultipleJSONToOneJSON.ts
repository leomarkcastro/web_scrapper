import fs from "fs";

export function combineMultipleJSONToOneJSON(
  targetFolder: string,
  outputLocation: string
) {
  let result: any = {};
  const files = fs.readdirSync(targetFolder);
  files.forEach((file) => {
    const data = fs.readFileSync(`${targetFolder}/${file}`, "utf8");
    const parsedData = JSON.parse(data);
    result[file.split(".")[0]] = parsedData;
  });
  fs.writeFileSync(outputLocation, JSON.stringify(result));
}
