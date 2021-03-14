var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isDefinedAndNotNull = kapheinJsTypeTrait.isDefinedAndNotNull;
var isArrayLike = kapheinJsTypeTrait.isArrayLike;
var kapheinJsMath = require("kaphein-js-math");
var relativelyEquals = kapheinJsMath.relativelyEquals;

module.exports = (function ()
{
    /**
     *  @constructor
     */
    function Vector2()
    {
        this.length = 2;
        this[0] = 0;
        this[1] = 0;

        switch(arguments.length)
        {
        case 0:
            break;
        case 1:
            var src = arguments[0];

            if(_isArrayLike(src))
            {
                this[0] = src[0];
                this[1] = src[1];
            }
            else if(isDefinedAndNotNull(src))
            {
                if("x" in src && "number" === typeof src.x)
                {
                    this[0] = src.x;
                }

                if("y" in src && "number" === typeof src.y)
                {
                    this[1] = src.y;
                }
            }
            break;
        default:
            if("number" === typeof arguments[0])
            {
                this[0] = arguments[0];
            }

            if("number" === typeof arguments[1])
            {
                this[1] = arguments[1];
            }
        }
    }

    Vector2.zero = function zero()
    {
        return new Vector2();
    };

    Vector2.one = function one()
    {
        return Vector2.fill(1);
    };

    /**
     *  @param {number} value
     */
    Vector2.fill = function fill(value)
    {
        return new Vector2(value, value);
    };

    Vector2.isCompatibleArrayLike = function isCompatibleArrayLike(v)
    {
        return _isArrayLike(v);
    };

    Vector2.prototype = {
        constructor : Vector2,

        length : 2,

        clone : function clone()
        {
            return new Vector2(this);
        },

        /**
         *  @param {number} x
         *  @param {number} y
         */
        setXy : function setXy(x, y)
        {
            this[0] = x;
            this[1] = y;

            return this;
        },

        negate : function negate()
        {
            return new Vector2(this).negateAssign();
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        dot : function dot(other)
        {
            return this[0] * other[0]
                + this[1] * other[1]
            ;
        },

        norm2Squared : function norm2Squared()
        {
            return this.dot(this);
        },

        norm2 : function norm2()
        {
            return Math.sqrt(this.norm2Squared());
        },

        normalize : function normalize()
        {
            var norm2 = this.norm2();

            return this.scale((relativelyEquals(0.0, norm2) ? 0.0 : 1.0 / norm2));
        },

        /**
         *  @param {ArrayLike<number>} axis
         */
        project : function project(axis)
        {
            /**  @type {Vector2} */var projected = null;

            var axisNorm2 = Vector2.prototype.norm2.call(axis);
            if(relativelyEquals(0.0, axisNorm2))
            {
                projected = Vector2.zero();
            }
            else
            {
                projected = Vector2.prototype.scale.call(axis, this.dot(axis) / axisNorm2);
            }

            return projected;
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        add : function add(other)
        {
            return new Vector2(this).addAssign(other);
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        subtract : function subtract(other)
        {
            return new Vector2(this).subtractAssign(other);
        },

        /**
         *  @param {number} scalar
         */
        scale : function scale(scalar)
        {
            return new Vector2(this).scaleAssign(scalar);
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        pointwiseMultiply : function pointwiseMultiply(other)
        {
            return new Vector2(this).pointwiseMultiplyAssign(other);
        },

        isZero : function isZero()
        {
            return relativelyEquals(0.0, this.norm2());
        },

        equals : function equals(other)
        {
            var result = this === other;
            if(!result)
            {
                result = _isArrayLike(other)
                    && relativelyEquals(this[0], other[0])
                    && relativelyEquals(this[1], other[1])
                ;
            }

            return result;
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        assign : function assign(other)
        {
            this[0] = other[0];
            this[1] = other[1];

            return this;
        },

        negateAssign : function negateAssign()
        {
            this[0] = -this[0];
            this[1] = -this[1];

            return this;
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        addAssign : function addAssign(other)
        {
            this[0] += other[0];
            this[1] += other[1];

            return this;
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        subtractAssign : function subtractAssign(other)
        {
            this[0] -= other[0];
            this[1] -= other[1];

            return this;
        },

        /**
         *  @param {number} scalar
         */
        scaleAssign : function scaleAssign(scalar)
        {
            this[0] *= scalar;
            this[1] *= scalar;

            return this;
        },

        /**
         *  @param {ArrayLike<number>} other
         */
        pointwiseMultiplyAssign : function pointwiseMultiplyAssign(other)
        {
            this[0] *= other[0];
            this[1] *= other[1];

            return this;
        },

        toArray : function toArray()
        {
            return Array.prototype.slice.call(this);
        },

        toString : function toString()
        {
            return "[" + Array.prototype.join.call(this, ",") + "]";
        },

        splice : function splice()
        {
            throw new Error("This function is just a dummy!");
        }
    };

    function _isArrayLike(v)
    {
        return (isArrayLike(v) && v.length >= 2);
    }

    return {
        Vector2 : Vector2
    };
})();
