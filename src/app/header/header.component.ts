import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  collapsed = true;
  subscr: Subscription;

  constructor(private dataService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscr = this.authService.user.subscribe(user => {
      console.log( 'this is user',user);
      this.isAuthenticated = user != null;
    })
  }

  onSaveData(){
    this.dataService.storeRecipes();
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
