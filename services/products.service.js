const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class ProductsService {

  constructor () {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100

  for (let index = 0; index < limit; index++) {
    this.products.push({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.image.imageUrl(),
    isBlock: faker.datatype.boolean(), // generamos aleatoriamente un tipo de dato boolean (true or false)
    })
  }
  }

  async create(data) { // Crear
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)

    return newProduct
  }

  async find() { // Buscar

    return new Promise((resolve, reject) => { // creamos una promesa para usar el asincronismo y simulamos una espera con setTimeout

      setTimeout(() => {

        resolve(this.products) // en resolve le enviamos los datos que queremos devolver cuando se cumple la promesa
      }, 5000);
    })
  }

  async findOne(id) { // Buscar solo uno
    const product = this.products.find(item => item.id === id)

    // Regla de negocio N.1:
    if (!product) { // si el producto no existe lanzamos el error adecuado
      throw boom.notFound("product not found")
    }
    // Regla de negocio N.2:
    if (product.isBlock) { // si el producto está bloqueado no permitimos retornarlo
      throw boom.conflict("product is block") // usamos el método conflict para que nos de el status code adecuado
    }
    return product
  }

  async update(id, changes) { // Actualizar

    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      // throw new Error('esto es un error')
      throw boom.notFound("product not found") // de esta manera a boom le podemos añadir el método
      // que creamos correcto y lanza el status code que se ajusta al error de forma automática
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id) { // Eliminar
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound("product not found")
    }
    this.products.splice(index, 1)
    return { id }
  }
}


module.exports = ProductsService
