import { Composition } from "remotion";
import { HeroPromo } from "./HeroPromo";

export const MyComposition = () => {
  return (
    <Composition
      id="HeroPromo"
      component={HeroPromo}
      durationInFrames={210}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
