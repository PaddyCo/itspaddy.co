const fs = require("fs");
const path = require("path");
const svgstore = require("svgstore");

const ICON_PATH = "assets/icons/";
const OUTPUT_PATH = "dist/assets/icons/icons.svg";
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

const dir = fs.readdirSync(ICON_PATH);
const icons = dir
  .filter((f) => f.match(/.*\.(svg)/ig))
  .map(f => ICON_PATH + f)
  .map(f => [f, fs.readFileSync(f, "utf8")]);

const sprites = svgstore();
const iconNameRegex = /.*\/([a-zA-Z-_\d]*)/;

icons.forEach(i => {
  const name = i[0].match(iconNameRegex)[1];
  sprites.add(name, i[1]);
});

fs.writeFileSync(OUTPUT_PATH, sprites);
