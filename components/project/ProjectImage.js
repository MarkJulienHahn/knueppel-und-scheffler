import { useState, useEffect } from "react";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import Image from "next/image";
import { urlFor } from "../../hooks/useImageUrlBuilder";

const ProjectImage = ({ image, i }) => {
  const [url, setUrl] = useState(null);
  const [srcSet, setSrcSet] = useState(null);
  const { windowWidth, windowHeight } = useWindowDimensions();

  const crop = image.crop;
  const width = image.asset.metadata.dimensions.width;
  const height = image.asset.metadata.dimensions.height;

  const getUrl = (size) => {
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
        .width(size)
        .quality(50)
        .url();
    } else return urlFor(image.asset.url).width(size).quality(75).url();
  };

  useEffect(() => {
    const url = getUrl(
      Math.floor(
        windowWidth >
          windowHeight * image.asset.metadata.dimensions.aspectRatio
          ? Math.floor(windowWidth * 1.5)
          : Math.floor(
              windowHeight *
                image.asset.metadata.dimensions.aspectRatio *
                1.5
            )
      )
    );
    setUrl(url);
    const srcSet = `
      ${getUrl(320 * 2)} 320w,
      ${getUrl(480 * 2)} 480w,
      ${getUrl(800 * 2)} 800w,
      ${getUrl(1000 * 2)} 1000w,
      ${getUrl(1600 * 2)} 1600w
    `;
    setSrcSet(srcSet);
  }, [windowWidth]);

  return (
    url && (
      <Image
        fill
        src={url}
        srcSet={srcSet}
        sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, (max-width: 800px) 760px, 1000px"
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
