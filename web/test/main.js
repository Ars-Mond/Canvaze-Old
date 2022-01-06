let log = console.log;

let s = new Circle({
    position: new Vector2(170,160),
    fillColor: '#ffffff',
    fill: true,
    borderColor: '#d0d0d0',
    borderWidth: 6,
    radius: 120
});

let s2 = new Rectangle({
    position: new Vector2(180,216),
    size: new Vector2(770, 65),
    fill: false,
    fillColor: '#222222',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 32.5
});

let s3 = new Rectangle({
    position: new Vector2(181,217),
    size: new Vector2(377, 63),
    fillColor: '#e67e22',
    borderColor: '#000000',
    borderWidth: 0,
    borderRadius: 31.5
});

let s4 = new TextBox({
    position: new Vector2(600, 260),
    text: 'Suka blayt!',
    font: {
        family: 'Montserrat',
        height: 30,
        weight: 900,
        unit: 'px',
        lineSpacing: 1.2,
        textAlign: 'start',
        textBaseline: 'alphabetic'
    },
    fillColor: '#222',
    borderColor: '#000000',
    borderWidth: 0
});
/*
let s5 = new TextBox({
    position: new Vector2(300, 120),
    text: 'Ars_Mond',
    fontFamily: 'Montserrat',
    fontHeight: 50,
    fontWeight: 'bold',
    fillColor: '#2236e6',
    borderColor: '#000000',
    borderWidth: 0
});
let s6 = new TextBox({
    position: new Vector2(300, 120),
    text: 'Ars_Mond',
    font: {
        family: 'Arial',
    },
    borderColor: '#000000',
    borderWidth: 0
});*/

let scene = new Scene();
scene.addEntity([s2, s3, s, s4]);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
log(canvas);
log(ctx);
log(scene);
scene.render(ctx, canvas);

let ff = setInterval(() => {
    scene.entities[0].position.x = scene.entities[0].position.x + 5;
    scene.entities[0].position.y = scene.entities[0].position.y + 5;
    scene.render(ctx, canvas);
}, 20);

setTimeout(() => {
    clearInterval(ff);
}, 5000);

//let k = 1;
//scene._loop(ctx, canvas, 100, 10);
