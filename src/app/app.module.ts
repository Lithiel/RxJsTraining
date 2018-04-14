import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {UserlistComponent} from './userlist/userlist.component';
import {UserService} from "./user.service";
import { FullNamePipe } from './userlist/full-name.pipe';
import { UppercasePipe } from './userlist/uppercase.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    FullNamePipe,
    UppercasePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
