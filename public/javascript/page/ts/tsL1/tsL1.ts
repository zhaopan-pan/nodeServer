interface Person1 {
    firstName: string;
    lastName: string;
}

function greeter(person: Person1) {
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
function extend<T, U>(first: T, second?: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(msg: string): void;
}
class ConsoleLogger implements Loggable {
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
let list1: number[] = [1, 2, 3];
//f2泛型数组
let list2: Array<number> = [1, 2, 3];

/**
 * 元组 Tuple
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
 */
// Declare a tuple type
let tupleArr: [string, number];
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
enum Color { Red, Green, Blue };//默认情况下，从0开始为元素编号。
let enum1: Color = Color.Green;//1
let enum2: string = Color[2];//可以由枚举的值得到它的名字 Blue


/**
 * 类型断言:
 * 告诉编译器，“相信我，我知道自己在干什么”
 * 有点类似强转，但不进行特殊的数据检查和解构
 */
//f1
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

//f2
let someValues: any = "this is a string";
let strLengths: number = (someValue as string).length;



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


/**
 * 接口
 */
//f1:额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    const area = config.width;
    return { color: config.color || "green", area: <number>area }
}
let mySquare = createSquare({ colour: "red", width: 100 });

//f2:只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!

//f3:TypeScript具有ReadonlyArray<T>类型，确保数组创建后再也不能被修改
let readonlyArr: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = readonlyArr;//ro变成只读数组
// ro[0] = 12;  ro.push(5); ro.length = 100; a = ro; // error!
let barr = ro as number[];//可以用类型断言重写

//f4:函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
};
let mySearch: SearchFunc;
mySearch = function (src: string, sub: string) {
    let result = src.search(new RegExp("\\" + sub, "i"));//先用构造函数创建正则对象，并忽略大小写
    return result > -1;
};

//f5:可索引的类型
interface StringArray {
    [index: number]: string;//用 number去索引StringArray时会得到string类型的返回值
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

/**
 * 类类型
 * 实现接口
 */

//f1:类静态部分与实例部分的区别


interface ClockConstructor { //ClockConstructor为构造函数所用
    new(hour: number, minute: number): ClockInterface;
}

interface ClockInterface {//ClockInterface为实例方法所用。 
    tick(): void;
}
//ctor的类型是接口 ClockConstructor，在这里就为类的静态部分指定需要实现的接口
let createClock = (ctor: ClockConstructor, hour: number, minute: number): ClockInterface => {
    return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
    hour: number;
    minute: number;
    constructor(h: number, m: number) {
        this.hour = h;
        this.minute = m;
    }
    tick() {
        console.log("beep beep", this.hour, this.minute);
    }
}
class AnalogClock implements ClockInterface {
    hour: number;
    minute: number;
    constructor(h: number, m: number) {
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
