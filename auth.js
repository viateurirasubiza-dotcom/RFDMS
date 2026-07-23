// =====================================
// RFDMS AUTHENTICATION SYSTEM
// Rwanda Football Digital Management System
// =====================================



import {

auth,
db

}

from "./firebase-config.js";





import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged

}

from 

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





import {


doc,
setDoc,
getDoc


}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





// =====================================
// REGISTER USER
// =====================================


async function registerUser(
name,
email,
password,
role,
clubId=""
){


try{


const userCredential =

await createUserWithEmailAndPassword(

auth,
email,
password

);



const user = userCredential.user;





// Save profile Firestore


await setDoc(

doc(
db,
"users",
user.uid
),

{


uid:user.uid,

name:name,

email:email,

role:role,

clubId:clubId,

createdAt:
new Date()


}


);




alert(
"Account created successfully"
);



window.location.href="login.html";



}

catch(error){


alert(error.message);


}


}







// =====================================
// LOGIN USER
// =====================================



async function loginUser(
email,
password
){


try{


const result =

await signInWithEmailAndPassword(

auth,
email,
password

);



const user=result.user;




// Get Role


const profile =

await getDoc(

doc(
db,
"users",
user.uid
)

);




if(profile.exists()){


let data =
profile.data();




redirectByRole(
data.role
);



}



}


catch(error){


alert(
"Login failed: "
+
error.message
);


}


}







// =====================================
// ROLE REDIRECTION
// =====================================



function redirectByRole(role){



switch(role){



case "FERWAFA_ADMIN":


window.location.href=
"admin-dashboard.html";


break;





case "CLUB_ADMIN":


window.location.href=
"club-dashboard.html";


break;





case "COACH":


window.location.href=
"coach-dashboard.html";


break;





case "DOCTOR":


window.location.href=
"doctor-dashboard.html";


break;





case "SCOUT":


window.location.href=
"scout-dashboard.html";


break;





case "PLAYER":


window.location.href=
"player-dashboard.html";


break;





default:


window.location.href=
"login.html";



}



}







// =====================================
// LOGOUT
// =====================================



async function logoutUser(){


await signOut(auth);


window.location.href=
"login.html";


}









// =====================================
// CHECK CURRENT USER
// =====================================



function checkUser(){


onAuthStateChanged(

auth,

(user)=>{


if(user){


console.log(

"Logged user:",
user.email

);


}

else{


console.log(
"No user logged"
);


}


}


);



}







export {


registerUser,
loginUser,
logoutUser,
checkUser


};
