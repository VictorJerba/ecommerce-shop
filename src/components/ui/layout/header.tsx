import { useCart } from "@/cases/cart/hooks/use-cart";
import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, signOut } = useAuth();

  function handleSignOut() {
    signOut();
    navigate('/');
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">

        <div className="flex items-center gap-2">
          <ShoppingCart className="text-green-600" />
          <h1 className="text-lg font-bold">
            <span className="font-light">Oasis</span> Shop
          </h1>
        </div>

        <div className="flex items-center gap-1">

          {!user && (
            <Link to="/signin">
              <Button variant="link">
                Entrar
              </Button>
            </Link>
          )}

          <Link to="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-700 relative"
            >
              <ShoppingCart />
              {cart.items.length > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-green-600 text-white"
                  )}
                >
                  {cart.items.length}
                </Badge>
              )}
            </Button>
          </Link>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover-text-green-700"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user.name}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate( '/orders')}>
                  Meus Pedidos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>
      </div>
    </header>
  );
}
