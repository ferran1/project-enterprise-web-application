import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';
import { CMS } from 'src/app/models/CMS';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
	public CMSContent: Object;
	public readonly componentLink = "landing";

	constructor(private cmsService: CmsService) {
		this.CMSContent = {
			"LANDING_TITLE": "",
			"LANDING_INFO": "",
			"LANDING_BUTTON": "",
		};
		this.cmsService.fillPage(this.CMSContent, this.componentLink);
	}

	ngOnInit() {
		
	}
}
