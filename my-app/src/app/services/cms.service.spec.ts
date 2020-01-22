import { TestBed, async } from '@angular/core/testing';

import { CmsService } from './cms.service';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CMS } from '../models/CMS';

/**
 * @Author Jesse van Bree
 */
describe('CmsService', () => {
	let service: CmsService;

	beforeEach(() => TestBed.configureTestingModule({
		declarations: [],
		imports: [RouterTestingModule, HttpClientTestingModule],
		providers: [CmsService],
	}));

	beforeEach(() => {
		service = TestBed.get(CmsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should fill a page object with data', () => {
		let serviceSpy: jasmine.Spy = spyOn(CmsService.prototype, "fillPage");
		let CMSContent = {
			"LANDING_TITLE": "",
			"LANDING_INFO": "",
			"LANDING_BUTTON": "",
		};
		service.fillPage(CMSContent, "landing");

		expect(serviceSpy).toHaveBeenCalled();
		setTimeout(() => {
			expect(CMSContent["LANDING_BUTTON"].length).toBeGreaterThan(0);
		}, 5000)
	});

	it('should get cms content of page', () => {
		let componentLink = "landing";
		expect(service.getCMSContent).toBeTruthy();
		service.getCMSContent(componentLink).subscribe(
			(data) => expect(data["LANDING_TITLE"].length).toBeGreaterThan(0),
			(err) => console.log(err)
		)
	});

	it('should get all cms content ', () => {
		expect(service.getAllCMSContent).toBeTruthy();

		service.getAllCMSContent().subscribe(
			(data: CMS[]) => {
				expect(data).not.toBeUndefined();
				expect(data.length).toBeGreaterThan(0);
			},
			(err) => console.log(err)
		)
	});

	it('should be able to save cms content ', () => {
		expect(service.saveAllCMSContent).toBeTruthy();
		let testCMS = new CMS("test", "test", "test", "test", 9900)

		service.saveAllCMSContent([testCMS]).subscribe(
			() => {
				service.getCMSContent("test").subscribe(
					(data) => expect(data).toContain(testCMS),
					(err) => console.log(err)
				)
			},
			(err) => console.log(err)
		)
	})
});
