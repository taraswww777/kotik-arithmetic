import { difficultyLevels } from './difficulty';

export const generatorConfig = {
  minNumber: 1,
  maxNumbers: difficultyLevels,
};

export type GeneratorConfig = typeof generatorConfig;