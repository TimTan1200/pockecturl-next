import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/prisma";

export default main;

async function main(req: NextApiRequest, res: NextApiResponse) {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
        res.statusCode = 404;

        res.send(JSON.stringify({ message: "use with slug" }))

        return;
    }

    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if (!data) {
        res.statusCode = 404;

        res.send(JSON.stringify({ message: "not found" }))

        return;
    }

    return res.redirect(data.url);
};