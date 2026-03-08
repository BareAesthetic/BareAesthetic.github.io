const buttons = document.querySelectorAll(".nav-btn")
const slider = document.querySelector(".slider")

function moveSlider(el){

slider.style.width = el.offsetWidth + "px"
slider.style.left = el.offsetLeft + "px"

}

buttons.forEach(btn=>{

btn.onclick = () => {

document.querySelector(".nav-btn.active").classList.remove("active")
btn.classList.add("active")

moveSlider(btn)

const tab = btn.dataset.tab

document.querySelectorAll(".tab").forEach(t=>{
t.classList.remove("active")
})

document.getElementById(tab).classList.add("active")

}

})

window.onload = ()=>{

moveSlider(document.querySelector(".nav-btn.active"))

}

/* avatar upload */

document.getElementById("upload").onchange = e=>{

const file = e.target.files[0]

if(file){

const reader = new FileReader()

reader.onload = e2=>{
document.getElementById("avatar").src = e2.target.result
}

reader.readAsDataURL(file)

}

}

/* fake login */

function login(){

document.getElementById("username").innerText="Вы вошли через Gmail ✔"

}

/* cursor */

document.addEventListener("mousemove",e=>{

document.body.style.setProperty("--x",e.clientX+"px")
document.body.style.setProperty("--y",e.clientY+"px")

})
