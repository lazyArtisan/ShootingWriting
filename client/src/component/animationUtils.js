import { gsap } from "gsap";

// 클릭 시 부서지는 애니메이션을 위한 함수
export const createPieces = (element) => {
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
