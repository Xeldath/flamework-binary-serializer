interface CustomType {
	matchType: unknown;
	metadataKey?: string;
}

export interface CustomConfig {
	customTypes?: Record<string, CustomType>;
}

type ConvertCustomTypesToRuntime<T extends CustomConfig["customTypes"] & defined> = {
	[k in keyof T]: {
		serialize: (value: T[k]["matchType"], metadata: unknown) => buffer;
		deserialize: (
			buf: buffer,
			currentOffset: number,
			metadata: unknown,
		) => LuaTuple<[value: T[k]["matchType"], length: number]>;
	};
};

export type CustomConfigToRuntime<C extends CustomConfig> = C["customTypes"] extends object
	? {
			customTypes: ConvertCustomTypesToRuntime<C["customTypes"]>;
	  }
	: {};

export type ConfigureFbs<T extends CustomConfig> = T;

export interface CustomConfigBasic {
	customTypes?: Record<
		string,
		{
			serialize: (value: unknown, metadata: unknown) => buffer;
			deserialize: (buf: buffer, currentOffset: number, metadata: unknown) => LuaTuple<[unknown, number]>;
		}
	>;
}
