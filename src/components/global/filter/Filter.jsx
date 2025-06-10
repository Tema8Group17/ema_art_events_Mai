"use client";

import FilterDropdown from "./FilterDropdown";

// FILTER
export default function Filter({ data, fn, styling }) {
  // console.log("Filter", data);
  return (
    <aside className={` ${styling}`}>
      <p className="mb-(--space-0_5rem)">Filtrer værker:</p>
      {data.map((item, id) => {
        // console.log("Filter", item);
        return <FilterDropdown key={id} {...item} action={fn} />;
      })}
    </aside>
  );
}
