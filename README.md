# cufflink
A command tool to help generate seed data based on your object schema in your applications

[![Latest Version](https://img.shields.io/github/release/thephpleague/csv.svg?style=flat-square)](https://github.com/generationtux/cufflink/releases)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/thephpleague/csv/master.svg?style=flat-square)](https://travis-ci.org/thephpleague/csv)
[![Coverage Status](https://img.shields.io/scrutinizer/coverage/g/thephpleague/csv.svg?style=flat-square)](https://scrutinizer-ci.com/g/thephpleague/csv/code-structure)
[![Quality Score](https://img.shields.io/scrutinizer/g/thephpleague/csv.svg?style=flat-square)](https://scrutinizer-ci.com/g/thephpleague/csv)
[![Total Downloads](https://img.shields.io/packagist/dt/league/csv.svg?style=flat-square)](https://packagist.org/packages/league/csv)

Cufflink is a simple npm package to help seed data for API tests. Cufflink will seed your databases and create a json file with the results for a consistent way to test your API.

1. Describe your data scheme and dependencies through objects 
3. Add drivers for those objects
4. Run following command

```
$ cufflink create your-object
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
cart: {
    fields: [
        {
            name: id,
            type: int
        },
        {
            name: customerId,
            type: int
        }
    ]
    dependencies: [
        customer
    ]
}
```

The `drivers` directory will contain the drivers to persist your objects to your databases.
Driver's names should be the same as the associated object

Ex: The `cart` object above should have a corresponding `cart` driver that resides in the `drivers` directory

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
