import BaseScene from "./BaseScene";
import {
  BEST_SCORE_TEXT_OPTIONS,
  BIRD_GRAVITY,
  COUNTDOWN_INITIAL_TIME,
  COUNTDOWN_TEXT_OPTIONS,
  DEFAULT_PIPES_COLORS,
  DELAY_UNTIL_GAME_RESTART_AFTER_GAME_OVER_IN_MS,
  FLAP_VELOCITY,
  GAME_DIFFICULTIES,
  INITIAL_DIFFICULTY,
  PIPES_TO_RENDER,
  PIPES_X_VELOCITY,
  SCORE_TEXT_OPTIONS,
} from "../config";
import { Difficulties, GameDifficulty } from "../types";

class PlayScene extends BaseScene {
  // game assets
  bird: Phaser.Physics.Arcade.Sprite;
  pipes: Phaser.Physics.Arcade.Group;
  pipesColors: number[];
  pauseButton: Phaser.GameObjects.Image;
  // game config
  isPaused: boolean;
  initialTime: number;
  flapVelocity: number;
  score: number;
  bestScore: number;
  currentDifficulty: GameDifficulty;
  difficulties: Difficulties;
  // events
  pauseEvent: Phaser.Events.EventEmitter;
  timedEvent: Phaser.Time.TimerEvent;
  // text
  scoreText: Phaser.GameObjects.Text;
  bestScoreText: Phaser.GameObjects.Text;
  countDownText: Phaser.GameObjects.Text;

  constructor(config: any) {
    super("PlayScene", config);
    // game assets
    this.bird = null;
    this.pipes = null;
    this.pipesColors = DEFAULT_PIPES_COLORS;
    this.pauseButton = null;
    // game config
    this.isPaused = false;
    this.flapVelocity = FLAP_VELOCITY;
    this.score = 0;
    this.bestScore = 0;
    this.currentDifficulty = INITIAL_DIFFICULTY;
    this.difficulties = GAME_DIFFICULTIES;
    // text
    this.scoreText = null;
    this.bestScoreText = null;
  }

  increaseDifficulty() {
    if (this.score === 20) {
      this.currentDifficulty = "normal";
    }

    if (this.score === 40) {
      this.currentDifficulty = "hard";
    }
  }

  placePipe(upper, lower) {
    const difficulty = this.difficulties[this.currentDifficulty];
    const rightMostXPosition = this.getRightMostPipePosition();
    const pipeVerticalDistance = Phaser.Math.Between(
      difficulty.pipeVerticalDistanceRange[0],
      difficulty.pipeVerticalDistanceRange[1]
    );
    const pipeVerticalPosition = Phaser.Math.Between(
      0 + 20,
      this.config.height - 20 - pipeVerticalDistance
    );
    const pipeHorizontalDistance = Phaser.Math.Between(
      difficulty.pipeHorizontalDistanceRange[0],
      difficulty.pipeHorizontalDistanceRange[1]
    );

    upper.x = rightMostXPosition + pipeHorizontalDistance;
    upper.y = pipeVerticalPosition;

    lower.x = upper.x;
    lower.y = upper.y + pipeVerticalDistance;
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach((pipe: Phaser.Physics.Arcade.Sprite) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(tempPipes[0], tempPipes[1]);
          this.increaseScore();
          this.increaseDifficulty();
          return;
        }
      }
    });
  }

  flap() {
    if (this.isPaused) {
      return;
    }
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  pauseGame() {
    this.physics.pause();
    this.scene.pause();
    this.scene.launch("PauseScene", {
      scene: this,
      pausedScene: this,
    });
  }

  gameOver() {
    this.physics.pause();
    this.bird.stop();
    this.bird.setTint(0xff0000);

    const bestScoreText = localStorage.getItem("bestScore");
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem("bestScore", this.score.toString());
    }

    this.time.addEvent({
      delay: DELAY_UNTIL_GAME_RESTART_AFTER_GAME_OVER_IN_MS,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
  }

  getRightMostPipePosition() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach((pipe: Phaser.Physics.Arcade.Sprite) => {
      rightMostX = Math.max(rightMostX, pipe.x);
    });

    return rightMostX;
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, "bird")
      .setScale(2)

      .setOrigin(0);

    this.bird.body.setSize(this.bird.width - 2, this.bird.height - 4);
    this.bird.body.gravity.y = BIRD_GRAVITY;
    this.bird.setCollideWorldBounds(true);
  }

  generateRandomPipesColor() {
    const randomIndex = Math.floor(Math.random() * this.pipesColors.length);
    return this.pipesColors[randomIndex];
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const randomColor = this.generateRandomPipesColor();
      const upperPipe = this.pipes
        .create(0, 0, "pipe")
        .setTint(randomColor)
        .setImmovable(true)
        .setOrigin(0, 1);
      const lowerPipe = this.pipes
        .create(0, 0, "pipe")
        .setTint(randomColor)
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(PIPES_X_VELOCITY);
  }

  createPauseButton() {
    this.pauseButton = this.add
      .image(this.config.width - 16, this.config.height - 16, "pause")
      .setOrigin(1);
    this.pauseButton.scale = 2;
  }

  handleInputs() {
    // for desktop events
    this.input.on("pointerdown", this.flap, this);
    //for mobile events
    this.input.on("touch", this.flap, this);

    // all events
    this.input.keyboard.on("keydown-P", this.pauseGame, this);
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText(`Fly in: ${this.initialTime}`);
    if (this.initialTime <= 0) {
      this.isPaused = false;
      this.countDownText.setText("");
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  eventsListener() {
    if (this.pauseEvent) {
      return;
    }

    this.pauseEvent = this.events.on("resume", () => {
      this.initialTime = COUNTDOWN_INITIAL_TIME;
      this.countDownText = this.add
        .text(
          this.screenCenter[0],
          this.screenCenter[1],
          `Fly in: ${this.initialTime}`,
          COUNTDOWN_TEXT_OPTIONS
        )
        .setOrigin(0.5);
      this.timedEvent = this.time.addEvent({
        delay: DELAY_UNTIL_GAME_RESTART_AFTER_GAME_OVER_IN_MS,
        callback: this.countDown,
        callbackScope: this,
        loop: true,
      });
    });
  }

  checkBirdCanvasCollision() {
    if (
      this.bird.y <= 0 ||
      this.bird.getBounds().bottom >= this.config.height
    ) {
      this.gameOver();
    }
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem("bestScore");
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, SCORE_TEXT_OPTIONS);
    this.add.text(
      16,
      52,
      `Best score: ${bestScore || 0}`,
      BEST_SCORE_TEXT_OPTIONS
    );
  }

  createPause() {
    this.isPaused = false;
    const pauseButton = this.add
      .image(this.config.width - 10, this.config.height - 10, "pause")
      .setInteractive()
      .setScale(3)
      .setOrigin(1);

    pauseButton.on("pointerdown", () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch("PauseScene");
    });

    pauseButton.on("touch", () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch("PauseScene");
    });
  }

  create() {
    super.create();
    this.createBird();
    this.createPipes();
    this.createPauseButton();
    this.createColliders();
    this.handleInputs();
    this.createScore();
    this.createPause();
    this.eventsListener();
    this.bird.play("birdFlap");
  }

  update() {
    this.checkBirdCanvasCollision();
    this.recyclePipes();
  }
}

export default PlayScene;
