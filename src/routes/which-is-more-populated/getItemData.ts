import type { ItemUrl, ItemData } from './gameTypes';

export const getItemData = async (item: ItemUrl) => {
	const request = await fetch(`city-population-api/data/${item.country}/${item.city}.json`);
	const response = (await request.json()) as ItemData;
	return {
		...response,
		population: {
			...response.population,
			value: Math.round(response.population.value)
		},
		country: item.country
	} as ItemData;
};
