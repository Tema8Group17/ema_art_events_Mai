import Image from "next/image";
import Placeholder from "../../app/assets/img/placeholder.png";

const GalleryImage = ({
  item,
  id,
  selectedImages,
  selectedLocation,
  setSelectedImages,
  locationData,
  prevData,
}) => {
  // console.log(
  //   "GalleryImage start prevData: ",
  //   prevData,
  //   "artWorksIds",
  //   prevData.artworksIds
  // );
  return (
    <Image
      onClick={() => {
        let newSelection = null;
        if (selectedImages.includes(item.object_number)) {
          newSelection = selectedImages.filter(
            (img) => img !== item.object_number
          );
          setSelectedImages(newSelection);
          console.log(
            "Image unselected:",
            item.object_number,
            "newSelection",
            newSelection
          );
        } else if (selectedImages.length < locationData.maxArtworks) {
          newSelection = selectedImages.concat(item.object_number);
          setSelectedImages(newSelection);
          console.log(
            "Image selected:",
            item.object_number,
            "newSelection",
            newSelection
          );
        } else {
          console.log("Du har ramt max værker for lokationen!");
        }
        console.log("newSelection", newSelection);
      }}
      key={id}
      src={item.image_thumbnail || item.image_native || Placeholder}
      width={item.image_width || 400}
      height={item.image_height || 400}
      alt={item.title || "SMK billede"}
      className={`object-cover w-full h-full col-span-1 row-span-1 ${
        selectedImages.includes(item.object_number)
          ? "border-4 border-green-500 order-first"
          : ""
      }
      `}
    />
  );
};
export default GalleryImage;
