import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  prevScrollpos = window.pageYOffset;
  pageTopPos = window.pageYOffset;
  
  scroll=window.onscroll=()=> {
    let currentScrollPos = window.pageYOffset;
    console.log(this.pageTopPos);
    if (this.pageTopPos = currentScrollPos) {
      document.getElementById("navbar-container").style.backgroundColor="rgba(0,0,0,0.4)";
      document.getElementById("navbrand").style.display="block";
    
     //document.getElementById("navbar-container").style.top = "0";
    } 
    else {
      document.getElementById("navbar-container").style.backgroundColor="transparent";
      document.getElementById("navbrand").style.display="none";
      if(currentScrollPos>0 && this.prevScrollpos>0){
        document.getElementById("navbar-container").style.backgroundColor="transparent";
        document.getElementById("navbrand").style.display="none";
        //document.getElementById("navbar-container").style.top = "-70px";
    }
  }
  this.prevScrollpos = currentScrollPos;
}
}
