import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SearchCMSArrayPipe } from "../../../pipes/search-cms-array.pipe";
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { AdminOrganisationsComponent } from '../admin-organisations/admin-organisations.component';
import { AdminDatasetsComponent } from '../admin-datasets/admin-datasets.component';
import { AdminCmsComponent } from '../admin-cms/admin-cms.component';
import { CreateUserPopupComponent } from '../../create-user-popup/create-user-popup.component';
import { EditUserPopupComponent } from '../../edit-user-popup/edit-user-popup.component';
import { SearchUserArrayPipe } from 'src/app/pipes/search-user-array.pipe';
import { SearchArrayNamePipe } from 'src/app/pipes/search-array.pipe';
import { CreateOrganisationPopupComponent } from '../../create-organisation-popup/create-organisation-popup.component';
import { EditMetadataPopupComponent } from '../../edit-metadata-popup/edit-metadata-popup.component';
import { EditOrganisationPopupComponent } from '../../edit-organisation-popup/edit-organisation-popup.component';
import { ViewDatasetPopupComponent } from '../../view-dataset-popup/view-dataset-popup.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';

/**
 * @Author Jesse van Bree
 */
describe('AdminPanelComponent', () => {
	let component: AdminPanelComponent;
	let fixture: ComponentFixture<AdminPanelComponent>;
	let componentHTML: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AdminPanelComponent, AdminUsersComponent, AdminOrganisationsComponent,
				AdminDatasetsComponent, AdminCmsComponent, CreateUserPopupComponent,
				EditUserPopupComponent, SearchCMSArrayPipe, SearchUserArrayPipe, SearchArrayNamePipe,
			CreateOrganisationPopupComponent, EditMetadataPopupComponent, EditOrganisationPopupComponent,
		ViewDatasetPopupComponent],
			imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, NgSelectModule, ChartsModule, PdfViewerModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminPanelComponent);
		component = fixture.componentInstance;
		componentHTML = fixture.debugElement.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load child components', (() => {
		expect(componentHTML.querySelector('app-admin-users')).not.toBe(null);
		expect(componentHTML.querySelector('app-admin-organisations')).not.toBe(null);
		expect(componentHTML.querySelector('app-admin-datasets')).not.toBe(null);
		expect(componentHTML.querySelector('app-admin-cms')).not.toBe(null);
	}));

	it('should add bootstrap classes to child components', () => {
		expect(componentHTML.querySelector('app-admin-users').getAttribute('class')).toContain("col-md-3 mr-2");
		expect(componentHTML.querySelector('app-admin-organisations').getAttribute('class')).toContain("col-md-4 mr-2");
		expect(componentHTML.querySelector('app-admin-datasets').getAttribute('class')).toContain("col-md-4 mr-2");
		expect(componentHTML.querySelector('app-admin-cms').getAttribute('class')).toContain("col-md-12");
	});
});
