import React from "react";
import "./LottoBall.css";

const getBallClass = (number: number) => {
  if (number >= 1 && number <= 9) return "range-1";
  if (number >= 10 && number <= 19) return "range-2";
  if (number >= 20 && number <= 29) return "range-3";
  if (number >= 30 && number <= 39) return "range-4";
  if (number >= 40 && number <= 45) return "range-5";
  return "";
};

const LottoBall = ({ number }: { number: number }) => {
  return <div className={`lotto-ball ${getBallClass(number)}`}>{number}</div>;
};

export default LottoBall;
