import { Injectable } from '@angular/core';
import {User} from '../../../entity/User';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  protected storage_key = '_user';
  constructor() { }
  Get(): User {
    const user = sessionStorage.getItem(this.storage_key);
    if (user) {
      return JSON.parse(user) as User;
    }
    return null;
  }
  Set(user: User) {
    if (user) {
      sessionStorage.setItem(this.storage_key, JSON.stringify(user));
    }
  }
}
