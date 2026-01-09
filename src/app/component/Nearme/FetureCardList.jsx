import Button from "../UI/Typography/Button";
import Button1 from "../UI/Typography/Button1";
import FeatureCard from "./FeatureCard";
import { FetureSearchBox } from "./FetureSearchBox";

export default function FetureCardList() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <FetureSearchBox />
      <FeatureCard featured />
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />

      <div className="flex justify-center pt-6">
        <Button1 variant="secondary">Show more</Button1>
      </div>
    </div>
  );
}
