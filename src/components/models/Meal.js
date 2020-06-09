export default class Meal {
  static _id=0;
  constructor(
    name = undefined,
    description = undefined,
    ingredients = undefined,
    level = undefined
  ) {
    Meal._id++;
    this._id = Meal._id;
    this._name = name;
    this._description = description;
    this._ingredients = ingredients;
    this._level = level;
  }
  static createNewMeal(obj = undefined) {
    return new Meal(
      obj.name,
      obj.description,
      obj.ingredients,
      obj.level
    );
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
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
