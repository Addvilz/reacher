Reacher
================

Reacher is light-weight request-value bus.

### Dependencies

None.

### Installation

- Clone this repository; or
- Download the `dist/reacher.js`; or 
- `bower install reacher`; or
- `npm install reacher`

### Sample usage

```js
var reacherBus = new Reacher();

reacherBus.handle('foo', function(arg){
    return arg;
});

var val = reacherBus.request('foo', 41); // 41
```

or construct in node

```js
var reacherBus = require('reacher').Reacher();
// ...
```

### API

#### {void} handle(command, callable)

Register a command handler for given command name. Only 1 command handler is permitted at any given time.

*throws ReacherError* when command handler already set.
*throws ReacherError* when command handler is not a function.


#### {*} request(command, ...args)

Request a command value by name and with optional arguments passed on to handler.

*throws ReacherError* when handler does not exist.

#### {function} removeHandler(command)

Remove a command handler from registry and return the handler function.

*throws ReacherError* when command handler does not exist.

#### {boolean} hasHandler(command)

Determine whether the handler is set for given command name.


### License

Licensed under terms and conditions of Apache 2.0 license.
