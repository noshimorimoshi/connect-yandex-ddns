/*
	eslint-disable
	no-return-assign,
	no-multi-assign,
	no-unused-vars,
	no-nested-ternary,
	no-restricted-globals
*/
import editDNS from './req/editDNS.js';
import getCookies from './req/getCookies.js';
import getIP from './req/getIP.js';
import db from './db/ip.js';
import { delay } from './constants/CONSTANTS.js';

const isolatedDelay = isNaN(Number(delay)) ? 55555 : delay < 55555 ? 55555 : delay;
let dbIP = db.ip;
let cookies;
let timerId = setTimeout(function start() {
	(async () => {
		cookies = cookies || await getCookies();
		if (cookies) {
			await getIP(cookies, (err, ip) => {
				if (err) cookies = '';
				if (dbIP !== ip) {
					editDNS(db.ip = dbIP = ip);
				}
			});
			timerId = setTimeout(start, isolatedDelay);
		} else timerId = setTimeout(start, isolatedDelay * 2);
	})();
}, 0);
