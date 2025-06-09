import KuratorForm from "@/components/kurator_create_edit/KuratorForm";
import {
  getArtworkByEventID,
  getArtworkByID,
  getEvent,
  getEventId,
  getEventLocations,
  getSMKFilterCat,
  getSMKImg,
} from "@/lib/api";

export default async function CreateEditEventPage({ searchParams }) {
  let prevData = null;
  let objectNumber = null;
  let imgsById = null;
  let mergedImages = null;

  //From Api.js
  const images = await getSMKImg();
  const categories = await getSMKFilterCat();
  const events = await getEvent();
  const locations = await getEventLocations();
  const eventId = await searchParams?.eventId;
  //Missing Images from prevData

  if (eventId) {
    prevData = await getEventId(eventId);
    objectNumber = prevData.artworkIds;
    imgsById = await getArtworkByID(objectNumber);

    // Ensures that imgsById is always an array
    const imgsArray = Array.isArray(imgsById.items)
      ? imgsById.items
      : [imgsById];

    const baseIds = images.map((img) => img.object_number);
    const missingImages = imgsArray.filter(
      (img) => !baseIds.includes(img.object_number)
    );

    mergedImages = [...images, ...missingImages];

    // console.log(
    //   "if eventID: objectNumber: ",
    //   objectNumber,
    //   "prevData",
    //   prevData,
    //   "prevData.artworkIds",
    //   prevData.artworkIds,
    //   "imgById",
    //   imgsById,
    //   "mergedImages",
    //   mergedImages,
    //   "categories",
    //   categories
    // );
  }

  // console.log(
  //   "page: ",
  //   "images",
  //   images,
  //   "events",
  //   events,
  //   "locations",
  //   locations,
  //   "eventId",
  //   eventId,
  //   "prevData",
  //   prevData
  // );
  return (
    <main>
      <h1>Create Edit</h1>
      <KuratorForm
        categories={categories}
        images={mergedImages || images}
        events={events}
        locations={locations}
        prevData={prevData}
      ></KuratorForm>
    </main>
  );
}
