import { IResultScore } from './type';

export function getWellnessType(scores: IResultScore): string {
  const types: (keyof IResultScore)[] = [
    '비우는 쉼표',
    '땀 흘리는 쉼표',
    '어울리는 쉼표',
    '채우는 쉼표',
    '피어나는 쉼표',
    '숨쉬는 쉼표',
    '이완하는 쉼표',
    '이것저것 쉼표',
  ];

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const average = total / types.length;

  const highCount = types.filter((t) => (scores[t] ?? 0) >= average * 0.8).length;

  if (highCount >= 6) {
    return '이것저것 쉼표';
  }

  const maxScore = Math.max(...types.map((t) => scores[t] ?? 0));
  if (maxScore === 0) {
    return '이것저것 쉼표';
  }

  const topTypes = types.filter((t) => (scores[t] ?? 0) === maxScore);
  return topTypes[0];
}
