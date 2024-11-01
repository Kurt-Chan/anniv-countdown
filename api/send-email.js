import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_API_RESEND);

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    const { email } = req.body;
    try {
        const data = await resend.emails.send({
            from: 'Kurt <yourlove@kurtchan.com>',
            to: [email],
            subject: 'Anniversary Countdown',
            html: "<strong>hello world</strong>"
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
};