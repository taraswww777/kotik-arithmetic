import { Example, GeneratorOptions } from './types';
import { defaultSettings } from '../config/settings';

export function generateExample(level: 'basic' | 'advanced', options: GeneratorOptions): Example {
  const config = getDefaultConfigForLevel(level);
  const operationSet = getOperationSet(options.operationSet || 'allOperations');
  
  const operators = operationSet;
  const maxNumber = config.maxNumber;
  
  const operatorIndex = Math.floor(Math.random() * operators.length);
  const operator = operators[operatorIndex];
  
  let leftOperand, rightOperand, result;
  
  if (operator === '+') {
    // Сложение: a + b = c
    leftOperand = randomNumber(1, maxNumber);
    rightOperand = randomNumber(1, maxNumber - leftOperand);
    result = leftOperand + rightOperand;
  } else if (operator === '-') {
    // Вычитание: a - b = c (так чтобы результат >= 0)
    const targetResult = randomNumber(1, Math.floor(maxNumber / 2));
    rightOperand = randomNumber(1, maxNumber - targetResult);
    leftOperand = result + rightOperand;
    result = leftOperand - rightOperand;
  } else if (operator === '*') {
    // Умножение: a × b = c
    const maxProduct = maxNumber * maxNumber;
    const targetResult = randomDivisible(maxProduct, maxNumbers[config.difficultyLevel].maxNumber);
    const divisor1 = getRandomDivisor(targetResult);
    rightOperand = getRandomDivisor(targetResult / divisor1);
    leftOperand = targetResult / rightOperand;
    result = leftOperand * rightOperand;
  } else if (operator === '/') {
    // Деление: a ÷ b = c (только нацело!)
    const maxQuotient = Math.floor(maxNumber / 2);
    const targetResult = randomNumber(1, maxQuotient);
    const divisor = getRandomDivisor(targetResult * maxNumber);
    leftOperand = targetResult * divisor;
    rightOperand = divisor;
    result = leftOperand / rightOperand;
  }
  
  return {
    leftOperand,
    rightOperand,
    operator,
    result,
  };
}

function getDefaultConfigForLevel(level: 'basic' | 'advanced'): { maxNumber: number; difficultyLevel: string } {
  const levelMap = {
    basic: 'elementary',
    advanced: 'upperSecondary',
  };
  return { maxNumber: defaultSettings.difficultyLevel === 'elementary' ? 10 : 50, difficultyLevel: levelMap[level] };
}

function getOperationSet(setName: keyof typeof operationSets): ['+', '-'] | ['*', '/'] | ['+', '-', '*', '/'] {
  return operationSets[setName];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDivisible(max: number, divisor: number): number {
  const maxDivisor = Math.min(maxNumber(max), divisor);
  if (maxDivisor < 2) return randomNumber(1, 5);
  const maxQuotient = Math.floor(max / maxDivisor);
  const quotient = randomNumber(1, maxQuotient);
  return quotient * maxDivisor;
}

function getRandomDivisor(n: number): number {
  const factors = getAllFactors(n);
  const index = Math.floor(Math.random() * factors.length);
  return factors[index];
}

function getAllFactors(n: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

function maxNumber(max: number): number {
  const levels = { elementary: 10, primary: 20, lowerSecondary: 30, upperSecondary: 50 };
  return levels[max as keyof typeof levels] || max;
}