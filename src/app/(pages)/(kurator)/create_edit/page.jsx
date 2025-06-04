import KuratorForm from "@/components/kurator_create_edit/KuratorForm";
import { getEvent, getEventLocations, getSMKImg } from "@/lib/api";

export default async function CreateEditEventPage() {
  const images = await getSMKImg();
  const events = await getEvent();
  const locations = await getEventLocations();
  console.log(
    "page: ",
    "images",
    images,
    "events",
    events,
    "locations",
    locations
  );
  return (
    <main>
      <h1>Create Edit</h1>
      <KuratorForm
        images={images}
        events={events}
        locations={locations}
      ></KuratorForm>
    </main>
  );
}
