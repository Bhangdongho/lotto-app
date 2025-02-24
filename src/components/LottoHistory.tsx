import { useEffect, useState } from "react";
import { fetchLottoNumbers, deleteLottoNumber } from "../utils/firestore";
import { Timestamp } from "firebase/firestore";
import "./LottoHistory.css";

type LottoEntry = {
  id: string;
  numbers: number[];
  createdAt: Timestamp;
};

const getBallClass = (number: number) => {
  if (number >= 1 && number <= 9) return "range-1";
  if (number >= 10 && number <= 19) return "range-2";
  if (number >= 20 && number <= 29) return "range-3";
  if (number >= 30 && number <= 39) return "range-4";
  if (number >= 40 && number <= 45) return "range-5";
  return "";
};

const LottoHistory = ({
  refreshTrigger,
  darkMode,
}: {
  refreshTrigger: number;
  darkMode: boolean;
}) => {
  const [history, setHistory] = useState<LottoEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPages = 10;

  useEffect(() => {
    const getHistory = async () => {
      const data = await fetchLottoNumbers();
      setHistory(data);
    };
    getHistory();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    await deleteLottoNumber(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));

    if (
      (currentPage - 1) * itemsPerPage >= history.length - 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalPages = Math.min(
    Math.ceil(history.length / itemsPerPage),
    maxPages
  );
  const paginatedHistory = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`lotto-history ${darkMode ? "dark" : "light"}`}>
      <h2>로또6/45</h2>
      {history.length > 0 ? (
        <>
          <ul>
            {paginatedHistory.map((item) => (
              <li key={item.id}>
                <div className="lotto-numbers">
                  {item.numbers.map((num, index) => (
                    <div
                      key={index}
                      className={`lotto-ball ${getBallClass(num)}`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="history-footer">
                  <small>
                    {new Intl.DateTimeFormat("ko-KR", {
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false, // ✅ 24시간제 적용
                    }).format(item.createdAt.toDate())}
                  </small>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              다음
            </button>
          </div>
        </>
      ) : (
        <p>저장된 로또 번호가 없습니다.</p>
      )}
    </div>
  );
};

export default LottoHistory;
