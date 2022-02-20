import { fireAuth } from "@/plugins/firebase";
import { User } from "firebase";

let user = User;

fireAuth.onAuthStateChanged(_user => {
  console.log("getUser - user state changed: ", _user.email);
  user = _user;
});

const getUser = () => {
  return user;
};

export default getUser;
