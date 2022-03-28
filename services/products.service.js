// Aquí es donde empezamos a definir toda la lógica y todas las interacciones a nivel transaccional que van a tener nuestros datos

// En este caso, en este archivo necesitamos gestionar todo lo que tiene que ver con nuestros productos con CRUD

const { faker } = require('@faker-js/faker'); // Traemos el módulo NPM que nos permite crear datos aleatorios

class ProductsService { // Usamos programación orientada a objetos para crear este manejo transaccional que le vamos a llevar al producto

  constructor () { // Vamos a manejar todo esto en memoria porque actualmente no tenemos una fuente de datos ( DB )
    this.products = []
    this.generate() // ejecuto el método generate que se va a ejecutar cada vez que generemos una instáncia de la clase
  }

  generate() {
    const limit = 100

  for (let index = 0; index < limit; index++) {
    this.products.push({
    id: faker.datatype.uuid(), // genero un string largo que simule el id del producto
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.image.imageUrl()
    })
  }
  }

  create(data) { // Crear
    const newProduct = {
      id: faker.datatype.uuid(), // generamos el id aleatorio
      ...data // y le concatenamos los datos ( esto es como hace una especie de marge )
    }
    this.products.push(newProduct) // añadimos el nuevo objeto al array que está en memoria
    // con la persistencia en memoria que estamos manejando gracias a tener el servicio de
    // los usuarios aleatorios en un módulo en el que solo se genera 1 vez al instanciar la
    // clase, y los objetos siguen siendo los mismos con los mismos datos

    return newProduct // normalmente los endpoints de tipo create una vez crean el nuevo producto lo retornan
  }

  find() { // Buscar
    return this.products
  }

  findOne(id) { // Buscar solo uno
    return this.products.find(item => item.id === id) // llamo al array ejecutando el método buscar ( find ), y como parámetro le digo que si tenemos un elemento id que coincida con el id del producto ( No se cuál es su función )
  }

  update(id, changes) { // Actualizar

    const index = this.products.findIndex(item => item.id === id) // el método .findIndex devuelve la posición en la que está el objeto

    if (index === -1) { // validamos si existe ( si .findIndex no encuentra el elemento nos va a devolver un -1 )
      throw new Error('product not found') // lanzamos un error
    }
    const product = this.products[index] // asignamos el producto deseado a una variable
    this.products[index] = { // accedemos al objeto por su index y le aplicamos los cambios
      ...product, // y le pasamos la vairable del producto deseado para que haga una copia
      ...changes // con esto le decimos que aplique a la copia saolamente los cambios necesarios
      // De esta manera estamos persistiendo la información que había antes y solo ajustamos la nueva
    }
    return this.products[index] // retornamos el objeto con su cambio
  }

  delete(id) { // Eliminar
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) { // validamos si existe ( si .findIndex no encuentra el elemento nos va a devolver un -1 )
      throw new Error('product not found') // lanzamos un error
    }
    this.products.splice(index, 1) // el método de array .splice es para eliminar un array por su posición y
    // la cantidad de elementos a eliminar contrando esa posición seleccionada y los siguientes
    return { id } // le enviamos el id del producto eliminado
  }
}


module.exports = ProductsService // Exportamos la clase
