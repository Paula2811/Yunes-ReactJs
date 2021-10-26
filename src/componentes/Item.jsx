const productos = [
    {
        id:1,
        title: "Cuaderno Cherhane Funcional A5",
        price:1050,
        stock:10,
        img: "../cuaderno.jpg"
    },
    {
        id:2,
        title: "Organizador FW Serie Fun Shine",
        price:1355,
        stock:6,
        img: "../fw.jpg"
    },
    {
        id:3,
        title: "Resaltador Stabilo Swing Cool Pastel X6",
        price:955,
        stock:8,
        img: "../stabilo-resaltadoe.gif"
    }
];

export const Item = new Promise ((resolve, reject) => {
    setTimeout(() => {
        resolve (productos)
    },2000)
})