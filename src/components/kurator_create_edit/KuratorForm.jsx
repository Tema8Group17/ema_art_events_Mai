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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  const [date, setDate] = (React.useState < Date) | (undefined > undefined);

  // PATCH

  const { register, handleSubmit } = useForm({
    defaultValues: prevData || {},
  });

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
      date: data.date,
      locationId: data.locationId,
      description: data.description,
      artworkIds: selectedImages,
    };
    if (prevData && prevData.id) {
      await updateEvent(prevData.id, indhold);
    } else {
      // console.log("indhold", indhold);
      await createEvent(indhold);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-(--space-2rem)"
    >
      <input
        className="border-2 border-amber-700"
        defaultValue={"Title"}
        {...register("title")}
      ></input>
      {/* Shadcn start */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Date of birth
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Shadcn end */}

      <input
        className="border-2 border-amber-700"
        defaultValue={"Dato"}
        {...register("date")}
      ></input>
      <select
        className="border-2 border-amber-700"
        defaultValue={"Lokation"}
        {...register("locationId")}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option>Vælg Lokation</option>
        {locations.map((location) => {
          return (
            <option key={location.id} value={location.id}>
              {location.name}(Max billeder: {location.maxArtworks})
            </option>
          );
        })}
      </select>
      <textarea
        className="border-2 border-amber-700"
        defaultValue={"Beskrivelse"}
        {...register("description")}
      ></textarea>
      <ul className="grid grid-cols-3 gap-x-(--space-2rem)">
        <Filter data={categories} fn={handleFilter} />
        <li className="col-start-1 col-end-3 row-start-1 row-end-[-1] grid grid-cols-4 gap-(--space-1rem)">
          {selectedLocation ? (
            images.map((item, id) => {
              return (
                <GalleryImage
                  key={id}
                  item={item}
                  id
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
      </ul>
      <CustomButton type="Submit" text="Submit"></CustomButton>
    </form>
  );
};

export default KuratorForm;
