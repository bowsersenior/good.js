(function () {
    "use strict";

    // good.js provides a few simple enhancements to javascript based on its "good parts"
    // JSTGP stands for "JavaScript: The Good Parts" by Douglas Crockford


    // Source:
    //   http://javascript.crockford.com/prototypal.html
    //   http://www.haykranen.nl/2012/09/04/a-cached-version-of-crockfords-object-create-up-to-ten-times-faster/
    //
    // Usage:
    //   var newObject = Object.create(oldObject);

    function F() {} // cache F for better performance
    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            F.prototype = o;
            return new F();
        };
    }


    // Source:
    //   JSTGP p. 33
    //   http://javascript.crockford.com/inheritance.html
    //
    // Usage:
    //   String.method('trim', function () {
    //     return this.replace(/\s+|\s+$/g, '');
    //   });
    //   '  hi  '.trim()  // 'hi'

    if (typeof Function.method !== 'function') {
        Function.prototype.method = function (name, func) {
            if (!this.prototype[name]) {
                this.prototype[name] = func;
                return this;
            }
        };
    }


    // Source:
    //    JSTGP p. 43-44
    //
    // Usage:
    //   var add  = function (a,b) { return a + b };
    //   var add1 = add.curry(1);
    //   add1(6);  // 7

    Function.method('curry', function () {
        var slice = Array.prototype.slice,
            args = slice.apply(arguments),
            that = this;
        return function () {
            return that.apply(null, args.concat(slice.apply(arguments)));
        };
    });


    // Source:
    //   JSTGP p. 54
    //
    // Usage:
    //   TODO
    Object.method('superior', function (name) {
        var that = this,
            method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    });


    // TODO: create a generic version of the memoizer (JSTGP 44-45)


}());
