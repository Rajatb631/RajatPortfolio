import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Gamepad2 } from "lucide-react"
import { FlappyBird } from "./FlappyBird"

export function Game() {
  const [showGame, setShowGame] = useState(false)

  return (
    <>
      <section id="game" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center gap-3">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <h2 className="font-mono text-2xl font-bold text-foreground">
              Bored?
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card/50 p-12 text-center">
            <Gamepad2 className="mb-4 h-16 w-16 text-primary/50" />
            <h3 className="mb-2 font-mono text-xl font-semibold text-foreground">
              Take a Break!
            </h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Need a quick distraction? Play a round of Flappy Dev - a developer-themed Flappy Bird clone.
            </p>
            <Button onClick={() => setShowGame(true)} className="gap-2">
              <Gamepad2 className="h-4 w-4" />
              Play Flappy Dev
            </Button>
          </div>
        </div>
      </section>

      {showGame && <FlappyBird onClose={() => setShowGame(false)} />}
    </>
  )
}
