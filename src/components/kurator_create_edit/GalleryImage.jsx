import Image from "next/image";
import Placeholder from "../../app/assets/img/placeholder.png";

const GalleryImage = ({
  item,
  id,
  selectedImages,
  setSelectedImages,
  locationData,
}) => {
  // console.log(
  //   "GalleryImage start prevData: ",
  //   prevData,
  //   "artWorksIds",
  //   prevData.artworksIds
  // );
  return (
    <figure
      className={`grid grid-cols-1 grid-rows-1 ${
        selectedImages.includes(item?.object_number) ? " order-first" : ""
      }`}
    >
      <section className="grid col-start-1 row-start-1 w-full h-full hover:z-10 bg-black/50 border-3 border-black pt-4 rounded-xs pointer-events-none">
        <p className=" text-white justify-self-center text-center ">
          Artist: {item?.artist[0] || "Ukendt kunstner"}
        </p>
        <p className=" text-white justify-self-center text-center ">
          Teknik: {item?.techniques[0] || "Ukendt teknik"}
        </p>
      </section>
      <Image
        onClick={() => {
          let newSelection = null;
          if (selectedImages.includes(item.object_number)) {
            newSelection = selectedImages.filter(
              (img) => img !== item.object_number
            );
            setSelectedImages(newSelection);
            // console.log(
            //   "Image unselected:",
            //   item.object_number,
            //   "newSelection",
            //   newSelection
            // );
          } else if (selectedImages.length < locationData.maxArtworks) {
            newSelection = selectedImages.concat(item.object_number);
            setSelectedImages(newSelection);
            // console.log(
            //   "Image selected:",
            //   item.object_number,
            //   "newSelection",
            //   newSelection,
            //   "item.title",
            //   item
            // );
          } else {
            console.log("Du har ramt max værker for lokationen!");
          }
          console.log("newSelection", newSelection);
        }}
        key={id}
        src={item.image_thumbnail || item.image_native || Placeholder}
        width={item.image_width || 400}
        height={item.image_height || 400}
        alt={item.titles[0].title || "SMK billede"}
        className={` object-cover w-full h-full  hover:opacity-10 col-start-1 row-start-1 rounded-xs ${
          selectedImages.includes(item.object_number)
            ? "border- border-black order-first"
            : ""
        }
      `}
      ></Image>
    </figure>
  );
};
export default GalleryImage;
