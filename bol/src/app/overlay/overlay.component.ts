import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DynamicScriptLoaderService } from '../services/dynamic-script-loader.service';


declare function preload(): any;
declare function setup(): any;
declare function saveLabel(): any;

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

	@ViewChild('content') content: any;

  fileGroup!: FormGroup;
  result: String;

  uploadForm = new FormGroup({
    name: new FormControl('', null),
    file: new FormControl('', Validators.required),
    fileSource: new FormControl('', Validators.required)
  });

	imgFile!: string;
	naam!: string;
	ingesprokenProduct!: string;
	SpeechRecognition = window['webkitSpeechRecognition'];
	recognition = new this.SpeechRecognition();

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit(): void {

    this.toggleLoadingScreen();
    this.openPopup();

    this.loadScript();

  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
    var rndCanvas = document.getElementsByClassName("p5Canvas");
    for (const tag of Array.from(rndCanvas)) {
			tag.parentNode.removeChild(tag);
		}
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
    this.deleteImages();

    const formData = new FormData;
    formData.append('file', this.uploadForm.get('fileSource')?.value);

    this.httpClient.post('http://localhost:8888/file-upload.php', formData)
      .subscribe(res => {
        //this.loadScript();
      })

    /* Sets a delay between uploading the image and selecting it in the ml5 model.
    * This is so that the PHP script has some time to actualy upload the image to the
    * designated folder.
    */
    setTimeout(
      () => {
        preload();
        setup();
      },
      2000
    )

    setTimeout(
      () => {
        this.toggleLoadingScreen();
        this.result = localStorage.getItem("label");
        this.loadImages(this.result);
        this.delete();
      },
      3000
    )
  }

  delete() {
    localStorage.clear();
    this.result = "";
    this.httpClient.get('http://localhost:8888/file-delete.php')
      .subscribe(res => {
        console.log(res);
      })
  }

  private loadScript() {
    this.dynamicScriptLoader.load('custom').then(data => {
      console.log("Scripts is running!");
    })
      .catch(error => {
        console.log(error);
      })
  }


	public textToSpeech(text) {
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

	speechToText(listening: boolean) {
		this.textToSpeech('');
		this.recognition.continuous = true;
		if (listening == true) {
			this.recognition.start();
			let element: HTMLElement = document.getElementById('microphoneIcon');

			element.style.filter = 'invert(44%) sepia(32%) saturate(6567%) hue-rotate(340deg) brightness(99%) contrast(109%)'
			return;
		}

		if (listening == false) {
			this.recognition.stop();
			let element: HTMLElement = document.getElementById('microphoneIcon');

			element.style.filter = 'invert(77%) sepia(97%) saturate(2085%) hue-rotate(57deg) brightness(98%) contrast(90%)'
			var content;
			this.recognition.onresult =  (event) => {
				var current = event.resultIndex;

				var transcript = event.results[current][0].transcript;
				content = "";
				content += transcript;
				console.log(content);
				this.ingesprokenProduct = content;

				var synth = window.speechSynthesis;
				var utterThis = new SpeechSynthesisUtterance("Uw zoekopdracht is: " + content);
				utterThis.lang = 'nl';
				synth.speak(utterThis);
			}
		}
	}

	loadImages(label) {
		this.deleteImages();
		const jsonImages = require('./../../app/images.json');
		console.log(label);
    this.textToSpeech("Er zijn vier resultaten gevonden voor " + label);
		for (let i = 0; i < 4; i++) {
			var imageDesc = document.createElement('div');
			//imageDesc.setAttribute('id', 'desc');
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
			//priceDiv.setAttribute('id', 'price');
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
			//imageTag.setAttribute('id', 'enhancedImage');
			imageTag.setAttribute('class', 'enhancedImage');
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

	deleteImages() {
		var elements = document.getElementsByClassName('desc');
		for (const tag of Array.from(elements)) {
			tag.parentNode.removeChild(tag);
		}
		var elements = document.getElementsByClassName('price');
		for (const tag of Array.from(elements)) {
			tag.parentNode.removeChild(tag);
		}

		var elements = document.getElementsByClassName('enhancedImage');
		for (const tag of Array.from(elements)) {
			tag.parentNode.removeChild(tag);
		}
	}
}
