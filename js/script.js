gsap.registerPlugin(ScrollTrigger,ScrollSmoother);

ScrollSmoother.create ({
    smooth: 1, // Suaviza a rolagem para PC
    effects: true, //Posibilita efeitos interativos com scroll
    smoothTouch: 0 // Suaviza a rolagem para MOBILE (Recomendado sempre ser 0)
});


// <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollSmoother.min.js"></script>
// <script src="./script.js"></script>
// data-speed: Acelera (Começa no 1)
// data-lag: Segura (Começa no 0)
// <div id="smooth-wrapper"></div>
// <div id="smooth-content"></div>
// Tudo que tiver position: fixed; deve ficar fora das div