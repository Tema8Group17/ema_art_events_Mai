import KuratorForm from "@/components/kurator_create_edit/KuratorForm";
import { getSMKImg } from "@/lib/api";

export default async function CreateEditEventPage() {
  const images = await getSMKImg();
  return (
    <main>
      <h1>Create Edit</h1>
      <KuratorForm images={images}></KuratorForm>
    </main>
  );
}
