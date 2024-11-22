/**
 * @swagger
 * /health-check:
 *   get:
 *     tags:
 *       - Health Check
 *     summary: Health Check Route
 *     description: Returns the status of the application.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   example: 2023-06-22T21:13:19.000Z
 *       500:
 *         description: Internal Server Error
 */
