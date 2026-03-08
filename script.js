function openTab(tab){

document.querySelectorAll(".tab").forEach(t=>{
t.classList.remove("active")
})

document.getElementById(tab).classList.add("active")

}

/* Upload avatar */

const upload = document.getElementById("uploadAvatar")

upload.addEventListener("change", function(){

const file = this.files[0]

if(file){

const reader = new FileReader()

reader.onload = function(e){
document.getElementById("avatar").src = e.target.result
}

reader.readAsDataURL(file)

}

})

/* Fake Google login */

function loginGoogle(){

document.getElementById("userName").innerText = "Вы вошли через Gmail ✔"

}
