import { useNavigate, Outlet } from 'react-router-dom'
import '../../styles/home.css';
import '../../styles/mypage.css';
const MyPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div>
                {/*상단 탭 메뉴 (헤더는 레이아웃에서 렌더링) */}
                <nav className='selectTab'>
                    <span onClick={() => navigate("/mypage")}>대시보드</span>
                    <span onClick={() => navigate("/mypage/study-anal")}>학습 분석</span>
                    <span onClick={() => navigate("/mypage/wrong-note")}>오답 노트</span>
                    <span onClick={()=> navigate("/mypage/achievment")}>성취도</span>
                    <span onClick={()=> navigate("/mypage/settings")}>설정</span>
                </nav>
            </div>
            <div className='mypage-container'>
                <Outlet/>
            </div>
        </div>
    );
}
export default MyPage;