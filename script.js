
// курсор

const cursor = document.querySelector(".cursor")

document.addEventListener("mousemove",(e)=>{

cursor.style.left = e.clientX+"px"
cursor.style.top = e.clientY+"px"

})


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
"Красивый HUD",
"Лучшие визуалы",
"Плавные анимации",
"Лучший клиент"
]

let i=0

setInterval(()=>{

i=(i+1)%texts.length

document.getElementById("changingText").textContent=texts[i]

},2000)


// смена аватарки

document.getElementById("upload").addEventListener("change",function(){

const file=this.files[0]

if(file){

const reader=new FileReader()

reader.onload=function(e){

document.getElementById("avatar").src=e.target.result

}

reader.readAsDataURL(file)

}

})


// Google login

function handleCredentialResponse(response){

document.getElementById("username").textContent="Пользователь Google"

}


// анимация скролла

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show")

}

})

})

document.querySelectorAll(".fade").forEach(el=>observer.observe(el))
