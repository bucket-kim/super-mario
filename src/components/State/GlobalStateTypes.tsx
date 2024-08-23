import { UIModuleTypes } from "./UIModule/UIModuleTypes";
import { WeatherModuleTypes } from "./WeatherModule/WeatherModuleTypes";

export interface GlobalStateTypes extends UIModuleTypes, WeatherModuleTypes {}

export type SetState<T extends object> = (
  partial: Partial<T> | ((state: T) => void),
  replace?: boolean,
) => void;

export type GetState<T extends object> = () => T;

export type globalStateApiType = {
  set: SetState<GlobalStateTypes>;
  get: GetState<GlobalStateTypes>;
};
