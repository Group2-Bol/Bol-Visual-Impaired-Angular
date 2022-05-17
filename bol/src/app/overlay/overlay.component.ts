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
      setTimeout(this.loadImages, 1000)
    }
    else {
      loadingScreenDiv!.style.display = "none";
    }
  }

  loadImages() {
    for (let i = 1; i <= 4; i++)
    {
      var imageTag = document.createElement('img');
      console.log(`./../../assets/sample_images/bloem${i}`);
      imageTag.src = `./../../assets/sample_images/bloem${i}.jpg`;
      imageTag.style.maxHeight = '25%';
      imageTag.style.maxWidth = '25%';
      imageTag.style.filter = "contrast(2)";
      imageTag.style.filter = "saturate(3)";
      document.getElementById("images")?.appendChild(imageTag);
    }
  }

}
