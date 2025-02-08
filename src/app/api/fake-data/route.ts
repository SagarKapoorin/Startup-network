"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import { Investor } from '@/model/Index';

export async function GET() {
    await dbConnect();

    try {
        const categories = [
            "AI", "Blockchain", "Steel", "Coal", "EV", "Healthcare", "Renewable Energy",
            "Biotech", "EdTech", "FinTech", "SpaceTech", "Gaming", "Cybersecurity",
            "Agriculture", "Real Estate", "E-commerce", "Automotive", "Logistics",
            "FoodTech", "Quantum Computing"
        ];
        const types = ["Investor", "Mentor"];
        const names = [
            "John Doe", "Jane Smith", "Alice Johnson", "Robert Brown", "Michael Davis",
            "Emily Wilson", "David Martinez", "Sarah Lee", "Daniel Harris", "Laura Clark"
        ];
        const SC = categories.sort(() => 0.5 - Math.random()).slice(0, 10);
        const FI = SC.map((category, index) => ({
            name: names[index % names.length],
            category,
            type: types[Math.floor(Math.random() * types.length)],
        }));

        // Add additional data
        const additionalData = [
            { name: "Ria", category: "AI", type: "Investor" },
            { name: "Martin", category: "Blockchain", type: "Mentor" },
            { name: "Leo", category: "EV", type: "Mentor" },
            { name: "Zack", category: "E-commerce", type: "Mentor" },
            { name: "Honia", category: "Video", type: "Investor" }
        ];

        FI.push(...additionalData);

        await Investor.insertMany(FI);
        return Response.json(
            {
                success: true,
                error: `Investors Fake data added`
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                error: `${error}`
            },
            {
                status: 500
            }
        )
    }
}
