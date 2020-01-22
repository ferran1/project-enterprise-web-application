import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from "../../services/session/session.service";
import { FbSessionService } from "../../services/session/fb-session.service";
import { SpringSessionService } from "../../services/session/spring-session.service";
import { UserService } from "../../services/user.service";
import { CmsService } from 'src/app/services/cms.service';
import {OrganisationService} from "../../services/organisation.service";


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public CMSContent: Object;
	public readonly componentLink = "navbar";

	/*constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private sessionService: SessionService) {
	}*/

	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private sessionService: SpringSessionService,
		private userService: UserService,
		private organisationService: OrganisationService,
		private cmsService: CmsService) {
		this.CMSContent = {
			"NAV_HOME": "",
			"NAV_MY_UPLOADS": "",
			"NAV_PROFILE": "",
			"NAV_ORG_PANEL": "",
			"NAV_ADMIN": "",
			"NAV_LOG_IN": "",
			"NAV_LOG_OUT": "",
		};
		this.cmsService.fillPage(this.CMSContent, this.componentLink);
	}

	ngOnInit() {
	}

}
