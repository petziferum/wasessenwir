import firebase, { fireAuth } from "@/plugins/firebase";
import User from "./User";

export default class UserAuthentication {
  static userSignup(user, password) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, password)
      .then(res => {
        return res.user;
      })
      .then(resUser => {
        const usercpy = User.createEmptyUser()
          .withId(resUser.uid)
          .withLastLogin(Date.now())
          .withUserName(user.userName)
          .withEmail(user.email)
          .withRecipes([])
          .withFirstName("")
          .withLastName("");
        const newuser = Object.assign({}, usercpy);
        console.log("resUser", resUser, "user", newuser);

        firebase
          .firestore()
          .collection("users")
          .doc(user.userName)
          .set(newuser)
          .then(doc => {
            console.log("doc", doc);
            return doc;
          });
      });
  }

  static getUserAccount(userId) {
    const isAuthenticated = fireAuth.currentUser;
    if (isAuthenticated) {
      return firebase
        .firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then(doc => {
          let data;
          doc.forEach(user => {
            console.log("get user.data()", user.data());
            data = user.data();
          });
          return data;
        });
    } else return new Promise(() => "lololo").then(() => "lololo");
  }

  static userSignout() {
    return fireAuth
      .signOut()
      .then(() => {
        return "ausgelogged";
      })
      .catch(error => {
        console.error("Ein Fehler ist aufgetreten", error);
      });
  }
}
