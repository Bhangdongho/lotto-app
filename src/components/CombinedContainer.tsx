import { useState } from "react";
import LottoGenerator from "./LottoGenerator";
import LottoHistory from "./LottoHistory";
import PensionGenerator from "./PensionGenerator";
import PensionHistory from "./PensionHistory";
import "./CombinedContainer.css";

const CombinedContainer = ({ darkMode }: { darkMode: boolean }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className={`combined-container ${darkMode ? "dark" : "light"}`}>
      <h1>복권 랜덤 번호 돌리기</h1>
      <div className="generators">
        <LottoGenerator onRefresh={handleRefresh} darkMode={darkMode} />
        <PensionGenerator onRefresh={handleRefresh} darkMode={darkMode} />
      </div>
      <div className="histories">
        <LottoHistory refreshTrigger={refreshTrigger} darkMode={darkMode} />
        <PensionHistory refreshTrigger={refreshTrigger} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default CombinedContainer;
