import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    const {nombre,email,token} = datos;

    //Enviar el email
    const info = await transport.sendMail({
        from: 'APV - Administrador de pacientes de Veterinaria',
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV. </p>
            <p>Tu cuenta ya esta lista, solo comprueba en este enlace:
            <a href="http://localhost:3000/confirmar/${token}">Comprobar Cuenta</a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });
}

export default emailRegistro;