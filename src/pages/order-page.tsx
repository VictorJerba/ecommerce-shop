import { OrderContent } from "@/cases/order/components/order-content";
import { useOrders } from "@/cases/order/hooks/use-order"; 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function OrderPage() {
  
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/minha-conta">Minha Conta</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pedidos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-8">
        {isLoading ? (
            
            <div className="text-center py-10 text-gray-500 animate-pulse">
                Carregando seus pedidos...
            </div>
        ) : (
            
            <OrderContent orders={orders || []} />
        )}
      </div>
    </div>
  );
}