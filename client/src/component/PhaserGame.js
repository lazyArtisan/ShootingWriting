import Phaser from "phaser";

// Phaser 게임 초기화 함수
export const initializePhaserGame = (parentId) => {
  let player;
  let cursors;
  let zKey;
  let ground;
  let inputField;

  const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    parent: parentId,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 750 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    dom: {
      createContainer: true, // DOM 요소 활성화
    },
  };

  new Phaser.Game(config);

  function preload() {
    this.load.image("character", "/assets/character/idle.png");
    this.load.image("ground", "/assets/Tiles/floor.png");
    this.load.image("background", "/assets/Tiles/wall2.png");
  }

  function create() {
    // 배경 이미지 추가
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        this.add.image(50 + i * 100, 50 + j * 100, "background").setOrigin(0.5, 0.5).setDisplaySize(100, 100);
      }
    }

    // 바닥 생성
    ground = this.physics.add.staticGroup();
    for (let i = 0; i < 7; i++) {
      ground.create(100 * i, 390, "ground").setScale(2).refreshBody();
    }

    // 캐릭터 추가
    player = this.physics.add.sprite(300, 250, "character");
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, ground);

    // 키보드 입력 감지
    cursors = this.input.keyboard.createCursorKeys();
    zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    // HTML 입력 창을 Phaser 위에 추가
    inputField = this.add.dom(this.cameras.main.width / 2, 50).createFromHTML(`
      <input type="text" id="player-input" name="player-input" placeholder="Enter your name..." 
             style="font-size: 24px; width: 200px; padding: 10px;"/>
    `);
    inputField.setOrigin(0.5);
    inputField.setDepth(10); // 다른 요소들 위에 표시되도록 설정

    // 입력 이벤트 리스너 추가
    inputField.addListener('input').on('input', function (event) {
      const inputValue = event.target.value;
      console.log("Current input value:", inputValue);
    });
  }

  function update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-320); // 왼쪽 이동
    } else if (cursors.right.isDown) {
      player.setVelocityX(320); // 오른쪽 이동
    } else {
      player.setVelocityX(0); // 정지
    }

    if (Phaser.Input.Keyboard.JustDown(zKey) && player.body.touching.down) {
      player.setVelocityY(-400); // 점프
    }
  }
};
