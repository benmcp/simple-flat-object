class FlatObject {
	static flatten(data) {
		const result = {};
		const recurse = (cur, prop) => {
			let i;
			let l;

			if (Object(cur) !== cur) {
				result[prop] = cur;
			} else if (Array.isArray(cur)) {
				for (i = 0, l = cur.length; i < l; i += 1) {
					recurse(cur[i], `${prop}[${i}]`);
				}
				if (l === 0) {
					result[prop] = [];
				}
			} else {
				let isEmpty = true;
				for (const p in cur) {
					isEmpty = false;
					recurse(cur[p], prop ? `${prop}.${p}` : p);
				}
				if (isEmpty && prop) {
					result[prop] = {};
				}
			}
		};

		recurse(data, '');
		return result;
	}

	static unflatten(data) {
		if (Object(data) !== data || Array.isArray(data)) {
			return data;
		}

		let p;
		const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
		const resultholder = {};

		for (p in data) {
			let cur = resultholder;
			let prop = '';
			let m;
			while (m = regex.exec(p)) {
				cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
				prop = m[2] || m[1];
			}
			cur[prop] = data[p];
		}
		return resultholder[''] || resultholder;
	}
}

export default FlatObject;
