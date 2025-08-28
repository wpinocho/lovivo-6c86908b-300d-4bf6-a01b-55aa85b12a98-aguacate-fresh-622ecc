import { Leaf } from "lucide-react";

export const Header = () => {
  console.log("Header component rendered");
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">AguacateStore</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-green-700 hover:text-green-900 font-medium">
              Inicio
            </a>
            <a href="#" className="text-green-700 hover:text-green-900 font-medium">
              Productos
            </a>
            <a href="#" className="text-green-700 hover:text-green-900 font-medium">
              Sobre Nosotros
            </a>
            <a href="#" className="text-green-700 hover:text-green-900 font-medium">
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};