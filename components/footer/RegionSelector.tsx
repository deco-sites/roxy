import Icon from "$store/components/ui/Icon.tsx";

export interface RegionOptions {
  label?: "Global"
    | "Global2";
  href?: string;
  text?: string;
}

export default function RegionSelector(
  { content }: { content?: RegionOptions },
) {
  return (
    <>
      {content && content.text && content.href &&
        <div class="flex">
          <a href={content.href} class="flex flex-row items-center">
            <Icon id={content?.label ?? "Global"} size={30} />
            <p class="text-xs font-semibold ml-2">{content.text}</p>
          </a>
        </div>
      }
    </>
  );
}

  // (content?.language?.length > 0 || content?.currency?.length > 0) && (
        // <div class="flex flex-wrap gap-4 text-base-content">
        //   {content?.currency?.length > 0 && (
        //     <select class="select select-bordered select-sm h-10">
        //       {content.currency.map((crr) => <option>{crr.label}</option>)}
        //     </select>
        //   )}
        //   {content?.language?.length > 0 && (
        //     <select class="select select-bordered select-sm h-10">
        //       {content.language.map((lng) => <option>{lng.label}</option>)}
        //     </select>
        //   )}