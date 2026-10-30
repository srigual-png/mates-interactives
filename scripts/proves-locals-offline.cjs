const pw=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const launch=pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch=async(...args)=>{const browser=await launch(...args),newPage=browser.newPage.bind(browser);browser.newPage=async(...opts)=>{const page=await newPage(...opts);await page.route(/^https?:/,route=>route.abort());return page;};return browser;};
