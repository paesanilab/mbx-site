declare module "virtual:site-content" {
    export const home: import("./content-types").SiteContent["home"];
    export const about: import("./content-types").SiteContent["about"];
    export const faq: import("./content-types").SiteContent["faq"];
    export const publications: import("./content-types").SiteContent["publications"];
    export const updates: import("./content-types").SiteContent["updates"];
    export const tutorials: import("./content-types").SiteContent["tutorials"];
}
