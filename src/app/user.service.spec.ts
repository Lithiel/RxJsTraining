import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  beforeEach(inject([UserService], (_userService : UserService) => {
    userService = _userService;
  }));

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should add user', (done) => {
    // Arrange
    const name = "Username";
    const expectedUser = {id: 1, name: "Username"};

    // Act
    userService.addUser(name).subscribe(
      // Assert
      actualUser => {
        expect(expectedUser).toEqual(actualUser);
        done();
      }
    );
  });



});
