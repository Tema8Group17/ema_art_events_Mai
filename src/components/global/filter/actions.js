"use server";
import { getSMKFilter } from "@/lib/api";

export async function filterData(prev, filter) {
  const items = await getSMKFilter(filter.join("&filters="));

  console.log("actions: ", items);
  return { active: filter, data: items };
}
