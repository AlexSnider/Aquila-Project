# Route to create a new sensor group with sensors for a user
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
 *             $ref: '#/components/schemas/NewSensorRequest'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to retrieve all sensor groups and their sensors
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
 *               $ref: '#/components/schemas/SensorResponseWithId'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to retrieve all sensor groups and sensors for a specific user by user ID
/**
 * @swagger
 * /api/v1/sensors/user-id/{id}:
 *   get:
 *     tags:
 *       - Sensors Find
 *     summary: Get User Sensors Route
 *     description: Returns user sensors.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorResponseWithId'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to retrieve a specific sensor group by user ID and group ID
/**
 * @swagger
 * /api/v1/sensors/user-id/{user_id}/group-id/{_id}:
 *   get:
 *     tags:
 *       - Sensors Find
 *     summary: Get Sensor Group By User ID Route
 *     description: Returns a specific sensor group by user ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/SensorGroupId'
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
 *                     $ref: '#/components/schemas/SensorGroup'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to retrieve a specific sensor by user ID and sensor ID
/**
 * @swagger
 * /api/v1/sensors/user-id/{user_id}/sensor-id/{_id}:
 *   get:
 *     tags:
 *       - Sensors Find
 *     summary: Get Sensor By User ID and Sensor ID Route
 *     description: Returns a specific sensor by user ID and sensor ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/SensorId'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to delete all sensor groups and sensors for a specific user by user ID
/**
 * @swagger
 * /api/v1/sensors/delete/user-id/{user_id}:
 *   delete:
 *     tags:
 *       - Sensors Delete
 *     summary: Delete All Sensors By User ID Route
 *     description: Deletes all sensors by user ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to delete a specific sensor group by user ID and group ID
/**
 * @swagger
 * /api/v1/sensors/delete/user-id/{user_id}/group-id/{_id}:
 *   delete:
 *     tags:
 *       - Sensors Delete
 *     summary: Delete Sensor By User ID and Group ID Route
 *     description: Deletes a specific sensor by user ID and group ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/SensorGroupId'
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to delete a specific sensor by user ID and sensor ID
/**
 * @swagger
 * /api/v1/sensors/delete/user-id/{user_id}/sensor-id/{_id}:
 *   delete:
 *     tags:
 *       - Sensors Delete
 *     summary: Delete Sensor By User ID and Sensor ID Route
 *     description: Deletes a specific sensor by user ID and sensor ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/SensorId'
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to update the name of a specific sensor group by user ID and group ID
/**
 * @swagger
 * /api/v1/sensors/update/user-id/{user_id}/group-id/{_id}:
 *   patch:
 *     tags:
 *       - Sensors Update
 *     summary: Update Sensor Group Name By User ID and Group ID Route
 *     description: Updates a specific sensor group name by user ID and group ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/SensorGroupId'
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
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to update the data of a specific sensor by user ID and sensor ID
/**
 * @swagger
 * /api/v1/sensors/update/user-id/{user_id}/sensor-id/{_id}:
 *   patch:
 *     tags:
 *       - Sensors Update
 *     summary: Update Sensor Data By User ID and Sensor ID Route
 *     description: Updates a specific sensor data by user ID and sensor ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/SensorId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSensorRequest'
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to insert a new sensor group for a specific user by user ID
/**
 * @swagger
 * /api/v1/sensors/insert-group/user-id/{user_id}:
 *   put:
 *     tags:
 *       - Sensors Update
 *     summary: Insert Sensor Group By User ID Route
 *     description: Inserts a new sensor group by user ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
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
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to insert a new sensor into a specific sensor group by user ID and group ID
/**
 * @swagger
 * /api/v1/sensors/insert-sensor/user-id/{user_id}/group-id/{_id}:
 *   put:
 *     tags:
 *       - Sensors Update

 *     summary: Insert Sensor By User ID and Group ID Route
 *     description: Inserts a new sensor by user ID and group ID.
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *       - $ref: '#/components/parameters/SensorGroupId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertSensorRequest'
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

# Route to generate and retrieve a PDF report of sensors for a specific user by user ID
/**
 * @swagger
 * /api/v1/sensors/reports/user-id/{user_id}:
 *   get:
 *     tags:
 *       - Sensors Reports
 *     summary: Get By User ID and Generate Reports in PDF Route
 *     description: Retrieves sensor reports by user ID. **THIS ROUTE SHOULD BE USED OUTSIDE SWAGGER UI TO GENERATE REPORTS IN PDF.**
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GeoPoint:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [Point]
 *           example: Point
 *         coordinates:
 *           type: array
 *           minItems: 2
 *           maxItems: 2
 *           items:
 *             type: number
 *           example: [24.234, -23.5505]
 *     Sensor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf17
 *         sensor_name:
 *           type: string
 *           example: Sensor 1A
 *         location:
 *           $ref: '#/components/schemas/GeoPoint'
 *     SensorGroup:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 67ee91ba8bc970074b54cf16
 *         sensor_group_name:
 *           type: string
 *           example: Grupo 1
 *         sensors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Sensor'
 *     NewSensorRequest:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         sensor_groups:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               sensor_group_name:
 *                 type: string
 *                 example: Group 01
 *               sensors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sensor_name:
 *                       type: string
 *                       example: Sensor 01
 *                     location:
 *                       $ref: '#/components/schemas/GeoPoint'
 *     SensorResponse:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         sensor_groups:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               sensor_group_name:
 *                 type: string
 *                 example: Group 01
 *               sensors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sensor_name:
 *                       type: string
 *                       example: Sensor 01
 *                     location:
 *                       $ref: '#/components/schemas/GeoPoint'
 *     SensorResponseWithId:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 67e2ec5b298a85fb67f78f06
 *         user_id:
 *           type: string
 *           example: f47ac10b-58cc-4372-a567-0e02b2c3d476
 *         sensor_groups:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SensorGroup'
 *     UpdateSensorRequest:
 *       type: object
 *       properties:
 *         sensor_name:
 *           type: string
 *           example: edited sensor name
 *         location:
 *           $ref: '#/components/schemas/GeoPoint'
 *     InsertSensorRequest:
 *       type: object
 *       properties:
 *         sensor_name:
 *           type: string
 *           example: nov2134213
 *         coordinates:
 *           $ref: '#/components/schemas/GeoPoint'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Error message
 *   parameters:
 *     UserId:
 *       in: path
 *       name: user_id
 *       required: true
 *       schema:
 *         type: string
 *         example: 123e4567-e89b-12d3-a456-426655440000
 *       description: User ID
 *     SensorGroupId:
 *       in: path
 *       name: _id
 *       required: true
 *       schema:
 *         type: string
 *         example: 67ee91ba8bc970074b54cf16
 *       description: Sensor Group ID
 *     SensorId:
 *       in: path
 *       name: _id
 *       required: true
 *       schema:
 *         type: string
 *         example: 67ee91ba8bc970074b54cf17
 *       description: Sensor ID
 */
