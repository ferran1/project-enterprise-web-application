import {Organisation} from './organisation';

export class User {
  public id: number;
  public email: string;
  public isAdmin: boolean;
  public dateCreated: Date;
  public organisations?: Organisation[] = [];
  public adminOfOrganisations?: Organisation[] ;
  public firstName?: string;
  public surName?: string;
  public passWord?: string;


  constructor(email: string, isAdmin: boolean, firstName?: string,
              surName?: string, password?: string, organisations?: Organisation[],
              adminOfOrganisations?: Organisation[]) {
    this.email = email;
    this.passWord = password;
    this.isAdmin = isAdmin;
    this.firstName = firstName;
    this.surName = surName;
    this.dateCreated = new Date(Date.now());
    this.organisations = organisations;
    this.adminOfOrganisations = adminOfOrganisations;
  }

  equals(user: User): boolean {
    return this.id === user.id &&
      this.email === user.email &&
      this.isAdmin === user.isAdmin &&
      this.dateCreated === user.dateCreated;
  }

  tostring(): string {
    let tostring = "User email: " + this.email + ", User ID: " + this.id + ", Created at: "
      + this.dateCreated;
    return tostring;
  }

  static trueCopy(user: User): User {
    return Object.assign(new User(user.email, user.isAdmin, user.firstName, user.surName, user.passWord, user.organisations,
      user.adminOfOrganisations), user)
  }


}
