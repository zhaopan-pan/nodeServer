"use strict";
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let userss = { firstName: "Jane", lastName: "User" };
var a = 1;
document.body.innerHTML = greeter(userss);
