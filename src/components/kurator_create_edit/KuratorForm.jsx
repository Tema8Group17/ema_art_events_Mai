"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

// ---------------------------   Components -------------------------------------//
import CustomButton from "../global/CustomButton";
import Placeholder from "../../app/assets/img/placeholder.png";
import { createEvent, updateEvent } from "@/lib/api";
import { useSearchParams } from "next/navigation";

// ----------------------------- KuratorForm ---------------------------------- //
const KuratorForm = ({ images, locations, prevData }) => {
  // PATCH

  const { register, handleSubmit } = useForm({
    defaultValues: prevData || {},
  });
  // const [isSelected, setIsSelected] = useState();
  const [selectedImages, setSelectedImages] = useState(
    prevData?.artworkIds || []
  );
  const [selectedLocation, setSelectedLocation] = useState();
  const locationData = locations.find((item) => item.id === selectedLocation);
  console.log("location Data i starten", locationData);
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
      console.log("indhold", indhold);
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
        <li className="col-3 row-span-2">Filter her</li>
        <li className="col-start-1 col-end-3 grid grid-cols-4 gap-(--space-1rem)">
          {images.map((img) => {
            return (
              <Image
                onClick={() => {
                  if (selectedImages.length <= locationData.maxArtworks - 1) {
                    const newSelection = selectedImages.includes(
                      img.object_number
                    )
                      ? selectedImages.filter(
                          (item) => item !== img.object_number
                        )
                      : selectedImages.concat(img.object_number);

                    setSelectedImages(newSelection);
                    console.log(
                      "onClick: newSelection",
                      newSelection,
                      "selectedLocation",
                      selectedLocation,
                      "locationData.maxArtworks: ",
                      locationData.maxArtworks,
                      "selectedLocation.max",
                      selectedLocation.maxArtworks
                    );
                  } else {
                    console.log("NO!");
                  }
                }}
                key={img.object_number}
                src={img.image_thumbnail || img.image_native || Placeholder}
                width={img.image_width || 400}
                height={img.image_height || 400}
                alt={img.title || "SMK billede"}
                className={`object-cover w-full h-full col-span-1 row-span-1 ${
                  selectedImages.length > locationData?.maxArtworks
                    ? prevData?.artworkIds?.includes(img.object_number)
                      ? "border-4 border-green-500 order-first"
                      : ""
                    : selectedImages.includes(img.object_number)
                    ? "border-4 border-green-500 order-first"
                    : selectedImages.length == locationData?.maxArtworks
                    ? "opacity-25"
                    : "opacity-80"
                }`}
              />
            );
          })}
        </li>
      </ul>
      <CustomButton type="Submit" text="Submit"></CustomButton>
    </form>
  );
};

export default KuratorForm;
