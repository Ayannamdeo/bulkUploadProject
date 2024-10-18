import React from "react";

import { Hero } from "./container/Hero";

const HomePage = () => {
  return (
    <>
      <Hero />
    </>
  );
};

const MemoizedHomePage = React.memo(HomePage);

export { MemoizedHomePage as HomePage };
