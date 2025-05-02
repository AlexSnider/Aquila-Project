export function validateSensorStructure(sensor: any) {
    expect(sensor).toHaveProperty("sensor_name", expect.any(String));
    expect(sensor).toHaveProperty("user_id", expect.any(String));
    expect(sensor).toHaveProperty("location");
    expect(sensor.location).toHaveProperty("coordinates", expect.any(Array));
}