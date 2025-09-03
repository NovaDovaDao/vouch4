import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, url: string) => {
  const html = `
    <p>
        <a href="${url}">Verify your email!</a>
    </p>
    `;
  const response = await resend.emails.send({
    from: "dev@enzo.games",
    to: email,
    replyTo: "dev@enzo.games",
    subject: "Please verify your email",
    html,
  });

  if (response.error) throw response.error;

  console.log(
    `Emaill ${response.data.id} with customer HTML content has been sent.`,
  );
};

export const sendSetPasswordEmail = async (email: string, url: string) => {
  const html = `
    <p>
        <a href="${url}">Set your password!</a>
    </p>
    `;
  const response = await resend.emails.send({
    from: "dev@enzo.games",
    to: email,
    replyTo: "dev@enzo.games",
    subject: "Set your password",
    html,
  });

  if (response.error) throw response.error;

  console.log(
    `Emaill ${response.data.id} with customer HTML content has been sent.`,
  );
};
