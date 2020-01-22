import { Component, OnInit } from '@angular/core';
import { CMS } from 'src/app/models/CMS';
import { CmsService } from 'src/app/services/cms.service';

@Component({
	selector: 'app-admin-cms',
	templateUrl: './admin-cms.component.html',
	styleUrls: ['./admin-cms.component.css']
})
export class AdminCmsComponent implements OnInit {
	public cmsData: CMS[];
	public cmsDataCopy: CMS[];
	public searchFilter: String;
	public editMode: boolean;
	constructor(private cmsService: CmsService) {
		this.searchFilter = "";
		this.editMode = false;
		this.cmsService.getAllCMSContent().subscribe(
			(data: CMS[]) => {
				this.cmsData = [] = data;
				this.cmsDataCopy = [] = JSON.parse(JSON.stringify(data));
			},
			(err) => console.log(err),
			() => {
        // console.log("Finished retrieving cms data")
      }
		)
	}

	ngOnInit() {
	}

	saveChanges(){
		let changedValues: CMS[] = [];

		// only send changed objects which are changed
		for(let key in this.cmsData) {
			if (!this.cmsData.hasOwnProperty(key)) continue;

			if(!CMS.fullEquals(this.cmsData[key], this.cmsDataCopy[key])){
				changedValues.push(this.cmsData[key])
			}
		}

		if(changedValues.length == 0) return;
		this.cmsService.saveAllCMSContent(changedValues).subscribe(
			(response) => {
				this.editMode = !this.editMode;
			},
			(err) => console.log(err),
			() => {
			  // console.log("Saved cms data")
      }
		)
	}

	cancelChanges() {
		this.cmsData = [] = JSON.parse(JSON.stringify(this.cmsDataCopy));
		this.editMode = !this.editMode;
	}
}
