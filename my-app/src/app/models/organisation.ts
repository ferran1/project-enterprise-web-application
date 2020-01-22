import {User} from "./user";

export class Organisation {
  id: number;
	name: string;
	organisationAdmin: User;
	users: User[];
	isDeleted: boolean;
	dateCreated: Date;
	dateEdited?: Date;

	constructor(name: string, orgAdmin: User) {
		this.name = name;
		this.organisationAdmin = orgAdmin;
		this.isDeleted = false;
		this.dateCreated = new Date(Date.now());
		this.dateEdited = new Date(Date.now());
	}

	equals(org: Organisation): Boolean {
		return this.name === org.name &&
		this.organisationAdmin === this.organisationAdmin &&
		this.isDeleted === org.isDeleted &&
		this.dateCreated === org.dateCreated;
	}

	public addUser(user: User): boolean{
	  user.organisations.push(this);
	  this.users.push(user);
	  return this.users.includes(user)
	}

  public removeUser(user: User): boolean {
	  this.users = this.users.filter(u => u.id != user.id);
	  return !this.users.includes(user);
  }

  static trueCopy(originalOrganisation: Organisation):Organisation{
    return Object.assign(new Organisation(null, null), originalOrganisation)
  }
}
