interface LineChartData {
  annotationLabel?: string;
  borderColor?: string;
  label?: string;
  values: number[];
}

interface StorageData {
  id: string;
  storageDate: string;
  storageUsed: number;
}

export { LineChartData, StorageData };
