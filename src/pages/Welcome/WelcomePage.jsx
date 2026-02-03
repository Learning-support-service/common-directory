import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/welcome.css";

export default function WelcomePage() {
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const [isSucking, setIsSucking] = useState(false);
  const SUCK_MS = 720;

  const startSuckNavigate = (to, el) => {
    if (isSucking) return;

    // 모션 최소화 설정이면 애니메이션 없이 즉시 이동
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      navigate(to);
      return;
    }

    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    // CSS 변수로 버튼 중심/크기/위치 전달 (px)
    const root = rootRef.current;
    if (root) {
      root.style.setProperty("--suck-x", `${cx}px`);
      root.style.setProperty("--suck-y", `${cy}px`);
      root.style.setProperty("--suck-left", `${r.left}px`);
      root.style.setProperty("--suck-top", `${r.top}px`);
      root.style.setProperty("--suck-w", `${r.width}px`);
      root.style.setProperty("--suck-h", `${r.height}px`);
    }

    // ✅ 이중 RAF로 CSS 변수 완전 반영 보장
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsSucking(true);
      });
    });

    // 애니메이션 끝쯤에 라우팅
    window.setTimeout(() => {
      navigate(to);
    }, SUCK_MS);
  };

  return (
    <div
      className="welcome-root"
      ref={rootRef}
      data-sucking={isSucking ? "1" : "0"}
    >
      {/* stage: 여기 전체를 버튼으로 빨아들이는 애니메이션 대상으로 */}
      <div className={`welcome-stage ${isSucking ? "is-sucking" : ""}`}>
        {/* 상단 네비게이션 바 */}
        <header className="welcome-nav">
          <div className="welcome-container nav-inner">
            <button className="brand" onClick={() => navigate("/")} aria-label="홈으로 이동">
              📘 CSTime
            </button>

            <div className="nav-actions">
              <button
                className="btn ghost"
                onClick={(e) => startSuckNavigate("/auth/login", e.currentTarget)}
              >
                로그인
              </button>
              <button
                className="btn primary"
                onClick={(e) => startSuckNavigate("/auth/signIn", e.currentTarget)}
              >
                회원가입
              </button>
            </div>
          </div>
        </header>

        {/* 히어로 섹션 */}
        <main className="welcome-hero">
          <div className="welcome-container hero-inner">
            <div className="hero-badge">Beta</div>
            <h1 className="hero-title">
              📘 CSTime
            </h1>
            <p className="hero-sub">
              운영체제 · 자료구조 · 웹프레임워크를 중심으로<br />
              당신의 속도에 맞춘 학습 경험을 제공합니다.
            </p>

            <div className="hero-ctas">
              <button
                className="btn xl primary pulse"
                onClick={(e) => startSuckNavigate("/auth/signIn", e.currentTarget)}
                aria-label="회원가입 페이지로 이동"
              >
                ✨ 무료로 시작하기
              </button>
              <button
                className="btn xl secondary"
                onClick={(e) => startSuckNavigate("/auth/login", e.currentTarget)}
                aria-label="로그인 페이지로 이동"
              >
                🔐 로그인
              </button>
            </div>
          </div>

          {/* 장식용 배경 */}
          <div className="bg-gradient" />
          <div className="glow glow-1" />
          <div className="glow glow-2" />
        </main>

        {/* 프로젝트 쇼케이스 섹션 - 3D 프레임 효과 */}
        <section className="welcome-showcase">
          <div className="welcome-container">
            <div className="showcase-frame">
              <div className="frame-3d">
                <div className="frame-content">
                  <div className="showcase-header">
                    <h2 className="showcase-title">학습에 집중하세요</h2>
                    <p className="showcase-subtitle">나머지는 우리가 돕겠습니다</p>
                  </div>
                  
                  <div className="showcase-grid">
                    <div className="showcase-item">
                      <div className="item-number">01</div>
                      <h3>운영체제 (OS)</h3>
                      <p>프로세스, 스레드, 메모리 관리부터 파일 시스템까지 체계적으로 학습</p>
                    </div>
                    <div className="showcase-item">
                      <div className="item-number">02</div>
                      <h3>자료구조 (DS)</h3>
                      <p>배열, 리스트, 트리, 그래프 등 핵심 자료구조를 실전 문제로 완성</p>
                    </div>
                    <div className="showcase-item">
                      <div className="item-number">03</div>
                      <h3>웹 프레임워크</h3>
                      <p>React, Vue, Spring 등 현업 필수 프레임워크 개념 마스터</p>
                    </div>
                  </div>

                  <div className="showcase-stats">
                    <div className="stat-item">
                      <span className="stat-value">500+</span>
                      <span className="stat-label">준비된 문제</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">직업 분석</span>
                      <span className="stat-label">AI가 분석해주는 내 적성</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">24/7</span>
                      <span className="stat-label">언제든지</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기능 하이라이트 */}
        <section className="welcome-features">
          <div className="welcome-container features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>빠른 시작</h3>
              <p>로그인 후 즉시 학습을 시작하고, 진행 상황을 자동으로 저장합니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>진행 추적</h3>
              <p>정답률과 학습 스트릭을 한눈에 확인하고 동기부여를 유지하세요.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧭</div>
              <h3>맞춤 흐름</h3>
              <p>난이도에 따라 단계적으로 학습하며, 곧 모의고사 모드도 제공됩니다.</p>
            </div>
          </div>
        </section>
      </div>

      {/* 흡입 전환 오버레이(효과용) */}
      {isSucking && (
        <>
          <div className="suck-overlay" aria-hidden="true" />
          <div className="suck-iris" aria-hidden="true" />
        </>
      )}
    </div>
  );
}
