
import { put } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method !== "POST")
        return res.status(405).json({ error: "Method not allowed" });

    const filename = req.headers["x-filename"];
    if (!filename)
        return res.status(400).json({ error: "Missing filename" });

    const buffer = Buffer.from(await req.arrayBuffer());

    const blob = await put(filename, buffer, {
        access: "public"
    });

    const id = Date.now().toString();

    return res.status(200).json({
        id,
        filename,
        url: blob.url,
        page: `/f/${id}.html?url=${encodeURIComponent(blob.url)}&name=${encodeURIComponent(filename)}`
    });
}
