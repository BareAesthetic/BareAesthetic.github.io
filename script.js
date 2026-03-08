const btns = document.querySelectorAll(".nav-btn")
const slider = document.querySelector(".nav-slider")

btns.forEach(btn=>{

btn.onclick=()=>{

document.querySelector(".nav-btn.active").classList.remove("active")
btn.classList.add("active")

slider.style.width = btn.offsetWidth+"px"
slider.style.left = btn.offsetLeft+"px"

const tab = btn.dataset.tab

document.querySelectorAll(".tab").forEach(t=>{
t.classList.remove("active")
})

document.getElementById(tab)?.classList.add("active")

}

})

function toggleTheme(){

document.body.classList.toggle("light")

}

/* color settings */

document.getElementById("textColor").oninput=e=>{
document.body.style.color=e.target.value
}

document.getElementById("bgColor").oninput=e=>{
document.body.style.background=e.target.value
}
