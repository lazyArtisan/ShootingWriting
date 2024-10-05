import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { initializePhaserGame } from "./PhaserGame"; // Phaser 게임 초기화 함수를 불러옴
import "./App.css";

// 랜덤 알파벳 생성 함수
const getRandomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return letters[Math.floor(Math.random() * letters.length)];
};

// 랜덤 알파벳을 생성하고 화면에서 좌측으로 이동시키는 함수
const createLetter = () => {
  const letter = document.createElement("div");
  letter.innerText = getRandomLetter();
  letter.classList.add("moving-letter"); // 스타일을 적용할 클래스

  // 초기 위치 설정 (화면 오른쪽에서 나타남)
  letter.style.position = "absolute";
  letter.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // 화면 내에서 생성
  letter.style.left = `${window.innerWidth}px`; // 정확히 화면 오른쪽 끝에 위치

  // 문서를 추가하고 애니메이션
  document.body.appendChild(letter);

  // GSAP 애니메이션: 글자를 왼쪽으로 이동
  gsap.to(letter, {
    x: -window.innerWidth - 100, // 화면 왼쪽 바깥으로 이동
    duration: Math.random() * 5 + 3, // 랜덤 속도
    ease: "linear",
    onComplete: () => {
      letter.remove(); // 화면을 벗어나면 제거
    },
  });
};

function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const loginButtonRef = useRef(null);
  const containerRef = useRef(null); // login-container 참조를 위한 ref

  // 각각의 클릭 여부를 추적하는 상태
  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false); // 캔버스가 표시되는 상태

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
        // 2초 후 login-container 크기 확대 및 웹페이지 배경색 변경 애니메이션
        gsap.to([document.body, document.documentElement], {
          backgroundColor: "#000", // 웹페이지 전체 배경을 검정색으로 변경
          duration: 1,
          ease: "power2.inOut",
        });

        // 2초 후 login-container 크기 확대 애니메이션
        gsap.to(containerRef.current, {
          width: "600px",
          height: "400px",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setIsCanvasVisible(true); // 크기 변화 후 캔버스 표시 상태로 변경

            // 매트릭스 글자 탄막 시작
            setInterval(createLetter, 100); // 0.1초마다 새로운 글자를 생성
          },
        });
      }, 2000); // 2초 지연 후 실행
    }
  };

  // 캔버스가 표시되면 Phaser 게임을 초기화
  useEffect(() => {
    if (isCanvasVisible) {
      initializePhaserGame("phaser-container");
    }
  }, [isCanvasVisible]);

  // 클릭 상태가 변경될 때마다 확인
  useEffect(() => {
    checkAllClicked();
  }, [isUsernameClicked, isPasswordClicked, isLoginClicked]);

  return (
    <div ref={containerRef} className="login-container">
      {!isCanvasVisible ? (
        <>
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
        </>
      ) : (
        <div id="phaser-container" style={{ width: "600px", height: "400px" }}></div>
      )}
    </div>
  );
}

export default App;
