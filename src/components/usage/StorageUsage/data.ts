import { StorageData } from '../../../utils/types';
import { nanoid } from 'nanoid';

const generateStorageUsageData = (
  numberOfPoints: number,
  limit: number
): StorageData[] => {
  const data: StorageData[] = [];

  for (let i = 0; i < numberOfPoints; i++) {
    let storageUsed = i * (19 + Math.random());

    // Colors are set by line segment, stop one at the limit to get an exact color break at that threshold
    if (storageUsed > limit && data[i - 1].storageUsed < limit) {
      storageUsed = limit;
    }

    data.push({
      id: nanoid(),
      storageDate: `2022-11-${i}T14:48:00.000Z`,
      storageUsed,
    });
  }

  return data;
};

// These will be generated based on the filters and return data
const X_AXIS_LABELS = [
  'Nov 1, 2022',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
];

export { generateStorageUsageData, X_AXIS_LABELS };
