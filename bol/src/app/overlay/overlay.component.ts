import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.toggleLoadingScreen();
  }

  toggleLoadingScreen() {
    var loadingScreenDiv = document.getElementById("loading-screen");
    if(loadingScreenDiv?.style.display == 'none') {
      loadingScreenDiv.style.display = "flex";
    }
    else {
      loadingScreenDiv!.style.display = "none";
    }
  }

}
