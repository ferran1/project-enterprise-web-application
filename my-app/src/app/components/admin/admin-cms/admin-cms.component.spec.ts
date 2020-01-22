import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCmsComponent } from './admin-cms.component';
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SearchCMSArrayPipe } from "../../../pipes/search-cms-array.pipe";

/**
 * @Author Jesse van Bree
 */
describe('AdminCmsComponent', () => {
	let component: AdminCmsComponent;
	let fixture: ComponentFixture<AdminCmsComponent>;
	let componentHTML: HTMLElement;
	let pipeSpy: jasmine.Spy;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AdminCmsComponent, SearchCMSArrayPipe],
			imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminCmsComponent);
		component = fixture.componentInstance;
		componentHTML = fixture.debugElement.nativeElement;
		fixture.detectChanges();

		let pipeSpy = spyOn(SearchCMSArrayPipe.prototype, 'transform');
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should toggle edit mode', () => {
		let slider: HTMLInputElement = componentHTML.querySelector('#editSlider');
		slider.click();
		fixture.detectChanges();
		expect(component.editMode).toBeTruthy();

		slider.click();
		fixture.detectChanges();
		expect(component.editMode).toBeFalsy();
	});

	it('should display textareas in edit mode', () => {
		let slider: HTMLInputElement = componentHTML.querySelector('#editSlider');
		slider.click();
		fixture.detectChanges();
		expect(component.editMode).toBeTruthy();

		componentHTML.querySelectorAll('textarea').forEach(
			(area: HTMLTextAreaElement) => {
				expect(area).toBeTruthy();
			}
		)
	});

	it('should load the title correctly', () => {
		let title = componentHTML.querySelector("p.card-title");
		expect(title).toBeTruthy();
		expect(title).not.toBeUndefined();
		expect(title.textContent).toMatch("CMS");
		expect(title).toHaveClass("my-auto");
	});

	it('should load the search input correctly', () => {
		let input: HTMLInputElement = componentHTML.querySelector("#cmsSearchFilter");
		expect(input).toBeTruthy();
		expect(input).not.toBeUndefined();
		expect(input.value).toMatch("");
		expect(input).toHaveClass("form-control");
	});
});
