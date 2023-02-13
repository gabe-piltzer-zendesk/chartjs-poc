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
    if (storageUsed > limit && data[i - 1].value < limit) {
      storageUsed = limit;
    }

    data.push({
      id: nanoid(),
      date: `2022-11-${i}T14:48:00.000Z`,
      value: storageUsed,
    });
  }

  return data;
};

const oneYearMonthlyData: StorageData[] = [
  {
    id: nanoid(),
    date: `2022-03-01T14:48:00.000Z`,
    value: 230.9,
  },
  {
    id: nanoid(),
    date: `2022-04-01T14:48:00.000Z`,
    value: 242.0,
  },
  {
    id: nanoid(),
    date: `2022-05-01T14:48:00.000Z`,
    value: 255.1,
  },
  {
    id: nanoid(),
    date: `2022-06-01T14:48:00.000Z`,
    value: 289.0,
  },
  {
    id: nanoid(),
    date: `2022-07-01T14:48:00.000Z`,
    value: 300.9,
  },
  {
    id: nanoid(),
    date: `2022-08-01T14:48:00.000Z`,
    value: 312.8,
  },
  {
    id: nanoid(),
    date: `2022-09-01T14:48:00.000Z`,
    value: 341.2,
  },
  // TODO - Fake datapoint, either calculated by the server or client
  // Does hiding the tick/label throw it off?
  {
    id: nanoid(),
    date: `2022-09-06T14:48:00.000Z`,
    value: 370.0,
  },
  {
    id: nanoid(),
    date: `2022-10-01T14:48:00.000Z`,
    value: 375.3,
  },
  {
    id: nanoid(),
    date: `2022-11-01T14:48:00.000Z`,
    value: 398.0,
  },
  {
    id: nanoid(),
    date: `2022-12-01T14:48:00.000Z`,
    value: 409.7,
  },
  {
    id: nanoid(),
    date: `2023-01-01T14:48:00.000Z`,
    value: 422.6,
  },
  {
    id: nanoid(),
    date: `2023-02-01T14:48:00.000Z`,
    value: 458.2,
  },
  {
    id: nanoid(),
    date: `2023-03-01T14:48:00.000Z`,
    value: 478.5,
  },
  {
    id: nanoid(),
    date: `2023-03-12T14:48:00.000Z`,
    value: 483.5,
  },
];

export { generateStorageUsageData, oneYearMonthlyData };
