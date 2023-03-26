
window.addEventListener('load', function () {
    let image = [];

    //imagenes a mostrar

    image[0] = 'image/slider/slider0.jpg'
    image[1] = 'image/slider/slider1.jpg'
    image[2] = 'image/slider/slider2.jpg'
    image[3] = 'image/slider/slider3.jpg'
    image[4] = 'image/slider/slider4.jpg'
    image[5] = 'image/slider/slider5.jpg'
    image[6] = 'image/slider/slider6.jpg'
    image[7] = 'image/slider/slider7.jpg'
    image[8] = 'image/slider/slider8.jpg'

    let imageIndex = 0;

    function changeImage() {

        document.slider.src = image[imageIndex];

        if (imageIndex < 7) {
            imageIndex++;
        } else {
            imageIndex = 0;
        }

    }

    setInterval(changeImage, 3000)

})
