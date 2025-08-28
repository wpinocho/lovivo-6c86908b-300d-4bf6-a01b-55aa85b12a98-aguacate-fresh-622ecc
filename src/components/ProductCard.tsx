import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/pages/Index";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  console.log("ProductCard rendered for product:", product.name);

  const handleAddToCart = () => {
    console.log("Add to cart clicked for:", product.name);
    onAddToCart(product);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium':
        return 'bg-yellow-100 text-yellow-800';
      case 'organico':
        return 'bg-green-100 text-green-800';
      case 'tradicional':
        return 'bg-blue-100 text-blue-800';
      case 'pack':
        return 'bg-purple-100 text-purple-800';
      case 'especial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
          {product.category}
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-green-800">{product.name}</CardTitle>
        <CardDescription className="text-gray-600">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};