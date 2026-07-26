const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { Artisan, Message } = require('../models');

const sendContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map(e => ({ field: e.path, message: e.msg })) });
  }

  const { nom, email, objet, message, artisan_id } = req.body;

  try {
    const artisan = await Artisan.findByPk(parseInt(artisan_id), {
      attributes: ['id', 'nom', 'email']
    });
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });

    // Sauvegarde en base de données
    await Message.create({
      nom,
      email,
      objet,
      message,
      artisan_id: artisan.id,
      artisan_nom: artisan.nom,
      lu: false
    });

    // Envoi email (optionnel — ignoré si MAIL_USER non configuré)
    if (process.env.MAIL_USER && process.env.MAIL_PASS &&
        !process.env.MAIL_USER.includes('your-email')) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          port: parseInt(process.env.MAIL_PORT) || 587,
          secure: false,
          auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
          tls: { rejectUnauthorized: false }
        });

        const safeMessage = message
          .replace(/&/g, '&amp;').replace(/</g, '&lt;')
          .replace(/>/g, '&gt;').replace(/\n/g, '<br>');

        await transporter.sendMail({
          from: `"Trouve ton artisan" <${process.env.MAIL_USER}>`,
          to: artisan.email,
          replyTo: email,
          subject: `[Trouve ton artisan] ${objet}`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px">
            <h2 style="color:#003189">Nouveau message via Trouve ton artisan</h2>
            <p><strong>De :</strong> ${nom} &lt;${email}&gt;</p>
            <p><strong>Objet :</strong> ${objet}</p>
            <p><strong>Artisan concerné :</strong> ${artisan.nom}</p>
            <hr style="border:1px solid #eee;margin:16px 0">
            <div style="background:#F5F7FA;padding:16px;border-radius:8px">
              <p>${safeMessage}</p>
            </div>
            <p style="color:#888;font-size:12px;margin-top:16px">
              Ce message a été envoyé via la plateforme Trouve ton artisan — Région Auvergne-Rhône-Alpes.
            </p>
          </div>`
        });
      } catch { /* email optionnel, on ignore l'erreur */ }
    }

    res.json({ success: true, message: 'Votre message a bien été envoyé.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendContact };
