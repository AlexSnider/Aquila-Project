export const baseSensor = {
    sensor_name: "ValidSensor",
    user_id: "123e4567-e89b-12d3-a456-426614174000",
    location: { type: "Point", coordinates: [10.1234, 20.5678] },
};

export function createInvalidSensor(type: "missingField" | "invalidName" | "blankField" | "invalidCoordinates" | "invalidGUID") {
    const invalidSensors: Record<string, Partial<typeof baseSensor>> = {
        missingField: (() => {
            const { sensor_name, ...sensor } = baseSensor;
            return sensor;
        })(),
        invalidName: { ...baseSensor, sensor_name: 12345 as any },
        blankField: { ...baseSensor, sensor_name: "" },
        invalidCoordinates: { ...baseSensor, location: { type: "Point", coordinates: [10.1234] } },
        invalidGUID: { ...baseSensor, user_id: "invalid-uuid" },
    };

    return invalidSensors[type] || baseSensor;
}

export function createSensor(type: "ExistingSensor" | "NewSensor") {
    const validSensors: Record<string, Partial<typeof baseSensor>> = {
        ExistingSensor: { ...baseSensor, sensor_name: "ExistingSensor" },
        NewSensor: { ...baseSensor, sensor_name: "NewSensor" },
    };

    return validSensors[type] || baseSensor;
}