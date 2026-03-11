// ====================================
// AI Hub - Cloudflare Worker
// ====================================

const HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>AI Hub - مُجمّع الذكاء الاصطناعي</title>
<meta name="description" content="كل نماذج الذكاء الاصطناعي في مكان واحد">
<meta name="theme-color" content="#0a0a0f">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">
<link rel="manifest" href="data:application/json;base64,eyJuYW1lIjoiQUkgSHViIiwic2hvcnRfbmFtZSI6IkFJIEh1YiIsInN0YXJ0X3VybCI6Ii8iLCJkaXNwbGF5Ijoic3RhbmRhbG9uZSIsImJhY2tncm91bmRfY29sb3IiOiIjMGEwYTBmIiwidGhlbWVfY29sb3IiOiIjNjM2NmYxIn0=">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg:#0a0a0f; --surface:#13131d; --surface2:#1a1a2e; --border:#2a2a3e;
  --text:#e8e8f0; --text-sec:#8888a0; --accent:#6366f1; --accent2:#06d6a0;
  --glass:rgba(19,19,29,0.85); --radius:16px; --radius-sm:10px; --radius-xs:6px;
}
.light-mode {
  --bg:#f0f2f5; --surface:#ffffff; --surface2:#f8f9fb; --border:#e2e5ea;
  --text:#1a1a2e; --text-sec:#6b7280; --glass:rgba(255,255,255,0.9);
}

*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:'Tajawal',sans-serif;overflow-x:hidden;transition:background 0.3s,color 0.3s}
a{color:var(--accent);text-decoration:none}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:10px}

/* ===== BG GLOW ===== */
.bg-glow{position:fixed;top:-50%;left:-50%;width:200%;height:200%;pointer-events:none;z-index:0;
  background:radial-gradient(circle at 30% 20%,rgba(99,102,241,0.07)0%,transparent 50%),
  radial-gradient(circle at 70% 80%,rgba(6,214,160,0.05)0%,transparent 50%)}

/* ===== LOGIN ===== */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;position:relative;z-index:1}
.login-card{background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:44px 36px;width:100%;max-width:420px;
  box-shadow:0 25px 60px rgba(0,0,0,0.3);position:relative;overflow:hidden}
.login-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--accent),var(--accent2),#ec4899)}
.login-logo{font-size:34px;font-weight:900;text-align:center;margin-bottom:6px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.login-sub{text-align:center;color:var(--text-sec);margin-bottom:28px;font-size:14px}
.inp-grp{margin-bottom:16px}
.inp-grp label{display:block;font-size:12px;font-weight:600;color:var(--text-sec);margin-bottom:5px}
.inp-grp input{width:100%;padding:13px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:var(--surface2);
  color:var(--text);font-size:14px;font-family:'Tajawal',sans-serif;transition:all 0.2s;outline:none}
.inp-grp input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(99,102,241,0.12)}
.login-opts{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;font-size:12px;color:var(--text-sec)}
.login-opts label{display:flex;align-items:center;gap:5px;cursor:pointer}
.btn-pri{width:100%;padding:13px;border:none;border-radius:var(--radius-sm);font-size:15px;font-weight:700;font-family:'Tajawal',sans-serif;
  background:linear-gradient(135deg,var(--accent),#818cf8);color:#fff;cursor:pointer;transition:all 0.3s}
.btn-pri:hover{transform:translateY(-1px);box-shadow:0 8px 25px rgba(99,102,241,0.3)}
.social-row{display:flex;gap:10px;margin-top:18px}
.social-btn{flex:1;padding:11px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:var(--surface2);
  color:var(--text);font-size:18px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center}
.social-btn:hover{border-color:var(--accent)}
.divider{display:flex;align-items:center;gap:12px;margin:18px 0;color:var(--text-sec);font-size:12px}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--border)}
.login-foot{text-align:center;margin-top:22px;font-size:13px;color:var(--text-sec)}
.login-foot a{color:var(--accent);font-weight:600}
.login-bottom-row{text-align:center;margin-top:16px;display:flex;gap:8px;justify-content:center}

/* ===== MAIN LAYOUT ===== */
.app{display:flex;min-height:100vh;position:relative;z-index:1}
.sidebar{width:250px;background:var(--surface);border-inline-end:1px solid var(--border);display:flex;flex-direction:column;
  position:fixed;top:0;bottom:0;z-index:20;transition:transform 0.3s}
.sb-head{padding:18px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)}
.sb-logo{font-size:20px;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sb-nav{flex:1;padding:10px;overflow-y:auto}
.nav-i{display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:var(--radius-sm);color:var(--text-sec);
  cursor:pointer;transition:all 0.2s;font-size:13px;font-weight:500;margin-bottom:2px}
.nav-i:hover{background:var(--surface2);color:var(--text)}
.nav-i.active{background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(6,214,160,0.08));color:var(--accent);font-weight:700}
.sb-foot{padding:10px;border-top:1px solid var(--border)}
.sb-foot .nav-i{color:#ef4444}

.content{flex:1;margin-inline-start:250px;display:flex;flex-direction:column;min-height:100vh}
.topbar{padding:12px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;
  background:var(--glass);backdrop-filter:blur(20px);position:sticky;top:0;z-index:10}
.topbar-t{font-size:16px;font-weight:700}
.topbar-acts{display:flex;align-items:center;gap:8px}
.icon-btn{width:36px;height:36px;border:1px solid var(--border);border-radius:var(--radius-xs);background:var(--surface2);
  color:var(--text-sec);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;font-size:16px}
.icon-btn:hover{border-color:var(--accent);color:var(--accent)}
.lang-btn{padding:5px 12px;border:1px solid var(--border);border-radius:var(--radius-xs);background:var(--surface2);
  color:var(--text);font-size:12px;font-weight:600;cursor:pointer;font-family:'Tajawal',sans-serif}
.burger{display:none}
.page{flex:1;padding:24px;overflow-y:auto}

/* ===== WELCOME ===== */
.welcome{padding:28px;border-radius:var(--radius);margin-bottom:24px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(6,214,160,0.06));border:1px solid var(--border)}
.welcome h2{font-size:24px;font-weight:800;margin-bottom:6px}
.welcome p{color:var(--text-sec);font-size:14px}
.quick-acts{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.q-act{padding:9px 18px;border-radius:50px;border:1.5px solid var(--border);background:var(--surface);
  color:var(--text);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:7px;font-family:'Tajawal',sans-serif}
.q-act:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px);box-shadow:0 4px 12px rgba(99,102,241,0.12)}

/* ===== CATEGORY TABS ===== */
.sec-t{font-size:16px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.cat-tabs{display:flex;gap:7px;margin-bottom:18px;flex-wrap:wrap}
.cat-t{padding:7px 16px;border-radius:50px;border:1.5px solid var(--border);background:transparent;color:var(--text-sec);
  font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:'Tajawal',sans-serif}
.cat-t.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.cat-t:hover:not(.on){border-color:var(--accent);color:var(--accent)}

/* ===== SEARCH ===== */
.search-box{width:100%;max-width:380px;padding:11px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);
  background:var(--surface);color:var(--text);font-size:13px;font-family:'Tajawal',sans-serif;outline:none;margin-bottom:18px;transition:border 0.2s}
.search-box:focus{border-color:var(--accent)}

/* ===== MODEL CARDS ===== */
.models-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px}
.m-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:18px;
  cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden}
.m-card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 12px 35px rgba(0,0,0,0.15)}
.m-head{display:flex;align-items:center;gap:11px;margin-bottom:10px}
.m-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px}
.m-name{font-size:14px;font-weight:700}
.m-prov{font-size:11px;color:var(--text-sec)}
.m-desc{font-size:12px;color:var(--text-sec);line-height:1.6;margin-bottom:12px}
.m-badges{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px}
.badge{padding:2px 9px;border-radius:50px;font-size:10px;font-weight:600}
.b-free{background:rgba(6,214,160,0.12);color:#06d6a0}
.b-pro{background:rgba(99,102,241,0.12);color:var(--accent)}
.b-on{background:rgba(6,214,160,0.12);color:#06d6a0}
.b-tok{background:var(--surface2);color:var(--text-sec)}
.m-stats{display:flex;gap:14px}
.m-stat label{font-size:10px;color:var(--text-sec);display:block;margin-bottom:3px}
.m-bar{width:55px;height:4px;border-radius:10px;background:var(--surface2);overflow:hidden}
.m-fill{height:100%;border-radius:10px;transition:width 0.6s}
.start-btn{width:100%;padding:9px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:transparent;
  color:var(--text);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-top:10px;font-family:'Tajawal',sans-serif}
.start-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}

/* ===== CHAT ===== */
.chat-wrap{display:flex;height:calc(100vh - 56px)}
.chat-sb{width:260px;border-inline-end:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;flex-shrink:0}
.chat-sb-head{padding:14px;border-bottom:1px solid var(--border)}
.new-chat{width:100%;padding:11px;border:1.5px dashed var(--border);border-radius:var(--radius-sm);background:transparent;
  color:var(--accent);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;
  transition:all 0.2s;font-family:'Tajawal',sans-serif}
.new-chat:hover{border-color:var(--accent);background:rgba(99,102,241,0.05)}
.chat-list{flex:1;overflow-y:auto;padding:6px}
.ch-i{padding:10px 12px;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.2s;margin-bottom:3px;
  display:flex;align-items:center;gap:9px}
.ch-i:hover{background:var(--surface2)}
.ch-i.on{background:rgba(99,102,241,0.1)}
.ch-i-icon{font-size:18px}
.ch-i-info{flex:1;min-width:0}
.ch-i-name{font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ch-i-time{font-size:10px;color:var(--text-sec)}

.chat-main{flex:1;display:flex;flex-direction:column;min-width:0}
.chat-hdr{padding:12px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:var(--glass);backdrop-filter:blur(20px)}
.chat-badge{display:flex;align-items:center;gap:7px;padding:5px 12px;border-radius:50px;background:var(--surface2);border:1px solid var(--border);font-size:13px}
.chat-msgs{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:14px}
.msg{max-width:75%;padding:12px 16px;border-radius:var(--radius);font-size:13px;line-height:1.7;animation:msgIn 0.3s ease}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg-u{align-self:flex-end;background:linear-gradient(135deg,var(--accent),#818cf8);color:#fff;border-end-end-radius:4px}
[dir="rtl"] .msg-u{border-end-end-radius:var(--radius);border-end-start-radius:4px}
.msg-a{align-self:flex-start;background:var(--surface);border:1px solid var(--border);border-end-start-radius:4px}
[dir="rtl"] .msg-a{border-end-start-radius:var(--radius);border-end-end-radius:4px}
.msg-a-head{display:flex;align-items:center;gap:7px;margin-bottom:6px;font-size:11px;font-weight:600;color:var(--text-sec)}
.msg-acts{display:flex;gap:5px;margin-top:7px}
.msg-act{padding:3px 7px;border:1px solid var(--border);border-radius:var(--radius-xs);background:transparent;
  color:var(--text-sec);font-size:10px;cursor:pointer;display:flex;align-items:center;gap:3px;transition:all 0.2s;font-family:'Tajawal',sans-serif}
.msg-act:hover{border-color:var(--accent);color:var(--accent)}
.msg-att{margin-top:6px;padding:6px 10px;border-radius:var(--radius-xs);background:rgba(255,255,255,0.08);font-size:11px;display:flex;align-items:center;gap:5px}

.chat-inp{padding:14px 18px;border-top:1px solid var(--border);background:var(--glass);backdrop-filter:blur(20px)}
.smart-sug{display:flex;align-items:center;gap:9px;padding:9px 12px;margin-bottom:9px;border-radius:var(--radius-sm);
  background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(6,214,160,0.06));border:1px solid rgba(99,102,241,0.2);
  font-size:12px;animation:slideUp 0.3s ease;flex-wrap:wrap}
@keyframes slideUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.use-btn{padding:4px 12px;border-radius:50px;border:none;background:var(--accent);color:#fff;
  font-size:11px;font-weight:600;cursor:pointer;font-family:'Tajawal',sans-serif;white-space:nowrap}
.att-bar{display:flex;gap:5px;margin-bottom:9px;flex-wrap:wrap}
.att-btn{padding:5px 10px;border:1px solid var(--border);border-radius:50px;background:transparent;color:var(--text-sec);
  font-size:11px;cursor:pointer;display:flex;align-items:center;gap:4px;transition:all 0.2s;font-family:'Tajawal',sans-serif}
.att-btn:hover{border-color:var(--accent);color:var(--accent)}
.att-btn.rec{border-color:#ef4444;color:#ef4444;animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
.inp-row{display:flex;gap:9px;align-items:flex-end}
.chat-ta{flex:1;padding:11px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:var(--surface2);
  color:var(--text);font-size:13px;font-family:'Tajawal',sans-serif;resize:none;outline:none;min-height:44px;max-height:120px;
  transition:border 0.2s;line-height:1.5}
.chat-ta:focus{border-color:var(--accent)}
.send-btn{width:44px;height:44px;border:none;border-radius:var(--radius-sm);background:linear-gradient(135deg,var(--accent),#818cf8);
  color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;font-size:18px}
.send-btn:hover{transform:scale(1.05);box-shadow:0 4px 15px rgba(99,102,241,0.3)}
.att-files{display:flex;gap:6px;margin-bottom:9px;flex-wrap:wrap}
.att-file{padding:5px 10px;border-radius:50px;background:var(--surface2);border:1px solid var(--border);font-size:11px;display:flex;align-items:center;gap:5px}
.att-file button{background:none;border:none;color:var(--text-sec);cursor:pointer;padding:0;font-size:14px}

.no-chat{flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;color:var(--text-sec);padding:20px}
.no-chat-ic{font-size:44px;opacity:0.3}

/* ===== COMPARE ===== */
.cmp-hdr{margin-bottom:22px}
.cmp-hdr h2{font-size:20px;font-weight:800;margin-bottom:5px}
.cmp-hdr p{color:var(--text-sec);font-size:13px}
.cmp-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}
.cmp-chip{padding:7px 16px;border:1.5px solid var(--border);border-radius:50px;background:transparent;color:var(--text-sec);
  font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:5px;font-family:'Tajawal',sans-serif}
.cmp-chip.sel{border-color:var(--accent);background:rgba(99,102,241,0.1);color:var(--accent)}
.cmp-inp{display:flex;gap:9px;margin-bottom:22px}
.cmp-inp input{flex:1;padding:12px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);
  color:var(--text);font-size:13px;font-family:'Tajawal',sans-serif;outline:none}
.cmp-inp input:focus{border-color:var(--accent)}
.cmp-btn{padding:12px 24px;border:none;border-radius:var(--radius-sm);background:linear-gradient(135deg,var(--accent),#818cf8);
  color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;white-space:nowrap}
.cmp-results{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
.cmp-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:18px}
.cmp-card-head{display:flex;align-items:center;gap:9px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)}
.cmp-card-body{font-size:13px;line-height:1.8;white-space:pre-wrap}
.cmp-card-foot{margin-top:12px;padding-top:10px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;
  font-size:11px;color:var(--text-sec)}

/* ===== TEMPLATES ===== */
.tpl-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.tpl-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:18px;transition:all 0.3s}
.tpl-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.tpl-ic{font-size:26px;margin-bottom:8px}
.tpl-t{font-size:14px;font-weight:700;margin-bottom:5px}
.tpl-pr{font-size:12px;color:var(--text-sec);line-height:1.6;margin-bottom:12px;font-family:'JetBrains Mono',monospace;
  background:var(--surface2);padding:9px 11px;border-radius:var(--radius-xs);white-space:pre-wrap;direction:ltr;text-align:left}
.tpl-use{width:100%;padding:9px;border:1.5px solid var(--accent);border-radius:var(--radius-sm);background:transparent;
  color:var(--accent);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:'Tajawal',sans-serif}
.tpl-use:hover{background:var(--accent);color:#fff}

/* ===== STATS ===== */
.st-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:24px}
.st-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:22px;text-align:center}
.st-val{font-size:30px;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.st-lbl{font-size:12px;color:var(--text-sec);margin-top:3px}
.st-chart{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:22px;margin-bottom:18px}
.st-chart h3{font-size:15px;font-weight:700;margin-bottom:14px}
.bars{display:flex;align-items:flex-end;gap:10px;height:180px;padding:0 8px}
.bar-w{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px}
.bar{width:100%;border-radius:7px 7px 0 0;transition:height 0.8s ease;min-height:3px}
.bar-l{font-size:10px;color:var(--text-sec);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70px}
.bar-v{font-size:11px;font-weight:700}
table.usage{width:100%;border-collapse:collapse}
table.usage th{text-align:start;padding:10px 14px;font-size:12px;font-weight:600;color:var(--text-sec);border-bottom:2px solid var(--border)}
table.usage td{padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border)}

/* ===== MOBILE ===== */
@media(max-width:900px){
  .sidebar{transform:translateX(100%)}
  [dir="ltr"] .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0)!important}
  .content{margin-inline-start:0}
  .chat-sb{display:none}
  .burger{display:flex}
  .models-g,.cmp-results,.tpl-g{grid-template-columns:1fr}
}
@media(max-width:600px){
  .page{padding:14px}
  .welcome{padding:18px}
  .msg{max-width:90%}
  .st-cards{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>
<div class="bg-glow"></div>
<div id="app"></div>

<script>
// ============================
// AI HUB - Complete App
// ============================

const MODELS = [
  {id:"gpt4o",name:"GPT-4o",prov:"OpenAI",cat:"text",color:"#10a37f",icon:"⚡",dar:"أقوى نموذج من OpenAI للمحادثات والتحليل",den:"OpenAI's most powerful model for chat & analysis",spd:85,qlty:95,cost:"pro",tok:"128K"},
  {id:"gpt4omini",name:"GPT-4o Mini",prov:"OpenAI",cat:"text",color:"#10a37f",icon:"🔹",dar:"نموذج سريع واقتصادي",den:"Fast and cost-effective",spd:95,qlty:80,cost:"free",tok:"128K"},
  {id:"claude4opus",name:"Claude Opus 4",prov:"Anthropic",cat:"text",color:"#d4a574",icon:"🎭",dar:"الأذكى والأعمق في التحليل والكتابة",den:"Deepest analysis and writing",spd:70,qlty:98,cost:"pro",tok:"200K"},
  {id:"claude4sonnet",name:"Claude Sonnet 4",prov:"Anthropic",cat:"text",color:"#d4a574",icon:"✨",dar:"توازن مثالي بين السرعة والجودة",den:"Perfect balance of speed and quality",spd:90,qlty:92,cost:"pro",tok:"200K"},
  {id:"gemini2",name:"Gemini 2.0 Ultra",prov:"Google",cat:"text",color:"#4285f4",icon:"💎",dar:"نموذج قوقل الأقوى متعدد الوسائط",den:"Google's most capable multimodal model",spd:88,qlty:93,cost:"pro",tok:"1M"},
  {id:"geminiflash",name:"Gemini Flash",prov:"Google",cat:"text",color:"#4285f4",icon:"⚡",dar:"سريع جداً للمهام البسيطة",den:"Ultra-fast for simple tasks",spd:98,qlty:75,cost:"free",tok:"1M"},
  {id:"llama3",name:"Llama 3.1 405B",prov:"Meta",cat:"text",color:"#0668E1",icon:"🦙",dar:"أقوى نموذج مفتوح المصدر",den:"Most powerful open-source model",spd:80,qlty:88,cost:"free",tok:"128K"},
  {id:"mistral",name:"Mistral Large",prov:"Mistral AI",cat:"text",color:"#FF7000",icon:"🌪️",dar:"نموذج أوروبي قوي ومتعدد اللغات",den:"Powerful European multilingual model",spd:85,qlty:87,cost:"pro",tok:"128K"},
  {id:"deepseek",name:"DeepSeek R1",prov:"DeepSeek",cat:"code",color:"#5B6AFF",icon:"🔍",dar:"متخصص في البرمجة والمنطق",den:"Specialized in coding and reasoning",spd:82,qlty:90,cost:"free",tok:"64K"},
  {id:"codestral",name:"Codestral",prov:"Mistral AI",cat:"code",color:"#FF7000",icon:"💻",dar:"مخصص للبرمجة بكل اللغات",den:"Dedicated coding in all languages",spd:90,qlty:88,cost:"free",tok:"32K"},
  {id:"dalle3",name:"DALL·E 3",prov:"OpenAI",cat:"image",color:"#10a37f",icon:"🎨",dar:"توليد صور واقعية وإبداعية",den:"Realistic and creative image generation",spd:70,qlty:92,cost:"pro",tok:"-"},
  {id:"midjourney",name:"Midjourney v6",prov:"Midjourney",cat:"image",color:"#BC4A9B",icon:"🖼️",dar:"أفضل جودة فنية للصور",den:"Best artistic quality images",spd:60,qlty:97,cost:"pro",tok:"-"},
  {id:"flux",name:"Flux Pro",prov:"Black Forest",cat:"image",color:"#1a1a2e",icon:"🔮",dar:"توليد صور سريع ودقيق",den:"Fast and accurate image generation",spd:85,qlty:90,cost:"pro",tok:"-"},
  {id:"sd3",name:"Stable Diffusion 3",prov:"Stability AI",cat:"image",color:"#8B5CF6",icon:"🎭",dar:"مفتوح المصدر مع تحكم كامل",den:"Open source with full control",spd:80,qlty:85,cost:"free",tok:"-"},
  {id:"whisper",name:"Whisper",prov:"OpenAI",cat:"audio",color:"#10a37f",icon:"🎙️",dar:"تحويل الصوت إلى نص بدقة عالية",den:"High-accuracy speech to text",spd:90,qlty:93,cost:"free",tok:"-"},
  {id:"elevenlabs",name:"ElevenLabs",prov:"ElevenLabs",cat:"audio",color:"#F59E0B",icon:"🔊",dar:"توليد صوت بشري طبيعي",den:"Natural human voice generation",spd:85,qlty:95,cost:"pro",tok:"-"},
  {id:"suno",name:"Suno AI",prov:"Suno",cat:"audio",color:"#EC4899",icon:"🎵",dar:"توليد موسيقى وأغاني كاملة",den:"Full music and song generation",spd:75,qlty:88,cost:"pro",tok:"-"},
  {id:"runway",name:"Runway Gen-3",prov:"Runway",cat:"video",color:"#06B6D4",icon:"🎬",dar:"توليد فيديوهات بالذكاء الاصطناعي",den:"AI video generation",spd:50,qlty:90,cost:"pro",tok:"-"},
  {id:"sora",name:"Sora",prov:"OpenAI",cat:"video",color:"#10a37f",icon:"📹",dar:"فيديوهات واقعية من النصوص",den:"Realistic videos from text",spd:40,qlty:95,cost:"pro",tok:"-"},
  {id:"perplexity",name:"Perplexity",prov:"Perplexity AI",cat:"text",color:"#20B2AA",icon:"🔎",dar:"بحث ذكي مع مصادر موثقة",den:"Smart search with cited sources",spd:88,qlty:85,cost:"free",tok:"32K"},
];

const TEMPLATES = [
  {id:1,icon:"💻",tar:"كتابة كود",ten:"Write Code",par:"اكتب لي كود {language} لـ {description}",pen:"Write {language} code for {description}",best:"deepseek"},
  {id:2,icon:"🌐",tar:"ترجمة احترافية",ten:"Professional Translation",par:"ترجم النص التالي من {source} إلى {target}:\\n{text}",pen:"Translate from {source} to {target}:\\n{text}",best:"claude4opus"},
  {id:3,icon:"📝",tar:"تلخيص نص",ten:"Summarize Text",par:"لخّص النص التالي في {count} نقاط رئيسية:\\n{text}",pen:"Summarize in {count} key points:\\n{text}",best:"gemini2"},
  {id:4,icon:"🎨",tar:"توليد صورة",ten:"Generate Image",par:"أنشئ صورة: {description}، بأسلوب {style}",pen:"Generate image: {description}, in {style} style",best:"midjourney"},
  {id:5,icon:"📧",tar:"كتابة إيميل",ten:"Write Email",par:"اكتب إيميل {tone} لـ {recipient} بخصوص {subject}",pen:"Write a {tone} email to {recipient} about {subject}",best:"gpt4o"},
  {id:6,icon:"📊",tar:"تحليل بيانات",ten:"Data Analysis",par:"حلل البيانات التالية واستخرج الأنماط:\\n{data}",pen:"Analyze the following data:\\n{data}",best:"claude4opus"},
  {id:7,icon:"🐛",tar:"إصلاح أخطاء",ten:"Debug Code",par:"اكتشف وأصلح الأخطاء في الكود:\\n{code}",pen:"Find and fix bugs:\\n{code}",best:"deepseek"},
  {id:8,icon:"✍️",tar:"كتابة محتوى",ten:"Content Writing",par:"اكتب {type} عن {topic} بأسلوب {style}",pen:"Write a {type} about {topic} in {style} style",best:"claude4sonnet"},
];

const RULES = [
  {kw:["كود","برمج","code","program","function","api","debug","خطأ","error","script"],m:"deepseek",rar:"متخصص في البرمجة",ren:"Coding specialist"},
  {kw:["صورة","ارسم","image","draw","design","تصميم","شعار","logo"],m:"midjourney",rar:"أفضل جودة صور",ren:"Best image quality"},
  {kw:["ترجم","translate","ترجمة"],m:"claude4opus",rar:"أدق في الترجمة",ren:"Most accurate translation"},
  {kw:["لخص","ملخص","summarize","summary"],m:"gemini2",rar:"ممتاز في التلخيص",ren:"Excellent summarizer"},
  {kw:["فيديو","video","مقطع","clip"],m:"sora",rar:"أفضل توليد فيديو",ren:"Best video generation"},
  {kw:["صوت","audio","voice","نطق"],m:"elevenlabs",rar:"أفضل توليد صوت",ren:"Best voice generation"},
  {kw:["موسيقى","أغنية","music","song"],m:"suno",rar:"متخصص في الموسيقى",ren:"Music specialist"},
  {kw:["بحث","search","مصادر","ابحث"],m:"perplexity",rar:"بحث ذكي مع مصادر",ren:"Smart search"},
  {kw:["حلل","analyze","تحليل","بيانات","data"],m:"claude4opus",rar:"الأعمق في التحليل",ren:"Deepest analysis"},
  {kw:["اكتب","write","مقال","article","محتوى"],m:"claude4sonnet",rar:"ممتاز في الكتابة",ren:"Excellent writing"},
];

// ============================
// STATE
// ============================
let S = {
  lang: 'ar', dark: true, loggedIn: false, page: 'dashboard',
  catFilter: 'all', searchQ: '', sidebarOpen: false,
  chats: [], activeChatId: null, msgInput: '', attachments: [], recording: false,
  cmpModels: [], cmpPrompt: '', cmpResults: [], comparing: false
};

const t = (ar, en) => S.lang === 'ar' ? ar : en;
const getModel = id => MODELS.find(m => m.id === id);

function getSuggestion(text) {
  if (!text || text.length < 2) return null;
  const low = text.toLowerCase();
  for (const r of RULES) {
    if (r.kw.some(k => low.includes(k))) {
      return { model: getModel(r.m), reason: S.lang === 'ar' ? r.rar : r.ren };
    }
  }
  return null;
}

// ============================
// RENDER ENGINE
// ============================
const $ = id => document.getElementById(id);
const app = () => $('app');

function render() {
  document.documentElement.setAttribute('dir', S.lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', S.lang);
  document.body.className = S.dark ? '' : 'light-mode';

  if (!S.loggedIn) { renderLogin(); return; }
  renderApp();
}

// ============================
// LOGIN
// ============================
function renderLogin() {
  app().innerHTML = \`
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo">✦ AI Hub</div>
        <div class="login-sub">\${t('كل نماذج الذكاء الاصطناعي في مكان واحد','All AI models in one place')}</div>
        <div class="inp-grp">
          <label>\${t('البريد الإلكتروني','Email')}</label>
          <input type="email" placeholder="\${t('ahmed@example.com','you@example.com')}" id="loginEmail">
        </div>
        <div class="inp-grp">
          <label>\${t('كلمة المرور','Password')}</label>
          <input type="password" placeholder="••••••••" id="loginPass">
        </div>
        <div class="login-opts">
          <label><input type="checkbox"> \${t('تذكرني','Remember me')}</label>
          <a href="#">\${t('نسيت كلمة المرور؟','Forgot password?')}</a>
        </div>
        <button class="btn-pri" onclick="S.loggedIn=true;render()">\${t('تسجيل الدخول','Sign In')}</button>
        <div class="divider">\${t('أو سجّل دخول عبر','Or sign in with')}</div>
        <div class="social-row">
          <button class="social-btn" onclick="S.loggedIn=true;render()">G</button>
          <button class="social-btn" onclick="S.loggedIn=true;render()">⌨</button>
          <button class="social-btn" onclick="S.loggedIn=true;render()">🍎</button>
        </div>
        <div class="login-foot">\${t('ما عندك حساب؟','No account?')} <a href="#">\${t('سجّل الآن','Sign up')}</a></div>
        <div class="login-bottom-row">
          <button class="lang-btn" onclick="S.lang=S.lang==='ar'?'en':'ar';render()">\${t('EN','عربي')}</button>
          <button class="icon-btn" onclick="S.dark=!S.dark;render()">\${S.dark ? '☀️' : '🌙'}</button>
        </div>
      </div>
    </div>\`;
}

// ============================
// MAIN APP
// ============================
function renderApp() {
  const dir = S.lang === 'ar' ? 'rtl' : 'ltr';
  const pages = [
    {id:'dashboard',lbl:t('الرئيسية','Dashboard'),ic:'🏠'},
    {id:'chats',lbl:t('المحادثات','Chats'),ic:'💬'},
    {id:'compare',lbl:t('المقارنة','Compare'),ic:'⚖️'},
    {id:'templates',lbl:t('القوالب','Templates'),ic:'📋'},
    {id:'stats',lbl:t('الإحصائيات','Statistics'),ic:'📊'},
  ];

  app().innerHTML = \`
    <div class="app" dir="\${dir}">
      <div class="sidebar \${S.sidebarOpen?'open':''}" style="\${dir==='rtl'?'right:0':'left:0'}" id="sidebar">
        <div class="sb-head"><span class="sb-logo">✦ AI Hub</span></div>
        <div class="sb-nav">
          \${pages.map(p => \`<div class="nav-i \${S.page===p.id?'active':''}" onclick="S.page='\${p.id}';S.sidebarOpen=false;render()">\${p.ic} <span>\${p.lbl}</span></div>\`).join('')}
        </div>
        <div class="sb-foot">
          <div class="nav-i" onclick="S.loggedIn=false;render()">🚪 <span>\${t('خروج','Logout')}</span></div>
        </div>
      </div>
      <div class="content">
        <div class="topbar">
          <div style="display:flex;align-items:center;gap:10px">
            <button class="icon-btn burger" onclick="S.sidebarOpen=!S.sidebarOpen;render()">☰</button>
            <span class="topbar-t">\${pages.find(p=>p.id===S.page)?.lbl||''}</span>
          </div>
          <div class="topbar-acts">
            <button class="lang-btn" onclick="S.lang=S.lang==='ar'?'en':'ar';render()">\${t('EN','عربي')}</button>
            <button class="icon-btn" onclick="S.dark=!S.dark;render()">\${S.dark?'☀️':'🌙'}</button>
          </div>
        </div>
        <div id="pageContent"></div>
      </div>
    </div>\`;

  // Close sidebar on outside click
  document.addEventListener('click', e => {
    if (S.sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.burger')) {
      S.sidebarOpen = false; render();
    }
  }, {once: true});

  // Render page content
  const pc = $('pageContent');
  if (S.page === 'dashboard') renderDashboard(pc);
  else if (S.page === 'chats') renderChats(pc);
  else if (S.page === 'compare') renderCompare(pc);
  else if (S.page === 'templates') renderTemplates(pc);
  else if (S.page === 'stats') renderStats(pc);
}

// ============================
// DASHBOARD
// ============================
function renderDashboard(el) {
  const cats = [
    {id:'all',lbl:t('الكل','All')},{id:'text',lbl:t('النصوص','Text')},{id:'image',lbl:t('الصور','Image')},
    {id:'audio',lbl:t('الصوت','Audio')},{id:'code',lbl:t('البرمجة','Code')},{id:'video',lbl:t('الفيديو','Video')}
  ];
  const filtered = MODELS.filter(m => {
    const mc = S.catFilter==='all' || m.cat===S.catFilter;
    const ms = !S.searchQ || m.name.toLowerCase().includes(S.searchQ.toLowerCase()) || m.prov.toLowerCase().includes(S.searchQ.toLowerCase());
    return mc && ms;
  });

  el.className = 'page';
  el.innerHTML = \`
    <div class="welcome">
      <h2>\${t('أهلاً بعودتك','Welcome back')}، Ahmed! 👋</h2>
      <p>\${t('كل نماذج الذكاء الاصطناعي في مكان واحد','All AI models in one place')}</p>
      <div class="quick-acts">
        <button class="q-act" onclick="startChat('deepseek')">💻 \${t('اكتب كود','Write Code')}</button>
        <button class="q-act" onclick="startChat('claude4opus')">🌐 \${t('ترجم نص','Translate')}</button>
        <button class="q-act" onclick="startChat('midjourney')">🎨 \${t('أنشئ صورة','Generate Image')}</button>
        <button class="q-act" onclick="startChat('gemini2')">📝 \${t('لخّص نص','Summarize')}</button>
      </div>
    </div>
    <div class="sec-t">🤖 \${t('النماذج المتاحة','Available Models')}</div>
    <div class="cat-tabs">
      \${cats.map(c => \`<button class="cat-t \${S.catFilter===c.id?'on':''}" onclick="S.catFilter='\${c.id}';render()">\${c.lbl}</button>\`).join('')}
    </div>
    <input class="search-box" placeholder="\${t('ابحث عن نموذج...','Search models...')}" value="\${S.searchQ}" oninput="S.searchQ=this.value;render()">
    <div class="models-g">
      \${filtered.map(m => \`
        <div class="m-card" onclick="startChat('\${m.id}')">
          <div class="m-head">
            <div class="m-icon" style="background:\${m.color}18;color:\${m.color}">\${m.icon}</div>
            <div><div class="m-name">\${m.name}</div><div class="m-prov">\${m.prov}</div></div>
          </div>
          <div class="m-desc">\${S.lang==='ar'?m.dar:m.den}</div>
          <div class="m-badges">
            <span class="badge \${m.cost==='free'?'b-free':'b-pro'}">\${m.cost==='free'?t('مجاني','Free'):t('احترافي','Pro')}</span>
            <span class="badge b-on">\${t('متصل','Online')}</span>
            \${m.tok!=='-'?\`<span class="badge b-tok">\${m.tok}</span>\`:''}
          </div>
          <div class="m-stats">
            <div class="m-stat"><label>\${t('السرعة','Speed')}</label><div class="m-bar"><div class="m-fill" style="width:\${m.spd}%;background:var(--accent2)"></div></div></div>
            <div class="m-stat"><label>\${t('الجودة','Quality')}</label><div class="m-bar"><div class="m-fill" style="width:\${m.qlty}%;background:var(--accent)"></div></div></div>
          </div>
          <button class="start-btn" onclick="event.stopPropagation();startChat('\${m.id}')">\${t('ابدأ محادثة','Start Chat')} →</button>
        </div>
      \`).join('')}
    </div>\`;
}

// ============================
// CHATS
// ============================
function startChat(modelId) {
  const m = getModel(modelId);
  if (!m) return;
  const chat = {
    id: Date.now(), modelId: m.id, title: m.name,
    messages: [{id:1, role:'ai', text: S.lang==='ar'
      ? \`مرحباً! أنا \${m.name} من \${m.prov}. كيف أقدر أساعدك اليوم؟\`
      : \`Hello! I'm \${m.name} by \${m.prov}. How can I help you today?\`,
      time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}]
  };
  S.chats.unshift(chat);
  S.activeChatId = chat.id;
  S.page = 'chats';
  S.sidebarOpen = false;
  render();
}

function renderChats(el) {
  const chat = S.chats.find(c => c.id === S.activeChatId);
  el.className = '';
  el.innerHTML = \`
    <div class="chat-wrap">
      <div class="chat-sb">
        <div class="chat-sb-head">
          <button class="new-chat" onclick="S.activeChatId=null;render()">+ \${t('محادثة جديدة','New Chat')}</button>
        </div>
        <div class="chat-list">
          \${S.chats.map(c => {
            const m = getModel(c.modelId);
            return \`<div class="ch-i \${c.id===S.activeChatId?'on':''}" onclick="S.activeChatId=\${c.id};render()">
              <span class="ch-i-icon">\${m?.icon||'💬'}</span>
              <div class="ch-i-info"><div class="ch-i-name">\${c.title}</div>
              <div class="ch-i-time">\${c.messages[c.messages.length-1]?.time||''}</div></div>
            </div>\`;
          }).join('')}
        </div>
      </div>
      <div class="chat-main">
        \${chat ? renderChatArea(chat) : \`<div class="no-chat"><div class="no-chat-ic">💬</div><p>\${t('اختر محادثة أو ابدأ واحدة جديدة','Select a chat or start a new one')}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px">
            \${['gpt4o','claude4opus','gemini2','midjourney'].map(id=>{const m=getModel(id);return \`<button class="q-act" onclick="startChat('\${id}')">\${m.icon} \${m.name}</button>\`;}).join('')}
          </div></div>\`}
      </div>
    </div>\`;

  if (chat) {
    const msgs = document.getElementById('chatMsgs');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
    const ta = document.getElementById('chatTa');
    if (ta) { ta.focus(); ta.value = S.msgInput; }
  }
}

function renderChatArea(chat) {
  const m = getModel(chat.modelId);
  const sugg = getSuggestion(S.msgInput);

  return \`
    <div class="chat-hdr">
      <div class="chat-badge"><span>\${m?.icon}</span><strong>\${m?.name}</strong><span style="font-size:11px;color:var(--text-sec)">\${m?.prov}</span></div>
    </div>
    <div class="chat-msgs" id="chatMsgs">
      \${chat.messages.map(msg => {
        if (msg.role === 'user') {
          return \`<div class="msg msg-u">\${escHtml(msg.text)}\${msg.attachments?msg.attachments.map(a=>\`<div class="msg-att">\${attIcon(a.type)} \${a.name}</div>\`).join(''):''}</div>\`;
        } else {
          return \`<div class="msg msg-a">
            <div class="msg-a-head"><span>\${m?.icon}</span> \${m?.name} \${msg.responseTime?\`<span style="margin-inline-start:auto">\${msg.responseTime}\${t('ث','s')}</span>\`:''}</div>
            \${escHtml(msg.text)}
            <div class="msg-acts">
              <button class="msg-act" onclick="copyText('\${escAttr(msg.text)}')">📋 \${t('نسخ','Copy')}</button>
              <button class="msg-act">⭐ \${t('حفظ','Save')}</button>
              <button class="msg-act">🔄 \${t('إعادة','Retry')}</button>
            </div>
          </div>\`;
        }
      }).join('')}
    </div>
    <div class="chat-inp">
      \${sugg ? \`<div class="smart-sug">
        ✦ <span style="flex:1"><strong>\${t('المساعد الذكي يقترح:','Smart Assistant suggests:')}</strong> \${sugg.model.icon} \${sugg.model.name} — \${sugg.reason}</span>
        <button class="use-btn" onclick="switchModel('\${sugg.model.id}')">\${t('استخدم هذا','Use this')}</button>
      </div>\` : ''}
      \${S.attachments.length > 0 ? \`<div class="att-files">\${S.attachments.map(a => 
        \`<div class="att-file">\${attIcon(a.type)} \${a.name} <button onclick="removeAtt(\${a.id})">✕</button></div>\`
      ).join('')}</div>\` : ''}
      <div class="att-bar">
        <button class="att-btn" onclick="addAtt('image')">🖼️ \${t('صورة','Image')}</button>
        <button class="att-btn" onclick="addAtt('audio')">🎵 \${t('صوت','Audio')}</button>
        <button class="att-btn" onclick="addAtt('video')">🎬 \${t('فيديو','Video')}</button>
        <button class="att-btn" onclick="addAtt('doc')">📄 \${t('مستند','Doc')}</button>
        <button class="att-btn \${S.recording?'rec':''}" onclick="S.recording=!S.recording;render()">🎙️ \${S.recording?t('جاري التسجيل...','Recording...'):t('تسجيل صوتي','Voice Record')}</button>
      </div>
      <div class="inp-row">
        <textarea class="chat-ta" id="chatTa" placeholder="\${t('اكتب رسالتك هنا...','Type your message here...')}" 
          oninput="S.msgInput=this.value;updateSuggestion();this.style.height='44px';this.style.height=Math.min(this.scrollHeight,120)+'px'"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}" rows="1"></textarea>
        <button class="send-btn" onclick="sendMsg()">➤</button>
      </div>
    </div>\`;
}

function sendMsg() {
  if (!S.msgInput.trim() && S.attachments.length === 0) return;
  const chat = S.chats.find(c => c.id === S.activeChatId);
  if (!chat) return;
  const m = getModel(chat.modelId);
  const now = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});

  chat.messages.push({
    id: Date.now(), role: 'user', text: S.msgInput,
    attachments: S.attachments.length > 0 ? [...S.attachments] : undefined, time: now
  });

  const responses = S.lang === 'ar' ? [
    \`تم استلام طلبك! هذا رد تجريبي من \${m.name}. في النسخة الكاملة سيتم ربطي بـ API حقيقي.\`,
    \`سؤال ممتاز! كنموذج \${m.name}، أقدر أساعدك. الرد التفصيلي سيكون متاح عند ربط الـ API.\`,
    \`شكراً لاستخدامك \${m.name}! هذي نسخة تجريبية. الردود الحقيقية بتكون أذكى وأدق.\`,
  ] : [
    \`Request received! This is a demo response from \${m.name}. In the full version, I'll be connected to a real API.\`,
    \`Great question! As \${m.name}, I can help. Detailed answer available when API is connected.\`,
    \`Thanks for using \${m.name}! This is a prototype. Real responses will be much smarter.\`,
  ];

  chat.messages.push({
    id: Date.now()+1, role: 'ai', text: responses[Math.floor(Math.random()*responses.length)],
    time: now, responseTime: (Math.random()*2+0.5).toFixed(1)
  });

  S.msgInput = ''; S.attachments = [];
  render();
}

function switchModel(modelId) {
  const chat = S.chats.find(c => c.id === S.activeChatId);
  if (chat) { chat.modelId = modelId; chat.title = getModel(modelId).name; render(); }
}

function addAtt(type) {
  const names = {image:'photo.jpg',audio:'audio.mp3',video:'video.mp4',doc:'document.pdf'};
  S.attachments.push({type, name:names[type], id:Date.now()});
  render();
}
function removeAtt(id) { S.attachments = S.attachments.filter(a=>a.id!==id); render(); }
function attIcon(type) { return type==='image'?'🖼️':type==='audio'?'🎵':type==='video'?'🎬':'📄'; }

function updateSuggestion() {
  // Re-render just the suggestion area if needed
  const sugg = getSuggestion(S.msgInput);
  const existing = document.querySelector('.smart-sug');
  if (!sugg && existing) existing.remove();
  else if (sugg && !existing) render();
}

// ============================
// COMPARE
// ============================
function renderCompare(el) {
  el.className = 'page';
  const textModels = MODELS.filter(m => m.cat === 'text' || m.cat === 'code');

  el.innerHTML = \`
    <div class="cmp-hdr">
      <h2>⚖️ \${t('قارن بين النماذج','Compare Models')}</h2>
      <p>\${t('أرسل نفس الطلب لعدة نماذج وقارن النتائج','Send the same prompt to multiple models and compare results')}</p>
    </div>
    <div class="sec-t">\${t('اختر النماذج (حد أقصى 4)','Select models (max 4)')}</div>
    <div class="cmp-chips">
      \${textModels.map(m => \`<button class="cmp-chip \${S.cmpModels.includes(m.id)?'sel':''}" 
        onclick="toggleCmp('\${m.id}')">\${m.icon} \${m.name}</button>\`).join('')}
    </div>
    <div class="cmp-inp">
      <input placeholder="\${t('اكتب الطلب للمقارنة...','Enter prompt to compare...')}" value="\${escAttr(S.cmpPrompt)}" 
        oninput="S.cmpPrompt=this.value" onkeydown="if(event.key==='Enter')runCmp()">
      <button class="cmp-btn" onclick="runCmp()" \${S.comparing?'disabled':''}>\${S.comparing?t('جاري المقارنة...','Comparing...'):t('قارن الآن','Compare Now')}</button>
    </div>
    \${S.cmpResults.length > 0 ? \`<div class="cmp-results">\${S.cmpResults.map(r => {
      const m = getModel(r.modelId);
      return \`<div class="cmp-card">
        <div class="cmp-card-head"><span style="font-size:22px">\${m?.icon}</span><div><div style="font-weight:700;font-size:14px">\${m?.name}</div><div style="font-size:11px;color:var(--text-sec)">\${m?.prov}</div></div></div>
        <div class="cmp-card-body">\${escHtml(r.response)}</div>
        <div class="cmp-card-foot"><span>⏱️ \${r.time}\${t('ث','s')}</span><button class="msg-act" onclick="startChat('\${r.modelId}')">\${t('ابدأ محادثة','Start Chat')} →</button></div>
      </div>\`;
    }).join('')}</div>\` : ''}\`;
}

function toggleCmp(id) {
  if (S.cmpModels.includes(id)) S.cmpModels = S.cmpModels.filter(m=>m!==id);
  else if (S.cmpModels.length < 4) S.cmpModels.push(id);
  render();
}

function runCmp() {
  if (S.cmpModels.length < 2 || !S.cmpPrompt.trim()) return;
  S.comparing = true; render();
  setTimeout(() => {
    S.cmpResults = S.cmpModels.map(mId => {
      const m = getModel(mId);
      return {
        modelId: mId,
        response: S.lang==='ar'
          ? \`هذا رد تجريبي من \${m.name}. في النسخة الكاملة، كل نموذج سيرد بإجابته الفعلية على: "\${S.cmpPrompt}"\`
          : \`Demo response from \${m.name}. In full version, each model provides its actual answer to: "\${S.cmpPrompt}"\`,
        time: (Math.random()*3+0.5).toFixed(1)
      };
    });
    S.comparing = false; render();
  }, 1500);
}

// ============================
// TEMPLATES
// ============================
function renderTemplates(el) {
  el.className = 'page';
  el.innerHTML = \`
    <div class="cmp-hdr">
      <h2>📋 \${t('قوالب البرومبتات','Prompt Templates')}</h2>
      <p>\${t('برومبتات جاهزة للاستخدام السريع','Ready-to-use prompts for quick access')}</p>
    </div>
    <div class="tpl-g">
      \${TEMPLATES.map(tp => {
        const best = getModel(tp.best);
        return \`<div class="tpl-card">
          <div class="tpl-ic">\${tp.icon}</div>
          <div class="tpl-t">\${S.lang==='ar'?tp.tar:tp.ten}</div>
          <div class="tpl-pr">\${S.lang==='ar'?tp.par:tp.pen}</div>
          <div style="font-size:11px;color:var(--text-sec);margin-bottom:10px">\${t('الأفضل:','Best:')} \${best?.icon} \${best?.name}</div>
          <button class="tpl-use" onclick="useTpl('\${tp.best}','\${escAttr(S.lang==='ar'?tp.par:tp.pen)}')">\${t('استخدم القالب','Use Template')} →</button>
        </div>\`;
      }).join('')}
    </div>\`;
}

function useTpl(modelId, prompt) {
  startChat(modelId);
  setTimeout(() => { S.msgInput = prompt; render(); }, 50);
}

// ============================
// STATS
// ============================
function renderStats(el) {
  el.className = 'page';
  const usage = [
    {name:"GPT-4o",count:127,color:"#10a37f"},{name:"Claude Opus",count:98,color:"#d4a574"},
    {name:"Gemini",count:76,color:"#4285f4"},{name:"DeepSeek",count:54,color:"#5B6AFF"},
    {name:"Midjourney",count:42,color:"#BC4A9B"},{name:"Llama 3",count:33,color:"#0668E1"},
    {name:"Whisper",count:28,color:"#10a37f"},{name:"DALL·E 3",count:21,color:"#10a37f"},
  ];
  const maxC = Math.max(...usage.map(u=>u.count));

  const activity = [
    {model:"GPT-4o",type:t('محادثة','Chat'),msgs:24,date:"2026-03-11"},
    {model:"Claude Opus 4",type:t('تحليل','Analysis'),msgs:18,date:"2026-03-10"},
    {model:"Midjourney v6",type:t('صور','Images'),msgs:12,date:"2026-03-10"},
    {model:"DeepSeek R1",type:t('كود','Code'),msgs:31,date:"2026-03-09"},
    {model:"Gemini 2.0",type:t('تلخيص','Summary'),msgs:8,date:"2026-03-09"},
  ];

  el.innerHTML = \`
    <div class="cmp-hdr"><h2>📊 \${t('إحصائيات الاستخدام','Usage Statistics')}</h2></div>
    <div class="st-cards">
      <div class="st-card"><div class="st-val">\${S.chats.length||47}</div><div class="st-lbl">\${t('إجمالي المحادثات','Total Chats')}</div></div>
      <div class="st-card"><div class="st-val">\${S.chats.reduce((a,c)=>a+c.messages.length,0)||312}</div><div class="st-lbl">\${t('إجمالي الرسائل','Total Messages')}</div></div>
      <div class="st-card"><div class="st-val" style="font-size:18px">GPT-4o</div><div class="st-lbl">\${t('النموذج المفضل','Favorite Model')}</div></div>
      <div class="st-card"><div class="st-val">20</div><div class="st-lbl">\${t('نموذج مستخدم','Models Used')}</div></div>
    </div>
    <div class="st-chart">
      <h3>\${t('استخدام النماذج','Model Usage')}</h3>
      <div class="bars">
        \${usage.map(u => \`<div class="bar-w">
          <div class="bar-v">\${u.count}</div>
          <div class="bar" style="height:\${(u.count/maxC)*160}px;background:linear-gradient(180deg,\${u.color},\${u.color}66)"></div>
          <div class="bar-l">\${u.name}</div>
        </div>\`).join('')}
      </div>
    </div>
    <div class="st-chart">
      <h3>\${t('آخر النشاطات','Recent Activity')}</h3>
      <table class="usage">
        <thead><tr>
          <th>\${t('النموذج','Model')}</th><th>\${t('النوع','Type')}</th>
          <th>\${t('الرسائل','Messages')}</th><th>\${t('التاريخ','Date')}</th>
        </tr></thead>
        <tbody>\${activity.map(r => \`<tr>
          <td style="font-weight:600">\${r.model}</td><td>\${r.type}</td>
          <td>\${r.msgs}</td><td style="color:var(--text-sec)">\${r.date}</td>
        </tr>\`).join('')}</tbody>
      </table>
    </div>\`;
}

// ============================
// HELPERS
// ============================
function escHtml(s) { const d=document.createElement('div');d.textContent=s;return d.innerHTML; }
function escAttr(s) { return s.replace(/'/g,"\\\\'").replace(/"/g,'&quot;').replace(/\\n/g,'\\\\n'); }
function copyText(txt) {
  navigator.clipboard?.writeText(txt.replace(/\\\\n/g,'\\n'));
}

// ============================
// INIT
// ============================
render();

// PWA Service Worker registration
if ('serviceWorker' in navigator) {
  // Minimal SW for PWA installability
}
</script>
</body>
</html>
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/favicon.ico') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">✦</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } }
      );
    }
    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
