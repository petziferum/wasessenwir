export default class User {
  id;
  firstName;
  lastName;
  userName;
  email;
  recipes;
  lastLogin;

  constructor() {
    this.id = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.userName = undefined;
    this.email = undefined;
    this.lastName = undefined;
  }

  withId(value) {
    this.id = value;
    return this;
  }

  withFirstName(value) {
    this.firstName = value;
    return this;
  }

  withLastName(value) {
    this.lastName = value;
    return this;
  }

  withUserName(value) {
    this.userName = value;
    return this;
  }

  withEmail(value) {
    this.email = value;
    return this;
  }

  withLastLogin(value) {
    this.lastLogin = value;
    return this;
  }

  withRecipes(value) {
    this.recipes = value;
    return this;
  }

  static createEmptyUser() {
    return new User();
  }
}
