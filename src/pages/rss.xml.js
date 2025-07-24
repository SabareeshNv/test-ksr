import rss from "@astrojs/rss";
import { fetchAndFilterPosts } from "@utils/helper";

export async function GET(context) {
    const posts = await fetchAndFilterPosts();
    return rss({
        title: "കേരളാ സർവീസ് ചട്ടങ്ങൾ ലളിതമായ മലയാളത്തിൽ | KSR in simple Malayalam language | KeralaServiceRules.com",
        description:
            "Get latest articles published in your beloved KeralaServiceRules.com right inside your favorite RSS reader",
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/article/${post.id}/`,
        })),
        stylesheet: "/rss/styles.xsl",
        customData: `<language>ml</language>`,
    });
}
