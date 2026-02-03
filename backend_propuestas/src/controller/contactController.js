
import { sendMail } from '../utils/mailer.js';

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message, phone = '', company = '' } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    // Aquí podrías guardar en base de datos, enviar email, etc.
    // Por ahora solo respondemos OK
      // Email para el administrador
      await sendMail({
        from: process.env.MAIL_USER,
        to: 'propuestasevenor@gmail.com',
        subject: `Nuevo mensaje de contacto: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #a1db87 0%, #7ed957 100%); padding: 30px; text-align: center; }
              .header h1 { color: #fff; margin: 0; font-size: 24px; }
              .content { padding: 30px; }
              .field { margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #a1db87; border-radius: 5px; }
              .field-label { font-weight: bold; color: #555; margin-bottom: 5px; display: block; }
              .field-value { color: #333; }
              .footer { background: #23272f; color: #fff; padding: 20px; text-align: center; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 Nuevo Mensaje de Contacto</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="field-label">👤 Nombre:</span>
                  <span class="field-value">${name}</span>
                </div>
                <div class="field">
                  <span class="field-label">✉️ Email:</span>
                  <span class="field-value">${email}</span>
                </div>
                ${phone ? `<div class="field">
                  <span class="field-label">📞 Teléfono:</span>
                  <span class="field-value">${phone}</span>
                </div>` : ''}
                ${company ? `<div class="field">
                  <span class="field-label">🏢 Empresa:</span>
                  <span class="field-value">${company}</span>
                </div>` : ''}
                <div class="field">
                  <span class="field-label">📋 Asunto:</span>
                  <span class="field-value">${subject}</span>
                </div>
                <div class="field">
                  <span class="field-label">💬 Mensaje:</span>
                  <div class="field-value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>Desarrollador de Propuestas - Evenor-Tech</p>
                <p>Este es un mensaje automático del formulario de contacto</p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      // Email de confirmación al usuario
      await sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Confirmación de contacto - Evenor-Tech',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #a1db87 0%, #7ed957 100%); padding: 40px 30px; text-align: center; }
              .header h1 { color: #fff; margin: 0; font-size: 26px; }
              .content { padding: 30px; }
              .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
              .message-box { background: #f9f9f9; border-left: 4px solid #a1db87; padding: 20px; margin: 20px 0; border-radius: 5px; }
              .message-box h3 { margin-top: 0; color: #555; font-size: 16px; }
              .message-content { color: #666; margin: 10px 0; }
              .cta-button { display: inline-block; background: #a1db87; color: #23272f; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
              .footer { background: #23272f; color: #fff; padding: 20px; text-align: center; font-size: 12px; }
              .checkmark { color: #a1db87; font-size: 48px; text-align: center; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Mensaje Recibido</h1>
              </div>
              <div class="content">
                <div class="checkmark">✓</div>
                <p class="greeting">Hola <strong>${name}</strong>,</p>
                <p>Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
                
                <div class="message-box">
                  <h3>📋 Resumen de tu mensaje:</h3>
                  <div class="message-content">
                    <p><strong>Asunto:</strong> ${subject}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                  </div>
                </div>

                <p>Nuestro equipo revisará tu consulta y te contactaremos pronto.</p>
                <p style="color: #666; font-size: 14px;">Si tienes alguna pregunta urgente, puedes contactarnos directamente en <a href="mailto:propuestasevenor@gmail.com" style="color: #a1db87;">propuestasevenor@gmail.com</a></p>
              </div>
              <div class="footer">
                <p><strong>Desarrollador de Propuestas</strong></p>
                <p>Evenor-Tech © 2026</p>
                <p>Gracias por contactar con nosotros</p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      return res.status(200).json({ message: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return res.status(500).json({ error: error.message || 'Error al procesar el mensaje de contacto.' });
  }
};
