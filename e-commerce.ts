interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type userRole = "ADMIN" | "CUSTOMER";


class user {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public role: userRole,
  ) {}
}

class Cart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number) {
    const productExists = this.items.some(
      (item) => item.product.id === product.id,
    );

    if (productExists) {
      this.items = this.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      this.items.push({
        product,
        quantity,
      });
    }
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getFinalPrice(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }
}

// TESTANDO:
const category: Category = {
    id: 1,
    name: 'Instrumentos'
};

const product1: Product = {
    id: 1,
    name: 'Guitarra',
    price: 1500,
    category
};

const product2: Product = {
    id: 2,
    name: 'Violão',
    price: 800,
    category
};

const cart = new Cart();

cart.addItem(product1, 2);
cart.addItem(product1, 1);
cart.addItem(product2, 1);

console.log('Total de unidades:', cart.getTotalItems());
console.log('Preço final:', cart.getFinalPrice());


