import type { PM } from "detect-package-manager";
import { execa } from "execa";
import { resolve } from "path";
import ora from "ora";

export const installPackages = async (location: string, pm: PM) => {
  const loader = ora("Installing packages with " + pm);

  try {
    if (pm === "npm") {
      await execa("npm", ["install"], {
        cwd: location,
        stderr: "inherit",
      });
    } else {
      loader.start();

      const p = execa({
        cwd: location,
      })`${pm} install`.readable();

      p.on("data", (data) => {
        const text = data.toString();

        switch (pm) {
          case "pnpm":
            if (text.includes("Progress")) {
              loader.text = text.includes("|")
                ? text.split(" | ")[1] ?? ""
                : text;
            }

            break;

          case "yarn":
            loader.text = text;
            break;
        }
      });

      await new Promise((res) => {
        p.on("close", res);
        p.on("end", res);
      });
    }

    loader.succeed(`Installed all npm packages`);
  } catch (e) {
    console.log(e);
    loader.fail("Installing npm packages failed");
  }
};
