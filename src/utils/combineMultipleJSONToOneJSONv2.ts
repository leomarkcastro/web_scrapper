import fs from "fs";

const MONTHS_DICT = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  Jully: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export function combineMultipleJSONToOneJSON(
  targetFolder: string,
  outputLocation: string
) {
  let result: any = [];
  const files = fs.readdirSync(targetFolder);
  files.forEach((file) => {
    const data = fs.readFileSync(`${targetFolder}/${file}`, "utf8");
    const parsedData = JSON.parse(data);
    parsedData.events.map((event: any) => {
      result.push({
        ...event,
        // @ts-ignore
        month: MONTHS_DICT[parsedData.month],
        day: parsedData.day,
        year:
          event.year.includes("BC") || event.year.includes("AD")
            ? -Number(
                event.year
                  .replace("BCE", "")
                  .replace("BC", "")
                  .replace("ADE", "")
                  .replace("AD", "")
                  .trim()
              )
            : Number(event.year),
      });
    });
  });
  result = result.filter((event: any) => {
    return (
      // @ts-ignore
      event.year !== null &&
      event.year !== undefined &&
      isNaN(event.year) === false
    );
  });
  fs.writeFileSync(outputLocation, JSON.stringify({ data: result }));
}
