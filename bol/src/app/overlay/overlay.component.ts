import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare function classifyImage(): any;

@Component({
	selector: 'app-overlay',
	templateUrl: './overlay.component.html',
	styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

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
		// this.formFileLg = new FormControl(null, Validators.required)
		// this.imgSrc = new FormControl('', null)

		this.toggleLoadingScreen();

		// this.fileGroup = this.formBuilder.group({
		//   'formFileLg': this.formFileLg,
		//   'imgSrc': this.imgSrc
		// })
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
	}

	delete() {
		this.httpClient.get('http://localhost:8888/file-delete.php')
			.subscribe(res => {
				console.log(res);
			})
	}
}
