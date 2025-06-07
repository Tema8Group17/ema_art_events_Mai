"use client";

import { startTransition, useActionState, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

// ---------------------------   Components -------------------------------------//
import CustomButton from "../global/CustomButton";
import Placeholder from "../../app/assets/img/placeholder.png";
import { createEvent, updateEvent } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import Filter from "../global/filter/Filter";
import { filterData } from "../global/filter/actions";

// ----------------------------- KuratorForm ---------------------------------- //
const KuratorForm = ({ images, locations, prevData, categories }) => {
  // Filter
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

  // PATCH

  const { register, handleSubmit } = useForm({
    defaultValues: prevData || {},
  });
  // const [isSelected, setIsSelected] = useState();
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
        <Filter data={categories} fn={handleFilter} />
        <li className="col-start-1 col-end-3 row-start-1 row-end-[-1] grid grid-cols-4 gap-(--space-1rem)">
          {selectedLocation ? (
            images.map((img) => {
              return (
                <Image
                  onClick={() => {
                    if (
                      selectedImages.length <= prevData?.locationId ||
                      locationData.maxArtworks - 1
                    ) {
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
                    // Hvis antal images er 3 og maxArtwork er 4, så returner den false
                    selectedImages.length > locationData?.maxArtworks
                      ? // hvis den returner false tjekker den om der er prevData eller ej hvis true, green border, ellers ingenting.
                        prevData?.artworkIds?.includes(img.object_number)
                        ? "border-4 border-green-500 order-first"
                        : ""
                      : //hvis PrevData ikke er tilgængelig så tjekkes der om selected image indeholder object_number, hvis true retunerer den green border
                      selectedImages.includes(img.object_number)
                      ? "border-4 border-green-500 order-first"
                      : // hvis images længde er ligmed max artworks så skal den retunere opacity.
                      selectedImages.length == locationData?.maxArtworks
                      ? "opacity-25"
                      : ""
                  }`}
                />
              );
            }) && isPending ? (
              <p>Indlæser SMK billeder...</p>
            ) : state?.data?.length === 0 ? (
              images.map((item, id) => (
                <Image
                  onClick={() => {
                    if (
                      selectedImages.length <= prevData?.locationId ||
                      locationData.maxArtworks - 1
                    ) {
                      const newSelection = selectedImages.includes(
                        item.object_number
                      )
                        ? selectedImages.filter(
                            (item) => item !== item.object_number
                          )
                        : selectedImages.concat(item.object_number);

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
                  key={id}
                  src={item.image_thumbnail || item.image_native || Placeholder}
                  width={item.image_width || 400}
                  height={item.image_height || 400}
                  alt={item.title || "SMK billede"}
                  className={`object-cover w-full h-full col-span-1 row-span-1 ${
                    // Hvis antal images er 3 og maxArtwork er 4, så returner den false
                    selectedImages.length > locationData?.maxArtworks
                      ? // hvis den returner false tjekker den om der er prevData eller ej hvis true, green border, ellers ingenting.
                        prevData?.artworkIds?.includes(item.object_number)
                        ? "border-4 border-green-500 order-first"
                        : ""
                      : //hvis PrevData ikke er tilgængelig så tjekkes der om selected image indeholder object_number, hvis true retunerer den green border
                      selectedImages.includes(item.object_number)
                      ? "border-4 border-green-500 order-first"
                      : // hvis images længde er ligmed max artworks så skal den retunere opacity.
                      selectedImages.length == locationData?.maxArtworks
                      ? "opacity-25"
                      : ""
                  }`}
                />
              ))
            ) : (
              state?.data?.map((item, id) => (
                <Image
                  onClick={() => {
                    if (
                      selectedImages.length <= prevData?.locationId ||
                      locationData.maxArtworks - 1
                    ) {
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
                  key={id}
                  src={item.image_thumbnail || item.image_native || Placeholder}
                  width={item.image_width || 400}
                  height={item.image_height || 400}
                  alt={item.title || "SMK billede"}
                  className={`object-cover w-full h-full col-span-1 row-span-1 ${
                    // Hvis antal images er 3 og maxArtwork er 4, så returner den false
                    selectedImages.length > locationData?.maxArtworks
                      ? // hvis den returner false tjekker den om der er prevData eller ej hvis true, green border, ellers ingenting.
                        prevData?.artworkIds?.includes(item.object_number)
                        ? "border-4 border-green-500 order-first"
                        : ""
                      : //hvis PrevData ikke er tilgængelig så tjekkes der om selected image indeholder object_number, hvis true retunerer den green border
                      selectedImages.includes(item.object_number)
                      ? "border-4 border-green-500 order-first"
                      : // hvis images længde er ligmed max artworks så skal den retunere opacity.
                      selectedImages.length == locationData?.maxArtworks
                      ? "opacity-25"
                      : ""
                  }`}
                />
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
