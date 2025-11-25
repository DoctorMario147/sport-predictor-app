import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    console.log("Deleting all FixturePrediction records...");
    await prisma.fixturePrediction.deleteMany();

    console.log("Deleting all Fixture records...");
    await prisma.fixture.deleteMany();

    console.log("All predictions and fixtures deleted successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });