
const defaults = {
  level: 1,
  left: {
    x: 0,
    a: 0,
  },
  right: {
    x: 0,
    a: 0,
  },
  solution: 0,
  generate: true
}
export default class Equation {
  constructor(props) {
    this.props = props = Object.assign({}, defaults, props);
    this.left = {
      x: props.left.x,
      a: props.left.a,
    };
    this.right = {
      x: props.right.x,
      a: props.right.a,
    }
    this.solution = props.solution;

    if (props.generate) {
      switch (this.props.level) {
        case 3:
          this.generateLevelThree(); 
          break;
        case 2:
          this.generateLevelTwo();
          break;
        default:
          this.generateLevelOne();
          break;
      }
      this.maybe(this.swapSides);
    }
  }

  performOperation = (operation) => {
    if (!this.isOperationValid(operation)) {
      return false;
    }

    let right = this.performOneSide(this.right, operation);
    let left = this.performOneSide(this.left, operation);
    return new Equation({
      right: right,
      left: left,
      solution: this.solution,
      generate: false,
    })
  }

  performOneSide = (side, operation) => {
    let doX = operation.operator === "/" || operation.item === "b";
    let doA = operation.operator === "/" || operation.item === "m";
    return {
      x: doX ? this.singleOperation(side.x, operation.operator, operation.number) : side.x,
      a: doA ? this.singleOperation(side.a, operation.operator, operation.number) : side.a,
    }
  }

  singleOperation = (value, operator, operand) => {
    switch (operator) {
      case "+":
        return value + operand;
      case "-":
        return value - operand;
      case "/":
        return value / operand;
      default:
        return false;
    }
  }

  isOperationValid = (operation) => {
    if (operation.operator === "/") {
      if (operation.number === 0) {
        return false;
      } else {
        if (this.left.a % operation.number !== 0 || this.left.x % operation.number !== 0 ||
            this.right.a % operation.number !== 0 || this.right.x % operation.number !== 0) {
              return false;
        }
      }
    }
    return true;
  }

  getSolution = () => {
    return this.solution;
  }
  
  getObjects = () => {
    return [...this.getSideObjects(this.left), '=', ...this.getSideObjects(this.right)];
  }

  getSideObjects = (side) => {
    let objects = [];
    if (side.x < 0) {
      objects.push('-');
    }
    if (side.x !== 0) {
      objects.push({type: 'x', value: Math.abs(side.x)});

      if (side.a < 0) {
        objects.push('-');
      } else if (side.a > 0) {
        objects.push('+');
      }
    }
    if (side.a !== 0) {
      objects.push({type: 'a', value: Math.abs(side.a)});
    }

    // one side cannot be empty, 0 must be supplied
    if (objects.length === 0) {
      objects.push({type: 'a', value: 0});
    }
    return objects;
  }

  generateLevelOne = () => {
    // on the right only absolute value between 1 and 10
    this.right.a = this.randomNumber(1, 15);
    // solution must be a part of the right, but not the same
    this.solution = this.randomNumber(0, this.right.a - 1);
    // just one x
    this.left.x = 1;
    this.left.a = this.right.a - this.solution;
  }

  generateLevelTwo = () => {
    // couple of boxes on one side, number on the other side
    this.solution = this.randomNumber(2, 4);
    this.left.x = this.randomNumber(2, 4);
    this.right.a = this.solution * this.left.x;
  }

  generateLevelThree = () => {
    // couple boxes on the left side, fewer on right side, positive absolute values on both sides
    this.solution = this.randomNumber(0, 5);
    this.left.x = this.randomNumber(3, 6);
    this.right.x = this.randomNumber(2, this.left.x - 1);
    let diff = (this.left.x - this.right.x) * this.solution;

    this.right.a = diff + this.randomNumber(-3, 3);
    this.left.a = this.right.a - diff;
  }

  swapSides = () => {
    let x = this.left;
    this.left = this.right;
    this.right = x;
  }

  maybe = (func) => {
    if (this.randomNumber(0, 1) === 0) {
      func();
    }
  }

  randomNumber = (from, to) => {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}