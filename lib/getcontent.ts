import fs from "fs";

export function getContent() {
    const file = fs.readFileSync(process.cwd() + "/content/content.json", "utf8");
    const data = JSON.parse(file);
    return data;
}
