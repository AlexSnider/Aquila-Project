import supertest from "supertest";
import app from "../../../src/app";

const supertestServer = supertest(app);

export async function postSensor(sensor: any) {
    return await supertestServer.post("/sensors").send(sensor);
}

export async function getSensorById(sensorId: string) {
    return await supertestServer.get(`/sensors/${sensorId}`);
}

export async function getAllSensors() {
    return await supertestServer.get("/sensors");
}

export async function updateSensor(sensorId: string, data: any) {
    return await supertestServer.patch(`/sensors/update/${sensorId}`).send(data);
}

export async function deleteSensor(sensorId: string) {
    return await supertestServer.delete(`/sensors/delete/${sensorId}`);
}