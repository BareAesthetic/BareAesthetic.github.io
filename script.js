// переключение страниц

function openPage(id){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}


// тема

function toggleTheme(){

document.body.classList.toggle("light")

}


// меняющийся текст

const texts=[

"Лучшие визуалы",
"Красивый HUD",
"Плавные анимации",
"Эстетика Sakura",
"Лучший мод"

]

let i=0

setInterval(()=>{

i=(i+1)%texts.length

document.getElementById("changingText").textContent=texts[i]

},2500)



// падающие лепестки

const canvas=document.getElementById("sakura")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let petals=[]

for(let i=0;i<40;i++){

petals.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*6+4,
speed:Math.random()*1+0.5

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="pink"

petals.forEach(p=>{

ctx.beginPath()

ctx.arc(p.x,p.y,p.size,0,Math.PI*2)

ctx.fill()

p.y+=p.speed

if(p.y>canvas.height){

p.y=0
p.x=Math.random()*canvas.width

}

})

requestAnimationFrame(draw)

}

draw()
