async function checkInternet() {
    try {
        const response = await fetch("https://www.google.com", { mode: 'no-cors', cache: 'no-cache' });
        return (response.ok || response.type === 'opaque');
    } catch (e) { return false; }
}

window.addEventListener('keydown', (e) => {
    if (e.key === "F11" || e.key === "Escape") { e.preventDefault(); }
});

setInterval(async () => {
    const isOnline = await checkInternet();
    const modalId = 'offline-modal';
    let modal = document.getElementById(modalId);
    if (!isOnline) {
        if (!modal) {
            document.body.style.filter = "blur(10px)";
            document.body.style.pointerEvents = "none";
            modal = document.createElement('div');
            modal.id = modalId;
            modal.style = "position:fixed; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.5); z-index:999999; font-family:sans-serif;";
            modal.innerHTML = '<div style="background:white; padding:50px; border-radius:20px; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"><h1 style="color:red; margin:0 0 10px 0;">CONNECTION LOST</h1><p style="font-size:18px; color:#333;">Check your internet cable or Wi-Fi.</p></div>';
            document.documentElement.appendChild(modal);
        }
    } else if (modal) {
        document.body.style.filter = "none";
        document.body.style.pointerEvents = "auto";
        modal.remove();
        window.location.reload(); 
    }
}, 5000);

// CUSTOM CLOSE BUTTON (TOP CENTER)
const closeBtn = document.createElement('div');
closeBtn.innerHTML = '✕';
closeBtn.style = "position:fixed; top:10px; left:50%; transform:translateX(-50%); width:40px; height:40px; background:rgba(0,0,0,0.3); color:white; display:flex; align-items:center; justify-content:center; border-radius:50%; cursor:pointer; z-index:1000000; font-family:sans-serif; font-size:22px; font-weight:bold; transition: 0.3s; border: 1px solid rgba(255,255,255,0.2);";
closeBtn.onmouseover = () => { closeBtn.style.background = "red"; closeBtn.style.transform = "translateX(-50%) scale(1.1)"; };
closeBtn.onmouseout = () => { closeBtn.style.background = "rgba(0,0,0,0.3)"; closeBtn.style.transform = "translateX(-50%) scale(1)"; };
closeBtn.onclick = () => { if (confirm("Close FRMSPSH?")) window.close(); };
document.documentElement.appendChild(closeBtn);
