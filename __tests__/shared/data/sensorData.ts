export const mockSensors = [
    {
        sensor_name: "MockSensor1",
        user_id: "123e4567-e89b-12d3-a456-426614174001",
        location: {
            type: "Point" as const,
            coordinates: [10.1234, 20.5678] as [number, number],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        sensor_name: "MockSensor2",
        user_id: "123e4567-e89b-12d3-a456-426614234002",
        location: {
            type: "Point" as const,
            coordinates: [30.1234, 40.5678] as [number, number],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const mockSensorData = {
    sensor_name: "MockSensor",
    user_id: "123e4567-e89b-12d3-a456-426614174000",
    location: {
        type: "Point" as const,
        coordinates: [10.1234, 20.5678] as [number, number],
    },
};