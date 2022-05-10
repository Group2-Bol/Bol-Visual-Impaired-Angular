import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

declare function classifyImage(): any;

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  fileGroup!: FormGroup;
  formFileLg!: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formFileLg = new FormControl(null, Validators.required)
    this.toggleLoadingScreen();

    this.fileGroup = this.formBuilder.group({
      'formFileLg': this.formFileLg
    })
  }

  toggleLoadingScreen() {
    var loadingScreenDiv = document.getElementById("loading-screen");
    if(loadingScreenDiv?.style.display == 'none') {
      loadingScreenDiv.style.display = "flex";
      classifyImage();
    }
    else {
      loadingScreenDiv!.style.display = "none";
    }
  }

}
