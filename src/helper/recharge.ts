import { google } from 'googleapis';
import dbConnect from '@/lib/db';
import { User } from '@/model/Index';
import { sendEmail } from './sendEmail';
import { clearHash } from '@/lib/redis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export async function checkRechargeEmails() {
  await dbConnect(); 
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const { data } = await gmail.users.messages.list({
    userId: 'me',
    q: 'subject:"recharge 5 credits"',
  });

  for (const message of data.messages || []) {
    console.log(message);
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: message.id!,
    });

    //extract sender email
    const from = msg.data.payload?.headers?.find(h => h.name === 'From')?.value;
    const email = from?.match(/<(.+)>/)?.[1] || from;
    console.log(from ,email);
    if (!email) continue; //skip if email is invalid

    //find user in MongoDB
    const user = await User.findOne({ email });
    if (user) {
      if (!user.recharged) {
        //add 5 credits & mark as recharged & clearcache
        await User.updateOne(
          { email },
          { $set: { credits: 5, recharged: true } }
          );
          clearHash("User");
        await sendEmail(email, 'Recharge Successful', '5 credits added to your account.');
      } else {
        await sendEmail(email, 'Recharge Denied', 'Sorry, we are not offering additional credits at this time.');
      }
    }

    // Deleting message
    await gmail.users.messages.trash({
      userId: 'me',
      id: message.id!,
    });

  }
}
