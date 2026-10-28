import { notFound } from "next/navigation";
import { TourCollection } from "@/components/ui/TourCollection";
import { collections, getCollection } from "@/content/collections";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
const mine = collections.filter((c) => c.kind === "city");
export const generateStaticParams = () => mine.map((c) => ({ city: c.path.split("/").pop()! }));

type Props = { params: Promise<{ city: string }> };
const find = async (p: Props["params"]) => getCollection(`/tours/from/${(await p).city}`);

export async function generateMetadata({ params }: Props) {
  const c = await find(params);
  return c ? pageMetadata({ title: c.title, description: c.description, path: c.path }) : {};
}

const cityImage: Record<string, typeof images.hassanII> = { casablanca: images.hassanII, marrakech: images.koutoubia, fez: images.fezTanneries };

export default async function Page({ params }: Props) {
  const c = await find(params);
  if (!c) notFound();
  return <TourCollection c={c} img={cityImage[c.path.split("/").pop()!] ?? images.atlasValley} crumbs={[{ name: c.h1, path: c.path }]} />;
}
