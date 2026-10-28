import { notFound } from "next/navigation";
import { TourCollection } from "@/components/ui/TourCollection";
import { collections, getCollection } from "@/content/collections";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
const mine = collections.filter((c) => c.kind === "style");
export const generateStaticParams = () => mine.map((c) => ({ style: c.path.split("/").pop()! }));

type Props = { params: Promise<{ style: string }> };
const find = async (p: Props["params"]) => getCollection(`/tours/style/${(await p).style}`);

export async function generateMetadata({ params }: Props) {
  const c = await find(params);
  return c ? pageMetadata({ title: c.title, description: c.description, path: c.path }) : {};
}

const styleImage: Record<string, typeof images.saharaDune> = { desert: images.saharaDune, imperial: images.fezGate, mountains: images.atlasValley, coast: images.essaouiraCoast, luxury: images.desertCamp, family: images.camel };

export default async function Page({ params }: Props) {
  const c = await find(params);
  if (!c) notFound();
  return <TourCollection c={c} img={styleImage[c.path.split("/").pop()!] ?? images.atlasValley} crumbs={[{ name: c.h1, path: c.path }]} />;
}
