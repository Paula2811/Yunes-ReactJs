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
        description: "Los organizadores más lindos y multiuso. Son resistentes hechos en cuero PU cierre gold más grueso. Divisiones internas con elástico, cierres y red. Lo podes usar de protadocumentos, portacosmeticos, para poner brochas de maquillaje , cartuchera, para poner la table o e-reader.",
        categoria: "organizadores"
    },
    {
        id:"3",
        title: "Resaltador Stabilo Swing Cool Pastel X6",
        price:955,
        stock:8,
        img: "../stabilo-resaltadoe.gif",
        description: "Colores Disponibles: Celeste, Verde, Amarillo, Rosa, Violeta, Coral",
        categoria: "resaltadores"
    }
];

const GetFetchDetail = new Promise(function(resolve, reject){
    setTimeout(() =>{
        resolve(productos)
    }, 2000)
})

export default GetFetchDetail
