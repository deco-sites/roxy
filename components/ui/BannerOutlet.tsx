import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Header from "$store/components/ui/SectionHeader.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  text?: string;
  cta?: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  fullWidth?: false | true;
  banners: Banner[];
}

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BannerOutlet({
  title,
  borderRadius,
  banners = [],
  fullWidth,
}: Props) {
  return (
    <section
      class={`xl:container w-full mx-auto ${fullWidth ? "px-0" : "px-5"}`}
    >
      <Header
        title={title || ""}
        description={""}
        fontSize={"Large"}
        alignment={"center"}
      />
      {/* {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
            <h2 class="text-lg leading-5 font-semibold uppercase">
              {title}
            </h2>

            <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
          </div>
        )} */}
      <div
        class={`grid gap-4 md:gap-6 grid-cols-1`}
      >
        {banners.map(({ href, srcMobile, srcDesktop, alt, text, cta }) => (
          <a
            href={href}
            class={`overflow-hidden relative ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={96}
                height={30}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={366}
                height={38}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
            <div class="absolute top-0 left-0 w-full h-full hover:bg-gray-600 hover:opacity-30" />
            {text || cta
              ? (
                <div
                  class={`pt-4 text-black flex flex-col p-2 gap-2 tracking-widest`}
                >
                  {text && <h2 class="text-3xl">{text}</h2>}
                  {cta && (
                    <p class="text-xl text-black tracking-widest">{cta}</p>
                  )}
                </div>
              )
              : ""}
          </a>
        ))}
      </div>
    </section>
  );
}
