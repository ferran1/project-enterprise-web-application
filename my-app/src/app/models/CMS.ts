export class CMS {
	id: number;
	location: String;
	content: String;
	page: String;
	component: String;
	adminInfo: String;

	constructor(location: String, content: String, page: String, component: String, id?: number, adminInfo?: String){
		this.location = location;
		this.content = content;
		this.component = component;
		this.page = page;
		
		this.id = id ? id : null;
		this.adminInfo = adminInfo ? adminInfo: null;
	}

	static fullEquals(cms: CMS, cmsToCompare: CMS): Boolean{
		return cmsToCompare.id === cms.id && 
		cmsToCompare.location === cms.location && 
		cmsToCompare.content === cms.content && 
		cmsToCompare.page === cms.page && 
		cmsToCompare.component === cms.component && 
		cmsToCompare.adminInfo === cms.adminInfo;
	}
}