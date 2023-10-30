import { useState, useEffect } from "react";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import Image from "next/image";
import { urlFor } from "../../hooks/useImageUrlBuilder";

const ProjectImage = ({ image, i }) => {
  const [url, setUrl] = useState(null);
  const { windowWidth } = useWindowDimensions();

  const crop = image.crop;
  const width = image.asset.metadata.dimensions.width;
  const height = image.asset.metadata.dimensions.height;

  const getUrl = () => {
    if (crop) {
      // compute the cropped image's area
      const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

      const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

      // compute the cropped image's position
      const left = Math.floor(width * crop.left);
      const top = Math.floor(height * crop.top);

      // gather into a url
      return urlFor(image.asset.url)
        .rect(left, top, croppedWidth, croppedHeight)
        .quality(50)
        .url();
    } else
      return urlFor(image.asset.url)
        .width(windowWidth > 1000 ? windowWidth : 1000)
        .quality(50)
        .url();
  };

  useEffect(() => {
    setUrl(getUrl());
  }, []);


  return (
    url && (
      <Image
        fill
        src={url}
        placeholder={"blur"}
        blurDataURL={image.asset.metadata.lqip}
        style={{
          objectFit: "cover",
          objectPosition: image.hotspot
            ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
            : "center",
        }}
        alt={image.alt ? image.alt : "An image by Knüppel & Scheffler"}
        priority={i <= 2 ? true : false}
        quality={3}
      />
    )
  );
};

export default ProjectImage;
