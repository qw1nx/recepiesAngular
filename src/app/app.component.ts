import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPick = 'recipe';
  onNavigate(pick: string){
    this.loadedPick = pick;
  }
}
