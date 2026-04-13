import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { X, Play, RotateCcw } from "lucide-react"

const GRAVITY = 0.25
const JUMP_STRENGTH = -5
const PIPE_WIDTH = 60
const PIPE_GAP = 150
const PIPE_SPEED = 1.5
const BIRD_SIZE = 30

export function FlappyBird({ onClose }) {
  const [gameState, setGameState] = useState("idle")
  const [birdY, setBirdY] = useState(200)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [stars, setStars] = useState([])
  const gameRef = useRef(null)
  const frameRef = useRef()

  const GAME_WIDTH = 400
  const GAME_HEIGHT = 500

  useEffect(() => {
    const generatedStars = Array.from({ length: 20 }, () => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * GAME_WIDTH,
      top: Math.random() * GAME_HEIGHT,
    }))
    setStars(generatedStars)
  }, [])

  const jump = useCallback(() => {
    if (gameState === "playing") {
      setBirdVelocity(JUMP_STRENGTH)
    }
  }, [gameState])

  const startGame = () => {
    setBirdY(200)
    setBirdVelocity(0)
    setPipes([])
    setScore(0)
    setGameState("playing")
  }

  const gameOver = useCallback(() => {
    setGameState("gameOver")
    setHighScore((prev) => Math.max(prev, score))
  }, [score])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        if (gameState === "idle" || gameState === "gameOver") {
          startGame()
        } else {
          jump()
        }
      }
      if (e.code === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameState, jump, onClose])

  useEffect(() => {
    if (gameState !== "playing") return

    const gameLoop = () => {
      setBirdY((prev) => {
        const newY = prev + birdVelocity
        if (newY < 0 || newY > GAME_HEIGHT - BIRD_SIZE) {
          gameOver()
          return prev
        }
        return newY
      })

      setBirdVelocity((prev) => prev + GRAVITY)

      setPipes((prev) => {
        let newPipes = prev
          .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter((pipe) => pipe.x > -PIPE_WIDTH)

        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 200) {
          const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50
          newPipes.push({ x: GAME_WIDTH, topHeight, passed: false })
        }

        newPipes = newPipes.map((pipe) => {
          const birdLeft = 50
          const birdRight = 50 + BIRD_SIZE
          const birdTop = birdY
          const birdBottom = birdY + BIRD_SIZE

          const pipeLeft = pipe.x
          const pipeRight = pipe.x + PIPE_WIDTH

          if (birdRight > pipeLeft && birdLeft < pipeRight) {
            if (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP) {
              gameOver()
            }
          }

          if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
            setScore((s) => s + 1)
            return { ...pipe, passed: true }
          }

          return pipe
        })

        return newPipes
      })

      frameRef.current = requestAnimationFrame(gameLoop)
    }

    frameRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [gameState, birdVelocity, birdY, gameOver])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative rounded-xl border border-border bg-card p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-mono text-lg font-bold text-primary">Flappy Dev</h3>
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-muted-foreground">
              Score: <span className="text-primary">{score}</span>
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              Best: <span className="text-primary">{highScore}</span>
            </span>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={gameRef}
          className="relative cursor-pointer overflow-hidden rounded-lg border border-border"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT, background: "linear-gradient(to bottom, #0f1729, #1a2744)" }}
          onClick={() => {
            if (gameState === "playing") jump()
            else startGame()
          }}
        >
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: star.width,
                height: star.height,
                left: star.left,
                top: star.top,
              }}
            />
          ))}

          <div
            className="absolute transition-transform"
            style={{
              left: 50,
              top: birdY,
              width: BIRD_SIZE,
              height: BIRD_SIZE,
              transform: `rotate(${Math.min(birdVelocity * 3, 45)}deg)`,
            }}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-full bg-primary" />
              <div className="absolute right-1 top-2 h-2 w-2 rounded-full bg-background" />
              <div
                className="absolute right-0 top-3 h-0 w-0"
                style={{
                  borderTop: "4px solid transparent",
                  borderBottom: "4px solid transparent",
                  borderLeft: "8px solid #f59e0b",
                  transform: "translateX(50%)",
                }}
              />
            </div>
          </div>

          {pipes.map((pipe, i) => (
            <div key={i}>
              <div
                className="absolute rounded-b-lg border-2 border-primary/50 bg-secondary"
                style={{
                  left: pipe.x,
                  top: 0,
                  width: PIPE_WIDTH,
                  height: pipe.topHeight,
                }}
              >
                <div className="absolute -bottom-2 -left-1 h-4 w-[calc(100%+8px)] rounded-lg border-2 border-primary/50 bg-secondary" />
              </div>
              <div
                className="absolute rounded-t-lg border-2 border-primary/50 bg-secondary"
                style={{
                  left: pipe.x,
                  top: pipe.topHeight + PIPE_GAP,
                  width: PIPE_WIDTH,
                  height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP,
                }}
              >
                <div className="absolute -left-1 -top-2 h-4 w-[calc(100%+8px)] rounded-lg border-2 border-primary/50 bg-secondary" />
              </div>
            </div>
          ))}

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary/30" />

          {gameState !== "playing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
              {gameState === "gameOver" && (
                <div className="mb-4 text-center">
                  <h4 className="mb-2 font-mono text-2xl font-bold text-destructive">Game Over!</h4>
                  <p className="font-mono text-lg text-foreground">
                    Score: <span className="text-primary">{score}</span>
                  </p>
                </div>
              )}
              <Button onClick={startGame} className="gap-2">
                {gameState === "gameOver" ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {gameState === "gameOver" ? "Play Again" : "Start Game"}
              </Button>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                Press Space or Click to jump
              </p>
            </div>
          )}
        </div>

        <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
          Press ESC to close
        </p>
      </div>
    </div>
  )
}
