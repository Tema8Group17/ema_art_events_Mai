"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

// ---------------------------   Components -------------------------------------//
import CustomButton from "../global/CustomButton";
import Placeholder from "../../app/assets/img/placeholder.png";

// ----------------------------- KuratorForm ---------------------------------- //
const KuratorForm = (
  images,
  image_thumbnail,
  image_width,
  image_height,
  object_number,
  title
) => {
  const { register, handleSubmit } = useForm();
  const [isSelected, setIsSelected] = useState();
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="flex flex-col gap-(--space-2rem)"
    >
      <input
        className="border-2 border-amber-700"
        defaultValue={"Titel"}
        {...register("Titel")}
      ></input>
      <input
        className="border-2 border-amber-700"
        defaultValue={"Dato"}
        {...register("Dato")}
      ></input>
      <input
        className="border-2 border-amber-700"
        defaultValue={"Lokation"}
        {...register("Lokation")}
      ></input>
      <input
        className="border-2 border-amber-700"
        defaultValue={"Beskrivelse"}
        {...register("Beskrivelse")}
      ></input>
      <input
        className="border-2 border-amber-700"
        defaultValue={"Billeder"}
      ></input>
      <ul className="grid grid-cols-3 gap-x-(--space-2rem)">
        <li className="col-3 row-span-2">Filter her</li>
        <li className="col-start-1 col-end-3 grid grid-cols-4 gap-(--space-1rem)">
          {images.images.map((img) => {
            return (
              <Image
                onClick={() => {
                  setIsSelected(
                    isSelected === object_number ? undefined : object_number
                  );
                  setSelectedImages(
                    selectedImages.includes(object_number)
                      ? selectedImages.filter((item) => item == object_number)
                      : selectedImages.concat(object_number)
                  );
                  console.log(
                    "selectedImages",
                    selectedImages,
                    "object_number: ",
                    object_number
                  );
                }}
                key={img.object_number}
                src={img.image_thumbnail || img.image_native || Placeholder}
                width={img.image_width || 400}
                height={img.image_height || 400}
                alt={img.title || "SMK billede"}
                className="object-cover w-full h-full col-span-1 row-span-1"
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
