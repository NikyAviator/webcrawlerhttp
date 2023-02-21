const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      // relative
      try {
        const urlObject = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObject.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    } else {
      // absolute
      try {
        const urlObject = new URL(linkElement.href);
        urls.push(urlObject.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    // return everything except last char (if the lastchar is a '/')
    return hostPath.slice(0, -1);
  }
  // annars return hostPath
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
