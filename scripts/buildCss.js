const sass = require("node-sass");
const path = require("path");
const fs = require("fs");
const args = require("yargs").argv;

const inputPath = "assets/css/main.scss";
const outputPath = "dist/assets/css/main.css";

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const buildCss = () => {
  sass.render({
    file: inputPath,
    outputStyle: "compressed",
  }, (err, result) => {
    if (err) {
      console.log(err);
    }
    else if (result.css) {
      fs.writeFile(outputPath, result.css, (err) => {
        if(err){
          console.log(err);
          return;
        }
        console.log(`CSS successfully built to ${outputPath}`);
      });
    }
  });
};

if (args.watch) {
  buildCss();
  fs.watch(path.dirname(inputPath), "utf8", () => {
    console.log("Re-building CSS");
    buildCss();
  });
} else {
  buildCss();
}
