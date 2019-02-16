"use strict";
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = { firstName: "Jane", lastName: "User" };
var a = 1;
document.body.innerHTML = greeter(user);
/**
 *
 * @param first 交叉类型
 * @param second
 */
function extend(first, second) {
    let result = {};
    for (let id in first) {
        result[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
class Person {
    constructor(name) {
        this.name = name;
    }
}
class ConsoleLogger {
    log() {
        console.log("ConsoleLogger");
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
// console.log(new Person("Jim"));
// jim.log();
/**
 * 数组
 */
//f1普通数组
let list1 = [1, 2, 3];
//f2泛型数组
let list2 = [1, 2, 3];
/**
 * 元组 Tuple
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
 */
// Declare a tuple type
let tupleArr;
// Initialize it
tupleArr = ['hello', 10]; // OK
// tupleArr = [10, 'hello']; // Error 调换位置
// console.log(tupleArr[0].substr(1));
// console.log(tupleArr[1].substr(1)); //number类型不存在substr方法
//当访问一个越界的元素，会使用联合类型替代：
// tupleArr[2] = 'world'; // OK, 字符串可以赋值给(string | number)类型
/**
 * 枚举
 */
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
; //默认情况下，从0开始为元素编号。
let enum1 = Color.Green; //1
let enum2 = Color[2]; //可以由枚举的值得到它的名字 Blue
/**
 * 类型断言:
 * 告诉编译器，“相信我，我知道自己在干什么”
 * 有点类似强转，但不进行特殊的数据检查和解构
 */
//f1
let someValue = "this is a string";
let strLength = someValue.length;
//f2
let someValues = "this is a string";
let strLengths = someValue.length;
/**
 * Symbols:
 * 自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。
 * symbol类型的值是通过Symbol构造函数创建的。
 * 特性：Symbols是不可改变且唯一的
 */
let sym = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
let obj = {
    [sym]: "value"
};
function createSquare(config) {
    const area = config.width;
    return { color: config.color || "green", area: area };
}
let mySquare = createSquare({ colour: "red", width: 100 });
let p1 = { x: 10, y: 20 };
// p1.x = 5; // error!
//f3:TypeScript具有ReadonlyArray<T>类型，确保数组创建后再也不能被修改
let readonlyArr = [1, 2, 3, 4];
let ro = readonlyArr; //ro变成只读数组
// ro[0] = 12;  ro.push(5); ro.length = 100; a = ro; // error!
let barr = ro; //可以用类型断言重写
;
let mySearch;
mySearch = function (src, sub) {
    let result = src.search(new RegExp("\\" + sub, "i")); //先用构造函数创建正则对象，并忽略大小写
    return result > -1;
};
let myArray;
myArray = ["Bob", "Fred"];
let myStr = myArray[0];
//ctor的类型是接口 ClockConstructor，在这里就为类的静态部分指定需要实现的接口
let createClock = (ctor, hour, minute) => {
    return new ctor(hour, minute);
};
class DigitalClock {
    constructor(h, m) {
        this.hour = h;
        this.minute = m;
    }
    tick() {
        console.log("beep beep", this.hour, this.minute);
    }
}
class AnalogClock {
    constructor(h, m) {
        this.hour = h;
        this.minute = m;
    }
    tick() {
        console.log("tick tock", this.hour, this.minute);
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
digital.tick();
analog.tick();
//f2:类静态部分与实例部分的区别 
//类是具有两个类型的：静态部分的类型和实例的类型
// interface ClockConstructors {
//     new (hour: number, minute: number);
// }
// class Clock implements ClockConstructors {当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }
//f3:继承接口
