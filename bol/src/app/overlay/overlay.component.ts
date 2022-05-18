import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare function preload(): any;
declare function setup(): any;

@Component({
	selector: 'app-overlay',
	templateUrl: './overlay.component.html',
	styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

	@ViewChild('content') content : any;

	fileGroup!: FormGroup;
	// formFileLg!: FormControl;
	// imgSrc!: FormControl;

	uploadForm = new FormGroup({
		name: new FormControl('', null),
		file: new FormControl('', Validators.required),
		fileSource: new FormControl('', Validators.required)
	});

	imgFile!: string

	constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

	ngOnInit(): void {

    this.toggleLoadingScreen();
	this.loadImages("Shirt");
	this.openPopup();

	}

	displayStyle = "none";

	openPopup() {
		this.displayStyle = "block";
	}

	closePopup() {
		this.displayStyle = "none";
	}

	toggleLoadingScreen() {
		var loadingScreenDiv = document.getElementById("loading-screen");

		if (loadingScreenDiv?.style.display == 'none') {
			loadingScreenDiv.style.display = "flex";
			this.upload();
		}
		else {
			loadingScreenDiv!.style.display = "none";
		}
	}

	onImageChange(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.uploadForm.patchValue({
				fileSource: file
			})
		}
	}

	upload() {
		const formData = new FormData;
		formData.append('file', this.uploadForm.get('fileSource')?.value);

		this.httpClient.post('http://localhost:8888/file-upload.php', formData)
			.subscribe(res => {
				console.log(res);
			})

		/* Sets a delay between uploading the image and selecting it in the ml5 model.
		* This is so that the PHP script has some time to actualy upload the image to the
		* designated folder.
		*/
		setTimeout(
			() => {
				console.log("Running...")
				preload();
				setup();
			},
			2000
		)
	}

	delete() {
		this.httpClient.get('http://localhost:8888/file-delete.php')
			.subscribe(res => {
				console.log(res);
			})
	}

  loadImages(label) {
	const jsonImages= require('./../../app/images.json'); 
    for (let i = 0; i < 4; i++)
    {
      var imageTag = document.createElement('img');
      imageTag.src = jsonImages["images"][label][i];

      imageTag.style.maxHeight = '25%';
      imageTag.style.maxWidth = '25%';
      imageTag.style.filter = "contrast(2)";
      imageTag.style.filter = "saturate(3)";
	  
      document.getElementById("images")?.appendChild(imageTag);
    }
  }
}
