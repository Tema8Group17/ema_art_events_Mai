"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "../global/CustomButton";
const KuratorForm = () => {
  const { register, handleSubmit } = useForm();

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
      <section
        className="border-2 border-amber-700"
        defaultValue={"Billeder"}
        {...register("Billeder")}
      >
        <Image></Image>
      </section>
      <CustomButton type="Submit" text="Submit"></CustomButton>
    </form>
  );
};

export default KuratorForm;
