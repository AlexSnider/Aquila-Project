import { Types } from "mongoose";
import puppeteer from "puppeteer";

interface Sensor {
  _id: Types.ObjectId;
  sensor_name: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

interface SensorGroup {
  _id: Types.ObjectId;
  sensor_group_name: string;
  sensors: Sensor[];
}

interface SensorDocument {
  _id: Types.ObjectId;
  user_id: string;
  sensor_groups: SensorGroup[];
  createdAt: Date;
  updatedAt: Date;
}

function generateSensorTable(group: SensorGroup): string {
  const rows = group.sensors
    .map(
      (sensor) => `
    <tr>
      <td>${sensor.sensor_name}</td>
      <td>${sensor.location.coordinates[1]}</td>
      <td>${sensor.location.coordinates[0]}</td>
    </tr>
  `
    )
    .join("");

  return `
    <div class="group">
      <div class="group-title">Grupo: ${group.sensor_group_name}</div>
      <table>
        <thead>
          <tr>
            <th>Nome do Sensor</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

export async function generateSensorsReport(
  sensorDocs: SensorDocument[]
): Promise<Buffer> {
  const { user_id, sensor_groups } = sensorDocs[0];
  const totalGrupos = sensor_groups.length;
  const totalSensores = sensor_groups.reduce(
    (sum, g) => sum + g.sensors.length,
    0
  );
  const dataAtual = new Date().toLocaleString("pt-BR");

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; background: #f9f9f9; color: #333; }
          h1, h2, h3 { text-align: center; color: #1a237e; }
          .summary { text-align: center; margin-bottom: 30px; }
          .group { margin: 20px 0; border: 1px solid #ddd; border-radius: 8px; background: #fff; padding: 20px; }
          .group-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #0d47a1; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; }
          th { background: #e3f2fd; color: #0d47a1; }
          .footer { text-align: center; font-size: 12px; margin-top: 40px; color: #777; }
        </style>
      </head>
      <body>
        <h1>Relatório de Sensores</h1>
        <div class="summary">
          <p><strong>Usuário:</strong> ${user_id}</p>
          <p><strong>Total de Grupos:</strong> ${totalGrupos}</p>
          <p><strong>Total de Sensores:</strong> ${totalSensores}</p>
        </div>
        ${sensor_groups.map(generateSensorTable).join("")}
        <div class="footer">Relatório gerado automaticamente - ${dataAtual}</div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  return Buffer.from(pdf);
}
