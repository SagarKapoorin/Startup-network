"use server"
import { getServerSession } from 'next-auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/db';
import { User } from '@/model/Index';
import { Investor } from '@/model/Index';
import { sendEmail } from '@/helper/sendEmail';
import { clearHash } from '@/lib/redis';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req:Request) {
    console.log("Gen-Ai-route got hit")
  const session = await getServerSession(authOptions);
  if (!session){  return Response.json(
    {
        success:false,
        error:`unAuthorized`
    },
    {
        status:500
    }
)
  }
// console.log(session);
  await dbConnect();

  try {
        const user = await User.findOneAndUpdate(
      { email: session.user!.email, credits: { $gt: 0 } },
      { $inc: { credits: -1 } },
      { new: true }
    );
    // Clearing Hash Key="User"
    clearHash("User");
    // console.log(user);
    if (!user) {
        await sendEmail(
            session.user.email,
            'Credits Exhausted',
            'Your credits are exhausted. For credits- Please sent new email with sagarbadal70@gmail by mentioning the "recharge 5 credits" as Subject to get credits'
          );
      return Response.json(
        {
            success:false,
            error:`No Credits left`
        },
        {
            status:500
        }
    )
    }
    const investors = await Investor.find({}).lean().cache({key:"Investor"});
    const { prompt1 } = await req.json();
    // console.log(investors);
    const prompt = `User query: ${prompt1}\n\nInvestors/Mentors:\n
    ${investors.map((i) => `${i.name} - ${i.category} (${i.type})`).join('\n')}
    
    Respond ONLY with the best matching investor's name type and category whose type and category matches with User query`;
    console.log(prompt)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    console.log(response);
    if (user.credits === 0) {
        await sendEmail(
          user.email,
          'Credits Exhausted',
          'Your credits are exhausted. For credits- Please sent new email with sagarbadal70@gmail by mentioning the "recharge 5 credits" as Subject to get credits'
        );
      }
      return Response.json(
        {
            success:true,
            result: response.trim(),
        },
        {
            status:200
        }
    )
  } catch (error) {
    console.error(error);
    return Response.json(
        {
            success:false,
            error:`${error}`
        },
        {
            status:500
        }
    )
  }
}
