import path from "node:path";
import type { Plugin } from "vite";
import { loadContent } from "./content-loader.ts";

const moduleId = "virtual:site-content";
const resolvedId = `\0${moduleId}`;

export function contentPlugin(): Plugin {
    let contentRoot: string;

    return {
        name: "site-content",
        configResolved(config) {
            contentRoot = path.resolve(config.root, "content");
        },
        resolveId(id) {
            if (id === moduleId) return resolvedId;
        },
        load(id) {
            if (id !== resolvedId) return;
            const content = loadContent(contentRoot);
            return Object.entries(content)
                .map(([name, value]) => `export const ${name} = ${JSON.stringify(value)};`)
                .join("\n");
        },
        configureServer(server) {
            server.watcher.add(contentRoot);
            const reload = (file: string) => {
                const relative = path.relative(contentRoot, path.resolve(file));
                if (relative.startsWith("..") || path.isAbsolute(relative)) return;
                const module = server.moduleGraph.getModuleById(resolvedId);
                if (module) server.moduleGraph.invalidateModule(module);
                server.ws.send({ type: "full-reload" });
            };
            server.watcher.on("add", reload);
            server.watcher.on("change", reload);
            server.watcher.on("unlink", reload);
            server.httpServer?.once("close", () => {
                server.watcher.off("add", reload);
                server.watcher.off("change", reload);
                server.watcher.off("unlink", reload);
            });
        },
    };
}
