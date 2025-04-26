import fs from "node:fs";
import express from "express";
import { Response, Request } from "express-serve-static-core";
import { ParsedQs } from "qs";

const app = express();
const router = express.Router();

const middleware =
  (filePath: string) =>
    (
      _: Request<{}, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>, number>,
    ) => {
      const file = fs.readFileSync(filePath);
      res.status(200).set({ "content-type": "text/html" }).send(file);
    };

const handleError = (
  _: Request<{}, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
) => {
  const file = fs.readFileSync("./notFound404.html");
  res.status(404).set("content-type", "text/html").send(file);
};

router.get("/", middleware("./index.html"));

router.get("/about", middleware("./toulon-siege.html"));

router.get("/contact-me", middleware("./contact.html"));

app.use("/", [router, handleError]);

// async non-blocking
app.listen(8080);
console.log("listening at localhost:8080");
