import { rotateTurretToMouse } from "./rotateTurretToMouse"; // 마우스 커서를 향해 회전하는 함수

export const createTurret = (canvasRef, turretRef, isTurretCreated, setIsTurretCreated) => {
  // 터렛 위치를 설정하는 함수 (공통)
  const updateElementPosition = (element, offsetTop, offsetLeft) => {
    if (canvasRef.current && element) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      element.style.top = `${canvasRect.top - offsetTop}px`;
      element.style.left = `${canvasRect.right - offsetLeft}px`;
    }
  };

  // 터렛과 터렛 몸체 위치 업데이트
  const updateTurretPosition = () => updateElementPosition(turretRef.current, 135, 155);
  const updateTurretBodyPosition = () => updateElementPosition(turretRef.currentBody, 125, 180);

  if (!isTurretCreated && canvasRef.current) {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    console.log("Canvas bounds:", canvasRect); // 캔버스 위치 출력

    // 터렛 이미지 요소 생성
    const turret = document.createElement("img");
    turret.src = "/assets/tank_turret.png"; // 이미지 경로 확인
    turret.className = "turret"; // CSS 클래스 적용
    turret.style.position = "absolute";
    updateElementPosition(turret, 135, 155);

    // 터렛 몸체 이미지 요소 생성
    const turret_body = document.createElement("img");
    turret_body.src = "/assets/tank_body.png"; // 이미지 경로 확인
    turret_body.className = "turret_body"; // CSS 클래스 적용
    turret_body.style.position = "absolute";
    updateElementPosition(turret_body, 125, 180);

    // DOM에 추가
    document.body.appendChild(turret);
    document.body.appendChild(turret_body);

    // 터렛과 몸체를 각각 ref로 저장
    turretRef.current = turret;
    turretRef.currentBody = turret_body; // 새로운 ref 추가
    rotateTurretToMouse(turretRef); // 마우스 커서 방향으로 터렛 회전

    setIsTurretCreated(true); // 터렛 생성 상태 업데이트

    // 창 크기 조정 시 터렛과 터렛 몸체 위치 업데이트
    window.addEventListener("resize", updateTurretPosition);
    window.addEventListener("resize", updateTurretBodyPosition);
  }

  // 컴포넌트가 언마운트되면 모든 이벤트 리스너 제거
  return () => {
    window.removeEventListener("resize", updateTurretPosition);
    window.removeEventListener("resize", updateTurretBodyPosition); // 터렛 몸체 이벤트 리스너 제거
  };
};
