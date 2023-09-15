import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import Icon from "deco-sites/storefront/components/ui/Icon.tsx";

export interface Props {
  title?: string;
  input?: {
    placeholder?: string;
  }
  cta?: {
    label: "Locate"
    | "Locate2";
    /** @description Remember that the href is the compose href + the query string 'locality' with cep */
    href: string;
  }
}

export default function LocateMe({ title, input, cta }: Props) {

  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const cep =
        (e.currentTarget.elements.namedItem("cep") as RadioNodeList)?.value;

      window.location.pathname = `/${cta?.href ?? ""}?locality=${cep}`
    } finally {
      loading.value = false;
    }
  };

  return (
    <div>
      <form
        class="form-control"
        onSubmit={handleSubmit}
      >
        <p class="font-semibold text-sm pb-5">{title}</p>
        <div class="flex flex-wrap gap-3 relative">
          <input
            name="cep"
            class="flex-auto md:flex-none input input-bordered border divide-solid border-[#505050] w-full bg-transparent"
            placeholder={input?.placeholder || "Digite seu email"}
          />
          <button
              type="submit"
              class="disabled:loading border-none bg-transparent absolute right-2 top-2 hover:text-[#505050] hover:fill-[#505050]"
              disabled={loading}
            >
              <Icon id={cta?.label ?? "Locate"} size={30} />
              {/* {cta?.text || "Inscrever"} */}
            </button>
        </div>
      </form>
    </div>
  )
}