module.exports = (email, username, password) => {
  const url = process.env.URL || 'http://localhost:3009';
  const appName = process.env.APP_NAME || "Circuit";
  
  return  `
  <html>
    <p>Bienvenu,</p>
    <p style="max-width: 500px;">Un compte vient de vous être créé sur ${appName}, pour pouvoir accéder à votre compte, vous devez tout d'abord définir un mot de passe en suivant le lien ci-dessous. </p>
    <p>Ainsi vous pourrez vous connecter à la plateforme en utilisant les identifiants suivant:</p>
    <br />
    <p>Adresse email: ${email}</p>
    <p>Mot de passe: <em>A définir lors de l'activation du compte</em></p>
    <br />
    <a  style="display: inline-block; text-decoration: none; background-color: #4caf50; color: white; padding: 0.7rem; font-size: 14px" href="${url}/login/active?username=${username}&password=${password}">
      Activer votre compte maintenant
    </a>
    </br>
    
    <p>Circuit est une solution open source gestion de courrier entrant et sortant pour les organisations.</p>
    
    <p>Cordialement,</p>
  </html>
    `;
}