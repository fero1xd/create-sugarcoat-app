import path from "path";
import fs from "fs-extra";
import { spinner } from "@clack/prompts";

export const createProjectDir = (location: string) => {
  let absolutePath = location;
  if (!path.isAbsolute(location)) {
    absolutePath = path.resolve(location);
  }

  const loader = spinner();
  loader.start("Creating backend api");

  if (fs.existsSync(absolutePath)) {
    if (fs.readdirSync(absolutePath).length !== 0) {
      loader.stop("The specified location is not empty, cannot continue!", 1);
      return;
    }
  }

  fs.copy(path.resolve("template"), absolutePath);

  loader.stop("Successfuly created your api");
};
