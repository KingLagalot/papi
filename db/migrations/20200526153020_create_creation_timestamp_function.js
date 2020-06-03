
const ON_CREATION_TIMESTAMP_FUNCTION = `
CREATE OR REPLACE FUNCTION on_creation_timestamp()
RETURNS trigger AS $$
BEGIN
    NEW.created_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
`;

const DROP_ON_CREATION_TIMESTAMP_FUNCTION = 'DROP FUNCTION on_creation_timestamp';

exports.up = (knex) => knex.raw(ON_CREATION_TIMESTAMP_FUNCTION);
exports.down = (knex) => knex.raw(DROP_ON_CREATION_TIMESTAMP_FUNCTION);
