// src/pages/SelectCourse/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import SelectPage from "../../components/SelectCourse/selectPage";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = (payload) => {
    // TODO: /quiz 또는 /exam으로 이동
    console.log('학습 시작:', payload);
    // navigate("/exam", { state: payload });
  };

  return <SelectPage onStart={handleStart} />;
}