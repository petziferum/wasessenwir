export default class Meal {
  constructor() {}

  static createNewMeal(obj = undefined) {
    let NewMeal = new Meal();
    NewMeal._recipeDescription = obj.recipeDescription;
    NewMeal._imageName = obj.imageName;
    NewMeal._imageSrc = obj.imageSrc;
    NewMeal._recipeName = obj.recipeName;
    NewMeal._ingredients = obj.ingredients;
    NewMeal._time = obj.time;
    NewMeal.id = obj.id;

    return NewMeal;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get nameId() {
    return this._nameId;
  }

  set nameId(value) {
    this._nameId = value;
  }

  get imageSrc() {
    return this._imageSrc;
  }

  set imageSrc(value) {
    this._imageSrc = value;
  }

  get imageName() {
    return this._imageName;
  }

  set imageName(value) {
    this._imageName = value;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  get recipeName() {
    return this._recipeName;
  }

  set recipeName(value) {
    this._recipeName = value;
  }

  get recipeDescription() {
    return this._recipeDescription;
  }

  set recipeDescription(value) {
    this._recipeDescription = value;
  }

  get ingredients() {
    return this._ingredients;
  }
  set ingredients(value) {
    this._ingredients = value;
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = value;
  }
}
