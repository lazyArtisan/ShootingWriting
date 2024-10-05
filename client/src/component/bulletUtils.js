export const fireBullet = (turretRef) => {
  let lastFireTime = 0; // 마지막 발사 시간을 추적
  const fireCooldown = 500; // 500ms = 0.5초 간격으로 발사 제한

  // 총알을 발사하는 함수
  const handleMouseClick = (e) => {
    const currentTime = Date.now(); // 현재 시간 (밀리초)

    // 발사 딜레이를 체크하여 발사 가능 여부 확인
    if (currentTime - lastFireTime >= fireCooldown) {
      lastFireTime = currentTime; // 발사 성공 시 마지막 발사 시간 업데이트

      if (turretRef.current) {
        // 터렛 요소의 위치
        const turretRect = turretRef.current.getBoundingClientRect();
        const turretCenterX = turretRect.left + turretRect.width / 2;
        const turretCenterY = turretRect.top + turretRect.height / 2;

        // 마우스 위치
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // 마우스와 터렛 중심점 간의 각도 계산 (라디안)
        const angle = Math.atan2(mouseY - turretCenterY, mouseX - turretCenterX);

        // 총알 생성
        const bullet = document.createElement("div");
        bullet.className = "bullet"; // 총알에 사용할 스타일 클래스
        bullet.style.position = "absolute";
        bullet.style.width = "10px"; // 총알 크기
        bullet.style.height = "10px";
        bullet.style.backgroundColor = "red"; // 총알 색상
        bullet.style.borderRadius = "50%"; // 총알을 원형으로
        bullet.style.left = `${turretCenterX - 5}px`; // 터렛의 중심에서 발사
        bullet.style.top = `${turretCenterY - 5}px`;

        // 초기 transform 설정
        bullet.style.transform = 'translate(0, 0)';

        // 총알을 DOM에 추가
        document.body.appendChild(bullet);

        // 다음 프레임에서 transform 변경
        requestAnimationFrame(() => {
          // 총알의 방향에 따른 목표 위치 설정 (멀리 보냄)
          const targetX = Math.cos(angle) * 2000; // 1000px 이동
          const targetY = Math.sin(angle) * 2000;

          // CSS 트랜지션으로 총알 이동 애니메이션 처리
          bullet.style.transition = "transform 1s linear";
          bullet.style.transform = `translate(${targetX}px, ${targetY}px)`;
        });

        // 총알 제거: 1초 후 자동 제거
        setTimeout(() => {
          bullet.remove(); // 총알 제거
        }, 2000); // 1초 후 총알을 제거
      }
    }
  };

  // 마우스 클릭 이벤트 리스너 추가 (총알 발사)
  window.addEventListener("click", handleMouseClick);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => {
    window.removeEventListener("click", handleMouseClick);
  };
};
