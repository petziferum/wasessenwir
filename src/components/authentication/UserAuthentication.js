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

  static getUserAccount(username) {
    const isAuthenticated = fireAuth.currentUser;
    console.info("auth?", isAuthenticated);
    if (isAuthenticated) {
      return firebase
        .firestore()
        .collection("users")
        .doc(username)
        .get()
        .then(doc => {
          console.log("get", doc.data());
          return doc.data();
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
