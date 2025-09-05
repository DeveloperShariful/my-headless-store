import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Nodemailer transporter তৈরি করুন
    // এখানে আপনার SMTP সার্ভারের তথ্য দিন
    const transporter = nodemailer.createTransport({
      host: 'your-smtp-host.com', // যেমন: smtp.gmail.com
      port: 587, // বা 465
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-smtp-username', // আপনার SMTP ইউজারনেম
        pass: 'your-smtp-password' // আপনার SMTP পাসওয়ার্ড
      },
    });

    const mailOptions = {
      from: '"MyStore Contact Form" <noreply@yourdomain.com>',
      to: 'gobike@gobike.au',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from MyStore Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}