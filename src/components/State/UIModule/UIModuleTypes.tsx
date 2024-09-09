export interface UIModuleTypes {
  buttonIndex: string;
  setButtonIndex: (buttonIndex: string) => void;

  loaded: boolean;
  setLoaded: (loaded: boolean) => void;

  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;

  appStart: boolean;
  setAppStart: (appStart: boolean) => void;
}
