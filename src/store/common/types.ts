export interface IMaintenance {
  isUnderMaintenance: boolean;
  message: string;
  image: string;
}

export interface IIcon {
  icon: string;
  pdfExportIcon: string;
}
export interface ICommonData {
  icons: {
    star: IIcon;
    starUnfilled: IIcon;
  };
}
