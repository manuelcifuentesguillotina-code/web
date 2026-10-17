export type MediaView =
  | {
      readonly id: string;
      readonly status: "placeholder";
      readonly label: string;
    }
  | {
      readonly id: string;
      readonly status: "ready";
      readonly label: string;
      readonly src: string;
      readonly width: number;
      readonly height: number;
    };
