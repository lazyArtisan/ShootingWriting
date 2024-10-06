import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { initializePhaserGame } from "./component/PhaserGame"; // Phaser 초기화 함수 불러오기
import { createPieces } from "./component/animationUtils"; // 애니메이션 함수 불러오기
import { createLetter } from "./component/letterUtils"; // 랜덤 알파벳 함수 불러오기
import { createTurret } from "./component/createTurret"; // 모듈화된 Turret 생성 함수 불러오기
import { fireBullet } from "./component/bulletUtils";
import "./App.css"; // CSS 파일 불러오기

function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const loginButtonRef = useRef(null);
  const containerRef = useRef(null); // login-container 참조를 위한 ref
  const canvasRef = useRef(null); // 캔버스 요소를 참조하기 위한 ref
  const turretRef = useRef(null); // 터렛 이미지 참조를 위한 ref
  const nicknameRef = useRef(null); // 닉네임 입력 참조를 위한 ref

  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false); // 캔버스가 표시되는 상태
  const [isTurretCreated, setIsTurretCreated] = useState(false); // Turret 이미지가 생성되었는지 여부
  const [phaserInitialized, setPhaserInitialized] = useState(false); // Phaser가 초기화되었는지 여부
  const [isPopupVisible, setIsPopupVisible] = useState(false); // 팝업창 표시 여부
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태

  // 컴포넌트가 처음 렌더링될 때 세션 스토리지 초기화
  useEffect(() => {
    sessionStorage.clear(); // 세션 스토리지 초기화
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 마운트될 때만 실행

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
          },
        });
      }, 2000); // 2초 지연 후 실행
    }
  };

  useEffect(() => {
    if (isCanvasVisible)
      setInterval(createLetter, 100); // 0.1초마다 새로운 글자를 생성
  }, [isCanvasVisible]); // 캔버스가 표시될 때만 실행

  // 클릭 상태가 변경될 때마다 확인
  useEffect(() => {
    checkAllClicked();
  }, [isUsernameClicked, isPasswordClicked, isLoginClicked]);

  // 캔버스가 표시되면 Phaser 게임을 초기화 및 Turret 생성
  useEffect(() => {
    if (isCanvasVisible && canvasRef.current && !phaserInitialized) {
      console.log("Canvas now visible:", canvasRef.current);
      initializePhaserGame("phaser-container", showPopup);
      createTurret(canvasRef, turretRef, isTurretCreated, setIsTurretCreated);
      setPhaserInitialized(true); // Phaser가 한 번만 초기화되도록 설정
    }
  }, [isCanvasVisible, canvasRef, turretRef, isTurretCreated, phaserInitialized]); // 필요한 변수들을 의존성 배열에 추가

  // 클릭 시마다 총알 발사
  const handleFireBullet = () => {
    fireBullet(turretRef);
  };

  // 캔버스가 표시됐고 스위치가 활성화됐다면 window에 클릭 이벤트 리스너 추가
  // 스위치가 비활성화된다면 이벤트 리스너 제거
  useEffect(() => {
    if (isCanvasVisible && canvasRef.current && turretRef.current)
    {
      window.addEventListener('click', handleFireBullet);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('click', handleFireBullet);
    };
  }, [isCanvasVisible, canvasRef, turretRef]);

  // React 컴포넌트에서 서버로 데이터 요청
  useEffect(() => {
    if (isPopupVisible && isLoggedIn) {
      fetch('http://localhost:5000/api/posts') // Node.js 서버로부터 데이터 요청
        .then((response) => response.json())
        .then((data) => {
          setPosts(data); // 받은 데이터를 상태에 저장
          setLoading(false); // 로딩 완료
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          setLoading(false);
        });
    }
  }, [isPopupVisible, isLoggedIn]); // 팝업이 열릴 때만 데이터를 요청

  // 팝업창을 여는 함수
  const showPopup = () => {
    setIsPopupVisible(true); // 팝업창을 보이도록 상태 업데이트
  };

  // 팝업창을 닫는 함수
  const closePopup = () => {
    setIsPopupVisible(false); // 팝업창을 숨김
  };

  // 로그인 버튼을 눌렀을 때 로그인 상태로 전환
  const handleLogin = () => {
    const nicknameValue = nicknameRef.current.value; // input 필드의 값을 가져옴
    sessionStorage.setItem('nickname', nicknameValue); // 세션 스토리지에 닉네임 저장
    setIsLoggedIn(true); // 로그인 상태로 전환
    console.log('닉네임:', nicknameValue);
  };

  return (
    <div>
      {/* 가짜 로그인 화면 */} 
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

      {/* 팝업창이 보이는 경우에만 렌더링 */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            {/* 우측 상단 닫기 버튼 */}
            <button className="close-button-top-right" onClick={closePopup}>
              &times;
            </button>

            {/* 로그인 여부에 따라 다른 콘텐츠 렌더링 */}
            {!isLoggedIn ? (
              <div className="login-form">
                <h2>닉네임 입력</h2>
                <input type="text" id="nickname" placeholder="닉네임" className="login-input" ref={nicknameRef} />
                &nbsp;&nbsp;&nbsp;
                <button className="login-button" onClick={handleLogin}>
                  확인
                </button>
              </div>
            ) : (
              <>
                <h2>게시판</h2>
                {loading ? (
                  <p>로딩 중...</p> // 로딩 중일 때 표시
                ) : (
                  <div className="post-list">
                    {posts.map((post) => (
                      <div key={post.id} className="post-card">
                        <div className="post-header">
                          <div className="post-user-info">
                            <p className="post-username">{post.nickname}</p> {/* 사용자명 */}
                          </div>
                        </div>
                        <p className="post-content">{post.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={closePopup}>닫기</button> {/* 하단 닫기 버튼 */}
              </>
            )}
          </div>
        </div>
      )}
    </div>
    
  );
}

export default App;
