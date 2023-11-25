import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import AppStore from "../stores/AppStore";
import { Widget } from "./Widget";

import { tsx } from "@arcgis/core/widgets/support/widget";

import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-menu";
import "@esri/calcite-components/dist/components/calcite-menu-item";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-navigation-user";

type HeaderProperties = Pick<Header, "store">;

@subclass("arcgis-core-template.Header")
class Header extends Widget<HeaderProperties> {
  @property()
  store: AppStore;

  openScene() {
    const itemPageUrl = this.store.map.portalItem.itemPageUrl;
    if (itemPageUrl) {
      window.open(itemPageUrl, "new");
    }
  }

  render() {
    return (
      <div>
        <calcite-navigation slot="header">
          <calcite-navigation-logo
            slot="logo"
            heading={this.store.map.portalItem.title}
            description="ArcGIS Maps SDK for JavaScript"
            thumbnail="./icon-64.svg"
            onclick={() => {
              this.openScene();
            }}
          ></calcite-navigation-logo>

          {this.renderUserProfile()}
        </calcite-navigation>
      </div>
    );
  }

  private renderUserProfile() {
    const userStore = this.store.userStore;
    if (userStore.authenticated) {
      const user = userStore.user;
      return (
        <calcite-navigation-user
          slot="user"
          onclick={() => userStore.signOut()}
          thumbnail={user?.thumbnailUrl}
          full-name={user?.fullName}
          username={user?.username}
        ></calcite-navigation-user>
      );
    } else {
      return (
        <calcite-menu slot="content-end">
          <calcite-menu-item
            onclick={() => userStore.signIn()}
            text="Sign in"
            icon-start="user"
            text-enabled
          ></calcite-menu-item>
        </calcite-menu>
      );
    }
  }
}

export default Header;
