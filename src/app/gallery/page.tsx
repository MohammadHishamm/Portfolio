import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, home, person } from "@/resources";
import { schemaAssetUrl } from "@/utils/publicAsset";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: schemaAssetUrl(baseURL, "/images/og/home.jpg"),
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={home.image}
        author={{
          name: person.name,
          url: schemaAssetUrl(baseURL, gallery.path),
          image: schemaAssetUrl(baseURL, person.avatar),
        }}
      />
      <GalleryView />
    </Flex>
  );
}
