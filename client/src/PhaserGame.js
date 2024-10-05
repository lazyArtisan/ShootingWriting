import Phaser from "phaser";

// Phaser 게임 초기화 함수
export const initializePhaserGame = (parentId) => {
  let player;
  let cursors;
  let zKey;
  let ground; // 바닥(ground) 추가

  const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    parent: parentId, // Phaser가 렌더링될 div 또는 canvas
    physics: {
      default: "arcade", // 물리 엔진 활성화
      arcade: {
        gravity: { y: 750 }, // 중력 설정
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  new Phaser.Game(config);

  // preload 함수: 게임에서 사용할 리소스를 로드
  function preload() {
    this.load.image("character", "/assets/character/idle.png");
      this.load.image("ground", "/assets/Tiles/floor.png"); // 바닥 이미지 로드
      this.load.image("background", "/assets/Tiles/wall2.png"); // 배경 이미지 로드
  }

  // create 함수: 게임 로직을 초기화
  function create() {
      // 배경 이미지 추가 (배경을 화면 중앙에 배치)
      for (let i = 0; i < 7; i++)
      {
          for (let j = 0; j < 7; j++)
          {
              this.add.image(50+i*100, 50+j*100, "background").setOrigin(0.5, 0.5).setDisplaySize(100, 100);  
          }
            
      }
          
    
    // 바닥 생성
    ground = this.physics.add.staticGroup(); // 정적인(움직이지 않는) 물체 그룹 생성

    // 반복문을 통해 바닥을 여러 개 생성
    for (let i = 0; i < 7; i++) {
    ground.create(100 * i, 390, "ground").setScale(2).refreshBody(); // 바닥을 여러 위치에 생성
    }

    // 캐릭터 스프라이트 추가
    player = this.physics.add.sprite(300, 250, "character");

    // 캐릭터가 화면 바깥으로 나가지 못하게 설정
    player.setCollideWorldBounds(true);

    // 바닥과 캐릭터 간의 충돌 설정
    this.physics.add.collider(player, ground);

    // 좌우 이동을 위한 키보드 입력 감지
    cursors = this.input.keyboard.createCursorKeys();

    // Z 키 입력 감지
    zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  }

  // update 함수: 매 프레임마다 호출되는 로직
  function update() {
    // 좌우 이동 로직
    if (cursors.left.isDown) {
      player.setVelocityX(-320); // 왼쪽 이동
    } else if (cursors.right.isDown) {
      player.setVelocityX(320); // 오른쪽 이동
    } else {
      player.setVelocityX(0); // 정지
    }

    // Z 키가 눌렸고, 캐릭터가 바닥에 닿아 있을 때만 점프
    if (Phaser.Input.Keyboard.JustDown(zKey) && player.body.touching.down) {
      console.log('Jumping');
      player.setVelocityY(-400); // 위쪽으로 점프
    }
  }
};
