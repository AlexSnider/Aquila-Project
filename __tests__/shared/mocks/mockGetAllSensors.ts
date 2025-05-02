export const mockGetAllSensors = jest.fn().mockResolvedValue({
    statusCode: 200,
    body: [
        { sensor_name: "MockSensor1", user_id: "123", location: { coordinates: [10, 20] } },
        { sensor_name: "MockSensor2", user_id: "456", location: { coordinates: [30, 40] } },
    ],
});