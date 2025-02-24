import { useState } from "react";
import { savePensionNumbers } from "../utils/firestore";
import "./PensionGenerator.css";

const generatePensionNumbers = (): number[] => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)); // ✅ 중복 허용
};

const getBallClass = (number: number) => {
  if (number >= 0 && number <= 1) return "range-1";
  if (number >= 2 && number <= 3) return "range-2";
  if (number >= 4 && number <= 5) return "range-3";
  if (number >= 6 && number <= 7) return "range-4";
  if (number >= 8 && number <= 9) return "range-5";
  return "range-6"; // 예외 처리
};

const PensionGenerator = ({
  onRefresh,
  darkMode,
}: {
  onRefresh: () => void;
  darkMode: boolean;
}) => {
  const [pensionNumbers, setPensionNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    setPensionNumbers(generatePensionNumbers()); // ✅ 중복 허용된 랜덤 번호 생성
  };

  const handleSave = async () => {
    if (pensionNumbers.length > 0) {
      await savePensionNumbers(pensionNumbers);
      alert("연금 복권 번호가 저장되었습니다!");
      onRefresh();
    } else {
      alert("먼저 연금 복권 번호를 생성해주세요!");
    }
  };

  return (
    <div className={`pension-generator ${darkMode ? "dark" : "light"}`}>
      <h2>연금복권720+ 랜덤 번호</h2>
      <button className="generate-button" onClick={handleGenerate}>
        번호 생성
      </button>
      <button className="generate-button" onClick={handleSave}>
        저장하기
      </button>
      <div className="pension-numbers">
        {pensionNumbers.map((num, index) => (
          <div key={index} className={`pension-ball ${getBallClass(num)}`}>
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PensionGenerator;
