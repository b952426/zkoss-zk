/* domsafari.ts

	Purpose:
		Enhance/fix jQuery for Safari
	Description:
		
	History:
		Fri Jun 12 12:03:53     2009, Created by tomyeh

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 2.1 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
(function () {
	
zk.copy(zjq, {
	_fixCSS: function (el) {
		//we have to preserve scrollTop
		//Test case: test2/B50-ZK-373.zul and test2/B50-3315594.zul
		var old = el.style.display,
			top = el.scrollTop,
			lft = el.scrollLeft;
		el.style.display = 'none'; //force redraw
		// eslint-disable-next-line no-unused-vars
		var dummy = el.offsetWidth; //force recalc
		el.style.display = old;
		el.scrollTop = top;
		el.scrollLeft = lft;
	}
});
var _bkZjq = {};
zk.copy(zjq.prototype, {
	beforeHideOnUnbind: function () { //Bug 3076384 (though i cannot reproduce in chrome/safari)
		return this.jq.each(function () {
			for (var ns = this.getElementsByTagName('iframe'), j = ns.length; j--;)
				ns[j].src = zjq.src0;
		});
	},
}, _bkZjq);

zjq._sfKeys = {
	25: 9,     // SHIFT-TAB
	63232: 38, // up
	63233: 40, // down
	63234: 37, // left
	63235: 39, // right
	63272: 46, // delete
	63273: 36, // home
	63275: 35, // end
	63276: 33, // pgup
	63277: 34  // pgdn
};
zk.override(jq.event, zjq._evt = {}, {
	fix: function (evt) {
		evt = zjq._evt.fix.apply(this, arguments);
		var v = zjq._sfKeys[evt.keyCode];
		if (v) evt.keyCode = v;
		return evt;
	}
});
})();
