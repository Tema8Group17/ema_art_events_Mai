// DROPDOWN

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterDropdown({
  name,
  label: { singular, plural },
  items,
  action,
}) {
  // console.log("filterDropdown", items);
  return (
    <Select onValueChange={(e) => action(e, name)}>
      <SelectTrigger className=" mb-(--space-1rem) hover:bg-accent w-full">
        <SelectValue
          placeholder={`Vælg ${singular.toLowerCase()}`}
          value="all"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{plural}</SelectLabel>
          <SelectItem value="all">Alle {plural.toLowerCase()}</SelectItem>
          {items.map((item, id) => {
            if (isNaN(item))
              return (
                <SelectItem value={item} key={id}>
                  {item}
                </SelectItem>
              );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
