import puppeteer from 'puppeteer';
import { router } from '../constants/CONSTANTS.js';

if (!router.domain.length || !router.username.length || !router.password.length) throw new Error('Не заполнена константа { router } в файле ./constants/CONSTANTS.js не заполнен');
export default async () => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(router.domain.includes('http://') ? router.domain : `http://${router.domain}`);
		await page.type('#Frm_Username', router.username);
		await page.type('#Frm_Password', router.password);
		await page.click('#LoginId');
		await page.waitForNavigation();
		const cookies = await page.cookies();
		await browser.close();
		return cookies;
	} catch (error) {
		return false;
	}
};
