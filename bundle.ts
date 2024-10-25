import esbuild from "esbuild";
import path from "path";
import fs from "fs";
import { minify } from "terser";

// Configuration for all directories to be bundled
const directories = [
  {
    name: "pirates",
    entry: "./pirates/entry.ts",
    outDir: "pirates/dist",
  },
];

directories.forEach(({ name, entry, outDir }) => {
  const outputFile = path.join(outDir, `${name}-bundle.js`);

  esbuild
    .build({
      entryPoints: [entry],
      bundle: true,
      outfile: outputFile,
      platform: "node",
      target: "esnext",
      minify: false,
      sourcemap: true,
    })
    .then(async () => {
      console.log(`Successfully bundled ${name} directory.`);

      // Read the bundled file and pass it through terser
      const code = fs.readFileSync(outputFile, "utf8");
      const minified = await minify(code, {
        format: {
          comments: false, // Remove all comments
        },
      });

      if (minified.code) {
        fs.writeFileSync(outputFile, minified.code, "utf8");
        console.log(`Minified and removed comments from ${name} bundle.`);
      } else {
        console.error(`Terser failed for ${name} bundle.`);
      }
    })
    .catch((err) => {
      console.error(`Failed to bundle ${name} directory:`, err);
    });
});
