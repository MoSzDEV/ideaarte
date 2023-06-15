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

function magnify(imglink) {
    $("#img_here").css("background", `url('${imglink}') center center`);
    $("#magnify").css("display", "flex");
    $("#magnify").addClass("animated fadeIn");
    setTimeout(function () {
        $("#magnify").removeClass("animated fadeIn");
    }, 800);
}

function closemagnify() {
    $("#magnify").addClass("animated fadeOut");
    setTimeout(function () {
        $("#magnify").css("display", "none");
        $("#magnify").removeClass("animated fadeOut");
        $("#img_here").css("background", `url('') center center`);
    }, 800);
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


let photos = document.getElementById("photos")
let click = 'magnify($(this).attr("src"))'
photos.innerHTML = ""


db.collection("fotos").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            photos.innerText = "CARGANDO"
            let scrNew = doc.data().src;
            const i = new Img(1, scrNew)
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
            data.innerHTML = `<img onclick=${click} src=${i.img}>`
            photos.append(data)
        }
    })

