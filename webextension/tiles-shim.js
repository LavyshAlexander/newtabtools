/* exported Tiles, Blocked, Background */
/* globals chrome */
var Tiles = {
	_list: [],
	isPinned: function(url) {
		return this._list.includes(url);
	},
	getAllTiles: function() {
		return new Promise(resolve => {
			chrome.runtime.sendMessage({ name: 'Tiles.getAllTiles' }, ({ tiles, list }) => {
				this._list = list;
				resolve(tiles);
			});
		});
	},
	putTile: function(tile) {
		this._list.push(tile.url);
		return chrome.runtime.sendMessage({ name: 'Tiles.putTile', tile });
	},
	removeTile: function(tile) {
		let index = this._list.indexOf(tile.url);
		if (index > -1) {
			this._list.splice(index, 1);
		}
		return chrome.runtime.sendMessage({ name: 'Tiles.removeTile', tile });
	}
};

var Background = {
	getBackground: function() {
		return new Promise(resolve => {
			chrome.runtime.sendMessage({ name: 'Background.getBackground' }, resolve);
		});
	},
	setBackground: function(file) {
		return chrome.runtime.sendMessage({ name: 'Background.setBackground', file });
	},
};
