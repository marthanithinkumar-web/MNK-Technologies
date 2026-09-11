import { readFile } from 'node:fs/promises';

const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const css=await readFile(new URL('./styles.css',import.meta.url),'utf8');
const robots=await readFile(new URL('./robots.txt',import.meta.url),'utf8');
const sitemap=await readFile(new URL('./sitemap.xml',import.meta.url),'utf8');
const portfolio=JSON.parse(await readFile(new URL('./company.json',import.meta.url),'utf8'));

const {company,products}=portfolio;
if(company?.name!=='MNK Technologies')throw new Error('Unexpected company name in company.json');
if(company?.legal_form!=='Udyam-registered MSME sole proprietorship')throw new Error('Unexpected company legal form in company.json');
if(company?.official_designation!=='Proprietor')throw new Error('Unexpected official company designation in company.json');
if(company?.official_url!=='https://mnktechnologies.onrender.com/')throw new Error('Unexpected official company URL in company.json');
if(!Array.isArray(products)||products.length!==3)throw new Error('Official MNK Technologies portfolio must contain exactly three current products');

const required=[
  company.name,
  'Public Online Service Provider',
  'https://pospindia.onrender.com',
  'FileWeave',
  'https://file-weave.vercel.app',
  'Max',
  company.legal_form,
  company.official_designation,
  company.official_url,
  'h2xCzca3X9ymEzki4UvgyHf5LBSszj1hsDbXAJmTD3Q'
];
for(const value of required){if(!html.includes(value))throw new Error(`Missing required content: ${value}`)}

const statusLabels={
  live:'Live',
  testing:'Testing',
  in_development:'In development',
  paused:'Paused',
  retired:'Retired',
};
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
if(!robots.includes('https://mnktechnologies.onrender.com/sitemap.xml'))throw new Error('robots.txt does not point to the official sitemap');
if(!sitemap.includes('<loc>https://mnktechnologies.onrender.com/</loc>'))throw new Error('sitemap does not use the official hostname');
const retiredHostname=['mnk','technologies.onrender.com'].join('-');
if(html.includes(retiredHostname)||robots.includes(retiredHostname)||sitemap.includes(retiredHostname))throw new Error('Retired hostname remains in public website files');
if(!css.includes('@media(max-width:680px)'))throw new Error('Mobile layout rule missing');
console.log('MNK Technologies company and website verification passed');
