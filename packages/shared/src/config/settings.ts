export type Settings = {
  difficultyLevel: DifficultyLevel;
  operations: Operation[];
  multiplicationSymbol: '×' | '*';
  divisionSymbol: '÷' | ':';
};

export const defaultSettings: Settings = {
  difficultyLevel: 'elementary',       // до 10
  operations: ['+', '+'],              // только сложение
  multiplicationSymbol: '×',          // × вместо *
  divisionSymbol: '÷',                // ÷ вместо :
};

export type DifficultyLevel = keyof typeof difficultyLevels;
