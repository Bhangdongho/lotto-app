// src/utils/generateLotto.ts

export const generateLottoNumbers = (): number[] => {
  const numbers: number[] = [];

  while (numbers.length < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1; // 1~45 사이의 랜덤 숫자
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum); // 중복되지 않으면 추가
    }
  }

  return numbers.sort((a, b) => a - b); // 오름차순 정렬
};
