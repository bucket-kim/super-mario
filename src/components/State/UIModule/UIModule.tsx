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
  };
};

export { UIModule };
