import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";
import {combineLatest, debounce, debounceTime, map, share, takeUntil, tap, throttleTime} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {User} from "./user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {delay} from "q";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit, OnDestroy {

  private componentWillBeDestroyed = new Subject();
  private filterText = new BehaviorSubject<string>("");

  public users: Observable<Array<User>>;
  public lastUser: Observable<string>;
  public shortening = false;
  public toggleText = "";
  public searchText: Observable<string>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.searchText = this.filterText.pipe(
      debounceTime(500),
      // throttleTime(500)
    );
    this.updateToggleText(this.shortening);
    this.users = this.userService.sortedUsers.pipe(
      takeUntil(this.componentWillBeDestroyed),
      combineLatest(this.searchText),
      map(([users, filter]) => this.filterByInput(users, filter))
      // map(userArray => userArray.map(user => user.name))
    );
    this.lastUser = this.userService.users.pipe(
      takeUntil(this.componentWillBeDestroyed),
      map(users => {
        if (users.length > 0) {
          return users[users.length - 1].forename;
        }
        return 'Noch kein Nutzer erstellt'
      }),
    )
  }

  ngOnDestroy() {
    this.componentWillBeDestroyed.next();
    this.componentWillBeDestroyed.complete();
  }


  public addUser(forename: string, surname: string) {
    this.userService.addUser(forename, surname);
  }

  public toggleShortening() {
    this.shortening = !this.shortening;
    this.updateToggleText(this.shortening);
  }

  private updateToggleText(isShortened: boolean) {
    if (isShortened) {
      this.toggleText = "Vorname anzeigen";
    } else {
      this.toggleText = "Vorname abkürzen";
    }
  }

  public search(event) {
    this.filterText.next(event.target.value);
  }

  private filterByInput(users: Array<User>, filterText: string): Array<User> {
    return users.filter((user: User) => user.forename.includes(filterText) || user.surname.includes(filterText));
  }


}

export function filterByInput(filterText: string): (source: Observable<Array<User>>) => Observable<Array<User>> {
  return (source) => source.pipe(
    map(userArray => userArray.filter((user: User) => user.forename.includes(filterText) || user.surname.includes(filterText))),
  );
}
