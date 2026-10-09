import { readFile } from 'node:fs/promises';

const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const css=await readFile(new URL('./styles.css',import.meta.url),'utf8');
const robots=await readFile(new URL('./robots.txt',import.meta.url),'utf8');
const sitemap=await readFile(new URL('./sitemap.xml',import.meta.url),'utf8');
const logo=await readFile(new URL('./mnk-logo.png',import.meta.url));
const portfolio=JSON.parse(await readFile(new URL('./company.json',import.meta.url),'utf8'));

const OFFICIAL_URL='https://mnktechindia.onrender.com/';
const OFFICIAL_HOST='mnktechindia.onrender.com';
const {company,products}=portfolio;
if(company?.name!=='MNK Technologies')throw new Error('Unexpected company name in company.json');
if(company?.legal_form!=='Udyam-registered MSME sole proprietorship')throw new Error('Unexpected company legal form in company.json');
if(company?.official_designation!=='Proprietor')throw new Error('Unexpected official company designation in company.json');
if(company?.official_url!==OFFICIAL_URL)throw new Error(`Unexpected official company URL in company.json: ${company?.official_url}`);
if(!Array.isArray(products)||products.length!==3)throw new Error('Official MNK Technologies portfolio must contain exactly three current products');

const descriptions=[...html.matchAll(/<meta (?:name|property)="(?:description|og:description|twitter:description)" content="([^"]*)"/g)].map(match=>match[1]);
if(descriptions.length!==3)throw new Error(`Expected three synchronized search/social descriptions, found ${descriptions.length}`);
if(descriptions.some(description=>description.length<25||description.length>160))throw new Error(`Meta descriptions must be 25–160 characters: ${descriptions.map(description=>description.length).join(', ')}`);
if(new Set(descriptions).size!==1)throw new Error('Search, Open Graph, and Twitter descriptions must match');

const required=[company.name,'Public Online Service Provider','https://pospindia.onrender.com','FileWeave','https://fileweaveonline.vercel.app','Max',company.legal_form,company.official_designation,company.official_url,'h2xCzca3X9ymEzki4UvgyHf5LBSszj1hsDbXAJmTD3Q'];
for(const value of required){if(!html.includes(value))throw new Error(`Missing required content: ${value}`)}

const statusLabels={live:'Live',testing:'Testing',in_development:'In development',paused:'Paused',retired:'Retired'};
for(const product of products){
  if(!product.name||!product.status)throw new Error('Every official product needs a name and status');
  if(!html.includes(product.name))throw new Error(`Public website is missing official product: ${product.name}`);
  if(product.url&&!html.includes(product.url))throw new Error(`Public website is missing official product URL: ${product.url}`);
  const expectedStatus=statusLabels[product.status];
  if(!expectedStatus)throw new Error(`Unknown product status in company.json: ${product.status}`);
  const heading=`<h3>${product.name}</h3>`;
  const headingIndex=html.indexOf(heading);
  if(headingIndex<0)throw new Error(`Public website is missing product card heading: ${product.name}`);
  const cardStart=html.lastIndexOf('<article class="product-card',headingIndex);
  const cardEnd=html.indexOf('</article>',headingIndex);
  const card=html.slice(cardStart,cardEnd);
  if(!card.includes(`>${expectedStatus}</span>`))throw new Error(`Public website status for ${product.name} does not match company.json (${expectedStatus})`);
}

const productCardCount=(html.match(/class="product-card(?:\s|\")/g)||[]).length;
if(productCardCount!==products.length)throw new Error(`Public website product-card count (${productCardCount}) does not match official portfolio (${products.length})`);
if(html.includes('MNK Technologies Pvt. Ltd.')||html.includes('MNK Technologies Limited'))throw new Error('Incorrect incorporated-company wording found');
if(!robots.includes(`${OFFICIAL_URL}sitemap.xml`))throw new Error('robots.txt does not point to the official sitemap');
if(!sitemap.includes(`<loc>${OFFICIAL_URL}</loc>`))throw new Error('sitemap does not use the official hostname');
const retiredHostnames=['mnktech.onrender.com','mnktechnologies.onrender.com','mnk-tech.onrender.com'];
for(const retiredHostname of retiredHostnames){if(html.includes(retiredHostname)||robots.includes(retiredHostname)||sitemap.includes(retiredHostname)||JSON.stringify(portfolio).includes(retiredHostname))throw new Error(`Retired hostname remains in public website files: ${retiredHostname}`)}
const retiredFileWeaveHostnames=['file-weave.vercel.app','fileweave-mnk.vercel.app','fileweave.vercel.app'];
const portfolioText=JSON.stringify(portfolio);
for(const host of retiredFileWeaveHostnames){if(html.includes(host)||portfolioText.includes(host))throw new Error(`Retired FileWeave hostname remains in MNK portfolio: ${host}`)}
if(!css.includes('@media(max-width:680px)'))throw new Error('Mobile layout rule missing');
if(logo.length<1000)throw new Error('MNK Technologies logo asset is missing or unexpectedly small');
if(!html.includes('src="/mnk-logo.png"'))throw new Error('Header does not use the MNK Technologies logo asset');
if(!html.includes(`${OFFICIAL_URL}mnk-logo.png`))throw new Error('Social/structured metadata does not reference the MNK Technologies logo');
console.log(`MNK Technologies company and website verification passed for ${OFFICIAL_HOST}`);
