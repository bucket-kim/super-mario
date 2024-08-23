export interface UIModuleTypes {
  buttonIndex: string;
  setButtonIndex: (buttonIndex: string) => void;

  loaded: boolean;
  setLoaded: (loaded: boolean) => void;

  clickForecastArrow: boolean;
  setClickForecastArrow: (clickForecastArrow: boolean) => void;

  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
}
