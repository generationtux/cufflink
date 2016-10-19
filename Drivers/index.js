let fs = require('fs');
let counter = 0;
class CustomerDriver {

    create() {
        counter++;
        fs.writeFileSync("./customer.txt", `Created Customer Counter: ${counter}`);
        return {
            "name": "Bob Dole"
        };
    }
}

class CartDriver {
    create() {
        counter++;
        fs.writeFileSync("./cart.txt", `Created Cart Counter: ${counter}`);
        return {
            "items": ["Pizza"]
        }
    }
}

class ItemDriver {
    create() {
        counter++;
        fs.writeFileSync("./item.txt", `Created Item Counter: ${counter}`);
        return {
            "name": "Pizza",
            "price": 1.00
        };
    }
}

module.exports = {
    "ItemDriver": ItemDriver,
    "CustomerDriver": CustomerDriver,
    "CartDriver": CartDriver
};