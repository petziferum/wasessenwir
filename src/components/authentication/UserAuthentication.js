import firebase from "@/plugins/firebase";
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
    return firebase
      .firestore()
      .collection("users")
      .doc(username)
      .get()
      .then(doc => {
        console.log("get", doc.data());
        return doc.data();
      });
  }
}
