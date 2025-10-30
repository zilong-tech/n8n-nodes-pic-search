import { NodeConnectionTypes, type INodeExecutionData, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class PicSearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pic Search', // 节点名称
		name: 'picSearch',
		icon: { light: 'file:picSearch.svg', dark: 'file:picSearch.dark.svg' }, // 节点图标
		group: ['transform'],
		version: 1,
		description: 'Search images using the Pic Search API',
		defaults: {
			name: 'Pic Search',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main], // 输入连接类型
		outputs: [NodeConnectionTypes.Main], // 输出连接类型
		credentials: [{ name: 'picSearchApi', required: true }],
		requestDefaults: {
			baseURL: 'https://cn.apihz.cn/api/img/apihzimgsougou.ph', // 调用的api
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		},
		// 节点属性配置，也就是页面上的字段
		properties: [
				{
					displayName: '操作',
					name: 'operation',
					type: 'options',
					noDataExpression: true,
					options: [
						{
							name: 'Search',
							value: 'search',
							action: 'Search images',
							description: 'Search images by keyword',
							// 路由配置，定义请求的URL和方法
							routing: {
								request: {
									method: 'GET',
									url: '/api/img/apihzimgsougou.php',
								},
							},
						},
					],
					default: 'search',
				},

				{
					displayName: 'ID',
					name: 'id',
					type: 'string',
					default: '88888888',

					description: 'API ID',
					routing: {
						send: {
							type: 'query',
							property: 'id',
						},
					},
				},
				{
					displayName: 'Key',
					name: 'key',
					type: 'string',
					default: '88888888',
		
					description: 'API Key',
					routing: {
						send: {
							type: 'query',
							property: 'key',
						},
					},
				},
				{
					displayName: '页码',
					name: 'page',
					type: 'number',
					default: 1,
			
					description: '搜索结果页码',
					routing: {
						send: {
							type: 'query',
							property: 'page',
						},
					},
				},
				{
					displayName: '关键词',
					name: 'words',
					type: 'string',
					default: '',
					required: true,
	
					description: '搜索关键词',
					routing: {
						send: {
							type: 'query',
							property: 'words',
						},
					},
				},
		
		],
	};

	
	// 节点执行方法
	async execute(this: any): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				// 修复参数获取路径，直接获取顶级参数
				const id = this.getNodeParameter('id', itemIndex) as string;
				const key = this.getNodeParameter('key', itemIndex) as string;
				const page = this.getNodeParameter('page', itemIndex) as number;
				const words = this.getNodeParameter('words', itemIndex) as string;

				console.log('请求参数：', id, key, page, words);
				const queryParameters = {
					"id" : id,
					"key" : key,
					"page" : page,
					"words" : words,
				}
				console.log('请求参数：', queryParameters);

				// 同时修复API URL配置
				const response = await this.helpers.httpRequest({
					url: "https://cn.apihz.cn/api/img/apihzimgsougou.php", 
					method: 'GET',
					qs: queryParameters
				});

				// 确保response是数组格式
				const resultData = Array.isArray(response) ? response : [response];
				
				// 为每个结果创建INodeExecutionData格式的项
				resultData.forEach((item: any) => {
					returnData.push({
						json: item,
					});
				});
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message || 'Unknown error' },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
