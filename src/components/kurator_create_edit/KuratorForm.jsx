"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "../global/CustomButton";
import Placeholder from "../../app/assets/img/placeholder.png";
import { useState } from "react";
const KuratorForm = () => {
  const { register, handleSubmit } = useForm();
  const [isSelected, setIsSelected] = useState(false);

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
      <li
        onClick={() => {
          setIsSelected(
            isSelected === object_number ? undefined : object_number
          );
          setSelectedImages(
            selectedImages.includes(object_number)
              ? selectedImages.filter((item) => item !== object_number)
              : selectedImages.concat(object_number)
          );
          console.log("selectedImages", selectedImages);
        }}
        className={`${isSelected ? "ring-4 ring-[#A89C9E] cursor-pointer" : ""}
      relative border-2 aspect-square`}
      >
        {image_thumbnail === "https://api.smk.dk/api/v1/thumbnail/PD" ? (
          <div className="bg-btn-bg/50 text-white grid place-content-center p-2 w-full aspect-square">
            Image not found.
          </div>
        ) : (
          <Image
            src={image_thumbnail || image_native || Placeholder}
            width={image_width || 400}
            height={image_height || 400}
            alt={title || "SMK billede"}
            className="object-cover w-full h-full"
          />
        )}
      </li>
      <CustomButton type="Submit" text="Submit"></CustomButton>
    </form>
  );
};

export default KuratorForm;
