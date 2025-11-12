// src/pages/SelectCourse/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import SelectPage from "../../components/SelectCourse/selectPage";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = (payload) => {
    // payload에는 subject, difficulty, mode, studyTimeMin 등이 포함되어 있음
    navigate("/problem", { 
      state: payload 
    });
  };

  return <SelectPage onStart={handleStart} />;
}