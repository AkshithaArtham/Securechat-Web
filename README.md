# 🔐 SecureChat Web

SecureChat Web is a secure messaging platform that enhances traditional end-to-end encryption by introducing **message-level encryption**. It allows users to selectively encrypt specific messages using a special tag (`#msg#`) and converts them into fixed-length **emoji sequences**, ensuring confidentiality and protection against unauthorized access.

## 🚀 Features

- ✨ **Selective Message Encryption**: Users can tag messages using `#msg#` to encrypt only sensitive content.
- 🔐 **Emoji-based Encryption**: Encrypted messages are converted into fixed-length emoji sequences for obfuscation.
- ⏳ **Temporary Decryption**: Decrypted messages are displayed for **15 seconds** before auto-reverting to the encrypted form.
- 🔑 **Secret Code Protection**: Temporary decryption requires a **secret code** created during user registration.
- 🛡️ **User-Centric Privacy**: Gives users control over which messages remain private, beyond standard E2E encryption.

## 📸 Demo

*(Include screenshots or GIFs of the platform here)*

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (React)
- **Backend**: Node.js / Java (Your choice based on implementation)
- **Database**: MongoDB / SQL (depending on project setup)
- **Security**: Custom emoji encryption, secret-code decryption mechanism

## 📝 How It Works

1. Users register and set a **secret code**.
2. Messages tagged with `#msg#` are encrypted into emoji sequences.
3. On receiving, a user can click “Decrypt”, enter the secret code, and view the decrypted message for **15 seconds**.
4. After 15 seconds, the message reverts to its encrypted emoji form.

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/securechat-web.git
cd securechat-web

# Install dependencies
npm install

# Run the app
npm start






