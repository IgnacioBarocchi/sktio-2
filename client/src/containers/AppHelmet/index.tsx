import React from "react";
import { Helmet } from "react-helmet";
import metaTags from "./metaTags";

const AppHelmet = () => (
  <Helmet>
    {metaTags.map((metaTag, i) => (
      <meta key={i} name={metaTag.name} content={metaTag.content} />
    ))}
  </Helmet>
);
export default AppHelmet;
