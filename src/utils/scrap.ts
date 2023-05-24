import axios from "axios";
import { JSDOM } from "jsdom";
import { domStringToHTMLFile } from "./exportToFile";

export const getPageDOM = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1",
      "Accept-Language": "en-US,en;q=0.9,ar;q=0.8,fr;q=0.7",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    },
  });
  // console.log(`>> Fetched page [${url}]`);
  // console.log(`>> Response [${response.data}]`);
  // domStringToHTMLFile(response.data, "test.html");
  return new JSDOM(response.data);
};
