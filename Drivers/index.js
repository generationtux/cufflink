let fs = require('fs');
let counter = 0;
class CustomerDriver {

    create() {
        counter++;
        fs.writeFileSync("./customer.txt", `Created Customer Counter: ${counter}`);
        return new Promise((resolve) => {
            resolve({
                "type": "customer",
                "properties": {
                    "name": "Bob Dole"
                }
            });
        });
    }
}

class CartDriver {
    create() {
        counter++;
        fs.writeFileSync("./cart.txt", `Created Cart Counter: ${counter}`);
        return new Promise((resolve) => {
            resolve({
                "type": "cart",
                "properties": {
                    "items": ["Bob Dole"]
                }
            });
        });
    }
}

class ItemDriver {
    create() {
        counter++;
        fs.writeFileSync("./item.txt", `Created Item Counter: ${counter}`);
        return new Promise((resolve) => {
            resolve({
                "type": "item",
                "properties": {
                    "name": "Bob Dole",
                    "price": 0.01
                }
            });
        });
    }
}

module.exports = {
    "ItemDriver": ItemDriver,
    "CustomerDriver": CustomerDriver,
    "CartDriver": CartDriver
};