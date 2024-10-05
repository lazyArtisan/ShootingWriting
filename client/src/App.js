import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { initializePhaserGame } from "./component/PhaserGame"; // Phaser 초기화 함수 불러오기
import { createPieces } from "./component/animationUtils"; // 애니메이션 함수 불러오기
import { createLetter } from "./component/letterUtils"; // 랜덤 알파벳 함수 불러오기
import { createTurret } from "./component/createTurret"; // 모듈화된 Turret 생성 함수 불러오기
import "./App.css"; // CSS 파일 불러오기

function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const loginButtonRef = useRef(null);
  const containerRef = useRef(null); // login-container 참조를 위한 ref
  const canvasRef = useRef(null); // 캔버스 요소를 참조하기 위한 ref
  const turretRef = useRef(null); // 터렛 이미지 참조를 위한 ref

  // 각각의 클릭 여부를 추적하는 상태
  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false); // 캔버스가 표시되는 상태
  const [isTurretCreated, setIsTurretCreated] = useState(false); // Turret 이미지가 생성되었는지 여부
  const [phaserInitialized, setPhaserInitialized] = useState(false); // Phaser가 초기화되었는지 여부

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
            setInterval(createLetter, 100); // 0.1초마다 새로운 글자를 생성
          },
        });
      }, 2000); // 2초 지연 후 실행
    }
  };

  // 클릭 상태가 변경될 때마다 확인
  useEffect(() => {
    checkAllClicked();
  }, [isUsernameClicked, isPasswordClicked, isLoginClicked]);

  // 캔버스가 표시되면 Phaser 게임을 초기화 및 Turret 생성
  useEffect(() => {
    if (isCanvasVisible && canvasRef.current && !phaserInitialized) {
      console.log("Canvas now visible:", canvasRef.current);
      initializePhaserGame("phaser-container");
      createTurret(canvasRef, turretRef, isTurretCreated, setIsTurretCreated);
      setPhaserInitialized(true); // Phaser가 한 번만 초기화되도록 설정
    }
  }, [isCanvasVisible, canvasRef, turretRef, isTurretCreated, phaserInitialized]); // 필요한 변수들을 의존성 배열에 추가

  // 클릭 시마다 총알 발사
  const fireBullet = () => {
    console.log("pretend fired");
  };

  // 캔버스가 표시됐고 스위치가 활성화됐다면 window에 클릭 이벤트 리스너 추가
  // 스위치가 비활성화된다면 이벤트 리스너 제거
  useEffect(() => {
    if (isCanvasVisible && canvasRef.current)
    {
      window.addEventListener('click', fireBullet);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('click', fireBullet);
    };
  }, [isCanvasVisible, canvasRef]);

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
        <div
          ref={canvasRef}
          id="phaser-container"
          className="phaser-container"
        ></div>
      )}
    </div>
  );
}

export default App;
