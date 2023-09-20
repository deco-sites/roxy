import { useId } from "$store/sdk/useId.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

export interface SaleBannerItem {
  /**
   * @title Text
   * @default Time left for a campaign to end wth a link
   */
  text?: HTMLWidget;

  link?: {
    /**
     * @title Link Text
     * @default button
     */
    text: string;
    /**
     * @title Link href
     * @default #
     */
    href: string;
  };

}

export interface Props {
  saleBanner: SaleBannerItem[];
  layout?: {
    textPosition?: "Center" | "After counter";
  };
}

export default function SaleBanner({
  saleBanner = [
    {
      text: "Time left for a campaign to end wth a link",
      link: { text: "Click me", href: "/hello" }
    }
  ],
  layout = { textPosition: "Center" },
}) {
  const id = useId()
  return (
    <div id={id} class="border-t border-b border-black">
      <div class="container px-4 py-4">
        <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5">
          { saleBanner.map(({ link, text }: SaleBannerItem, index: number) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-4 carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <div>
                <span class="font-bold text-sm">{text}</span>
                <a class="text-sm underline"
                  href={link?.href}
                >
                  {text}
                </a>
              </div>
            </Slider.Item>
          )) }

        </Slider>
        {/* <SliderJS root={id} /> */}
      </div>
    </div>
  )
}
