import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

type FindSelected = [string, string[]][];

function findSelected(array: FindSelected, url: Product["url"]) {
  let selected = "";
  for (let index = 0; index < array.length; index++) {
    const [item, [value]] = array[index];
    if (value === url) {
      selected = item;
    }
  }
  return selected;
}

function VariantSelector({ product, product: { url } }: Props) {
  const possibilities = useVariantPossibilities(product);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => {
         const arrayPossibilities = Object.entries(
          possibilities[name],
        );
        const selected = findSelected(arrayPossibilities, url);
        return (
        <li class={`flex flex-col gap-2 ${
          /[amanho]/gi.test(name) &&
          "border border-black divide-solid px-2 py-4"
        }`}
      >
        <span class="text-sm">{`${name}: ${selected}`}</span>
          <ul class="flex flex-row gap-3">
            {arrayPossibilities.map(([value, [link]]) => (
              <li>
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={link === url ? "active" : "default"}
                  />
                </a>
              </li>
            ))}
          </ul>
        </li>
      )})}
    </ul>
  );
}

export default VariantSelector;
