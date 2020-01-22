import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { OrganisationService } from "src/app/services/organisation.service";
import { SessionService } from 'src/app/services/session/session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-panel',
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

	constructor(private aOrganisationService: OrganisationService, private sessionService: SessionService, private router: Router) {

	}

	ngOnInit() {

	}

}
