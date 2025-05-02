/**
 * Validates a successful response.
 * @param result - The response object.
 * @param statusCode - The expected status code.
 */
export function expectSuccessResponse(result: any, statusCode: number) {
    expect(result.statusCode).toBe(statusCode);
    expect(result.body).toBeDefined();
}

/**
 * Validates an error response.
 * @param result - The response object.
 * @param statusCode - The expected status code.
 * @param errorMessage - The expected error message.
 */
export function expectErrorResponse(result: any, statusCode: number, errorMessage: string) {
    expect(result.statusCode).toBe(statusCode);

    const errorField = result.body.errors ?? result.body.message;

    if (!errorField) {
        throw new Error("Response does not contain 'errors' or 'message' fields");
    }

    if (Array.isArray(errorField)) {
        expect(errorField).toContain(errorMessage);
    }
}