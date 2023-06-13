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
    constructor(id, img){
        this.id = id,
        this.img = img
    }
}

const i1 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.28-1-400x516.jpeg")
const i2 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.28.jpeg")
const i3 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.27-2-400x516.jpeg")
const i4 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.26-1-400x516.jpeg")
const i5 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.27.jpeg")
const i6 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.25-2-400x516.jpeg")
const i7 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.27-3.jpeg")
const i8 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.28-2-400x516.jpeg")
const i9 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.31-3-400x516.jpeg")
const i10 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.28-1-400x516.jpeg")
const i11 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.28.jpeg")
const i12 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.27-2-400x516.jpeg")
const i13 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.26-1-400x516.jpeg")
const i14 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.27.jpeg")
const i15 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.25-2-400x516.jpeg")
const i16 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.27-3.jpeg")
const i17 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.28-2-400x516.jpeg")
const i18 = new Img(1,"https://ideartecomunicacionvisual.com.ar/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-08-at-14.38.31-3-400x516.jpeg")

images.push(i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15, i16, i17, i18)

let photos = document.getElementById("photos")
let click = 'magnify($(this).attr("src"))'
photos.innerHTML = ""
for(let i of images){
  let data = document.createElement("div")
  data.innerHTML = `<img onclick=${click} src=${i.img}>`
  photos.append(data)
}
