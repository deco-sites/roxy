import Icon from "$store/components/ui/Icon.tsx";

export interface LinkItem {
  text: string;
  href: string;
}

export interface Props {
    /**
   * @title Mobile Links
   * @description The links only render on mobile
   */
  links?: LinkItem[]
}

export default function LinksMobile({ links = [{text:"Novidades", href:"#"}] }: Props) {
  return (
    <div class="block md:hidden">
      <div class="flex flex-col">
        {links?.map(({ text, href }, index) => (
          <div key={index} class="py-2 border-y divide-solid">
            <a href={href} class="flex justify-between">
              <span>{text}</span>
              <Icon
                class="text-base-100"
                size={24}
                id="ChevronRight"
                strokeWidth={3}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
