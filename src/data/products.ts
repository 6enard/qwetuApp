import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: 'shopping-basket' },
  { id: 'snacks', name: 'Snacks', icon: 'cookie' },
  { id: 'beverages', name: 'Beverages', icon: 'coffee' },
  { id: 'toiletries', name: 'Toiletries', icon: 'spray-can' },
  { id: 'stationery', name: 'Stationery', icon: 'pencil' },
  { id: 'cleaning', name: 'Cleaning', icon: 'spray-can' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Instant Noodles (Pack of 5)',
    price: 250,
    image: 'https://images.pexels.com/photos/12256804/pexels-photo-12256804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'groceries',
    description: 'Quick and easy meal for busy students. Just add hot water and enjoy in minutes.',
    stock: 50,
    featured: true,
  },
  {
    id: '2',
    name: 'Energy Drink (250ml)',
    price: 120,
    image: 'https://images.pexels.com/photos/11661525/pexels-photo-11661525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'beverages',
    description: 'Get that extra boost during long study sessions.',
    stock: 30,
  },
  {
    id: '3',
    name: 'Chocolate Bars (Pack of 3)',
    price: 150,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'snacks',
    description: 'Delicious chocolate bars to satisfy your sweet cravings.',
    stock: 40,
    featured: true,
  },
  {
    id: '4',
    name: 'Toothpaste',
    price: 180,
    image: 'https://images.pexels.com/photos/6724354/pexels-photo-6724354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'toiletries',
    description: 'Minty fresh toothpaste for proper dental hygiene.',
    stock: 25,
  },
  {
    id: '5',
    name: 'Notebook (A4, 100 pages)',
    price: 120,
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'stationery',
    description: 'High-quality notebook for all your lecture notes.',
    stock: 60,
  },
  {
    id: '6',
    name: 'Multi-Surface Cleaner',
    price: 200,
    image: 'https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'cleaning',
    description: 'Keep your room clean and fresh with this all-purpose cleaner.',
    stock: 15,
  },
  {
    id: '7',
    name: 'Bottled Water (1L)',
    price: 70,
    image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'beverages',
    description: 'Stay hydrated with pure bottled water.',
    stock: 100,
    featured: true,
  },
  {
    id: '8',
    name: 'Potato Chips',
    price: 100,
    image: 'https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'snacks',
    description: 'Crispy potato chips for a satisfying snack.',
    stock: 45,
  },
  {
    id: '9',
    name: 'Hand Sanitizer (100ml)',
    price: 150,
    image: 'https://images.pexels.com/photos/3987151/pexels-photo-3987151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'toiletries',
    description: 'Kill germs on the go with this pocket-sized hand sanitizer.',
    stock: 35,
  },
  {
    id: '10',
    name: 'Ballpoint Pens (Pack of 5)',
    price: 120,
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'stationery',
    description: 'Smooth writing pens for your everyday use.',
    stock: 50,
  },
  {
    id: '11',
    name: 'Microwave Popcorn (Pack of 3)',
    price: 180,
    image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'snacks',
    description: 'Perfect snack for movie nights with friends.',
    stock: 40,
    featured: true,
  },
  {
    id: '12',
    name: 'Laundry Detergent (500g)',
    price: 250,
    image: 'https://images.pexels.com/photos/5217954/pexels-photo-5217954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'cleaning',
    description: 'Keep your clothes fresh and clean with this effective detergent.',
    stock: 20,
  },
   {
    id: '13',
    name: 'Smokie',
    price: 40,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpNBzoMqb_tXXE0dkcFCeA-diONKyS5bhsMg&s',
    category: 'snacks',
    description: 'Quality beef sausage ',
    stock: 20,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};