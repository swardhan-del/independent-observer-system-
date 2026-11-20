/** Offline aggregate-only growth scorecard. No network, tracking, cookies or external assets. */
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,relative,dirname,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
const keys=['searchClicks','searchImpressions','siteVisits','engagedVisits','returningVisits','confirmedSubscribers','newConfirmedSubscribers','unsubscribes'];
const topics=['AI and work','Institutions','History','Political economy','Science','Wealth and labour'];
const sources=['google-search-console','site-analytics','substack','manual'];
export const escapeHtml=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+'T00:00:00Z'))&&new Date(s+'T00:00:00Z').toISOString().startsWith(s);
export function validateInput(raw){
 if(raw===null)return {periodStart:null,periodEnd:null,metrics:{},sources:[],topics:[]};
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Input must be a JSON object');
 for(const k of Object.keys(raw))if(!['periodStart','periodEnd','metrics','sources','topics'].includes(k))throw Error('Unrecognized top-level field: '+k);
 if(!validDate(raw.periodStart)||!validDate(raw.periodEnd)||raw.periodEnd<raw.periodStart)throw Error('Provide valid periodStart/periodEnd');
 const metrics=raw.metrics??{};
 if(!metrics||typeof metrics!=='object'||Array.isArray(metrics))throw Error('metrics must be an object');
 for(const [k,v] of Object.entries(metrics)){if(!keys.includes(k))throw Error('Unrecognized metric: '+k);if(!Number.isSafeInteger(v)||v<0)throw Error('Metric '+k+' must be a nonnegative safe integer');}
 if(metrics.siteVisits!==undefined&&metrics.engagedVisits>metrics.siteVisits)throw Error('Engaged visits cannot exceed site visits');
 if(metrics.siteVisits!==undefined&&metrics.returningVisits>metrics.siteVisits)throw Error('Returning visits cannot exceed site visits');
 const src=raw.sources??[];
 if(!Array.isArray(src)||src.some(v=>!sources.includes(v)))throw Error('Only approved aggregate source labels allowed');
 const rows=raw.topics??[];
 if(!Array.isArray(rows)||rows.length>6||rows.some(r=>!r||!topics.includes(r.topic)||!Number.isSafeInteger(r.visits)||r.visits<0||Object.keys(r).some(k=>!['topic','visits'].includes(k))))throw Error('Only approved public topics and nonnegative aggregate visit counts allowed');
 if(new Set(rows.map(r=>r.topic)).size!==rows.length)throw Error('Duplicate topic');
 return {periodStart:raw.periodStart,periodEnd:raw.periodEnd,metrics,sources:[...new Set(src)],topics:rows};
}
const n=v=>v===undefined?'NOT VERIFIED':Intl.NumberFormat('en-US').format(v);
export function renderScorecard(raw){
 const d=validateInput(raw), m=d.metrics;
 const panels=keys.map(k=>'<section class="metric"><h2>'+escapeHtml(k.replace(/([A-Z])/g,' $1'))+'</h2><strong>'+n(m[k])+'</strong><p>'+(m[k]===undefined?'NOT VERIFIED':'REPORTED AGGREGATE')+'</p></section>').join('\n');
 const ctr=m.searchClicks!==undefined&&m.searchImpressions>0?(100*m.searchClicks/m.searchImpressions).toFixed(2)+'%':'NOT VERIFIED';
 const period=d.periodStart?escapeHtml(d.periodStart+' to '+d.periodEnd):'NOT VERIFIED';
 const rows=d.topics.length?d.topics.map(r=>'<tr><th scope="row">'+escapeHtml(r.topic)+'</th><td>'+n(r.visits)+'</td></tr>').join(''):'<tr><td colspan="2">NOT VERIFIED</td></tr>';
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Independent Observer — Private Growth Scorecard</title><style>body{font-family:system-ui,sans-serif;color:#12283d;background:#f3f5f7;margin:0}main{max-width:1100px;margin:auto;padding:clamp(16px,4vw,40px)}h1{font-size:clamp(1.8rem,4vw,2.8rem)}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px}.metric{border:1px solid #d5dce4;border-radius:10px;padding:18px;background:white}.metric strong{font-size:1.6rem}.metric h2{font-size:.95rem;text-transform:capitalize}.metric p,footer{font-size:.8rem;color:#455769}.note{padding:14px;background:#fff5dc;border-left:4px solid #99711e}table{border-collapse:collapse;width:100%;background:white}td,th{text-align:left;padding:12px;border-bottom:1px solid #ccd5dc}:focus-visible{outline:3px solid orange}</style></head><body><main><p>INDEPENDENT OBSERVER · OFFLINE OWNER-CONTROLLED REPORT</p><h1>Audience growth scorecard</h1><p><b>Reporting period:</b> '+period+'</p><p class="note"><b>Evidence rule:</b> NOT VERIFIED is missing data, not zero. Values are user-supplied aggregates, not automatically acquired. No visitor identifiers are collected.</p><div class="cards">'+panels+'</div><h2>Search click-through rate</h2><p>'+ctr+' (calculated only from known clicks and nonzero impressions)</p><h2>Visits by public topic</h2><table><thead><tr><th>Topic</th><th>Aggregate visits</th></tr></thead><tbody>'+rows+'</tbody></table><footer><p>Source categories: '+(d.sources.length?d.sources.map(escapeHtml).join(', '):'NOT VERIFIED')+'. No network requests or authentication are included. Do not publish or host this file: protect it using device permissions.</p></footer></main></body></html>';
}
function outsideRepo(p,kind){
 if(!p||!isAbsolute(p))throw Error(kind+' needs an absolute path outside the repository');
 const path=resolve(p),rel=relative(process.cwd(),path);
 if(rel===''||(!rel.startsWith('..')&&!isAbsolute(rel)))throw Error(kind+' must be outside repository');
 return path;
}
export async function run(argv=process.argv.slice(2)){
 if(argv.includes('--help')){console.log('node scripts/growth-scorecard.mjs --output /absolute/private/report.html [--input /absolute/private/aggregates.json]');return;}
 const arg=k=>{const n=argv.indexOf(k);return n===-1?null:argv[n+1];};
 const output=outsideRepo(arg('--output'),'output');
 const source=arg('--input'),data=source?JSON.parse(await readFile(outsideRepo(source,'input'),'utf8')):null;
 const html=renderScorecard(data);
 await mkdir(dirname(output),{recursive:true,mode:0o700});
 await writeFile(output,html,{encoding:'utf8',mode:0o600});
 console.log('Private local scorecard written. Status: '+(source?'user-supplied aggregates':'NOT VERIFIED'));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)run().catch(e=>{console.error(e.message);process.exitCode=1;});
