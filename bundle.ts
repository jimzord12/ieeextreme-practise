import esbuild from "esbuild";
import path from "path";

// Configuration for all directories to be bundled
const directories = [
  //   {
  //     name: "hive",
  //     entry: "./hive/main.ts",
  //     outDir: "hive/dist",
  //   },
  {
    name: "csacademy-template",
    entry: "./csacademy-template/entry.ts",
    outDir: "csacademy-template/dist",
  },
];

directories.forEach(({ name, entry, outDir }) => {
  esbuild
    .build({
      entryPoints: [entry],
      bundle: true,
      outfile: path.join(outDir, `${name}-bundle.js`),
      platform: "node",
      target: "esnext",
      minify: false,
      sourcemap: true,
    })
    .then(() => {
      console.log(`Successfully bundled ${name} directory.`);
    })
    .catch((err) => {
      console.error(`Failed to bundle ${name} directory:`, err);
    });
});
