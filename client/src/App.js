import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";

function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const loginButtonRef = useRef(null);
  const containerRef = useRef(null); // login-container 참조를 위한 ref

  // 각각의 클릭 여부를 추적하는 상태
  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  // 클릭 시 부서지는 애니메이션을 위한 함수
  const createPieces = (element) => {
    const rect = element.getBoundingClientRect(); // 요소 위치 정보
    const pieceCount = 50; // 조각 수
    element.style.visibility = "hidden"; // 요소 숨김

    for (let i = 0; i < pieceCount; i++) {
      const piece = document.createElement("div");
      piece.innerText = "■"; // 조각 모양
      piece.classList.add("piece");
      document.body.appendChild(piece);

      // 조각의 초기 위치를 요소 위에 설정
      piece.style.left = `${rect.left + Math.random() * rect.width}px`;
      piece.style.top = `${rect.top + Math.random() * rect.height}px`;

      // GSAP 애니메이션 적용: 조각들이 랜덤하게 흩어짐
      gsap.to(piece, {
        x: Math.random() * 500 - 250,
        y: Math.random() * 500 - 250,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        onComplete: () => piece.remove(), // 애니메이션 후 조각 제거
      });
    }
  };

  // 각각의 요소에 클릭 이벤트를 추가
  const handleUsernameClick = () => {
    createPieces(usernameRef.current);
    setIsUsernameClicked(true); // 상태 업데이트
  };

  const handlePasswordClick = () => {
    createPieces(passwordRef.current);
    setIsPasswordClicked(true); // 상태 업데이트
  };

  const handleLoginClick = () => {
    createPieces(loginButtonRef.current);
    setIsLoginClicked(true); // 상태 업데이트
  };

  // 세 개의 클릭 이벤트가 모두 발생했는지 확인하는 함수
  const checkAllClicked = () => {
    if (isUsernameClicked && isPasswordClicked && isLoginClicked) {
      setTimeout(() => {
        // 2초 후 login-container 크기 확대 애니메이션
        gsap.to(containerRef.current, {
          width: "600px",
          height: "400px",
          duration: 2,
          ease: "power2.inOut",
        });
      }, 2000); // 2초 지연 후 실행
    }
  };

  // 클릭 상태가 변경될 때마다 확인
  useEffect(() => {
    checkAllClicked();
  }, [isUsernameClicked, isPasswordClicked, isLoginClicked]);

  return (
    <div ref={containerRef} className="login-container">
      <input
        ref={usernameRef}
        type="text"
        placeholder="Username"
        onClick={handleUsernameClick}
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        onClick={handlePasswordClick}
      />
      <button ref={loginButtonRef} onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
}

export default App;
