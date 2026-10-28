import { notFound } from "next/navigation";
import { TourCollection } from "@/components/ui/TourCollection";
import { collections, getCollection } from "@/content/collections";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
const mine = collections.filter((c) => c.kind === "length");
export const generateStaticParams = () => mine.map((c) => ({ bucket: c.path.split("/").pop()! }));

type Props = { params: Promise<{ bucket: string }> };
const find = async (p: Props["params"]) => getCollection(`/tours/length/${(await p).bucket}`);

export async function generateMetadata({ params }: Props) {
  const c = await find(params);
  return c ? pageMetadata({ title: c.title, description: c.description, path: c.path }) : {};
}

export default async function Page({ params }: Props) {
  const c = await find(params);
  if (!c) notFound();
  return <TourCollection c={c} img={images.atlasRoad} crumbs={[{ name: c.h1, path: c.path }]} />;
}
