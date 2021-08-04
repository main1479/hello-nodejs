const replaceCard = (temp, product) => {
	const { id, productName, image, from, nutrients, price, organic, description, quantity } =
		product;
	let output = temp.replace(/{%product_name%}/g, productName);
	output = output.replace(/{%product_image%}/g, image);
	output = output.replace(/{%product_from%}/g, from);
	output = output.replace(/{%product_nutrients%}/g, nutrients);
	output = output.replace(/{%product_price%}/g, price);
	output = output.replace(/{%product_quantity%}/g, quantity);
	output = output.replace(/{%product_description%}/g, description);
	output = output.replace(/{%product_id%}/g, id);

	if (!organic) output = output.replace(/{%product_organic%}/g, 'not-organic');

	return output;
};

module.exports = replaceCard;
