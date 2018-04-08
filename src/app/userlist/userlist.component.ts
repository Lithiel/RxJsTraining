import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";
import {map, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit, OnDestroy {

  private componentWillBeDestroyed = new Subject();

  public usernames: Observable<Array<string>>;
  public lastUser: Observable<string>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.usernames = this.userService.sortedUsers.pipe(
      takeUntil(this.componentWillBeDestroyed),
      map(userArray => userArray.map(user => user.name))
    );
    this.lastUser = this.userService.users.pipe(
      takeUntil(this.componentWillBeDestroyed),
      map(users => {
        if (users.length > 0) {
          return users[users.length - 1].name;
        }
        return 'Noch kein Nutzer erstellt'
      }),
    )
  }

  ngOnDestroy(){
    this.componentWillBeDestroyed.next();
    this.componentWillBeDestroyed.complete();
  }


  public addUser(name: string) {
    this.userService.addUser(name);
  }

}
