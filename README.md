# cufflink
A command tool to help generate seed data based on your object schema in your applications

[![Build Status](https://travis-ci.org/generationtux/cufflink.svg?branch=master)](https://travis-ci.org/generationtux/cufflink)
[![Coverage Status](https://coveralls.io/repos/github/generationtux/cufflink/badge.svg?branch=master)](https://coveralls.io/github/generationtux/cufflink?branch=master)

Cufflink is a simple npm package to help seed data for API tests. Cufflink will seed your databases and create a json file with the results for a consistent way to test your API.

1. Describe your data scheme and dependencies through objects
3. Add drivers for those objects
4. Run following command

```
$ cufflink create your-object
$ cufflink teardown [optional seeded file path]
```

Highlights
-------

* Simple CLI
* Determines what order to seed database depending on dependencies
* Fully documented
* Fully unit tested
* Framework-agnostic

System Requirements
-------

You need **Node >= 5.0.0**

Installation
-------

```
$ npm install cufflink
```

Configuration
-------

In order to use Cufflink, your directory structure must follow the specified structure:

```
root_directory/
    objects/
    drivers/
```

The `objects` directory will contain the schemas for your objects

Ex:
```
    {
        "type": "customer",
        "properties": {
            "fields": [
                {
                    "name": "id",
                    "type": "int"
                },
                {
                    "name": "customerId",
                    "type": "int"
                }
            ]
            "dependencies": [
                "customer"
            ]
        }
    }
```

The `drivers` directory will contain the drivers to persist your objects to your databases.
Driver's names should be the same as the associated object

Ex: The `cart` object above should have a corresponding `cart` driver that resides in the `drivers` directory

Using the API
-------------

Use the Cufflink API directly in your programs like this:

```
let cufflink = require('cufflink/api');

cufflink.create('measurement').then((result) => {
    cufflink.tearDown(result);
});
```

Cufflink also has a `createSync` feature that doesn't use Promises.

```
let objects = cufflink.createSync('measurement');
```

Testing
-------

```
$ npm test
```

Contributing
-------

Contributions are welcome and will be fully credited. Please see [CONTRIBUTING](.github/CONTRIBUTING.md) and [CONDUCT](CONDUCT.md) for details.

Security
-------

If you discover any security related issues, please email admin@generationtux.com instead of using the issue tracker.

Credits
-------

- [All Contributors](https://github.com/generationtux/cufflink/graphs/contributors)

License
-------

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
