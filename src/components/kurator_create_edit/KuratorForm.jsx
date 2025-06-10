"use client";

import { startTransition, useActionState, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// ---------------------------   Components -------------------------------------//
import CustomButton from "../global/CustomButton";

import { createEvent, updateEvent } from "@/lib/api";
import Filter from "../global/filter/Filter";
import { filterData } from "../global/filter/actions";
import GalleryImage from "./GalleryImage";

// ------------------------------- ShadCn ------------------------------------- //
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ----------------------------- KuratorForm ---------------------------------- //
const KuratorForm = ({ images, locations, prevData, categories, events }) => {
  // Shadcn Calender
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(() => {
    if (prevData?.date) {
      return new Date(prevData.date); // convert string to Date object
    }
    return undefined;
  });

  // PATCH

  const form = useForm({
    defaultValues: prevData || {},
  });

  const { control, handleSubmit } = form;

  const [selectedImages, setSelectedImages] = useState(
    prevData?.artworkIds || []
  );
  const [selectedLocation, setSelectedLocation] = useState(
    prevData?.locationId
  );
  const locationData = locations.find((item) => item.id === selectedLocation);

  const onSubmit = async (data) => {
    const indhold = {
      title: data.title,
      date: data.date ? data.date.split("T")[0] : null,
      locationId: data.locationId,
      description: data.description,
      artworkIds: selectedImages,
    };
    if (prevData && prevData.id) {
      await updateEvent(prevData.id, indhold);
    } else {
      await createEvent(indhold);
    }
    console.log("onSubmit", indhold);
  };
  const [state, action, isPending] = useActionState(filterData, {
    active: [],
    data: [],
  });
  function handleFilter(value, category) {
    const replaceFilter = state?.active?.filter(
      (item) => !item.includes(category)
    );
    const data =
      value === "all"
        ? replaceFilter
        : [...replaceFilter, `[${category}:${value}]`];

    startTransition(action.bind(state, data));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-(--space-2rem) mt-(--space-4rem)"
      >
        {/* ------------------------------------ Titel Input ---------------------------------- */}
        <section className="grid grid-cols-3 gap-(--space-2rem) ">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    {...field}
                    className={"text-(--muted-foreground)"}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* ------------------------------------ Date Picker Input ---------------------------------- */}
          <div className="flex flex-col gap-3 ">
            <Label htmlFor="date" className="px-1 ">
              Dato
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="submit"
                  variant="outline"
                  id="date"
                  className=" justify-between font-normal text-(--muted-foreground) w-full"
                >
                  {date ? date.toLocaleDateString("sv-SE") : "Vælg dato"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date || prevData}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);

                    const formattedDate = date.toLocaleDateString("sv-SE");
                    form.setValue("date", formattedDate);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* ------------------------------------ Location Picker Input ---------------------------------- */}
          <FormField
            control={control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokation</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedLocation(value);
                  }}
                  value={selectedLocation || field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        "text-(--muted-foreground) hover:bg-accent w-full"
                      }
                    >
                      <SelectValue placeholder="Vælg en lokation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem
                        key={location.id}
                        value={location.id.toString()}

                        // her skal jeg lave hvis et event allerede er valgt på dato'en
                      >
                        {location.name} (Max billeder: {location.maxArtworks})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        {/* ------------------------------------------- Beskrivelse -----------------------------------*/}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivelse</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Beskrivelse af eventet"
                  {...field}
                  className={"text-(--muted-foreground)"}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ul className="grid grid-cols-3 grid-rows-2 gap-x-(--space-4rem)">
          <Filter
            data={categories}
            fn={handleFilter}
            styling="col-start-3 col-span-full row-start-1 row-span-1 w-full"
          />
          <li className="col-start-1 col-end-3 row-start-1 row-span-full grid grid-cols-4 gap-(--space-1rem)">
            {selectedLocation ? (
              images.map((item, id) => {
                return (
                  <GalleryImage
                    key={id}
                    item={item}
                    id={id}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    locationData={locationData}
                  ></GalleryImage>
                );
              }) && isPending ? (
                <p>Indlæser SMK billeder...</p>
              ) : state?.data?.length === 0 ? (
                images.map((item, id) => (
                  <GalleryImage
                    key={id}
                    item={item}
                    id
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    locationData={locationData}
                  ></GalleryImage>
                ))
              ) : (
                state?.data?.map((item, id) => (
                  <GalleryImage
                    key={id}
                    item={item}
                    id={id}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    locationData={locationData}
                  ></GalleryImage>
                ))
              )
            ) : (
              "Vælg en lokation"
            )}
          </li>
          <CustomButton
            type="submit"
            text="Submit"
            className={"col-start-3 col-span-full row-start-2"}
          ></CustomButton>
        </ul>
      </form>
    </Form>
  );
};

export default KuratorForm;
