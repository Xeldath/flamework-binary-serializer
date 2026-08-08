import { Modding } from "@flamework/core";
import { ConfigureFbs, CustomConfig, CustomConfigBasic, CustomConfigToRuntime } from "./metadata/custom";
import { SerializerMetadata } from "./metadata";
import { processSerializerData } from "./processSerializerData";
import { createSerializer } from "./serialization/createSerializer";
import { createDeserializer } from "./serialization/createDeserializer";

/**
 * A binary serializer.
 */
export interface Serializer<T> {
	/**
	 * Serializes the input into a buffer.
	 *
	 * Result includes a blobs array which is used for things that cannot be put into the buffer.
	 * The blobs array can be sent across the network or otherwise stored and passed into the deserialize function.
	 */
	serialize: (value: T) => { buffer: buffer; blobs: defined[] };

	/**
	 * Deserializes the input back into `T`.
	 *
	 * The blobs array can be omitted, but if the buffer contains blob references then deserialization will error.
	 */
	deserialize: (input: buffer, inputBlobs?: defined[]) => T;
}

/**
 * This function creates a configured version of flamework-binary-serializer, such as supporting custom serialization types.
 *
 * @metadata macro
 */
export function createConfiguredFBS<C extends CustomConfig = {}>(config: CustomConfigToRuntime<C>) {
	return {
		/** @metadata macro */
		createBinarySerializer<T>(meta?: Modding.Many<SerializerMetadata<T, C>>): Serializer<T> {
			const processed = processSerializerData(meta as never);
			return {
				serialize: createSerializer(processed, config as CustomConfigBasic),
				deserialize: createDeserializer(processed, config as CustomConfigBasic),
			};
		},
	};
}
