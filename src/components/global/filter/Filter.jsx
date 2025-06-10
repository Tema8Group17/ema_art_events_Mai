"use client";

import { usePathname } from "next/navigation";
import FilterDropdown from "./FilterDropdown";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// FILTER
export default function Filter({
  data,
  fn,
  styling,
  locations,
  dates,
  setSelectedLocation,
  setSelectedDate,
  selectedLocation,
  selectedDate,
}) {
  let value = undefined;
  const pathname = usePathname();
  console.log("Filter", locations, dates);
  const isCreateEditPage = pathname?.startsWith("/create_edit");

  return isCreateEditPage ? (
    <aside className={`${styling}`}>
      <p className="mb-(--space-0_5rem)">Filtrer værker:</p>
      {data.map((item, id) => {
        // console.log("Filter", item);
        return <FilterDropdown key={id} {...item} action={fn} />;
      })}
    </aside>
  ) : (
    <aside className={`${styling}`}>
      <p className="mb-(--space-0_5rem)">Filtrer værker:</p>
      <div className="flex flex-row gap-(--space-2rem)">
        <Select onValueChange={(value) => setSelectedLocation(value)}>
          <SelectTrigger className=" mb-(--space-1rem) hover:bg-accent w-full">
            <SelectValue placeholder={`Vælg lokationer`} value="all" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Lokationer</SelectLabel>
              <SelectItem value="all">Alle lokationer</SelectItem>
              {locations.map((item) => {
                if (isNaN(item))
                  return (
                    <SelectItem value={item.id} key={item.id}>
                      {item.name}
                    </SelectItem>
                  );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSelectedDate(value)}>
          <SelectTrigger className=" mb-(--space-1rem) hover:bg-accent w-full">
            <SelectValue placeholder={`Vælg datoer`} value="all" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Datoer</SelectLabel>
              <SelectItem value="all">Alle datoer</SelectItem>
              {dates.map((item) => {
                if (isNaN(item))
                  return (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
