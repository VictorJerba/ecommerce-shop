import { Card, CardContent } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { FormattedNumber, IntlProvider } from "react-intl"
import { OrderStatusBadge } from "./data-table-badge";

type OrderContentProps = {
  orders: OrderDTO[];
}

export function OrderContent({ orders }: OrderContentProps) {
  return (
    <IntlProvider locale="pt-BR">
      <div className="flex gap-4">
        <Card className="w-full mt-8">
          <CardContent>
            <ItemGroup className="gap-4">
              {orders.map((item, index) => (
                <Item key={index} variant="muted" role="listitem" asChild>
                  <div>
                    <ItemContent>
                      <ItemTitle className="line-clamp-1">
                        {`${new Date(item.product.createdAt).toLocaleDateString("pt-BR")} - ${item.costumer?.name}`}
                      </ItemTitle>

                      <ItemDescription>
                        {item.id}
                      </ItemDescription>
                    </ItemContent>

                    <ItemContent className="flex-none text-right">
                      <div className="flex flex-row gap-4">
                        <div>
                          <OrderStatusBadge  status={item.status} />
                        </div>

                        <div className="flex flex-col">
                          <p className="font-semibold flex justify-end gap-1.5">
                            <FormattedNumber
                              value={item.total || 0}
                              style="currency"
                              currency="BRL"
                            />
                          </p>
                        </div>

                      </div>
                    </ItemContent>
                  </div>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  )
}
