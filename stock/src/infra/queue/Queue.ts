export default interface Queue {
	connect (): Promise<void>;
	close (): Promise<void>;
	on (exchangeName: string, queueName: string, callback: Function): Promise<void>;
	publish (exchangeName: string, data: any): Promise<void>;
}
