import http from 'http';
import { router } from '../constants/CONSTANTS.js';

if (!router.domain.length || !router.username.length || !router.password.length) throw new Error('Не заполнена константа { router } в файле ./constants/CONSTANTS.js не заполнен');
export default (cookies, callbackError) => {
	const formData = 'pid=1002&nextpage=IPv46_status_wan2_if_t.gch';

	const options = {
		host: router.domain,
		path: '/template.gch',
		method: 'POST',
		type: 'application/json',
		headers: {
			'Content-Length': formData.length,
		},
	};
	let html = '';
	const request = http.request(options, (response) => {
		response.on('data', (data) => {
			html += data;
		});
		response.on('end', () => {
			let ip = '';
			try {
				[ip] = html.substr(45143, 15).match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
			} catch (error) {
				/* error */
			}
			callbackError(null, ip);
		});
	});
	request.on('error', () => {
		callbackError(true, '');
	});
	request.setHeader('Cookie', [`${cookies[0].name}=${cookies[0].value}`]);
	request.write(formData);
	request.end();
};
