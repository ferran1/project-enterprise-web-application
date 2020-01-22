import { CMS } from './CMS';

/**
 * @Author Jesse van Bree
 */
describe('CMS', () => {
	let cms: CMS = null;
	let cmsCopy: CMS = null;
	let cms2: CMS = null;
	let cmsNoOptional: CMS = null;

	beforeEach(() => {
		cms = new CMS("TEST_TITLE", "test information", "test", "test", 10000, "this is a test");
		cmsCopy = new CMS("TEST_TITLE", "test information", "test", "test", 10000, "this is a test");
		cms2 = new CMS("TEST_SUBTITLE", "test information", "test", "test", 10001, "1");
		cmsNoOptional = new CMS("TEST_SUBTITLE", "test information", "test", "test");
	})

	afterEach(() => {
		cms = null;
		cmsCopy = null;
		cms2 = null;
		cmsNoOptional = null;
	})

	it('should create an instance', () => {
		expect(new CMS(cms.location, cms.content, cms.page, cms.component, cms.id, cms.adminInfo)).toBeTruthy();
		expect(cmsNoOptional.id).toBeNull()
		expect(cmsNoOptional.adminInfo).toBeNull()
		expect(cms2.adminInfo.length).toEqual(1);
		expect(cms.adminInfo.length).toBe(14);
	});

	it('should compare', () => {
		let trueCompare = CMS.fullEquals(cms, cmsCopy);
		let falseCompare = CMS.fullEquals(cms, cms2);
		expect(trueCompare).toBeTruthy();
		expect(falseCompare).toBeFalsy();
	})
});
