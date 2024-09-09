import { globalStateApiType } from "../GlobalStateTypes";

const UIModule = ({ set }: globalStateApiType) => {
  return {
    buttonIndex: "",
    setButtonIndex: (buttonIndex: string) => {
      set({ buttonIndex: buttonIndex });
    },
    loaded: false,
    setLoaded: (loaded: boolean) => {
      set({ loaded: loaded });
    },

    showSearch: false,
    setShowSearch: (showSearch: boolean) => {
      set({ showSearch: showSearch });
    },

    appStart: false,
    setAppStart: (appStart: boolean) => {
      set({ appStart: appStart });
    },
  };
};

export { UIModule };
