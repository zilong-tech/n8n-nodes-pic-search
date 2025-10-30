import type {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PicSearchApi implements ICredentialType {
	name = 'picSearchApi';

	displayName = 'Pic Search API';

	documentationUrl = 'https://github.com/org/-pic-search?tab=readme-ov-file#credentials';

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

	// 移除了test属性，因为我们在导入时已经移除了ICredentialTestRequest类型
}
