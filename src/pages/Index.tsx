import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Aguacate Hass Premium",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    description: "Aguacates Hass de primera calidad, cremosos y perfectos para cualquier ocasión.",
    category: "premium"
  },
  {
    id: 2,
    name: "Aguacate Orgánico",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
    description: "Aguacates orgánicos cultivados sin pesticidas, 100% naturales.",
    category: "organico"
  },
  {
    id: 3,
    name: "Aguacate Fuerte",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop",
    description: "Aguacates Fuerte con piel lisa y sabor suave, ideales para ensaladas.",
    category: "tradicional"
  },
  {
    id: 4,
    name: "Pack Familiar (6 unidades)",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&h=300&fit=crop",
    description: "Pack familiar de 6 aguacates Hass seleccionados, perfecto para toda la familia.",
    category: "pack"
  },
  {
    id: 5,
    name: "Aguacate Baby",
    price: 1.80,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    description: "Aguacates pequeños y tiernos, perfectos para aperitivos y decoración.",
    category: "especial"
  },
  {
    id: 6,
    name: "Aguacate Jumbo",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    description: "Aguacates extra grandes, ideales para compartir o preparaciones especiales.",
    category: "especial"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log("Index component rendered with cart items:", cartItems);

  const addToCart = (product: Product) => {
    console.log("Adding product to cart:", product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Updated cart items (existing item):", updatedItems);
        return updatedItems;
      } else {
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        console.log("Updated cart items (new item):", newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (productId: number) => {
    console.log("Removing product from cart:", productId);
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      console.log("Updated cart items after removal:", updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    console.log("Updating quantity for product:", productId, "to:", quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      console.log("Updated cart items after quantity change:", updatedItems);
      return updatedItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">🥑 AguacateStore</h1>
          <p className="text-xl mb-8">Los mejores aguacates frescos, directo a tu mesa</p>
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-green-800 hover:bg-green-50 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Ver Carrito ({getTotalItems()})
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
            Nuestros Productos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* Floating Cart Button */}
      <Button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center z-40"
      >
        <ShoppingCart className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {getTotalItems()}
          </span>
        )}
      </Button>
    </div>
  );
};

export default Index;