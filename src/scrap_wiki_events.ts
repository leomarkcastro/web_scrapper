import { domStringToHTMLFile } from "./utils/exportToFile";
import { getPageDOM } from "./utils/scrap";

async function fetcherAndScraperForWikipedia(url: string) {
  // console.log(">> Fetching page");
  const dom = await getPageDOM(url);

  // console.log(">> Getting DOM");
  const eventTab = dom.window.document.querySelector("#mf-section-1");

  const events = eventTab?.querySelectorAll("ul > li");
  // console.log(`>> Looping [${eventTab} - ${events?.length}]`);

  const eventList: {
    year: string | null | undefined;
    description: string | null | undefined;
    links: {
      text: string | null | undefined;
      href: string | null | undefined;
    }[];
  }[] = [];
  events?.forEach((event) => {
    const year = event?.textContent?.split("–")[0]?.trim();
    const description = event?.textContent?.split("–")[1]?.trim().split("[")[0];
    // get all hrefs of a tag
    const links = event?.querySelectorAll("a");
    const linksText: {
      text: string | null | undefined;
      href: string | null | undefined;
    }[] = [];
    links?.forEach((link) => {
      if (link.getAttribute("href")?.includes("#cite_note")) return;
      linksText.push({
        text: link?.textContent,
        href: link?.getAttribute("href"),
      });
    });
    eventList.push({ year, description, links: linksText });
  });

  return eventList;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "Jully",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function fetch_all() {
  for (let i_month = 0; i_month < months.length; i_month++) {
    const daysInCurrentMonth = getDaysInMonth(2004, i_month + 1);
    for (let i_day = 1; i_day <= daysInCurrentMonth; i_day++) {
      const date_request = `${months[i_month]}_${i_day}`;
      console.log(`>> Fetching ${date_request}`);
      try {
        const request = await fetcherAndScraperForWikipedia(
          `https://en.wikipedia.org/wiki/${date_request}`
        );
        // console.log(request);
        await domStringToHTMLFile(
          JSON.stringify({
            month_day: date_request,
            month: months[i_month],
            day: i_day,
            events: request,
          }),
          `./output/${i_month}-${i_day}.json`
        );
      } catch (error) {
        console.log(`>> Error fetching ${date_request}`);
        console.log(error);
      }
    }
  }
}

async function main() {
  await fetch_all();
}

main();
