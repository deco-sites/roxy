import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import ExtraLinks from "$store/components/header/ExtraLinks.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface extraLinkItem {
  text: string;
  href: string;
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;

  extraLinks?: {
    left?: extraLinkItem[];
    right?: extraLinkItem[];
  }

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  hide?: {
    account: false | true;
    wishlist: false | true;
    alert: false | true;
    extraLinks: false | true
  }
}

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  extraLinks,
  hide,
  logo,
}: Props) {
  const platform = usePlatform();
  const searchbar = { ..._searchbar, products, suggestions };

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            {!hide?.alert && <Alert alerts={alerts} />}
            {!hide?.extraLinks && <ExtraLinks extraLinks={extraLinks} /> }
            <Navbar items={navItems} searchbar={searchbar} logo={logo} hide={hide} />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
