import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export const Cart = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }: CartProps) => {
  const { toast } = useToast();
  
  console.log("Cart component rendered with items:", items);

  const getTotalPrice = () => {
    const total = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log("Total price calculated:", total);
    return total;
  };

  const handleCheckout = () => {
    console.log("Checkout initiated with items:", items);
    toast({
      title: "¡Pedido realizado!",
      description: `Tu pedido por $${getTotalPrice().toFixed(2)} ha sido procesado exitosamente.`,
    });
    // Clear cart after checkout
    items.forEach(item => onRemoveItem(item.id));
    onClose();
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    console.log("Quantity change requested:", productId, newQuantity);
    onUpdateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    console.log("Remove item requested:", productId);
    onRemoveItem(productId);
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito.",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-green-800">
            <ShoppingBag className="w-5 h-5" />
            Tu Carrito
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 
              ? "Tu carrito está vacío" 
              : `${items.length} producto${items.length > 1 ? 's' : ''} en tu carrito`
            }
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <ShoppingBag className="w-16 h-16 mb-4" />
              <p className="text-lg">Tu carrito está vacío</p>
              <p className="text-sm">¡Agrega algunos aguacates deliciosos!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-green-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} c/u</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-2 w-8 h-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Finalizar Compra
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};