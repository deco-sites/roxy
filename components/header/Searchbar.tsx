import { lazy, Suspense } from "preact/compat";

import { useUI } from "$store/sdk/useUI.ts";
import { headerHeight } from "$store/components/header/constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const LazySearchbar = lazy(() =>
  import("$store/components/search/Searchbar.tsx")
);

export interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();
  const open = displaySearchPopup.value;

  return (
    <>
      <div
        class={`${
          open ? "block border-y border-base-200 shadow" : "hidden"
        } absolute left-0 top-0 w-screen z-[99] bg-base-100`}
        style={{ marginTop: headerHeight }}
      >
        {open && (
          <Suspense fallback={<span class="loading loading-ring" />}>
            <LazySearchbar {...searchbar} />
          </Suspense>
        )}
      </div>
      <div class={open ? "fixed top-24 left-0 z-[50] h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.4)]" : ""} />
    </>
  );
}

export default Searchbar;
