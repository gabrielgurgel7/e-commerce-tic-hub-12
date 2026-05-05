export interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
  rating: number
  stock: number
  sales: number
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Headphone Pro X1',
    price: 499.9,
    category: 'Áudio',
    description: 'Fone de ouvido over-ear com cancelamento de ruído ativo, driver de 40mm e autonomia de 30h. Conectividade Bluetooth 5.3 com latência ultrabaixa.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    rating: 4.8,
    stock: 42,
    sales: 318,
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    price: 899.0,
    category: 'Wearables',
    description: 'Relógio inteligente com monitor cardíaco, GPS integrado, tela AMOLED de 1.9" e resistência à água IP68. Bateria de 7 dias.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    rating: 4.6,
    stock: 18,
    sales: 245,
  },
  {
    id: 3,
    name: 'Teclado Mecânico TKL',
    price: 349.9,
    category: 'Periféricos',
    description: 'Teclado mecânico tenkeyless com switches red lineares, iluminação RGB por tecla e estrutura em alumínio escovado. Anti-ghosting full key.',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80',
    rating: 4.7,
    stock: 55,
    sales: 189,
  },
  {
    id: 4,
    name: 'Monitor 4K 27"',
    price: 2199.0,
    category: 'Monitores',
    description: 'Monitor IPS 4K UHD com taxa de atualização de 144Hz, tempo de resposta de 1ms, cobertura de 99% sRGB e suporte a HDR400.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&q=80',
    rating: 4.9,
    stock: 9,
    sales: 97,
  },
  {
    id: 5,
    name: 'Câmera Mirrorless Z50',
    price: 4299.0,
    category: 'Fotografia',
    description: 'Câmera mirrorless APS-C com sensor de 20.9MP, gravação em 4K, IBIS 5 eixos, visor eletrônico 2.36M pontos e autofoco híbrido.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    rating: 4.8,
    stock: 7,
    sales: 63,
  },
  {
    id: 6,
    name: 'SSD NVMe 1TB',
    price: 289.9,
    category: 'Armazenamento',
    description: 'SSD M.2 NVMe PCIe Gen4 com leitura sequencial de 7000MB/s, escrita de 6500MB/s e vida útil TBW de 600TB.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    rating: 4.7,
    stock: 120,
    sales: 512,
  },
]

export const salesData = [
  { month: 'Jan', revenue: 12400, orders: 89 },
  { month: 'Fev', revenue: 18700, orders: 134 },
  { month: 'Mar', revenue: 15300, orders: 110 },
  { month: 'Abr', revenue: 22100, orders: 158 },
  { month: 'Mai', revenue: 19800, orders: 142 },
  { month: 'Jun', revenue: 28500, orders: 204 },
]
