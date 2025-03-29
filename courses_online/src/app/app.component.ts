import { Component } from '@angular/core';

//declare function HOMEINIT([]):any;
//declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'courses_online';
  ngOnInit(): void{

    //setTimeout(() => {
      //HOMEINIT($);
    //}, 50);
  }
}
