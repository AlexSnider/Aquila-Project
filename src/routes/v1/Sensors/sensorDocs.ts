/**
 * @swagger
 * /sensors:
 *   post:
 *     tags:
 *       - Sensors
 *     summary: Create Sensor Route
 *     description: Creates a new sensor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensor_name:
 *                 type: string
 *                 description: Name of the sensor.
 *                 example: TestSensor
 *               user_id:
 *                 type: string
 *                 description: ID of the user who owns the sensor.
 *                 example: 123e4567-e89b-12d3-a456-426655440000
 *               location:
 *                 type: object
 *                 description: Geographical location of the sensor.
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [10.0, 20.0]
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sensor_name:
 *                   type: string
 *                   example: TestSensor
 *                 user_id:
 *                   type: string
 *                   example: 123e4567-e89b-12d3-a456-426655440000
 *                 location:
 *                   type: object
 *                   example: {"type": "Point", "coordinates": [10.0, 20.0]}
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor already exists / Invalid data provided
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /sensors:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Get All Sensors Route
 *     description: Returns all sensors.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sensors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 673a22605a7643fd5d5fca37
 *                       sensor_name:
 *                         type: string
 *                         example: NomedoSensor3
 *                       user_id:
 *                         type: string
 *                         example: 123e4567-e89b-12d3-a456-426614174000
 *                       location:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                             example: [-12.34, -45.43]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-11-17T17:05:36.206Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-11-17T17:05:36.206Z
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Get Sensor By ID Route
 *     description: Returns a sensor by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6740d0bda47ba6d8d25d67b0
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6740d0bda47ba6d8d25d67b0
 *                 sensor_name:
 *                   type: string
 *                   example: Sensor1
 *                 user_id:
 *                   type: string
 *                   example: 123e4567-e89b-12d3-a456-426655440000
 *                 location:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: Point
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: number
 *                       example: [-12.34, -45.43]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-11-17T17:05:36.206Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-11-17T17:05:36.206Z
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /sensors/users-sensors/{id}:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Get All Sensors By User ID Route
 *     description: Returns all sensors by user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sensors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6740d0bda47ba6d8d25d67b0
 *                       sensor_name:
 *                         type: string
 *                         example: NomedoSensor3
 *                       user_id:
 *                         type: string
 *                         example: 123e4567-e89b-12d3-a456-426655440000
 *                       location:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                             example: [-12.34, -45.43]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-11-17T17:05:36.206Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-11-17T17:05:36.206Z
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /sensors/update/{id}:
 *   patch:
 *     tags:
 *       - Sensors
 *     summary: Update Sensor Route
 *     description: Updates a sensor by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6740d0bda47ba6d8d25d67b0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensor_name:
 *                 type: string
 *                 description: Name of the sensor.
 *                 example: Sensor1
 *               location:
 *                 type: object
 *                 description: Geographical location of the sensor.
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [-12.34, -45.43]
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /sensors/delete/{id}:
 *   delete:
 *     tags:
 *       - Sensors
 *     summary: Delete Sensor Route
 *     description: Deletes a sensor by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6740d0bda47ba6d8d25d67b0
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor not found
 *       500:
 *         description: Internal Server Error
 */
