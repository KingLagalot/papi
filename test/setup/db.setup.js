const { exec } = require("child_process");
const fs = require('fs');
/**
 * Sets up test database, runs asll migrations up.
 */
before(async () => {  
    await new Promise((resolve, reject) => exec("./node_modules/knex/bin/cli.js migrate:latest", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            process.exit(1);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            process.exit(1);
        }
        console.log(`stdout: ${stdout}`);
        resolve();
    }));

    });
/**
 * Shuts down test database, runs all migrations down.
 */
after(async () => {  
    await new Promise((resolve, reject) => exec("./node_modules/knex/bin/cli.js migrate:rollback --all", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            process.exit(1);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            process.exit(1);
        }
        console.log(`stdout: ${stdout}`);
        resolve();
    }));
    try{
        fs.unlinkSync(`${__dirname}/../test_db.sqlite`)
    }catch(err){
        console.error(err);
    }
});