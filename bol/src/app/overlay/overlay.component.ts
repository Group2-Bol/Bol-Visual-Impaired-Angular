import { Component, OnInit } from '@angular/core';

declare function enableLoadingScreen() : any;

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLoad(){
    enableLoadingScreen();
  }

}
