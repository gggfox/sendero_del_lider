import { useEffect, useRef } from 'react'
import './App.css'
import IMAGE_PATH from './assets/sendero_del_liderazgo.png'
import PLAYER_IMAGE_PATH from './assets/Cute_Fantasy_Free/Player/Player.png'
import { Sprite } from './components/Sprite/Sprite'

const TILE_SIZE = 16
const MAP_WIDTH = 128 * TILE_SIZE
const MAP_HEIGHT = 64 * TILE_SIZE

const SPEED = 3

interface KeyState {
  pressed: boolean
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const keysRef = useRef<{a: KeyState, d: KeyState, w: KeyState, s: KeyState}>({a: {pressed: false}, d: {pressed: false}, w: {pressed: false}, s: {pressed: false}})

  const mapImage = new Image()
  mapImage.src = IMAGE_PATH

  const playerImage = new Image()
  playerImage.src = PLAYER_IMAGE_PATH

  const background = new Sprite({
    position: {
      x: MAP_WIDTH * -1.1,
      y: MAP_HEIGHT * -0.75
    },
    image: mapImage
  })

  const player = new Sprite({
    position: {
      x: (MAP_WIDTH / 2) - (playerImage.width / 2),
      y: (MAP_HEIGHT / 2) - (playerImage.height / 2)
    },
    image: playerImage
  })

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mapLoaded: boolean, playerLoaded: boolean, mapImage: HTMLImageElement, playerImage: HTMLImageElement) => {
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (mapLoaded) {
      background.draw({ctx: ctx, drawImageProps: { 
        image: mapImage,
        dx: background.props.position.x,
        dy: background.props.position.y
      }})
    }
    if (playerLoaded && ctxRef.current) {
      player.draw({ctx: ctxRef.current, drawImageProps: { 
        sx: 0,
        sy: 0,
        sw: 32,
        sh: 32,
        dx: player.props.position.x,
        dy: player.props.position.y,
        dw: 128,
        dh: 128,
        image: playerImage
      }})
    }
  }

  function animate() {
    if (!ctxRef.current) return
    background.draw({ctx: ctxRef.current, drawImageProps: { 
      image: mapImage,
      dx: background.props.position.x,
      dy: background.props.position.y
    }})
    player.draw({ctx: ctxRef.current, drawImageProps: { 
      sx: 0,
      sy: 0,
      sw: 32,
      sh: 32,
      dx: player.props.position.x,
      dy: player.props.position.y,
      dw: 128,
      dh: 128,
      image: playerImage
    }})
    const amountOfPressedKeys = Object.values(keysRef.current).filter(key => key.pressed).length
    const squareRootOfTwo = 2 ** 0.5
    const nomalizedSpeed = amountOfPressedKeys > 1 ? SPEED / squareRootOfTwo : SPEED
    if (keysRef.current.a.pressed) {
      background.props.position.x += nomalizedSpeed
    }
    if (keysRef.current.d.pressed) {
      background.props.position.x -= nomalizedSpeed
    }
    if (keysRef.current.w.pressed) {
      background.props.position.y += nomalizedSpeed
    }
    if (keysRef.current.s.pressed) {
      background.props.position.y -= nomalizedSpeed
    }
    window.requestAnimationFrame(animate)
  }
  animate()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // set size via attributes
    canvas.width = MAP_WIDTH
    canvas.height = MAP_HEIGHT

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    let mapLoaded = false
    let playerLoaded = false

    

    mapImage.onload = () => {
      mapLoaded = true
      draw( ctx, canvas, mapLoaded, playerLoaded, mapImage, playerImage)
    }

    playerImage.onload = () => {
      playerLoaded = true
      draw( ctx, canvas, mapLoaded, playerLoaded, mapImage, playerImage)
    }

  
  }, [])




  window.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
      keysRef.current.a.pressed = true
    }
    if (event.key === 'd') {
      keysRef.current.d.pressed = true
    }
    if (event.key === 'w') {
      keysRef.current.w.pressed = true
    }
    if (event.key === 's') {
      keysRef.current.s.pressed = true
    }
  })

  window.addEventListener('keyup', (event) => {

    if (event.key === 'a') {
      keysRef.current.a.pressed = false
    }
    if (event.key === 'd') {
      keysRef.current.d.pressed = false
    }
    if (event.key === 'w') {
      keysRef.current.w.pressed = false
    }
    if (event.key === 's') {
      keysRef.current.s.pressed = false
    }
  })  


  return <>
  <canvas ref={canvasRef} className="game-canvas"/>
  </>
}

export default App
