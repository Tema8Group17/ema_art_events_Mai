"use client";

import FilterDropdown from "./FilterDropdown";

// FILTER
export default function Filter({ data, fn }) {
  // console.log("Filter", data);
  return (
    <aside className="mx-auto">
      <p className="mb-(--space-0_5rem)">Filtrer:</p>
      {data.map((item, id) => {
        console.log("Filter", item);
        return <FilterDropdown key={id} {...item} action={fn} />;
      })}
    </aside>
  );
}
