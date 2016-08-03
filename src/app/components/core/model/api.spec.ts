import { API } from './api';

describe('API', () => {

	it('has title', () => {
		let api: API = new API();
		api.properties = {
			info: {
				title: 'Demo API'
			}
		};

		expect(api.getTitle()).toEqual('Demo API');
	})

});