export const difficultyLevels = {
  elementary: { maxNumber: 10 },      // 1 + 2, 5 - 3
  primary: { maxNumber: 20 },         // 7 × 8, 48 ÷ 6
  lowerSecondary: { maxNumber: 30 },  // 12 × 9, 72 ÷ 8
  upperSecondary: { maxNumber: 50 },  // 15 × 7, 90 ÷ 5
};

export type DifficultyLevel = keyof typeof difficultyLevels;
