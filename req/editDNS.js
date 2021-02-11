import https from 'https';
import qs from 'querystring';
import { yandex } from '../constants/CONSTANTS.js';

if (!yandex.domain.length || !yandex.record_id || !yandex.PddToken.length) throw new Error('Не заполнена константа { yandex } в файле ./constants/CONSTANTS.js не заполнен');
export default (ip) => {
	let txt = {
		domain: yandex.domain,
		record_id: yandex.record_id,
		content: ip,
	};
	txt = qs.stringify(txt);
	const options = {
		method: 'POST',
		host: 'pddimp.yandex.ru',
		path: '/api2/admin/dns/edit',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			PddToken: yandex.PddToken,
		},
	};
	const req = https.request(options);
	req.write(txt);
	req.end();
	req.on('error', () => {
		/* error */
	});
};
