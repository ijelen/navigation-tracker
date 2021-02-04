import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";

const AvatarWrapper = ({ record, source }) => {
  let tempImageUrl;
  const theme = useTheme();
  if (record && record[source]) {
    tempImageUrl = record[source].src.replace("image", "image_200x200");
  } else {
    tempImageUrl = theme.defaultImage;
  }
  const [imageUrl, setImageUrl] = useState(tempImageUrl);
  //   Reload image only if record is created today
  let reloadImage = false;
  reloadImage =
    record &&
    new Date().setHours(0, 0, 0, 0) ===
      new Date(record.lastupdate).setHours(0, 0, 0, 0)
      ? true
      : false;
  // console.log("reloadImage ", record.name, " => ", reloadImage);
  const [imageReloaded, setImageReloaded] = useState(reloadImage);
  // Reload the images after 4 second. That's needed because of the server image resizing.
  useEffect(() => {
    if (!imageReloaded) {
      const timeout = setTimeout(() => {
        setImageUrl(imageUrl + "?" + new Date());
        console.log("Image reloaded => ", imageUrl + "?" + new Date());
        setImageReloaded(true);
      }, 4000);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Avatar
      variant="rounded"
      style={{ width: 90, height: 90, marginRight: 10 }}
      alt={record ? record.name : ""}
      src={imageUrl}
    />
  );
};

export default AvatarWrapper;
