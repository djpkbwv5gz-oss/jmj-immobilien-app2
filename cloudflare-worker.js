export default {
 async scheduled(controller, env) {
  const min=Number(env.MIN_PRICE||150000), max=Number(env.MAX_PRICE||650000);
  const amount=Math.floor(Math.random()*(max-min+1))+min;
  const price=new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(amount);
  const msg=env.MESSAGE||"Ein neues Immobiliengeschäft wurde abgeschlossen!";
  const r=await fetch("https://api.onesignal.com/notifications",{
   method:"POST",
   headers:{"Content-Type":"application/json","Authorization":`Key ${env.ONESIGNAL_REST_API_KEY}`},
   body:JSON.stringify({app_id:env.ONESIGNAL_APP_ID,included_segments:["All"],headings:{de:"JMJ Immobilien"},contents:{de:`${msg} Virtueller Verkaufspreis: ${price}. Simulation – kein echter Verkauf.`}})
  });
  if(!r.ok) throw new Error("OneSignal-Fehler: "+r.status+" "+await r.text());
 }
};