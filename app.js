const express = require('express');
const sql = require('mssql');

const app = express();

const config = {
    user: 'sa',
    password: 'Open6736',
    server: '190.210.182.24',
    port: 1433,
    database: 'Pisos',
    options: {
        instanceName: 'sqlexpress',
        encrypt: false
    }
};

// Route for /pisos
app.get('/pisos', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`EXEC SP_PresupuestosPendientes -1, '2024-03-01', '2024-03-10'`;
        console.log(result);
        res.json(result); // Sending result as JSON response
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error al ejecutar la consulta');
    } finally {
        sql.close();
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});