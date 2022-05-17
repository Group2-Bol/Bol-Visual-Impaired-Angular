import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-enhancement',
  templateUrl: './img-enhancement.component.html',
  styleUrls: ['./img-enhancement.component.css']
})

export class ImgEnhancementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.loadImages()
  }

  loadImages() {
    for (let i = 1; i <= 4; i++)
    {
      var imageTag = document.createElement('img');
      console.log(`./../../assets/sample_images/bloem${i}`);
      imageTag.src = `./../../assets/sample_images/bloem${i}.jpg`;
      imageTag.style.height = '300px';
      imageTag.style.filter = "contrast(2)";
      imageTag.style.filter = "saturate(3)";
      document.getElementById("body")?.appendChild(imageTag);
    }
  }
}
