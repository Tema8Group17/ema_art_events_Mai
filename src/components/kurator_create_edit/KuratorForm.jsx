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
  title
) => {
  console.log("KuratorForm", images);
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
      <li>{images.map((img) => {})}</li>
      <CustomButton type="Submit" text="Submit"></CustomButton>
    </form>
  );
};

export default KuratorForm;
