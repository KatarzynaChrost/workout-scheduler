"use server";

interface IGetHolidays {
  year: number;
  country: string;
  type: "NATIONAL_HOLIDAY" | "OBSERVANCE";
}

export type IHolidayResponseData = {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: "NATIONAL_HOLIDAY" | "OBSERVANCE";
}[];

export const getHolidays = async ({ year, country, type }: IGetHolidays) => {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}&type=${type}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx",
      },
    }
  );

  if (!response.ok) {
    return { success: false };
  }

  const responseData: IHolidayResponseData = await response.json();

  return { success: true, data: responseData };
};
