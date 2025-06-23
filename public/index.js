const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 70) {
  charactersMap.push(charactersMapData.slice(i, 70 + i))
}
console.log(charactersMap)

const boundaries = []
const offset = {
  x: -735,
  y: -650
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const characters = []
const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // 1026 === villager
    if (symbol === 1026) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 3,
          animate: true,
          dialogue: ['hi there we are team kuch bhi the gurdians of humanity', 'do you know that india is the largest contributor to the plastic waste. each day around 8 million is generated alone ...' , 'Mountains of Plastic Waste: as we are in delhi , you must have heard about the new man made hill station it is the result of not proper segregation process in india...' , 'Health Hazards: the waste that is not segregated causes numerous health hazards that maybe one of the reason of the reduce life expectency' , 'Impact on Wildlife: it has devastating effect on the wildlife as Animals often ingest plastic debris or become entangled in it, leading to injuries, suffocation, and death. Marine life is particularly vulnerable, with plastic waste' , 'Social Inequality: Waste management issues disproportionately affect marginalized communities, including those living in slums and informal settlements']
        })
      )
    }
    // 1031 === oldMan
    else if (symbol === 1031) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 3,
          dialogue: ['that guy must have told you about the problems now lets see the guardians will save this planet' , 'every day waste is produced in our home but we only store our raddi because we can sell it and earn some money but that is not true for the wet waste how about we change that' ,'we will take all kinds of household waste and will provide the user with money as reward by doing this we are adding value to thier waste and once you start valuing somithing you dont throw it ' , '......but there is a catch...... ', 'we will only give money to the user if he gives the segregated waste.', "now this is a problem cause people are wayyyyyy to lazyyyyyyy" , ".... tension not we have the solution how about we sell them a smart dustbin which automatically segregates the waste , you just have to throw in your garbage", "guess what we have done that"]
        })
      )
    }

    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})

const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

// Movement system based on clicks
const movement = {
  target: null,
  speed: 30,
  isMoving: false
}

// Tree system
const trees = []
class Tree {
  constructor({ position }) {
    this.position = position
    this.stage = 0 // 0: seed, 1: sapling, 2: young tree, 3: mature tree
    this.maxStage = 3
    this.growthTime = 3000 // 3 seconds per stage
    this.lastGrowth = Date.now()
    this.size = 10
    this.color = '#8B4513' // Brown for trunk
  }

  update() {
    if (this.stage < this.maxStage && Date.now() - this.lastGrowth > this.growthTime) {
      this.stage++
      this.lastGrowth = Date.now()
      this.size += 15
    }
  }

  draw() {
    const ctx = c
    ctx.save()
    
    switch(this.stage) {
      case 0: // Seed
        ctx.fillStyle = '#654321'
        ctx.fillRect(this.position.x, this.position.y, 5, 5)
        break
      case 1: // Sapling
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(this.position.x - 2, this.position.y - 5, 4, 15)
        ctx.fillStyle = '#90EE90'
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y - 8, 8, 0, Math.PI * 2)
        ctx.fill()
        break
      case 2: // Young tree
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(this.position.x - 4, this.position.y - 10, 8, 25)
        ctx.fillStyle = '#228B22'
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y - 15, 15, 0, Math.PI * 2)
        ctx.fill()
        break
      case 3: // Mature tree
        ctx.fillStyle = '#654321'
        ctx.fillRect(this.position.x - 6, this.position.y - 15, 12, 35)
        ctx.fillStyle = '#006400'
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y - 20, 25, 0, Math.PI * 2)
        ctx.fill()
        // Add some texture
        ctx.fillStyle = '#228B22'
        ctx.beginPath()
        ctx.arc(this.position.x - 8, this.position.y - 25, 12, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.position.x + 8, this.position.y - 25, 12, 0, Math.PI * 2)
        ctx.fill()
        break
    }
    
    ctx.restore()
  }
}

const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters
]
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground,
  ...trees
]

const battle = {
  initiated: false
}

function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2))
}

function movePlayerToTarget() {
  if (!movement.target || !movement.isMoving) return false

  const playerCenter = {
    x: player.position.x + player.width / 2,
    y: player.position.y + player.height / 2
  }

  const distance = getDistance(playerCenter, movement.target)
  
  // Stop if we're close enough to the target
  if (distance < movement.speed) {
    movement.isMoving = false
    movement.target = null
    player.animate = false
    return false
  }

  // Calculate direction
  const dx = movement.target.x - playerCenter.x
  const dy = movement.target.y - playerCenter.y
  const magnitude = Math.sqrt(dx * dx + dy * dy)
  
  const normalizedDx = dx / magnitude
  const normalizedDy = dy / magnitude

  // Determine which direction is dominant for sprite selection
  if (Math.abs(normalizedDx) > Math.abs(normalizedDy)) {
    if (normalizedDx > 0) {
      player.image = player.sprites.right
    } else {
      player.image = player.sprites.left
    }
  } else {
    if (normalizedDy > 0) {
      player.image = player.sprites.down
    } else {
      player.image = player.sprites.up
    }
  }

  // Calculate movement offsets
  const moveX = normalizedDx * movement.speed
  const moveY = normalizedDy * movement.speed

  // Check for collisions before moving
  let canMoveX = true
  let canMoveY = true

  // Check X-axis collision
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (rectangularCollision({
      rectangle1: player,
      rectangle2: {
        ...boundary,
        position: {
          x: boundary.position.x - moveX,
          y: boundary.position.y
        }
      }
    })) {
      canMoveX = false
      break
    }
  }

  // Check Y-axis collision
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (rectangularCollision({
      rectangle1: player,
      rectangle2: {
        ...boundary,
        position: {
          x: boundary.position.x,
          y: boundary.position.y - moveY
        }
      }
    })) {
      canMoveY = false
      break
    }
  }

  // Check character collisions
  checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: -moveX, y: -moveY }
  })

  // Move the world (inverse of player movement)
  if (canMoveX) {
    movables.forEach((movable) => {
      movable.position.x -= moveX
    })
  }
  
  if (canMoveY) {
    movables.forEach((movable) => {
      movable.position.y -= moveY
    })
  }

  // If we can't move in either direction, stop
  if (!canMoveX && !canMoveY) {
    movement.isMoving = false
    movement.target = null
    player.animate = false
    return false
  }

  player.animate = true
  return true
}

function animate() {
  const animationId = window.requestAnimationFrame(animate)
  
  // Update trees
  trees.forEach(tree => tree.update())
  
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  if (battle.initiated) return

  // Handle click-based movement
  const isMoving = movePlayerToTarget()

  // activate a battle
  if (isMoving) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId)

        audio.Map.stop()
        audio.initBattle.play()
        audio.battle.play()

        battle.initiated = true
        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })
          }
        })
        break
      }
    }
  }
}

// Handle spacebar for character interactions
window.addEventListener('keydown', (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        player.interactionAsset.dialogueIndex++

        const { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector('#characterDialogueBox').innerHTML =
            player.interactionAsset.dialogue[dialogueIndex]
          return
        }

        // finish conversation
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector('#characterDialogueBox').style.display = 'none'

        break
    }
    return
  }

  switch (e.key) {
    case ' ':
      if (!player.interactionAsset) return

      // beginning the conversation
      const firstMessage = player.interactionAsset.dialogue[0]
      document.querySelector('#characterDialogueBox').innerHTML = firstMessage
      document.querySelector('#characterDialogueBox').style.display = 'flex'
      player.isInteracting = true
      break
  }
})

// Handle mouse clicks for movement and tree planting
let clicked = false
let clickTimeout = null

canvas.addEventListener('click', (e) => {
  console.log("clicked")
  if (!clicked) {
    // audio.Map.play()
    clicked = true
  }

  // Don't move if player is interacting with character
  if (player.isInteracting) return

  // Get click position relative to canvas
  const rect = canvas.getBoundingClientRect()
  console.log(rect)
  const clickX = e.clientX - rect.left
  const clickY = e.clientY - rect.top

  // Handle double-click for tree planting
  if (clickTimeout) {
    // This is a double-click - plant a tree
    clearTimeout(clickTimeout)
    clickTimeout = null
    
    // Convert screen coordinates to world coordinates
    const worldX = clickX - offset.x
    const worldY = clickY - offset.y
    
    // Create new tree at clicked position
    const newTree = new Tree({
      position: {
        x: worldX,
        y: worldY
      }
    })
    
    trees.push(newTree)
    console.log("Tree planted at:", worldX, worldY)
    return
  }

  // Single click - set timeout for potential double-click
  clickTimeout = setTimeout(() => {
    clickTimeout = null
    
    // This is a single click - move player
    // Calculate direction for single step movement
    const playerCenter = {
      x: player.position.x + player.width / 2,
      y: player.position.y + player.height / 2
    }

    const dx = clickX - playerCenter.x
    const dy = clickY - playerCenter.y

    // Determine which direction to move (one step only)
    let moveX = 0
    let moveY = 0

    if (Math.abs(dx) > Math.abs(dy)) {
      // Move horizontally
      moveX = dx > 0 ? movement.speed : -movement.speed
      player.image = dx > 0 ? player.sprites.right : player.sprites.left
    } else {
      // Move vertically
      moveY = dy > 0 ? movement.speed : -movement.speed
      player.image = dy > 0 ? player.sprites.down : player.sprites.up
    }

    // Check for collisions before moving
    let canMove = true

    // Check boundary collisions
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x - moveX,
            y: boundary.position.y - moveY
          }
        }
      })) {
        canMove = false
        break
      }
    }

    // Check character collisions
    if (canMove) {
      checkForCharacterCollision({
        characters,
        player,
        characterOffset: { x: -moveX, y: -moveY }
      })
    }

    // Move one step if no collision
    if (canMove) {
      movables.forEach((movable) => {
        movable.position.x -= moveX
        movable.position.y -= moveY
      })
      
      // Brief animation for the step
      player.animate = true
      setTimeout(() => {
        player.animate = false
      }, 200)
    }
  }, 300) // 300ms timeout for double-click detection
})