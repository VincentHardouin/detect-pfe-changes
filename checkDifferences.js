const puppeteer = require('puppeteer');
const _ = require('lodash');
const fs = require('fs');
const config = require('./config');

async function launchBrowserAndCreateNewPage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return { browser, page };
}

async function goToWebsiteAndLogIn({ website, username, password }, page) {
  await page.goto(website, { waitUntil: 'networkidle0' });
  await page.type('#username', username);
  await page.type('#password', password);
  await page.click('#btn-submit');
  await page.waitForNavigation();
}

async function getContentById(page, id) {
  const element = await page.$(`#${id}`);
  if (!element) {
    return null;
  }
  return await page.evaluate(element => element.textContent, element);
}

async function getStepAndStatus(page) {
  const step = await getContentById(page, 'el_lesprojets_prjstage')
  const status = await getContentById(page,'el_lesprojets_prjstatus');

  return { step, status };
}

function getOldValues(filename) {
  const stringifiedValues = fs.readFileSync(filename, 'utf-8');
  if (!stringifiedValues) {
    return null;
  }
  return  JSON.parse(stringifiedValues);
}

function saveValues(values, filename) {
  const stringifiedValues = JSON.stringify(values);
  return fs.writeFileSync(filename, stringifiedValues);
}

async function compareNewValuesWithOldValues(newValues, oldValues) {
  return _.isEqual(newValues, oldValues);
}

module.exports = async function check() {
  const { browser, page } = await launchBrowserAndCreateNewPage();
  const website = `https://vpe-ece.fr/lesprojetsview.php?id=${config.idProject}`;
  const { username, password } = config.credentials;
  await goToWebsiteAndLogIn({ website, username, password }, page);
  const newValues = await getStepAndStatus(page);
  const oldValues = await getOldValues('values.txt');
  const isEqual = compareNewValuesWithOldValues(newValues, oldValues);
  if (!isEqual) {
    console.log('Nouveau status');
    await saveValues(newValues, 'values.txt');
  }

  await browser.close();
}
