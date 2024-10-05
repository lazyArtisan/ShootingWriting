import Phaser from "phaser";

// Phaser 게임 초기화 함수
export const initializePhaserGame = (parentId) => {
  const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    parent: parentId, // Phaser가 렌더링될 div 또는 canvas
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  new Phaser.Game(config);

  // preload 함수: 게임에서 사용할 리소스를 로드
  function preload() {
    this.load.image("logo", "https://phaser.io/images/img.png");
  }

  // create 함수: 게임 로직을 초기화
  function create() {
    const logo = this.add.image(300, 200, "logo");
    this.tweens.add({
      targets: logo,
      y: 300,
      duration: 2000,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  // update 함수: 매 프레임마다 호출되는 로직
  function update() {
    // 업데이트할 게임 로직이 있다면 여기서 구현
  }
};
