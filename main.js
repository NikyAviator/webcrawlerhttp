const { crawlPage } = require('./crawl');
// npm init - add to script: "start" "node main.js" -> start with npm start
// npm install --save-dev jest -> installerar jest som dev paket! -> då skapas node_modules. to run: npm test (ändra i package.json)
// npm install jsdom
async function main() {
  if (process.argv.length < 3) {
    console.log('No Website provided :(');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Too many CLI arguments!');
    process.exit(1);
  }
  // gets the actual website url from the command line
  const baseURL = process.argv[2];

  console.log(`Starting crawl of ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
