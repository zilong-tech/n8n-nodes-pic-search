import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon 
} from 'n8n-workflow';



export class PicSearchApi implements ICredentialType {
	name = 'picSearchApi';

	displayName = 'Pic Search API';

	documentationUrl = 'https://github.com/org/-pic-search?tab=readme-ov-file#credentials';

	icon: Icon = 'file:../icons/image.svg'; // 指向内置的图片图标

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '88888888',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	// 添加test属性
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://cn.apihz.cn/api/img',
			url: '/apihzimgsougou.php',
			method: 'GET',
			qs: {
				id: '88888888',
				key: '={{$credentials.apiKey}}',
				words: 'test',
				page: 1
			}
		}
	};
}
