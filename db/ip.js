import fs from 'fs';

export default {
	get ip() {
		const ip = (err, data) => {
			if (err) throw err;
			return data;
		};
		return fs.readFileSync('db/ip.txt', 'utf8', ip);
	},
	set ip(data) {
		const log = data || `error ${Math.floor(Math.random() * 1000)}`;
		fs.writeFileSync('db/ip.txt', data, {}, (err) => { if (err) throw err; });
		fs.appendFile('db/log.txt', `${Date.now()} ${log}\n`, (err) => {
			if (err) throw err;
		});
	},
};
