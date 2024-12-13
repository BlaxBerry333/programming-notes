# JavaScript 构造函数与原型链

> Constructor Function & Prototype Chain

TODO:

## 构造函数

> Constructor Function

```js
function 构造函数() {
  // ...
}
```

---

### 实例化

可以通过关键字`new`实例化构造函数创建一个实例对象

实例对象相互独立互不影响

```js
function 构造函数() {
  // ...
}

const 构造函数的实例对象1 = new 构造函数();
const 构造函数的实例对象2 = new 构造函数();
```

---

### 实例成员

> Instance Members

通过关键字`this`直接在构造函数内部定义的属性、方法

实例成员仅属于通过关键字`new`实例化创建的实例对象

```js
function 构造函数() {
  this.属性 = 值;

  this.方法 = function () {
    // ...
  };
  this.方法 = function (参数) {
    // ...
  };
}
```

---

### 原型成员

> Prototype Members

直接定义在构造函数的`prototype`对象上的属性、方法

原型成员被基于该构造函数创建的所有实例对象共享

```js
function 构造函数() {
  // ...
}

构造函数.prototype.属性 = 值;

构造函数.方法 = function () {
  // ...
};
构造函数.方法 = function (参数) {
  // ...
};
```

## 原型链

> Prototype Chain

## 继承

### 原型链继承 <Badge type="warning">不推荐</Badge> {#原型链继承}

通过构造函数的原型链继承另一个构造函数的实例对象

```js
function 父构造函数() {
  // ...
}
function 子构造函数() {
  // ...
}

子构造函数.prototype = new 父构造函数();

const 子构造函数实例对象 = new 子构造函数();
```

```js{0}
function Father() {
  this.name = "father";
  this.skills = ["React"];
}

function Child() {
  this.name = "child";
}

Child.prototype = new Father();

const child1 = new Child();
const child2 = new Child();

child1.name = "xxxxx";
console.log(child1.name, child2.name);       // "xxxxx" "child"

child1.skills.push("Vue");
console.log(child1.skills, child2.skills);   // ["React", "Vue"] ["React", "Vue"]
```

---

### 原型继承 <Badge type="warning">不推荐</Badge> {#原型继承}

将一个源对象作为原型并继承该源对象中的成员

创建的新对象不含有任何属性，但可直接使用作为其继承原型的源对象中的属性

```js
const 源对象 = {
  // ...
};

const 新对象 = Object.create(源对象);
```

```js{0}
const a = {
  x: 10,
  y: [],
  z: function () {
    console.log("zzz");
  },
};

const c = Object.create(a);

console.log(c);         // {}

console.log(c.x, c.y);  // 10 []
c.z();                  // "zzz"
```
