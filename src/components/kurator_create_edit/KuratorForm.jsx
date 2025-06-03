"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "../global/CustomButton";
import Placeholder from "../../app/assets/img/placeholder.png";
import { useState } from "react";
const KuratorForm = () => {
  const { register, handleSubmit } = useForm();
  const [selectedImages, setSelectedImages] = useState();

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
        {...register(selectedImages)}
      ></input>
      <CustomButton type="Submit" text="Submit"></CustomButton>
    </form>
  );
};

export default KuratorForm;
