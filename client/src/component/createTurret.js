import { rotateTurretToMouse } from "./rotateTurretToMouse"; // 마우스 커서를 향해 회전하는 함수

export const createTurret = (canvasRef, turretRef, isTurretCreated, setIsTurretCreated) => {
  if (!isTurretCreated && canvasRef.current) {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    console.log("Canvas bounds:", canvasRect); // 캔버스 위치 출력

    const turret = document.createElement("img");
    turret.src = "/assets/tank_turret.png"; // 이미지 경로 확인
    turret.className = "turret"; // CSS 클래스 적용

    // 우측 상단에 터렛 배치
    turret.style.position = "absolute";
    turret.style.top = `${canvasRect.top - 100}px`; 
    turret.style.left = `${canvasRect.right - 150}px`;

    document.body.appendChild(turret); // DOM에 터렛 추가

    turretRef.current = turret; // 터렛 참조 업데이트
    rotateTurretToMouse(turretRef); // 마우스 커서 방향으로 터렛 회전

    setIsTurretCreated(true); // 터렛 생성 상태 업데이트
  } else {
    console.log("Turret already created or canvas not found");
  }
};
