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

  //
  // console.log(
  //   "KuratorForm: ",
  //   "prevData",
  //   prevData,
  //   "prevData.artworkIds",
  //   prevData.artworkIds
  // );
  const { register, handleSubmit } = useForm({
    defaultValues: prevData || {},
  });
  // const [isSelected, setIsSelected] = useState();
  const [selectedImages, setSelectedImages] = useState([]);

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
      const indhold = {
        title: data.title,
        date: data.date,
        locationId: data.locationId,
        description: data.description,
        artworkIds: selectedImages,
      };

      console.log(
        "onSubmit function: ",
        "indhold",
        indhold,
        "selectedImages",
        selectedImages
      );
      const opret = await createEvent(indhold);
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
      >
        {locations.map((location) => {
          return (
            <option key={location.id} value={location.id}>
              {location.name}(Max billeder: {location.maxArtWorks})
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
                  if (prevData) {
                    // ----------------- id prevData ------------------------- //
                    const newSelection = selectedImages.includes(
                      img.object_number
                    )
                      ? selectedImages.filter(
                          (item) => item !== img.object_number
                        )
                      : selectedImages.concat(img.object_number);

                    prevData.artworkIds.map((previtems) =>
                      previtems.concat(newSelection)
                    );

                    setSelectedImages(newSelection);
                    console.log(
                      "onClick: if prevData: ",
                      "slectedImages",
                      selectedImages,
                      "prevData.artworkIds",
                      prevData.artworkIds,
                      "newSelection: ",
                      newSelection
                    );
                  }
                  // --------------------------- if not prevData -----------------------//
                  else {
                    setSelectedImages(
                      selectedImages.includes(img.object_number)
                        ? selectedImages.filter(
                            (item) => item !== img.object_number
                          )
                        : selectedImages.concat(img.object_number)
                    );
                    console.log("onClick: selectedImages", selectedImages);
                  }
                }}
                key={img.object_number}
                src={img.image_thumbnail || img.image_native || Placeholder}
                width={img.image_width || 400}
                height={img.image_height || 400}
                alt={img.title || "SMK billede"}
                className={`object-cover w-full h-full col-span-1 row-span-1 ${
                  // hvis prevData har artworkIds der matcher object_number så skal border vises medmindre selectedImage er mere end 0
                  selectedImages.length === 0
                    ? prevData?.artworkIds?.includes(img.object_number)
                      ? "border-4 border-green-500 order-first"
                      : "opacity-50"
                    : selectedImages.includes(img.object_number)
                    ? "border-4 border-green-500 order-first"
                    : "opacity-50"
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
