class Calculator {
    constructor() {
      this.previousOperationElement = document.querySelector('.previous-operation');
      this.currentOperationElement = document.querySelector('.current-operation');
      this.clear();
    }
  
    clear() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
      this.updateDisplay();
    }
  
    delete() {
      if (this.currentOperand === '0') return;
      this.currentOperand = this.currentOperand.slice(0, -1);
      if (this.currentOperand === '') this.currentOperand = '0';
      this.updateDisplay();
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      if (this.currentOperand === '0' && number !== '.') {
        this.currentOperand = number;
      } else {
        this.currentOperand += number;
      }
      this.updateDisplay();
    }
  
    appendOperator(operation) {
      if (this.currentOperand === 'Error') return;
      if (this.operation !== undefined) {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '0';
      this.updateDisplay();
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      
      if (isNaN(prev) || isNaN(current)) return;
      
      try {
        switch (this.operation) {
          case '+':
            computation = prev + current;
            break;
          case '-':
            computation = prev - current;
            break;
          case '*':
            computation = prev * current;
            break;
          case '/':
            if (current === 0) throw new Error('Division by zero');
            computation = prev / current;
            break;
          default:
            return;
        }
  
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
      } catch (error) {
        this.currentOperand = 'Error';
        this.operation = undefined;
        this.previousOperand = '';
      }
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.currentOperationElement.textContent = this.currentOperand;
      if (this.operation != null) {
        this.previousOperationElement.textContent = 
          `${this.previousOperand} ${this.operation}`;
      } else {
        this.previousOperationElement.textContent = '';
      }
    }
  }
  
  const calculator = new Calculator();