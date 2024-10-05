// 마우스 위치에 따라 터렛 이미지를 회전시키는 함수
export const rotateTurretToMouse = (turretRef) => {
  const handleMouseMove = (e) => {
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

      // 각도를 도(degree)로 변환하고 터렛에 적용
      const rotation = (angle * 180) / Math.PI;
      turretRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  };

  // 마우스 이동 이벤트 리스너 추가
  window.addEventListener("mousemove", handleMouseMove);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
};
