import { useEffect, useState } from "react";
import { fetchPensionNumbers, deletePensionNumber } from "../utils/firestore";
import { Timestamp } from "firebase/firestore";
import "./PensionHistory.css";

type PensionEntry = {
  id: string;
  numbers: number[];
  createdAt: Timestamp;
};

const getBallClass = (number: number) => {
  if (number >= 1 && number <= 2) return "range-1";
  if (number >= 3 && number <= 4) return "range-2";
  if (number >= 5 && number <= 6) return "range-3";
  if (number >= 7 && number <= 8) return "range-4";
  if (number >= 9 && number <= 10) return "range-5";
  return "range-6";
};

const PensionHistory = ({
  refreshTrigger,
  darkMode,
}: {
  refreshTrigger: number;
  darkMode: boolean;
}) => {
  const [history, setHistory] = useState<PensionEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPages = 10;

  useEffect(() => {
    const getHistory = async () => {
      const data = await fetchPensionNumbers();
      setHistory(data);
    };
    getHistory();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    await deletePensionNumber(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));

    // 삭제 후 현재 페이지에 데이터가 없으면 이전 페이지로 이동
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
    <div className={`pension-history ${darkMode ? "dark" : "light"}`}>
      <h2>연금복권720+</h2>
      {history.length > 0 ? (
        <>
          <ul>
            {paginatedHistory.map((item) => (
              <li key={item.id}>
                <div className="pension-numbers">
                  {item.numbers.map((num, index) => (
                    <div
                      key={index}
                      className={`pension-ball ${getBallClass(num)}`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <small>
                  {new Intl.DateTimeFormat("ko-KR", {
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }).format(item.createdAt.toDate())}
                </small>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
          {/* 페이지네이션 컨트롤 */}
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
        <p>저장된 연금 복권 번호가 없습니다.</p>
      )}
    </div>
  );
};

export default PensionHistory;
