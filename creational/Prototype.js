function Person(firstName,lastName){

    this.firstName = firstName;

    this.lastName = lastName;

}

Person.prototype.fullName = function(){
    return this.firstName + " " + this.lastName;
};

let person = new Person('Sam','Smith');

console.log(person); //{firstName: "Sam", lastName: "Smith"}
console.log(person.fullName()); //"Sam Smith"
