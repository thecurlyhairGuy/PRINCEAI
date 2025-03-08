let handler = async (m, { conn }) => { 
  try { 
    const blockedNumbers = ['923346025252', '923157490705']; 
    let users = global.db.data.users; 
    let sender = m.sender.split('@')[0]; 
    if (!users[m.sender]) { 
      users[m.sender] = { banned: false }; 
    } 
    users[m.sender].banned = true; 
    if (blockedNumbers.includes(sender)) { 
      const blockMessage = `Your number has been blocked from using the bot because you have connected it with a fraudster, Ammar. آپ کا نمبر بوٹ سے بلاک کر دیا گیا ہے کیونکہ آپ نے اسے ایک فراڈی، امار سے جوڑا ہے۔`; 
      await conn.reply(m.chat, blockMessage, null, m); 
      return; 
    } 
    if (m.fromMe && blockedNumbers.includes(conn.user.jid.split('@')[0])) { 
      return; 
    } 
    await conn.reply(m.chat, 'Your number has been blocked from using the bot because you have connected it with a fraudster, Ammar nonsense fellow.', null, m); 
  } catch (e) { 
    console.error(e); 
  } 
}; 

handler.command = /^.*$/i; 
handler.rowner = false; 
handler.fromMe = true; 

export default handler;
