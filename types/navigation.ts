export type RootStackParamList = {
  Home: undefined;
  Scan: {
    mode: "camera" | "sound";
  };
  Collection: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
