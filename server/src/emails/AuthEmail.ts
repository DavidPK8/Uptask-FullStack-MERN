import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string;
    userName: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: `"Uptask" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Confirma tu cuenta en Uptask",
            html: ` <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 40px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
            <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Uptask</h1>
            </div>

            <div style="padding: 30px;">
            <h2 style="color: #333;">¡Hola ${
                user.userName
            }!</h2> <p style="font-size: 16px; line-height: 1.5; color: #555;"> Has creado tu cuenta en <strong>UpTask</strong>, ¡ya casi está todo listo! Solo debes confirmar tu cuenta para poder comenzar a usarla. </p> <p style="font-size: 16px; line-height: 1.5; color: #555;"> Para confirmar tu cuenta, visita el siguiente enlace: </p> <div style="text-align: center; margin: 20px 0;"> <a href="" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5;; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">Confirmar Cuenta</a> </div> <p style="font-size: 16px; line-height: 1.5; color: #555;"> E ingresa el siguiente código: </p> <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;"> ${
                user.token
            } </div> <p style="font-size: 16px; line-height: 1.5; color: #555;"> <strong>Nota:</strong> Este token expira en 5 minutos. </p> <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;"> Si no has solicitado esta cuenta, puedes ignorar este mensaje. </p> </div> </div>
            <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            © ${new Date().getFullYear()} Uptask. Todos los derechos reservados.
            </div>
            </div>
            `,
        });
    };
}
