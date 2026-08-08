import { Modding } from "@flamework/core";
import type { SerializerMetadata } from "./metadata";
import { createConfiguredFBS, Serializer } from "./createConfiguredFBS";

const DEFAULT_FBS = createConfiguredFBS<{}>({});

/**
 * Creates a binary serializer automatically from a given type.
 *
 * This generates the {@link SerializerMetadata} type,
 * which you can reuse in your own user macros to generate arbitrary serializers (e.g for a networking library.)
 *
 * Disclaimer: this serializer depends on the order of emit, but this isn't guaranteed to be stable across compiles.
 * This means two binary serializers for the type `T` may be incompatible,
 * if they're not created within the same TS file (and thereof might not be compiled at the same time.)
 *
 * @metadata macro
 */
export function createBinarySerializer<T>(meta?: Modding.Many<SerializerMetadata<T>>): Serializer<T> {
	return DEFAULT_FBS.createBinarySerializer(meta as never);
}
