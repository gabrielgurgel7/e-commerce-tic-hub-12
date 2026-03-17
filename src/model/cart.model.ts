import type { Product } from './product.model'

export interface CartItem {
  product: Product
  quantity: number
}

export class Cart {
  constructor(public list: CartItem[] = []) {}

  addItem(product: Product) {
    const item = this.list.find((i) => i.product.id === product.id)

    if (item) {
      item.quantity++
    } else {
      this.list.push({
        product,
        quantity: 1,
      })
    }
  }

  removeItem(product: Product) {
    const item = this.list.find((i) => i.product.id === product.id)

    if (!item) return

    item.quantity--

    if (item.quantity <= 0) {
      this.list = this.list.filter((i) => i.product.id !== product.id)
    }
  }

  getTotalItems() {
    return this.list.reduce((t, i) => t + i.quantity, 0)
  }

  getTotalPrice() {
    return this.list.reduce((t, i) => t + i.product.price * i.quantity, 0)
  }

  formatPrice(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }
}
