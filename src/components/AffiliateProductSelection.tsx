import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Package, CheckCircle2, XCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  is_active: boolean;
}

interface AffiliateProduct {
  id: string;
  product_id: string;
  is_selected: boolean;
}

interface AffiliateProductSelectionProps {
  affiliateId: string;
}

export const AffiliateProductSelection = ({ affiliateId }: AffiliateProductSelectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [affiliateProducts, setAffiliateProducts] = useState<AffiliateProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [affiliateId]);

  const fetchData = async () => {
    try {
      const [productsResult, affiliateProductsResult] = await Promise.all([
        supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false }),
        supabase
          .from('affiliate_products')
          .select('*')
          .eq('affiliate_id', affiliateId)
      ]);

      if (productsResult.error) throw productsResult.error;
      if (affiliateProductsResult.error) throw affiliateProductsResult.error;

      setProducts(productsResult.data || []);
      setAffiliateProducts(affiliateProductsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  const isProductSelected = (productId: string): boolean => {
    const affiliateProduct = affiliateProducts.find(ap => ap.product_id === productId);
    return affiliateProduct ? affiliateProduct.is_selected : false;
  };

  const handleToggleProduct = async (productId: string, currentlySelected: boolean) => {
    try {
      const existingAffiliateProduct = affiliateProducts.find(ap => ap.product_id === productId);

      if (existingAffiliateProduct) {
        const { error } = await supabase
          .from('affiliate_products')
          .update({ is_selected: !currentlySelected })
          .eq('id', existingAffiliateProduct.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('affiliate_products')
          .insert({
            affiliate_id: affiliateId,
            product_id: productId,
            is_selected: true
          });

        if (error) throw error;
      }

      toast.success(currentlySelected ? "Produit désélectionné" : "Produit sélectionné");
      fetchData();
    } catch (error: any) {
      console.error('Error toggling product:', error);
      toast.error(error.message || "Erreur lors de la mise à jour");
    }
  };

  const selectedCount = affiliateProducts.filter(ap => ap.is_selected).length;

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Mes produits</CardTitle>
            <CardDescription>
              Sélectionnez les produits à afficher sur votre site
            </CardDescription>
          </div>
          <Badge variant="default" className="text-lg px-4 py-2">
            {selectedCount} / {products.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun produit disponible</h3>
            <p className="text-muted-foreground">
              Les produits apparaîtront ici une fois ajoutés par l'administrateur
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const isSelected = isProductSelected(product.id);
              return (
                <div
                  key={product.id}
                  className={`gradient-glass border rounded-xl p-4 transition-smooth cursor-pointer ${
                    isSelected
                      ? 'border-green-500 bg-green-50/50'
                      : 'border-border hover:border-primary/40'
                  }`}
                  onClick={() => handleToggleProduct(product.id, isSelected)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggleProduct(product.id, isSelected)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                    {isSelected ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-400" />
                    )}
                  </div>

                  {product.image_url && (
                    <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  )}

                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                  {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      {product.price.toFixed(2)} €
                    </span>
                    {product.category && (
                      <Badge variant="outline">{product.category}</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
