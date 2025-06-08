import KuratorForm from "@/components/kurator_create_edit/KuratorForm";
import {
  getArtworkByEventID,
  getEvent,
  getEventId,
  getEventLocations,
  getSMKFilterCat,
  getSMKImg,
} from "@/lib/api";

export default async function CreateEditEventPage({ searchParams }) {
  const images = await getSMKImg();
  const categories = await getSMKFilterCat();
  const events = await getEvent();
  const locations = await getEventLocations();
  const eventId = await searchParams.eventId;
  let prevData = null;
  let missingImages = null;
  if (eventId) {
    prevData = await getEventId(eventId);
    prevData.artworkIds.map((objectNumber) => {
      missingImages = [objectNumber];
      console.log(
        "if eventID: objectNumber: ",
        objectNumber,
        "missingImages",
        missingImages
      );
    });
    await getArtworkByEventID();
  }
  // prevData.artworksIds;
  // const imageByID = await getArtworkByEventID(objectNumber);

  console.log(
    "page: ",
    "images",
    images,
    "events",
    events,
    "locations",
    locations,
    "eventId",
    eventId,
    "prevData",
    prevData,
    " prevData.artworksIds",
    prevData.artworksIds
  );
  return (
    <main>
      <h1>Create Edit</h1>
      <KuratorForm
        categories={categories}
        images={images}
        events={events}
        locations={locations}
        prevData={prevData}
      ></KuratorForm>
    </main>
  );
}
