import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import MeasureTable from "../../islands/MeasureTable.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 360;
const HEIGHT = 360;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const platform = usePlatform();
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <>
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        {/* <div>
          <span class="text-sm text-base-300">
            Cod. {gtin}
          </span>
        </div> */}
        <h1>
          <span class="font-semibold text-xl text-[#181812]">{name}</span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4 gap-4 flex flex-col">
        <div class="flex flex-row gap-2 items-center">
          <span class="line-through text-[#181812] text-sm font-semibold">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <span class="font-medium text-base text-[#77777]">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <span class="text-sm text-[#181812]">
          {installments}
        </span>
        <div class="text-[#181812] text-sm">
          à vista com 5%
          de desconto no boleto
        </div>
        <div class="w-full flex justify-start pt-4">
          <div class=" text-[#444] bg-[#eee] px-2 h-[20px] text-xs font-bold mr-2">
            {`-${
              (100 - (100 / (listPrice as number / price as number)))
                .toFixed(0)
              }% OFF`}
          </div>
          { listPrice && price && listPrice > price ? (
            <div class="bg-[#ff8b24] h-6 w-16 text-white font-semibold text-center tracking-widest">SALE</div>
          ) : (
          <Image 
            src="https://d2e5mvjndnxyoo.cloudfront.net/Custom/Content/Flags/0039_flag_637507107698720811.png?p="
            alt="Tag New Product"
            width={10}
            height={10}
          />
          ) }
        </div>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Modal MEASURE TABLE */}
      <div>
        <MeasureTable>
          <div class="flex flex-col items-center gap-4">
            <p class="text-[#777] font-semibold text-sm underline">TABELA DE MEDIDAS</p>
            <p class="text-sm">VESTUÁRIO</p>
            <table>
              <thead>
                <tr>
                  <td class="text-center border border-white bg-[#777] text-white"><span class="text-xs font-bold leading-tight">NUMERAÇÃO</span></td>
                  <td class="text-center border border-white bg-[#777] text-white"><span class="text-xs font-bold leading-tight">BUSTO (cm)</span></td>
                  <td class="text-center border border-white bg-[#777] text-white"><span class="text-xs font-bold leading-tight">CINTURA (cm)</span></td>
                  <td class="text-center border border-white bg-[#777] text-white"><span class="text-xs font-bold leading-tight">QUADRIL (cm)</span></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">PP</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">75 - 78</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">59 - 62</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">81 - 84</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">P</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">79 - 86</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">63 - 70</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">85 - 92</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">M </span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">87 - 90 </span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">71 - 74 </span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">93 - 96 </span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">G</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">95 - 102</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">79 - 86</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">101 - 108</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">GG</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">103 - 110</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">87 - 94</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">109 - 116</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">34</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">75 - 78</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">59 - 62</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">81 - 84</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">36</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">78 - 81</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">62 - 65</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">84 - 87</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">38</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">83 - 86</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">67 - 70</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">89 - 92</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">40</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">87 - 90</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">71 - 74</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">93 - 96</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">42</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">91 - 94</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">75 - 78</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">97 - 100</span></td>
                </tr>
              </tbody>
            </table>
            <p class="text-[#777] font-semibold text-sm underline">TABELA DE MEDIDAS</p>
            <p class="text-sm">WETSUIT</p>
            <table>
              <thead>
                <tr>
                  <td class="text-center border border-white bg-[#777] text-white"><span><b>NUMERAÇÃO</b></span></td>
                  <td class="text-center border border-white bg-[#777] text-white"><span><b>ALTURA (cm)</b></span></td>
                  <td class="text-center border border-white bg-[#777] text-white"><span><b>PESO (kg)</b></span></td>
                  <td class="text-center border border-white bg-[#777] text-white"><span><b>PEITO (cm)</b></span></td>
                  <td class="text-center border border-white bg-[#777] text-white"><span><b>ENTREPERNAS (cm)</b></span></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">4</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">160 - 165</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">41 - 48</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">77 - 82</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">68 - 71</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">6</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">163 - 167</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">45 - 52</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">80 - 85</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">69 - 72</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">8</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">165 - 170</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">50 - 57</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">82 - 87</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">71 - 73</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">10</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">167 - 173</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">54 - 61</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">86 - 91</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">72 - 75</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">12</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">169 - 176</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">58 - 64</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">88 - 94</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">73 - 76</span></td>
                </tr>
                <tr>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">14</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">171 - 180</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">62 - 68</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">92 - 98</span></td>
                  <td class="text-center bg-[#eee] border border-white"><span class="text-xs font-medium">77 - 80</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </MeasureTable>
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                    seller={seller}
                  />
                  <WishlistButton
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      {/* <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
      </div> */}
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const { product } = page;
  const id = useId();
  const images = useStableImages(product);

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <div class="flex flex-col">
          {/* Breadcrumb */}
          <div class="py-4">
            <Breadcrumb

              itemListElement={page?.breadcrumbList?.itemListElement.slice(0, -1)}
            />
          </div>
        <div
          id={id}
          class="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_40vw_40vw] sm:grid-rows-1 sm:justify-center"
        >
          {/* Image Slider */}
          <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
            <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton
              class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
              disabled
            >
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
              disabled={images.length < 2}
            >
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>

            <div class="absolute top-2 right-2 bg-base-100 rounded-full">
              <ProductImageZoom
                images={images}
                width={700}
                height={Math.trunc(700 * HEIGHT / WIDTH)}
              />
            </div>
          </div>

          {/* Dots */}
          <ul class="flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
            {images.map((img, index) => (
              <li class="min-w-[63px] sm:min-w-[100px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border rounded "
                    width={63}
                    height={87.5}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>

          {/* Product Info */}
          <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
        {/* Description card */}
        <div class="mt-4 sm:mt-6 mx-4">
          <span class="text-sm">
            {page?.product?.description && (
              <details>
                <summary class="cursor-pointer">Descrição</summary>
                <div class="ml-2 mt-2">{page?.product?.description}</div>
              </details>
            )}
          </span>
        </div>
      </div>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="container py-0 sm:py-10">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
