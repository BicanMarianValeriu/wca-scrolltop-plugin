/**
 * @package: 	WeCodeArt Scrolltop Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */

import './../scss/index.scss';

export default (function (wecodeart) {
	wecodeart.routes = {
		...wecodeart.routes,
		themeWecodeart: {
			complete: () => {
				console.log('WCA: ScrollTop frontend!')
			}
		}
	};
}).apply(this, [window.wecodeart]);