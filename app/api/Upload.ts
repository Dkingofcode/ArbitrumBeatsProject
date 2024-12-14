import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const file = req.body.file; // Replace with `formidable` or similar to parse files.
    fs.writeFileSync(path.join(uploadDir, file.name), file.data);

    res.status(200).json({ message: "File uploaded successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
