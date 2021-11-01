const cuaderno ={
    id:1,
    title: "Cuaderno Cherhane Funcional A5",
    description: "Cuaderno tapa dura con sistema de discos, posee 96 hojas rayadas de 120gr",
    price:1050,
    stock:10,
    img: "../cuaderno.jpg"
}

const GetFetchDetail = new Promise(function(resolve, reject){
    setTimeout(() =>{
        resolve(cuaderno)
    }, 2000)
})

export default GetFetchDetail