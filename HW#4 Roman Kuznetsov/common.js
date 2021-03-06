/* параметры позиици в меню */

function Item(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
};

/* параметры напитка */

function Drink(drinkType) {
    Item.call(this);
    this.drinkType = drinkType;
};

Drink.prototype = Object.create(Item.prototype);

Drink.COKE = {
    name: "Coke",
    price: 50,
    calories: 40
};
Drink.COFFEE = {
    name: "Coffee",
    price: 80,
    calories: 20
};

Drink.prototype.getName = function () {
    return this.drinkType.name;
};
Drink.prototype.calculatePrice = function () {
    return this.drinkType.price;
};
Drink.prototype.calculateCalories = function () {
    return this.drinkType.calories;
};

/* параметры салата */

function Salad(saladType, weight) {
    Item.call(this);
    this.saladType = saladType;
    this.weight = weight;
};

Salad.prototype = Object.create(Item.prototype);

Salad.CAESAR = {
    name: "Caesar",
    price: 100,
    calories: 20
};
Salad.OLIVIER = {
    name: "Olivier",
    price: 50,
    calories: 80
};

Salad.prototype.getName = function () {
    return this.saladType.name;
};
Salad.prototype.getWeight = function () {
    return this.weight;
};
Salad.prototype.calculatePrice = function () {
    return (this.saladType.price / 100 * this.weight);
};
Salad.prototype.calculateCalories = function () {
    return (this.saladType.calories / 100 * this.weight);
};


/* параметры бургера */

function Hamburger(size, stuffing) {
    Item.call(this);
    this.size = size;
    this.stuffing = stuffing;
};

Hamburger.prototype = Object.create(Item.prototype);

Hamburger.SIZE_SMALL = {
    name: "Small size",
    price: 50,
    calories: 20
};
Hamburger.SIZE_BIG = {
    name: "Big size",
    price: 100,
    calories: 40
};
Hamburger.STUFFING_CHEESE = {
    name: "Cheese",
    price: 10,
    calories: 20
};
Hamburger.STUFFING_SALAD = {
    name: "Salad",
    price: 20,
    calories: 5
};
Hamburger.STUFFING_POTATO = {
    name: "Potato",
    price: 15,
    calories: 10
};

Hamburger.prototype.getSize = function () {
    return this.size.name;
};
Hamburger.prototype.getStuffing = function () {
    return this.stuffing.name;
};
Hamburger.prototype.calculatePrice = function () {
    return this.size.price + this.stuffing.price;
};
Hamburger.prototype.calculateCalories = function () {
    return this.size.calories + this.stuffing.calories;
};

/* параметры заказа */
function Order() {
    this.price = 0;
    this.calories = 0;
    this.list = [];
    this.isPaid = false;
}

/* добавить позицию в заказ */
Order.prototype.addToOrder = function (item) {
    if (!this.isPaid) {
        this.list.push(item);
    } else {
        console.log("order has already been paid");
    }
};

/* убрать позицию из заказа */
Order.prototype.removeFromOrder = function (item) {
    if (!this.isPaid) {
        if (this.list.indexOf(item) !== -1) {
            this.list.splice(this.list.indexOf(item), 1);
        }
    } else {
        console.log("order has already been paid");
    }
};

/* расчет стоимости */
Order.prototype.calculatePrice = function () {
    var totalPrice = this.price;
    this.list.forEach(function (item) {
        totalPrice += item.calculatePrice();
    });
    return totalPrice;
};

/* расчет калорий */
Order.prototype.calculateCalories = function () {
    var totalCalories = this.calories;
    this.list.forEach(function (item) {
        totalCalories += item.calculateCalories();
    });
    return totalCalories;
};
/* успешная оплата заказа */
Order.prototype.payForTheOrder = function () {
    this.isPaid = true;
};

var smallPotato = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
console.log(smallPotato.getSize() + " with " + smallPotato.getStuffing());
console.log("price: " + smallPotato.calculatePrice() + ", calories: " + smallPotato.calculateCalories());

var coke = new Drink(Drink.COKE);
console.log(coke.getName());
console.log("price: " + coke.calculatePrice() + ", calories: " + coke.calculateCalories());

var olivierSalad = new Salad(Salad.OLIVIER, 420);
console.log(olivierSalad.getName() + " - " + olivierSalad.getWeight() + "g.");
console.log("price: " + olivierSalad.calculatePrice() + ", calories: " + olivierSalad.calculateCalories());

var order1 = new Order();

order1.addToOrder(smallPotato);
order1.addToOrder(coke);
order1.addToOrder(smallPotato);

console.log("calories: " + order1.calculateCalories());
order1.payForTheOrder();
console.log("the total cost: " + order1.calculatePrice());
order1.removeFromOrder(coke);
order1.addToOrder(olivierSalad);
console.log("the total cost: " + order1.calculatePrice());
