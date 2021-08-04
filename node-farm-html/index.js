const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceCard = require('./modules/replaceCard');

// Blocking synchronous way
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);
// const textOutput = `This is all what I know about avocado: ${textInput}.\nCreated at ${Date.now()}`;
// fs.writeFileSync('txt/output.txt', textOutput);

// NON-Blocking asynchronous way
// const textInput = fs.readFile(`${__dirname}/txt/start.txt`, 'utf-8', (err, text) => {
// 	if (err) return console.error(err);
// 	fs.readFile(`${__dirname}/txt/${text}.txt`, 'utf-8', (err2, text2) => {
// 		if (err2) return console.error(err2);
// 		fs.readFile(`${__dirname}/txt/append.txt`, 'utf-8', (err3, text3) => {
// 			if (err3) return console.error(err3);
// 			fs.writeFileSync(`${__dirname}/txt/final.txt`, `${text2} \n${text3}`);
// 		});
// 	});
// });

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataArr = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempProductCard = fs.readFileSync(`${__dirname}/templates/product-card.html`, 'utf-8');

const port = process.env.PORT || 8000;
const server = http
	.createServer((req, res) => {
		const {
			query: { id: queryId },
			pathname,
		} = url.parse(req.url, true);
		if (pathname === '/' || pathname === '/overview') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			const cardsHtml = dataArr.map((card) => replaceCard(tempProductCard, card)).join('');
			const output = tempOverview.replace(/{%product_cards%}/g, cardsHtml);
			res.end(output);
		} else if (pathname === '/product/') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			const productHtml = replaceCard(tempProduct, dataArr[+queryId]);
			res.end(productHtml);
		} else if (pathname === `/api`) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(data);
		} else {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end(
				'<h2 style="text-align: center; margin: 50px 0; font-size: 40px; font-family:sans-serif;">404 Oops! Page not found</h2>'
			);
		}
	})
	.listen(port, () => console.log(`listening on port  ${port}`));
