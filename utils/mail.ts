import nodemailer from "nodemailer";

// Function to send an email
export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use another email service (e.g., Outlook, Yahoo)
      auth: {
        user: "namutunciwebmail@gmail.com", // Your email address
        pass:"ztwk gaaz nyck rnfd", // Your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL, // Sender email address
      to, // Recipient email address
      subject, // Email subject
      text, // Plain text body
      html, // HTML body (optional)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
}
