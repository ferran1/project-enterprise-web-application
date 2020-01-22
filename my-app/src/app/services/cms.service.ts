import { Injectable } from '@angular/core';
import { CMS } from '../models/CMS';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CmsService {
	private readonly REST_DATASETS_URL = "http://localhost:8080/cms";

	constructor(private http: HttpClient) { }

	getCMSContent(page: String): Observable<Object> {
		return this.http.get(this.REST_DATASETS_URL + "/" + page);
	}

	getAllCMSContent(): Observable<Object> {
		return this.http.get(this.REST_DATASETS_URL);
	}

	saveAllCMSContent(cmsData: CMS[]): Observable<Object> {
		return this.http.post(this.REST_DATASETS_URL, cmsData);
	}

	/**
	 * Fills the CMSContent array which is used to fill the content in the website
	 */
	public fillPage(CMSContent: Object, componentLink: String) {
		this.getCMSContent(componentLink).subscribe(
			(data: CMS[]) => {
				for(let key in CMSContent){
					if (!CMSContent.hasOwnProperty(key)) continue;

					let temp;
					if ((temp = data.find((cms: CMS) => cms.location === key)) != null) {
						CMSContent[key] = temp.content;
					}
				}
				return CMSContent;
			},
			(err) => console.log(err),
			() => {
        // console.log("Finished retrieving component data")
      }
		)
	}
}
