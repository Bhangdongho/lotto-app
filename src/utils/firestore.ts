import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

export type LottoEntry = {
  id: string;
  numbers: number[];
  createdAt: Timestamp;
};

export type PensionEntry = {
  id: string;
  numbers: number[];
  createdAt: Timestamp;
};

// ✅ 최대 저장 개수 설정 (50개)
const MAX_HISTORY = 50;

// 🔥 로또 번호 저장 함수 (최대 50개 유지)
export const saveLottoNumbers = async (numbers: number[]) => {
  try {
    await addDoc(collection(db, "lottoNumbers"), {
      numbers,
      createdAt: Timestamp.now(), // ✅ Firestore Timestamp 사용
    });

    console.log("✅ 로또 번호 저장 완료:", numbers);

    // ✅ 저장 개수 제한 (가장 오래된 데이터 삭제)
    const querySnapshot = await getDocs(
      query(collection(db, "lottoNumbers"), orderBy("createdAt"))
    );
    if (querySnapshot.docs.length > MAX_HISTORY) {
      const excessItems = querySnapshot.docs.slice(
        0,
        querySnapshot.docs.length - MAX_HISTORY
      );
      for (const item of excessItems) {
        await deleteDoc(doc(db, "lottoNumbers", item.id));
      }
    }
  } catch (error) {
    console.error("🔥 로또 번호 저장 실패:", error);
  }
};

// 🔥 저장된 로또 번호 불러오기 (최신순 정렬, 최대 50개)
export const fetchLottoNumbers = async (): Promise<LottoEntry[]> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "lottoNumbers"),
        orderBy("createdAt", "desc"),
        limit(50)
      )
    );
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        numbers: data.numbers || [], // ✅ 기본 값 설정
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt
            : Timestamp.fromDate(new Date()), // ✅ Timestamp 변환
      };
    });
  } catch (error) {
    console.error("🔥 로또 번호 불러오기 실패:", error);
    return [];
  }
};

// 🔥 로또 번호 개별 삭제 기능 추가
export const deleteLottoNumber = async (id: string) => {
  try {
    await deleteDoc(doc(db, "lottoNumbers", id));
    console.log("✅ 로또 번호 삭제 완료:", id);
  } catch (error) {
    console.error("🔥 로또 번호 삭제 실패:", error);
  }
};

// 🔥 연금 복권 번호 저장 기능 (최대 50개 유지)
export const savePensionNumbers = async (numbers: number[]) => {
  try {
    await addDoc(collection(db, "pensionNumbers"), {
      numbers,
      createdAt: Timestamp.now(), // ✅ Firestore Timestamp 사용
    });

    console.log("✅ 연금 복권 번호 저장 완료:", numbers);

    // ✅ 저장 개수 제한 (가장 오래된 데이터 삭제)
    const querySnapshot = await getDocs(
      query(collection(db, "pensionNumbers"), orderBy("createdAt"))
    );
    if (querySnapshot.docs.length > MAX_HISTORY) {
      const excessItems = querySnapshot.docs.slice(
        0,
        querySnapshot.docs.length - MAX_HISTORY
      );
      for (const item of excessItems) {
        await deleteDoc(doc(db, "pensionNumbers", item.id));
      }
    }
  } catch (error) {
    console.error("🔥 연금 복권 번호 저장 실패:", error);
  }
};

// 🔥 저장된 연금 복권 번호 불러오기 (최신순 정렬, 최대 50개)
export const fetchPensionNumbers = async (): Promise<PensionEntry[]> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "pensionNumbers"),
        orderBy("createdAt", "desc"),
        limit(50)
      )
    );
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        numbers: data.numbers || [], // ✅ 기본 값 설정
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt
            : Timestamp.fromDate(new Date()), // ✅ Timestamp 변환
      };
    });
  } catch (error) {
    console.error("🔥 연금 복권 번호 불러오기 실패:", error);
    return [];
  }
};

// 🔥 연금 복권 번호 개별 삭제 기능 추가
export const deletePensionNumber = async (id: string) => {
  try {
    await deleteDoc(doc(db, "pensionNumbers", id));
    console.log("✅ 연금 복권 번호 삭제 완료:", id);
  } catch (error) {
    console.error("🔥 연금 복권 번호 삭제 실패:", error);
  }
};
