export const productos = [
    {
        id:"1",
        title: "Cuaderno Cherhane Funcional A5",
        price:1050,
        stock:10,
        img: "../cuaderno.jpg",
        description: "Cuaderno tapa dura con sistema de discos, posee 96 hojas rayadas de 120gr",
        categoria: "cuadernos"
    },
    {
        id:"2",
        title: "Organizador FW Serie Fun Shine",
        price:1355,
        stock:6,
        img: "../fw.jpg",
        description: "Cuaderno tapa dura con sistema de discos, posee 96 hojas rayadas de 120gr",
        categoria: "organizadores"
    },
    {
        id:"3",
        title: "Resaltador Stabilo Swing Cool Pastel X6",
        price:955,
        stock:8,
        img: "../stabilo-resaltadoe.gif",
        description: "Cuaderno tapa dura con sistema de discos, posee 96 hojas rayadas de 120gr",
        categoria: "resaltadores"
    }
];

const GetFetchDetail = new Promise(function(resolve, reject){
    setTimeout(() =>{
        resolve(productos)
    }, 2000)
})

export default GetFetchDetail
