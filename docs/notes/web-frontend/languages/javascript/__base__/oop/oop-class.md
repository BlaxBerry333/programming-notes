# JavaScript 类

> Class

## 定义

类使用关键字`class`定义，类名使用大驼峰命名 ( CamelCase )

```js
class 类 {
  // ...
}
```

### 实例化

可以通过关键字`new`实例化类创建一个实例对象

实例对象相互独立互不影响

```js
class 类 {
  // ...
}

const 类的实例对象1 = new 类();
const 类的实例对象2 = new 类();
```

## 类中成员

```js
class 类 {
  constructor(参数1, 参数2) {
    this.属性1 = 参数1;
    this.属性2 = 参数2;
  }

  方法() {
    // ...
  }
}

const 类的实例对象 = new 类();

console.log(类的实例对象.属性);
类的实例对象.方法();
```

## 类的继承

可以通过关键字`extends`实现类的继承

```js
class 父类 {
  // ...
}

class 子类 extends 父类 {
  // ...
}

const 子类实例对象 = new 子类();
```

::: details 例子：使用`extends`实现类的继承

> 如下：`Child`类继承了`Father`类中的构造函数及属性

```js
class Father {
  constructor(name, skills) {
    this.name = name;
    this.skills = skills;
  }
}

class Child extends Father {}

const child1 = new Child("child2", ["Vue"]);
const child2 = new Child("child1", ["React", "Vue"]);
```

:::

## 设计模式

> Design Patterns

https://juejin.cn/post/6844904205421903885?from=search-suggest#heading-12
