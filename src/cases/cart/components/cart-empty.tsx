import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartEmpty() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center py-8">
            <Card className="w-full max-w-3xl">
                <CardContent className="w-full flex flex-col justify-center items-center py-8">
                    <div className="w-24 h-24 rounded-full border-4 border-green-600 flex justify-center items-center">
                        <ShoppingCart className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-center text-2xl font-semibold my-4">Seu carrinho está vazio</h3>
                    <p className="text-center text-lg text-gray-500">
                         Clique no botão abaixo para voltar a página inicial.
                    </p>
                </CardContent>
                <CardFooter className="flex-justify-center py-8">
                    <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:border-green-700 hover:text-green-700"
                    onClick={() => navigate("/")}
                    >
                        Pagina Inicial
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}