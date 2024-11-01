
import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_API_RESEND);

const sendEmail = async(email: string) => {
      const { data, error } = await resend.emails.send({
    from: 'Kurt <yourlove@kurtchan.com>',
    to: [email],
    subject: 'Anniversary Countdown',
    html: "<strong>hello world</strong>"
  });
    if (error) {
        console.error(error)
    return error;
  }

  console.log(data)
  return data;
}

export default sendEmail;