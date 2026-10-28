import { notFound } from "next/navigation";
import { TourCollection } from "@/components/ui/TourCollection";
import { collections, getCollection } from "@/content/collections";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
const mine = collections.filter((c) => c.kind === "city-style");
export const generateStaticParams = () =>
  mine.map((c) => {
    const parts = c.path.split("/");
    return { city: parts[3]!, style: parts[4]! };
  });

type Props = { params: Promise<{ city: string; style: string }> };
const find = async (p: Props["params"]) => {
  const { city, style } = await p;
  return getCollection(`/tours/from/${city}/${style}`);
};

export async function generateMetadata({ params }: Props) {
  const c = await find(params);
  return c ? pageMetadata({ title: c.title, description: c.description, path: c.path }) : {};
}

const styleImage: Record<string, typeof images.saharaDune> = { desert: images.saharaDune, imperial: images.fezGate, mountains: images.atlasValley, coast: images.essaouiraCoast, luxury: images.desertCamp };

export default async function Page({ params }: Props) {
  const c = await find(params);
  if (!c) notFound();
  const parts = c.path.split("/");
  const parent = getCollection(`/tours/from/${parts[3]}`);
  return <TourCollection c={c} img={styleImage[parts[4]!] ?? images.atlasValley} crumbs={[...(parent ? [{ name: parent.h1, path: parent.path }] : []), { name: c.h1, path: c.path }]} />;
}
