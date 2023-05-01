export type ItemUrl = {
	country: string;
	city: string;
};

export type ItemData = {
	name: string;
	country: string;
	population: { year: string; value: number };
	artist: string;
	license: {
		value: string;
		url: string;
	};
	image: [string];
};

export type ItemDataWithPosition = {
	position: 'left' | 'right';
} & ItemData;

export type GameState = {
	cardPile: ItemUrl[];
	game?: {
		cards: ItemDataWithPosition[];
		score: number;
	};
};
