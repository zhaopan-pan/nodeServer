interface Person1 {
    firstName: string;
    lastName: string;
}

function greeter(person: Person1) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };
var a=1; 
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
    console.log(result);
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(msg:string): void;
}
class ConsoleLogger implements Loggable {
    log() {
        console.log("ConsoleLogger");
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
console.log(new Person("Jim"));
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
tupleArr= ['hello', 10]; // OK
// tupleArr = [10, 'hello']; // Error 调换位置
console.log(tupleArr[0].substr(1)); 
// console.log(tupleArr[1].substr(1)); //number类型不存在substr方法
//当访问一个越界的元素，会使用联合类型替代：
// tupleArr[2] = 'world'; // OK, 字符串可以赋值给(string | number)类型


/**
 * 枚举
 */
enum Color {Red, Green, Blue};//默认情况下，从0开始为元素编号。
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
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    console.log(typeof config.width);
    const area=config.width;
    return {color:config.color||"green",area:<number>area}
}
let mySquare = createSquare({ colour: "red", width: 100 });
console.log(mySquare);
