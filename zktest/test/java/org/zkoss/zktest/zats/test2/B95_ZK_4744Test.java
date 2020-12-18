/* B95_ZK_4744Test.java

	Purpose:
		
	Description:
		
	History:
		Mon Dec 14 14:50:21 CST 2020, Created by jameschu

Copyright (C) 2020 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zktest.zats.test2;

import org.junit.Assert;
import org.junit.Test;

import org.zkoss.zktest.zats.WebDriverTestCase;

/**
 * @author jameschu
 */
public class B95_ZK_4744Test extends WebDriverTestCase {
	@Test
	public void test() throws Exception {
		connect();
		waitResponse();
		click(jq("$scrollBtn"));
		waitResponse();
		click(jq("$openWindowBtn"));
		waitResponse();
		Assert.assertNotEquals(0, jq(".child-view").scrollLeft());
	}
}
