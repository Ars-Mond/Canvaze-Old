"use strict";

/**1
 * Vector2 is super class
 */
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class hexString {

}

/**
 * The base class for all entity.
 */
class Entity {
    /**
     *
     * @param {Object}      obj Main object.
     * @param {<Vector2>}   obj.position        - Position of an entity on a canvas.
     * @param {string}      obj.fillColor       - Colour hex.
     * @param {boolean}     [obj.fill=true]     - Enabling or disabling entity fill.
     * @param {string}      obj.borderColor     - Colour hex.
     * @param {number}      obj.borderWidth     - Border width. If a value is 0, then there will be no border.
     */
    constructor(obj) {
        /**
         * Position of an entity on a canvas.
         * @type {Vector2}
         */
        this.position = obj.position === undefined ? new Vector2(0, 0) : obj.position;
        /**
         * Colour hex.
         * @type {string|hexString}
         */
        this.fillColor = obj.fillColor === undefined ? '#ffffff' : obj.fillColor;
        /**
         * Enabling or disabling entity fill.
         * @type {boolean}
         */
        this.fill = obj.fill === undefined ? true : obj.fill;
        /**
         * Colour hex.
         * @type {string|hexString}
         */
        this.borderColor = obj.borderColor === undefined ? '#000000' : obj.borderColor;
        /**
         * Border width. If a value is 0, then there will be no border.
         * @type {number}
         */
        this.borderWidth = obj.borderWidth === undefined ? 0 : obj.borderWidth;
        /**
         * ID entity.
         * @type {symbol}
         * @private
         */
        this._id = Symbol("id");
    }
}
/*
 @param position {Vector2} Position of an entity on a canvas.
     * @param fillColor {string} Colour hex.
     * @param fill {boolean} fff
     * @param borderColor {string} Colour hex.
     * @param borderWidth {number} Border width. If a value is 0, then there will be no border.
     * @param radius {number}
 */
//position = Vector2, fillColor, fill = true, borderColor, borderWidth, radius

/**
 * @extends {Entity}
 */
class Circle extends Entity {
    /**
     *
     * @param {Object}      obj             - Super object
     * @param {Vector2}     obj.position    - {@link Entity.position}
     * @param {number}      obj.radius      - Radius circle.
     * @param {string}      obj.fillColor   - {@link Entity.fillColor}
     * @param {boolean}     [obj.fill]      - {@link Entity.fill}
     * @param {string}      obj.borderColor - {@link Entity.borderColor}
     * @param {number}      obj.borderWidth - {@link Entity.borderWidth}
     * @param {Object?} option
     * @see Entity
     */
    constructor(obj, option) {
        super(obj);
        /**
         * Position of an entity on a canvas.
         * @type {number}
         */
        this.radius = obj.radius;
    }

    render(context) {
        context.beginPath();
        context.arc(this.position.x,this.position.y,this.radius,0,2 * Math.PI);

        if (this.fill) {
            context.fillStyle = this.fillColor;
            context.fill();
        }

        if(this.borderWidth !== 0) {
            context.lineWidth = this.borderWidth;
            context.strokeStyle = this.borderColor;
            context.stroke();
        }
        context.closePath();
    }
}

class Rectangle extends Entity {

    /**
     *
     * @param position {Vector2} Position of an entity on a canvas.
     * @param size {Vector2}
     * @param fillColor {string} Colour hex.
     * @param fill {boolean}
     * @param borderColor {string} Colour hex.
     * @param borderWidth {number} Border width. If a value is 0, then there will be no border.
     * @param borderRadius {number}
     */
    constructor({position, size, fillColor, fill, borderColor, borderWidth, borderRadius = 0}) {
        super({position, fillColor, fill, borderColor, borderWidth});
        this.size = size;
        this.borderRadius = borderRadius;
        this.borderWidth = borderWidth;
    }

    render(context) {

        if (this.borderRadius !== 0) {
            context.beginPath();

            let arc1Pos = new Vector2(this.position.x + this.borderRadius, this.position.y + this.borderRadius);
            let arc2Pos = new Vector2(this.position.x - this.borderRadius + this.size.x, this.position.y + this.borderRadius);
            let arc3Pos = new Vector2(this.position.x - this.borderRadius + this.size.x, this.position.y - this.borderRadius + this.size.y);
            let arc4Pos = new Vector2(this.position.x + this.borderRadius, this.position.y - this.borderRadius + this.size.y);

            // Arc #1
            context.arc(arc1Pos.x, arc1Pos.y, this.borderRadius, Math.PI, 1.5 * Math.PI, false);
            context.lineTo(this.position.x + this.size.x - this.borderRadius, this.position.y);

            // Arc #2
            context.arc(arc2Pos.x, arc2Pos.y, this.borderRadius, 1.5 * Math.PI , 2 * Math.PI, false);
            context.lineTo(this.position.x + this.size.x, this.position.y + this.size.y - this.borderRadius);

            // Arc #3
            context.arc(arc3Pos.x, arc3Pos.y, this.borderRadius, 0, 0.5 * Math.PI, false);
            context.lineTo(this.position.x + this.borderRadius, this.position.y + this.size.y);

            // Arc #4
            context.arc(arc4Pos.x, arc4Pos.y, this.borderRadius, 0.5 * Math.PI , Math.PI, false);
            context.lineTo(this.position.x, this.position.y + this.borderRadius);

            if (this.fill) {
                context.fillStyle = this.fillColor;
                context.fill();
            }

            if(this.borderWidth !== 0) {
                context.lineWidth = this.borderWidth;
                context.strokeStyle = this.borderColor;
                context.stroke();
            }
            context.closePath();
        }
        else {
            context.fillStyle = this.fillColor;
            context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            if(this.borderWidth !== 0) {
                context.lineWidth = this.borderWidth;
                context.strokeStyle = this.borderColor;
                context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
            }
        }
    }
}

class TextBox extends Entity {

    /**
     *
     * @param {Object}      obj
     * @param {Vector2}     obj.position    - {@link Entity.position}
     * @param {string}      obj.text        -
     * @param {Object}      obj.font        - Font css {@link fontObject}.
     * @param {string}      obj.fillColor   - {@link Entity.fillColor}
     * @param {boolean}     [obj.fill]      - {@link Entity.fill}
     * @param {string}      obj.borderColor - {@link Entity.borderColor}
     * @param {number}      obj.borderWidth - {@link Entity.borderWidth}
     */
    constructor(obj) {
        super(obj);
        /**
         *
         * @type {string}
         */
        this.text = obj.text;

        /**
         * @typedef     {Object}            fontObject
         * @property    {string}            family
         * @property    {number}            height
         * @property    {number|string}     weight
         * @property    {"px"|"pt"|string}  [unit]
         * @property    {number}            [lineSpacing]   A multiplier for line spacing.
         * @property    {"center"|"end"|"left"|"right"|"start"|string} [textAlign]
         * @property    {"alphabetic"|"bottom"|"hanging"|"ideographic"|"middle"|"top"|string} [textBaseline]
         *
         * @type {fontObject}
         */
        this.font = {
            family:         obj.font.family,
            height:         obj.font.height,
            weight:         obj.font.weight,
            unit:           obj.font.unit,
            lineSpacing:    obj.font.lineSpacing,
            textAlign:      obj.font.textAlign,
            textBaseline:   obj.font.textBaseline
        };
        this.borderWidth = obj.borderWidth;
    }
    render(context) {
        context.textBaseline = this.font.textBaseline;
        context.textAlign = this.font.textAlign;
        let a = this.font.weight + ' ' + this.font.height + this.font.unit + '/' + this.font.lineSpacing + ' ' + this.font.family;
        console.log(a);
        context.font = a;
        if (this.fill) {
            context.fillStyle = this.fillColor;
            context.fillText(this.text, this.position.x, this.position.y);
        }

        if(this.borderWidth !== 0) {
            context.lineWidth = this.borderWidth;
            context.strokeStyle = this.borderColor;
            ctx.strokeText(this.text, this.position.x, this.position.y);
        }
    }
}


class Scene {
    constructor() {
        this.entities = [];
    }

    /**
     *
     * @param {Entity[]} entities Array entities;
     * @return {boolean} Returns the execution status.
     */
    addEntity(entities = []) {
        entities.forEach(entity => {
            if (!(entity instanceof Entity)) {
               return false;
            }
            this.entities.push(entity);
        });
        return true;
    }
    removeEntity(entity) {
        this.entities = this.entities.filter(e => e._id !== entity._id);
    }

    render(context, canvas) {
        /*return new Promise((resolve, reject) => {

        });*/
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (const entity of this.entities) {
            entity.render(context);
        }
    }

    _loop(context, canvas, timeout, _kTimeBreak = 10) {
        let test = setInterval(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (const entity of this.entities) {
                entity.render(context);
            }
        }, timeout);

        if (_kTimeBreak !== 0) {
            setTimeout(() => {clearInterval(test)}, _kTimeBreak * timeout);
        }
    }

}

class Canvaze {
    constructor() {

    }


}
//{position = Vector2, text, fontFamily, fontHeight, fontUnit = 'px', fontWeight, textAlign = 'left', baseline = 'bottom', fillColor, fill = true, borderColor, borderWidth,}
