import { fireAuth } from "@/plugins/firebase";
import { User } from "firebase";

let user = User;

fireAuth.onAuthStateChanged(_user => {
  console.log("getUser.js - user state changed: ", _user);
  user = _user;
});

const getUser = () => {
  return user;
};

export default getUser;
