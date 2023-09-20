import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  onAddItem,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            quantity: 1,
            price,
            item_name: name,
            discount: discount,
            item_id: productGroupID,
            item_variant: productID,
          }],
        },
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button {...btnProps} data-deco="add-to-cart" class="btn-primary bg-black hover:bg-[#ff8b24] flex items-center">
      <Icon id="ShoppingCart" size={28} strokeWidth={2} fill="#FFFFFF" class="text-white" />
      ADICIONAR AO CARRINHO
    </Button>
  );
}
