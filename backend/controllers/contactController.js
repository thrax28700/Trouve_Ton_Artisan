const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { Artisan } = require('../models');

const sendContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map(e => ({ field: e.path, message: e.msg })) });
  }

  const { nom, email, message, artisan_id } = req.body;

  try {
    // Vérification que l'artisan existe
    const artisan = await Artisan.findByPk(parseInt(artisan_id), {
      attributes: ['id', 'nom', 'email']
    });
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: { rejectUnauthorized: false }
    });

    const safeMessage = message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: `"Trouve ton artisan" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECIPIENT || process.env.MAIL_USER,
      replyTo: email,
      subject: `[Trouve ton artisan] Contact pour ${artisan.nom}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#2D3A4A">Nouveau message de contact</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;color:#64748B"><strong>De :</strong></td><td style="padding:8px">${nom} &lt;${email}&gt;</td></tr>
            <tr><td style="padding:8px;color:#64748B"><strong>Artisan :</strong></td><td style="padding:8px">${artisan.nom}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#F5F7FA;border-radius:8px">
            <p style="color:#2D3A4A;font-weight:bold">Message :</p>
            <p style="color:#4A5568">${safeMessage}</p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#94A3B8">Message envoyé depuis la plateforme Trouve ton artisan — Région Auvergne-Rhône-Alpes</p>
        </div>
      `
    });

    res.json({ success: true, message: 'Votre message a bien été envoyé.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendContact };
