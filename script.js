
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
"Лучший Minecraft мод",
"Эстетика Sakura"

]

let i=0

setInterval(()=>{

i=(i+1)%texts.length

document.getElementById("changingText").textContent=texts[i]

},2500)
