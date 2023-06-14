var width = $(window).width();
window.onscroll = function () {
    if ((width >= 1000)) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            $("#header").css("background", "#000");
            $("#header").css("color", "#fff");
            $("#header").css("box-shadow", "0px 0px 20px rgba(0,0,0,0.09)");
            $("#header").css("padding", "4vh 4vw");
            $("#navigation a").hover(function () {
                $(this).css("border-bottom", "2px solid rgb(255, 44, 90)");
            }, function () {
                $(this).css("border-bottom", "2px solid transparent");
            });
        } else {
            $("#header").css("background", "transparent");
            $("#header").css("color", "#fff");
            $("#header").css("box-shadow", "0px 0px 0px rgba(0,0,0,0)");
            $("#header").css("padding", "6vh 4vw");
            $("#navigation a").hover(function () {
                $(this).css("border-bottom", "2px solid #fff");
            }, function () {
                $(this).css("border-bottom", "2px solid transparent");
            });
        }
    }
}




setTimeout(function () {
    $("#loading").addClass("animated fadeOut");
    setTimeout(function () {
        $("#loading").removeClass("animated fadeOut");
        $("#loading").css("display", "none");
    }, 800);
}, 1650);

$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('body,html').animate({
                scrollTop: $(hash).offset().top
            }, 1800, function () {
                window.location.hash = hash;
            });
        }
    });
});

let uploadSec = document.getElementById("uploadSec")
let workSee = document.getElementById("work")

let auth;
let admin = 34517336
let botonLog = document.getElementById("botonLog")

if (sessionStorage.getItem("password")) {
    auth = sessionStorage.getItem("password")
    if (auth == admin) {
        uploadSec.className = ""
        workSee.className = ""
        botonLog.className = "btn_three"
    }
}

botonLog.onclick = () => {
    logAdmin()
}
async function logAdmin() {
    if (auth == admin) {
        uploadSec.className = ""
        workSee.className = ""
        botonLog.className = "btn_three"
    }
    else {
        const { value: password } = await Swal.fire({
            title: 'Ingrese su contraseña de administrador',
            input: 'password',
            inputPlaceholder: 'Contraseña',
            confirmButtonColor: '#ae01ff',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off',
            }
        })
        if (admin == password) {
            auth = `${password}`
            sessionStorage.setItem("password", `${password}`)
            logAdmin()
        }
        else {
            if (password) {
                Swal.fire({
                    title: "Contraseña incorrecta.",
                    confirmButtonColor: '#ae01ff',
                })
            }
        }

    }
}

let images = []

class Img {
    constructor(id, img) {
        this.id = id,
            this.img = img
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyDjaew3iYG8c256MTIOWBqogb0Yp6VS6jE",
    authDomain: "ideaarte-302d8.firebaseapp.com",
    projectId: "ideaarte-302d8",
    storageBucket: "ideaarte-302d8.appspot.com",
    messagingSenderId: "185596527187",
    appId: "1:185596527187:web:57c3c1fb95c88533f07ca6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let fileItem;
let fileName;
let fileText = document.getElementById("fileText")
let photos = document.getElementById("photos")
let click = 'del($(this).attr("id"))'
photos.innerHTML = ""

let cargar = () => {
    db.collection("fotos").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let scrNew = doc.data().src;
                const i = new Img(doc.id, scrNew)
                images.push(i)
            });
        })
        .catch((err) => {
            console.error(err)

        })
        .finally(() => {
            photos.innerHTML = ""
            for (let i of images) {
                let data = document.createElement("div")
                data.innerHTML = `<img onclick=${click} src=${i.img} id="${i.id}">`
                photos.append(data)
            }
        })
}
cargar()



let getFile = (event) => {
    fileItem = event.target.files[0]
    fileName = fileItem.name
    fileText.innerText = `Por subir: ${fileName}`
}

let uploadImage = () => {
    let storageRef = firebase.storage().ref("image/" + fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed", (snapshot) => {
        console.log("cargando...");
    }, (err) => {
        console.log(err)
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            const upNew = {
                src: url
            }
            db.collection("fotos").doc().set(upNew)
            Swal.fire({
                title: `La imagen ha sido subida con exito`,
                confirmButtonColor: '#ae01ff',
                icon: 'success'
            })
            console.log("cargada.")
            fileText.innerText = ``
            setTimeout(()=>{
                location.reload()
            },600)
        })
    }
    )
}

function del(imglink) {
    Swal.fire({
        title: `Esta seguro que quiere eliminar la imagen?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Descartar`,
        icon: 'question',
        confirmButtonColor: '#008000',
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection("fotos").doc(imglink).delete().then(() => {
                Swal.fire({
                    title: `La imagen ha sido eliminada de la base de datos`,
                    confirmButtonColor: '#ae01ff',
                    icon: 'success'
                })
                console.info(`${imglink} ha sido dada de baja`)
                setTimeout(()=>{
                    location.reload()
                },600)
            }).catch((error) => {
                Swal.fire({
                    title: `${imglink} no se pudo eliminar correctamente`,
                    confirmButtonColor: '#ae01ff',
                    icon: 'info'
                })
                console.error(error)
            });
        } else if (result.isDenied) {
            Swal.fire({
                title: "Solicitud de baja cancelada.",
                confirmButtonColor: '#ae01ff',
                icon: 'info'
            })

        }
    })
}


