const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d") //built in context object; usin canvas api 
canvas.width = window.innerWidth 
canvas.height = window.innerHeight

let particleArr = []
let adjustX = 10, adjustY = 10 //adjust the position

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
}
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x
    mouse.y = e.y
})



ctx.font = "20px Georgia";
ctx.fillText("Hello world", 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 100, 100)

class Particle{
    constructor(x, y){
        this.x = x
        this.y = y
        this.size = 3
        //holds initial position of the particle
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.round(Math.random() * 10) + 1
    }
    draw(){
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2) //drawing a circle (from an arc!)
        ctx.closePath()
        ctx.fill()
    }
    update(){
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forDirectionX = dx / distance
        let forDirectionY = dy / distance
        let maxDistance = mouse.radius 
        let force = (maxDistance - distance) / maxDistance
        let directionX = forDirectionX * force * this.density
        let directionY = forDirectionY * force * this.density

        if(distance < mouse.radius){
            this.x -= directionX
            this.y -= directionY
            ctx.fillStyle = "yellow"

        } else{
            if(this.x !== this.baseX || this.y !== this.baseY){
                dx = this.x - this.baseX
                dy = this.y - this.baseY    

                this.x -= dx / 5
                this.y -= dy / 5
            }
        }
    }
}

function init(){
    particleArr = []       
    for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){ //particles with more than 128 (50% or .5 Alpha) opacity range 
                let positionX = x + adjustX
                let positionY = y + adjustY
                particleArr.push(new Particle(positionX * 10, positionY * 10))
            }
        }
    }
}



init()

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particleArr.forEach(particle => {
        particle.draw()
        // best thing i ever seen in my life :) try it when you have time 
        // particle.x += Math.cos(particle.density) * particle.size 
        // particle.y += Math.sin(particle.density) * particle.size    

        particle.update()
    })
    requestAnimationFrame(animate) 
}
animate()