import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId") || undefined;

  // Produtos vindos da API
  const { data: products, isLoading } = useProducts(categoryId);

  // Estado da busca + lista filtrada
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(products ?? []);

  // Quando produtos mudam, sincroniza o filtro
  useEffect(() => {
    setFiltered(products ?? []);
  }, [products]);

  // Função de busca local
  function handleSearch(value: string) {
    setSearch(value);
    const lower = value.toLowerCase();

    const result = (products ?? []).filter((p) =>
      (p.name ?? "").toLowerCase().includes(lower) ||
      (p.description ?? "").toLowerCase().includes(lower)
    );

    setFiltered(result);
  }

  return (
    <>
      <CategoryMenu />

      {/*Barra de busca */}
      <div className="w-full max-w-lg mt-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <section className="flex flex-col">
        <div className="flex mt-8 gap-8 flex-wrap">
          {filtered.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && !isLoading && (
          <p className="text-gray-500 mt-4">Nenhum produto encontrado.</p>
        )}
      </section>
    </>
  );
}
