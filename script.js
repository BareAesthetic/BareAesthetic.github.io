
// курсор

const cursor=document.querySelector(".cursor")

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"

})


// переключение страниц

function openPage(id){

document.querySelectorAll(".page").forEach(p=>{

p.classList.remove("active")

})

document.getElementById(id).classList.add("active")

}


// смена темы

function toggleTheme(){

document.body.classList.toggle("light")

}


// смена цвета сайта

document.getElementById("colorPicker").addEventListener("input",(e)=>{

document.documentElement.style.setProperty("--accent",e.target.value)

})


// смена шрифта

document.getElementById("fontSelect").addEventListener("change",(e)=>{

document.body.style.fontFamily=e.target.value

})


// смена текста

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


// загрузка аватарки

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

function handleCredentialResponse(){

document.getElementById("username").textContent="Google пользователь"

}
