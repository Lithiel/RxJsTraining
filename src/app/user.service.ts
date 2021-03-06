import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {sortByUsername, User} from "./userlist/user";
import {of as observableOf} from "rxjs/observable/of";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {

  private _users = new BehaviorSubject<Array<User>>([]);
  private idCounter = 0;

  constructor() {
  }

  get nextId(): number {
    this.idCounter++;
    return this.idCounter;
  }


  get users(): Observable<Array<User>> {
    return this._users;

  }

  get sortedUsers(): Observable<Array<User>> {
    return this._users.pipe(
      map(users => {
        let sortUsers = [...users];
        return sortUsers.sort(sortByUsername);
      })
    )
  }

  public getUser(id: number): Observable<Array<User>> {
    return this._users.pipe(
      map(users => users.filter(user => user.id === id))
    )
  }

  public addUser(forename: string, surname: string): Observable<User> {
    const user: User = {id: this.nextId, forename: forename, surname: surname};
    const usersWithAddedUser = this._users.getValue();
    usersWithAddedUser.push(user);

    this._users.next(usersWithAddedUser);
    return observableOf(user);
  }

}
