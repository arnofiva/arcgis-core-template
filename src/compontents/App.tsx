import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";

import { tsx } from "@arcgis/core/widgets/support/widget";

import { watch } from "@arcgis/core/core/reactiveUtils";
import { ArcgisSceneCustomEvent } from "@arcgis/map-components";
import AppStore from "../stores/AppStore";
import Player from "./Player";
import { Widget } from "./Widget";

import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-menu";
import "@esri/calcite-components/dist/components/calcite-menu-item";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-navigation-user";
import AnimationPanel from "./AnimationPanel";
import SettingsPanel from "./SettingsPanel";

// type AppProperties = Pick<App, "store">;
type AppProperties = {};

const params = new URLSearchParams(document.location.search.slice(1));

@subclass()
class App extends Widget<AppProperties> {
  @property({ constructOnly: true })
  store = new AppStore();

  @property()
  webSceneId = params.get("webscene") || "91b46c2b162c48dba264b2190e1dbcff";

  private bindView(arcgisScene: HTMLArcgisSceneElement) {
    const view = arcgisScene.view;
    this.store.sceneStore.view = view;

    const player = new Player({
      store: this.store.playerStore,
    });

    view.ui.add(player, "bottom-right");

    this.addHandles(
      watch(
        () => this.store && this.store.playerStore.state,
        (state) => {
          if (state === "animating") {
            player.visible = false;
          } else if (state === "ready") {
            player.visible = true;
          }
        },
      ),
    );
  }

  render() {
    const store = this.store;

    return (
      <div>
        <calcite-shell>
          <AppNavigation store={store}></AppNavigation>
          <div slot="header">{/* <Header store={this.store}></Header> */}</div>

          <AppMenu store={store}></AppMenu>

          <calcite-panel>
            <calcite-shell content-behind="true">
              <AppPanel store={store}></AppPanel>

              <arcgis-scene
                item-id={this.webSceneId}
                onArcgisViewReadyChange={(e: ArcgisSceneCustomEvent<void>) =>
                  this.bindView(e.target)
                }
              ></arcgis-scene>
            </calcite-shell>
          </calcite-panel>
        </calcite-shell>
      </div>
    );
  }
}

const AppNavigation = ({ store }: { store: AppStore }) => {
  const portalItem = store.sceneStore.map?.portalItem;
  const itemPageUrl = portalItem?.itemPageUrl;

  const userStore = store?.userStore;

  const user = (userStore?.authenticated && userStore?.user) || null;

  return (
    <calcite-navigation slot="header">
      <calcite-navigation-logo
        slot="logo"
        heading={portalItem?.title}
        description="ArcGIS Maps SDK for JavaScript"
        thumbnail="./icon-64.svg"
        onclick={() => {
          if (itemPageUrl) {
            window.open(itemPageUrl, "new");
          }
        }}
      ></calcite-navigation-logo>

      {user ? (
        <calcite-navigation-user
          slot="user"
          // active={this.userMenuOpen}
          // onclick={() => {
          //   this.userMenuOpen = !this.userMenuOpen;
          // }}
          thumbnail={user.thumbnailUrl}
          full-name={user.fullName}
          username={user.username}
        ></calcite-navigation-user>
      ) : (
        <calcite-menu slot="content-end">
          <calcite-menu-item
            onclick={() => userStore?.signIn()}
            text="Sign in"
            icon-start="user"
            text-enabled
          ></calcite-menu-item>
        </calcite-menu>
      )}
    </calcite-navigation>
  );
};

const AppMenu = ({ store }: { store: AppStore }) => {
  const toggleMenu = (menu: "animation" | "settings") => {
    if (store.selectedMenu === menu) {
      store.selectedMenu = null;
    } else {
      store.selectedMenu = menu;
    }
  };

  return (
    <calcite-shell-panel
      slot="panel-start"
      collapsed
      display-mode="float-content"
    >
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action
          icon="effects"
          text="Animation"
          active={store.selectedMenu === "animation"}
          onclick={() => toggleMenu("animation")}
        ></calcite-action>
        <calcite-action
          icon="gear"
          text="Settings"
          active={store.selectedMenu === "settings"}
          onclick={() => toggleMenu("settings")}
        ></calcite-action>
      </calcite-action-bar>
    </calcite-shell-panel>
  );
};

const AppPanel = ({ store }: { store: AppStore }) => {
  const SelectedAppPanel = () => {
    switch (store.selectedMenu) {
      case "animation":
        return <AnimationPanel store={store}></AnimationPanel>;
      case "settings":
        return <SettingsPanel store={store}></SettingsPanel>;
      default:
        return <div></div>;
    }
  };

  return (
    <calcite-shell-panel slot="panel-start" display-mode="float">
      <SelectedAppPanel></SelectedAppPanel>
    </calcite-shell-panel>
  );
};

export default App;
