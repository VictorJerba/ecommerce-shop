import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../hooks/use-cart";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2 } from "lucide-react";
import { QuantityInput } from "@/components/ui/quantity-imput";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useNavigate } from "react-router-dom";
import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import type { OrderDTO, OrderItemDTO } from "@/cases/order/dtos/order.dto";
import { useCreateOrder } from "@/cases/order/hooks/use-order";

export function CartContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { cart, removeProductCart, clearCart } = useCart();

const createOrder = useCreateOrder();

  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;

  function handleCreateOrder() {
    if (!user) {
      navigate('/signin?redirect=/cart');
    } else {
      //TO DO RECUPERAR DADOS DO CLIENTE 
      const customer: CustomerDTO = {
        id: user.id,
        name: user.name
      };

      //Recuperar itens do carrinho e montar itens do pedido

      const items: OrderItemDTO[] = [];

          cart.items.forEach((item) => {
          items.push({
            product: item.product,
            quantity: item.quantity,
            value: item.product.price,
            total: item.quantity * item.product.price,
            status: "NEW",
            createdAt: new Date()
          });
        });


      //Montar o pedido 
      const order: OrderDTO= {
        customer: customer,
        status: 'NEW',
        items: items
      }

      //Chamar o hook para criar o pedido
      createOrder.mutate (
        order, {
          onSuccess: () => {
            clearCart();
            navigate('/orders');
          }
        }
      )

    }
  }

  return (
    <IntlProvider locale="pt-BR">
      <div className="flex gap-4">
        <Card className="w-full mt-8">
          <CardContent>
            <ItemGroup className="gap-4">
              {cart.items.map((item, index) => (
                <Item key={index} variant="muted" role="listitem" asChild>
                  <div>
                    <ItemMedia variant="image">
                      {item.product.photos?.length > 0 && (
                        <img
                          src={`${bucketBaseURL}${item.product.photos[0].path}`}
                          className="w-8 h-8 object-cover grayscale"
                        />
                      )}
                    </ItemMedia>

                    <ItemContent>
                      <ItemTitle className="line-clamp-1">
                        {item.product.name}
                      </ItemTitle>
                      <ItemDescription>
                        {item.product.brand?.name}
                      </ItemDescription>
                    </ItemContent>

                    <ItemContent className="flex-none text-right">
                      <div className="flex flex-row gap-4">
                        <QuantityInput initialQuantity={item.quantity} />

                        <div className="flex flex-col">
                          <p className="font-semibold flex justify-end gap-1.5">
                            <FormattedNumber
                              value={item.product.price * 0.9}
                              style="currency"
                              currency="BRL"
                            />
                            {" "}No Pix
                          </p>

                          <p className="font-light flex justify-end gap-1.5">
                            <FormattedNumber
                              value={item.product.price}
                              style="currency"
                              currency="BRL"
                            />
                            {" "}No Cartão
                          </p>
                        </div>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeProductCart(item.product.id!)}
                            >
                              <Trash2 className="text-red-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remover produto do carrinho</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </ItemContent>
                  </div>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>

        <div className="flex flex-col w-md mt-8 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Frete para CEP</CardTitle>
            </CardHeader>
            <CardContent>
              <InputGroup>
                <InputGroupInput placeholder="CEP" />
                <InputGroupAddon>
                  <MapPin className="text-green-600" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-1 hover:bg-transparent hover:text-green-700"
                  >
                    Calcular
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total do Pedido:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <ItemGroup>
                <Item variant="muted">
                  <ItemContent>
                    <ItemTitle>Fretes:</ItemTitle>
                  </ItemContent>
                  <ItemContent className="text-right">
                    <ItemTitle>
                      <FormattedNumber value={0} style="currency" currency="BRL" />
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </ItemGroup>

              <ItemGroup>
                <Item variant="muted">
                  <ItemContent>
                    <ItemTitle>Produtos:</ItemTitle>
                  </ItemContent>
                  <ItemContent className="text-right">
                    <ItemTitle>
                      <FormattedNumber value={500} style="currency" currency="BRL" />
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </ItemGroup>

              <ItemGroup>
                <Item variant="muted">
                  <ItemContent>
                    <ItemTitle>Total:</ItemTitle>
                  </ItemContent>
                  <ItemContent className="text-right">
                    <ItemTitle>
                      <p className="text-xs font-semibold">
                        <FormattedNumber value={500 * 0.9} style="currency" currency="BRL" /> No Pix
                      </p>

                      <p className="text-xs font-light">
                        <FormattedNumber value={500} style="currency" currency="BRL" /> No Cartão
                      </p>
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </ItemGroup>
            </CardContent>

            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-light" onClick={handleCreateOrder}>
                Finalizar Compra
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </IntlProvider>
  );
}
