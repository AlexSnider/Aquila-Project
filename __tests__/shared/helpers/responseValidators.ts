export function expectSuccessResponse(result: any, statusCode: number) {
    expect(result.statusCode).toBe(statusCode);
    expect(result.body).toBeDefined();
}

export function expectErrorResponse(result: any, statusCode: number, errorMessage: string) {
    expect(result.statusCode).toBe(statusCode);
    expect(result.body.errors).toContain(errorMessage);
}