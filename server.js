import http from 'node:http';

const port=Number(process.env.PORT||3000);
const target='https://mnk-tech.onrender.com';

const server=http.createServer((req,res)=>{
  const path=req.url||'/';
  res.writeHead(308,{
    location:`${target}${path}`,
    'cache-control':'public, max-age=300',
    'x-content-type-options':'nosniff',
    'referrer-policy':'strict-origin-when-cross-origin'
  });
  res.end();
});

server.listen(port,'0.0.0.0',()=>console.log(`Redirecting legacy MNK URL to ${target}`));
