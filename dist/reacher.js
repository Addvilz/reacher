(function (_) {
    'use strict';

    var ReacherError = function (message, commandName) {
        this.name = "ReacherError";
        this.message = message + ' [Command: ' + commandName + ']';
    };

    ReacherError.prototype = Error.prototype;

    var Reacher = function () {

        var commandHandlers = {};

        /**
         * Register a command handler
         *
         * @param {string} command
         * @param {Function} callable
         */
        this.handle = function (command, callable) {
            if (this.hasHandler(command)) {
                throw new ReacherError('Command handler already set', command);
            }

            if ('function' !== typeof callable) {
                throw new ReacherError('Command handler is not a function', command);
            }

            commandHandlers[command] = callable;
        };

        /**
         * Remove a command handler
         * @param {string} command
         * @returns {*}
         */
        this.removeHandler = function (command) {
            if (!this.hasHandler(command)) {
                throw new ReacherError('Command handler undefined', command);
            }
            var oldHandler = commandHandlers[command];
            delete commandHandlers[command];
            return oldHandler;
        };

        /**
         * Check if handler exists by command name
         * @param {string} command
         * @returns {boolean}
         */
        this.hasHandler = function (command) {
            return 'undefined' !== typeof commandHandlers[command];
        };

        /**
         * Request a value from command handler providing optional arguments
         * @param {string} command
         * @param {...mixed} args
         */
        this.request = function (command) {
            var args = (function (args) {
                var callableArgs = [];
                for (var i in args) {
                    callableArgs.push(args[i]);
                }
                return callableArgs;
            })(arguments);

            command = args.shift();

            if (!this.hasHandler(command)) {
                throw new ReacherError('Command handler undefined', command);
            }

            return commandHandlers[command].apply(null, args);
        };
    };

    /**
     * Get a new Instance of Reacher
     * @returns {Reacher}
     * @constructor
     */
    _.Reacher = function () {
        return new Reacher();
    };

    _.ReacherError = ReacherError;

})(typeof module !== 'undefined' && module.exports ? module.exports : window);