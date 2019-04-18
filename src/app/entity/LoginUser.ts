import {User} from './User';
import {School} from './School';
import {Teacher} from './Teacher';
import {Employee} from './Employee';

export class LoginUser {
  user: User;
  isSupperAdmin = false;
  isSchoolAdmin = false;
  isTeacher = false;
  isEmployee = false;
  school: School;
  teacher: Teacher;
  employee: Employee;


  constructor() {
  }
}
