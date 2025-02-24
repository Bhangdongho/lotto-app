import { useState } from "react";
import { saveLottoNumbers } from "../utils/firestore";
import LottoBall from "./LottoBall"; // ✅ 추가
import "./LottoGenerator.css";

const generateLottoNumbers = (): number[] => {
  const numbers = new Set<number>();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

const LottoGenerator = ({
  onRefresh,
  darkMode,
}: {
  onRefresh: () => void;
  darkMode: boolean;
}) => {
  const [lottoNumbers, setLottoNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    setLottoNumbers(generateLottoNumbers());
  };

  const handleSave = async () => {
    if (lottoNumbers.length > 0) {
      await saveLottoNumbers(lottoNumbers);
      alert("로또 번호가 저장되었습니다!");
      onRefresh();
    } else {
      alert("먼저 로또 번호를 생성해주세요!");
    }
  };

  return (
    <div className={`lotto-generator ${darkMode ? "dark" : "light"}`}>
      <h2>로또6/45 랜덤 번호</h2>
      <button onClick={handleGenerate}>번호 생성</button>
      <button onClick={handleSave}>저장하기</button>
      <div className="lotto-numbers">
        {lottoNumbers.map((num, index) => (
          <LottoBall key={index} number={num} />
        ))}
      </div>
    </div>
  );
};

export default LottoGenerator;
