import React, { useState } from "react";
import Helmet from "react-helmet";

export default function MetaData() {
  const [meta] = useState({
    name: "react-helmet-demo",
    description: "react-helmet section",
    ogUrl: "https://bucard.co.il/digitalCard/this-is-short-id",
    imgUrl: "http://m.digital-card.co.il/friedman/249/images/icon.png"
  });
  return (
    <Helmet>
      <title>{`${meta.name}`}</title>
      <meta name="title" content={`Digital card of ${meta.name}`} />
      <meta
        name="description"
        content={`Description for the ${meta.description}`}
      />
      <meta property="og:title" content={`Digital card of ${meta.name}`} />
      <meta property="og:image" content={meta.imgUrl} />
      <meta
        property="og:description"
        content={`Description for the ${meta.description}`}
      />
      <meta property="og:url" content={meta.ogUrl} />
    </Helmet>
  );
}
