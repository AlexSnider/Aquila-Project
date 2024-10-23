import os from "os";

class ApiHealthCheck {
  async execute(): Promise<any> {
    try {
      const memoryUsage = process.memoryUsage();

      const healthCheck = {
        uptime: this.formatUptime(process.uptime()),
        memoryUsage: this.formatMemoryUsage(memoryUsage),
        nodeVersion: process.version,
        appVersion: process.env.npm_package_version,
        osVersion: os.release(),
        osType: os.type(),
        message: "OK",
        timestamp: new Date().toISOString(),
      };

      return Promise.resolve(healthCheck);
    } catch (error) {
      return Promise.resolve({
        message: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    }
  }

  formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  }

  formatMemoryUsage(memoryUsage: NodeJS.MemoryUsage): any {
    const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2) + " MB";
    return {
      rss: toMB(memoryUsage.rss),
      heapTotal: toMB(memoryUsage.heapTotal),
      heapUsed: toMB(memoryUsage.heapUsed),
      external: toMB(memoryUsage.external),
    };
  }
}

export default new ApiHealthCheck();
