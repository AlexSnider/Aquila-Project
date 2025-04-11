// POST /api/v1/sensors/new-sensor
/**
 * @swagger
 * /api/v1/sensors/new-sensor:
 *   post:
 *     tags:
 *       - Sensors Register
 *     summary: Create Sensor Route
 *     description: Creates a new sensor group with sensors.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user who owns the sensor.
 *                 example: 123e4567-e89b-12d3-a456-426655440000
 *               sensor_groups:
 *                 type: array
 *                 description: List of sensor groups.
 *                 items:
 *                   type: object
 *                   properties:
 *                     sensor_group_name:
 *                       type: string
 *                       description: Name of the sensor group.
 *                       example: Group 01
 *                     sensors:
 *                       type: array
 *                       description: List of sensors in the group.
 *                       items:
 *                         type: object
 *                         properties:
 *                           sensor_name:
 *                             type: string
 *                             description: Name of the sensor.
 *                             example: Sensor 01
 *                           location:
 *                             type: object
 *                             description: Geographical location of the sensor.
 *                             properties:
 *                               type:
 *                                 type: string
 *                                 example: Point
 *                               coordinates:
 *                                 type: array
 *                                 items:
 *                                   type: number
 *                                 example: [-12.3456, -49.6789]
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: 123e4567-e89b-12d3-a456-426655440000
 *                 sensor_groups:
 *                   type: array
 *                   example:
 *                     - sensor_group_name: Group 01
 *                       sensors:
 *                         - sensor_name: Sensor 01
 *                           location:
 *                             type: Point
 *                             coordinates: [-12.3456, -49.6789]
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid data provided
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor collection already exists
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

// GET /api/v1/sensors/all
/**
 * @swagger
 * /api/v1/sensors/all:
 *   get:
 *     tags:
 *       - Sensors Find
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
 *                 _id:
 *                   type: string
 *                   example: "67e2ec5b298a85fb67f78f06"
 *                 user_id:
 *                   type: string
 *                   example: "f47ac10b-58cc-4372-a567-0e02b2c3d476"
 *                 sensor_groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67e2ec5b298a85fb67f78f07"
 *                       sensor_group_name:
 *                         type: string
 *                         example: "Grupo 1"
 *                       sensors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "67e2ec5b298a85fb67f78f08"
 *                             sensor_name:
 *                               type: string
 *                               example: "Sensor 1A"
 *                             location:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                   example: "Point"
 *                                 coordinates:
 *                                   type: array
 *                                   items:
 *                                     type: number
 *                                   example: [24.234, -23.5505]
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No sensors collections found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// GET /api/v1/sensors/user-id/{id}
/**
 * @swagger
 * /api/v1/sensors/user-id/{id}:
 *   get:
 *     tags:
 *       - Sensors Find
 *     summary: Get User Sensors Route
 *     description: Returns user sensors.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *                   example: "67e2ec5b298a85fb67f78f06"
 *                 user_id:
 *                   type: string
 *                   example: "f47ac10b-58cc-4372-a567-0e02b2c3d476"
 *                 sensor_groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67e2ec5b298a85fb67f78f07"
 *                       sensor_group_name:
 *                         type: string
 *                         example: "Grupo 1"
 *                       sensors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "67e2ec5b298a85fb67f78f08"
 *                             sensor_name:
 *                               type: string
 *                               example: "Sensor 1A"
 *                             location:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                   example: "Point"
 *                                 coordinates:
 *                                   type: array
 *                                   items:
 *                                     type: number
 *                                   example: [24.234, -23.5505]
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No sensors collections found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// GET /api/v1/sensors/user-id/{user_id}/group-id/{_id}
/**
 * @swagger
 * /api/v1/sensors/user-id/{user_id}/group-id/{_id}:
 *   get:
 *     tags:
 *       - Sensors Find
 *     summary: Get Sensor Group By User ID Route
 *     description: Returns a specific sensor group by user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf16
 *         description: Sensor Group ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sensor_groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 67ee91ba8bc970074b54cf16
 *                       sensor_group_name:
 *                         type: string
 *                         example: Grupo 1
 *                       sensors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: 67ee91ba8bc970074b54cf17
 *                             sensor_name:
 *                               type: string
 *                               example: Sensor 1A
 *                             location:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                   example: Point
 *                                 coordinates:
 *                                   type: array
 *                                   items:
 *                                     type: number
 *                                   example: [24.234, -23.5505]
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User or sensor group not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// GET /api/v1/sensors/user-id/{user_id}/sensor-id/{_id}
/**
 * @swagger
 * /api/v1/sensors/user-id/{user_id}/sensor-id/{_id}:
 *   get:
 *     tags:
 *       - Sensors Find
 *     summary: Get Sensor By User ID and Sensor ID Route
 *     description: Returns a specific sensor by user ID and sensor ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf17
 *         description: Sensor ID
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
 *                   example: 67ee91ba8bc970074b54cf17
 *                 sensor_name:
 *                   type: string
 *                   example: Sensor 1A
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
 *                       example: [24.234, -23.5505]
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User or sensor not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// DELETE /api/v1/sensors/delete/user-id/{user_id}
/**
 * @swagger
 * /api/v1/sensors/delete/user-id/{user_id}:
 *   delete:
 *     tags:
 *       - Sensors Delete
 *     summary: Delete All Sensors By User ID Route
 *     description: Deletes all sensors by user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
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
 *                   example: Sensors collection not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// DELETE /api/v1/sensors/delete/user-id/{user_id}/group-id/{_id}
/**
 * @swagger
 * /api/v1/sensors/delete/user-id/{user_id}/group-id/{_id}:
 *   delete:
 *     tags:
 *       - Sensors Delete
 *     summary: Delete Sensor By User ID and Group ID Route
 *     description: Deletes a specific sensor by user ID and group ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf17
 *         description: Sensor Group ID
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
 *                   example: User or sensor group not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// DELETE /api/v1/sensors/delete/user-id/{user_id}/sensor-id/{_id}
/**
 * @swagger
 * /api/v1/sensors/delete/user-id/{user_id}/sensor-id/{_id}:
 *   delete:
 *     tags:
 *       - Sensors Delete
 *     summary: Delete Sensor By User ID and Sensor ID Route
 *     description: Deletes a specific sensor by user ID and sensor ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf17
 *         description: Sensor ID
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
 *                   example: User or sensor not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// PATCH /api/v1/sensors/update/user-id/{user_id}/group-id/{_id}
/**
 * @swagger
 * /api/v1/sensors/update/user-id/{user_id}/group-id/{_id}:
 *   patch:
 *     tags:
 *       - Sensors Update
 *     summary: Update Sensor Group Name By User ID and Group ID Route
 *     description: Updates a specific sensor group name by user ID and group ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf17
 *         description: Sensor Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensor_group_name:
 *                 type: string
 *                 description: Name of the sensor group.
 *                 example: Group 01
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
 *                   example: User or sensor group not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// PATCH /api/v1/sensors/update/user-id/{user_id}/sensor-id/{_id}
/**
 * @swagger
 * /api/v1/sensors/update/user-id/{user_id}/sensor-id/{_id}:
 *   patch:
 *     tags:
 *       - Sensors Update
 *     summary: Update Sensor Data By User ID and Sensor ID Route
 *     description: Updates a specific sensor data by user ID and sensor ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf17
 *         description: Sensor ID
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
 *                 example: edited sensor name
 *               location:
 *                 type: object
 *                 description: GeoJSON location object.
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [Point]
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     minItems: 2
 *                     maxItems: 2
 *                     items:
 *                       type: number
 *                     example: [23, -43.55]
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
 *                   example: User or sensor not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The server has encountered an error
 */

// PUT /api/v1/sensors/insert-group/user-id/{user_id}
/**
 * @swagger
 * /api/v1/sensors/insert-group/user-id/{user_id}:
 *   put:
 *     tags:
 *       - Sensors Update
 *     summary: Insert Sensor Group By User ID Route
 *     description: Inserts a new sensor group by user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensor_group_name:
 *                 type: string
 *                 description: Name of the sensor group.
 *                 example: Group 01
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
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server has encountered an error"
 */

// PUT /api/v1/sensors/insert-sensor/user-id/{user_id}/group-id/{_id}
/**
 * @swagger
 * /api/v1/sensors/insert-sensor/user-id/{user_id}/group-id/{_id}:
 *   put:
 *     tags:
 *       - Sensors Update
 *     summary: Insert Sensor By User ID and Group ID Route
 *     description: Inserts a new sensor by user ID and group ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         description: User ID
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf17
 *         description: Sensor Group ID
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
 *                 example: nov2134213
 *               coordinates:
 *                 type: object
 *                 description: GeoJSON Point object representing the sensor location.
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [Point]
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     minItems: 2
 *                     maxItems: 2
 *                     items:
 *                       type: number
 *                     example: [45, -43.5505]
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
 *                   example: User or sensor group not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The server has encountered an error
 */
