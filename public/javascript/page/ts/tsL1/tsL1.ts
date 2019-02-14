interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let userss = { firstName: "Jane", lastName: "User" };
var a=1; 
document.body.innerHTML = greeter(userss);