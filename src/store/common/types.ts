export interface IMaintenance {
  isUnderMaintenance: boolean;
  message: string;
  image: string;
}

type IconType = Record<string, { icon: string; pdfExportIcon: string }>;
export type CommonDataType = Record<string, IconType>;
