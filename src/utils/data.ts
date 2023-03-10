import { StorageData } from './types';
import { nanoid } from 'nanoid';

const generateRandomValue = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const generateYearData = (
  begDate: Date,
  begStorage: number,
  endStorage: number
): StorageData[] => {
  const data: StorageData[] = [];

  // Get a full year plus the current month
  const days = 365 + new Date().getDate() - 1;

  let value = begStorage;

  for (let i = 1; i <= days; i++) {
    let date = new Date(begDate);
    date.setDate(begDate.getDate() + i);
    value = generateRandomValue(begStorage, endStorage);

    data.push({
      id: nanoid(),
      date: date.toISOString(),
      value,
    });
  }

  return data;
};

const bucketYearDataByMonth = (allData: StorageData[]): StorageData[] => {
  const data: StorageData[] = [];

  allData.forEach((d) => {
    const date = new Date(d.date);

    // Grab the first day of each month
    if (date.getDate() === 1) {
      data.push(d);
    }
  });

  // Grab today
  data.push(allData[allData.length - 1]);

  return data;
};

const MONTHLY_DATA: StorageData[] = [
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
  // // TODO - Fake datapoint, either calculated by the server or client
  // // Does hiding the tick/label throw it off?
  // {
  //   id: nanoid(),
  //   date: `2022-09-06T14:48:00.000Z`,
  //   value: 370.0,
  // },
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

const LIMIT = 370;

export { bucketYearDataByMonth, generateYearData, MONTHLY_DATA, LIMIT };
