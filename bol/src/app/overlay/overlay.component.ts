import { Component, OnInit, ViewChild } from '@angular/core';
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

	@ViewChild('content') content: any;

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

	textToSpeech(text) {
		var synth = window.speechSynthesis;
		var utterThis = new SpeechSynthesisUtterance(text);
		if (text == '') {
			synth.cancel();
			return;
		}
		utterThis.lang = 'nl';
		utterThis.rate = 1.7;
		synth.speak(utterThis);

	}

	speechToText() {
		const SpeechRecognition = window['webkitSpeechRecognition'];
		var recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.start();

	}

	loadImages(label) {
		const jsonImages = require('./../../app/images.json');
		for (let i = 0; i < 4; i++) {
			var imageDesc = document.createElement('div');
			imageDesc.setAttribute('class', 'desc');
			imageDesc.style.padding = '15px';
			imageDesc.style.textAlign = 'left';
			imageDesc.style.float = 'center';
			imageDesc.style.fontSize = '150%';
			imageDesc.style.marginBottom = '50px';
			imageDesc.style.bottom = '0';
			imageDesc.style.position = 'absolute';

			imageDesc.innerHTML += `<b>${jsonImages["images"][label][i]["nameProduct"]}</b>`;

			var priceDiv = document.createElement('div');
			priceDiv.setAttribute('class', 'price');
			priceDiv.style.padding = '15px';
			priceDiv.style.textAlign = 'left';
			priceDiv.style.float = 'center';
			priceDiv.style.fontSize = '250%';
			priceDiv.style.color = 'red';
			priceDiv.style.bottom = '0';
			priceDiv.style.position = 'absolute';

			priceDiv.innerHTML += `<b>${jsonImages["images"][label][i]["Prijs"]}</b>`

			var imageTag = document.createElement('img');
			imageTag.src = jsonImages["images"][label][i]["source"];
			imageTag.style.width = "100%";
			imageTag.style.height = 'auto';
			imageTag.style.filter = "contrast(2)";
			imageTag.style.filter = "saturate(3)";

			document.getElementById("imageDiv" + i)?.appendChild(imageTag);
			document.getElementById("imageContainer" + i).appendChild(imageDesc);
			document.getElementById("imageContainer" + i).appendChild(priceDiv);
			document.getElementById("imageContainer" + i).addEventListener('click', function () {
				var link = jsonImages["images"][label][i]["Link"];
				window.open(link);
			});
		}
	}
}
