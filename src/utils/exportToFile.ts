import fs from "fs";

export function domStringToHTMLFile(domString: string, fileName: string) {
  fs.writeFile(fileName, domString, function (err) {
    if (err) return console.log(err);
    console.log(`>> Saved file [${fileName}]`);
  });
}
