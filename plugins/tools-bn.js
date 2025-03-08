let handler = async (m, { conn }) => { 
  try { 
    const blockedNumbers = ['923346025252', '923157490705']; // List of numbers to block
    let sender = m.sender.split('@')[0]; // Extract the sender's number (without @s.whatsapp.net)
    
    console.log(`Sender: ${sender}`); // Debugging: Log the sender's number
    console.log(`Blocked Numbers: ${blockedNumbers}`); // Debugging: Log the blocked numbers

    // Only proceed if the sender's number is in the blocked list
    if (blockedNumbers.includes(sender)) { 
      console.log(`Blocking: ${sender}`); // Debugging: Log if the sender is in the blocked list

      let users = global.db.data.users; 
      
      // Initialize user data if missing
      if (!users[m.sender]) { 
        users[m.sender] = { banned: false }; 
      } 
      
      // Mark the user as banned
      users[m.sender].banned = true; 
      
      // Send block message
      const blockMessage = `Your number has been blocked from using the bot because you have connected it with a fraudster, Ammar.\nآپ کا نمبر بوٹ سے بلاک کر دیا گیا ہے کیونکہ آپ نے اسے ایک فراڈی، امار سے جوڑا ہے۔`; 
      await conn.reply(m.chat, blockMessage, null, m); 
      return; 
    }

    // If the sender is not in the blockedNumbers list, do nothing
    console.log(`Not blocking: ${sender}`); // Debugging: Log if the sender is not in the blocked list
    return;

  } catch (e) { 
    console.error(`Error: ${e}`); // Log errors if any occur
  } 
}; 

handler.command = /^.*$/i; // Match all commands
handler.rowner = false; // Disable owner check
handler.fromMe = true; // Allow the function to handle `fromMe` messages

export default handler;
