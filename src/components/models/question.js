export default class Question {
  /**
   *
   * @param {String} id
   * @param {String} name
   * @param {String} description
   * @param {Array} parents
   * @param {String} justify
   * @param {Boolean} isScalable
   */
  constructor(
    id = undefined,
    name = undefined,
    description = undefined,
    parents = undefined,
    justify = undefined,
    isScalable = undefined
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._parents = parents;
    this._justify = justify;
    this._isScalable = isScalable;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
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

  get parents() {
    return this._parents;
  }

  set parents(value) {
    this._parents = value;
  }

  get justify() {
    return this._justify;
  }

  set justify(value) {
    this._justify = value;
  }

  get isScalable() {
    return this._isScalable;
  }

  set isScalable(value) {
    this._isScalable = value;
  }

  /**
   *
   * @param {res}obj
   * @returns {Question}
   */
  static createQuestion(obj = undefined) {
    if (obj) {
      return new Question(
        obj.id,
        obj.name,
        obj.description,
        obj.parents,
        "start",
        false
      );
    } else {
      return new Question(
        undefined,
        "leer",
        "Es wurde kein Object übergeben",
        [null],
        null,
        null
      );
    }
  }

  /**
   *
   * @returns {Question}
   */
  static createFirstQuestion() {
    return new Question(
      undefined,
      "Willkommen im Antwortenfinder! Klicke auf Start zum beginnen.",
      null,
      [""],
      "start",
      false
    );
  }
}
