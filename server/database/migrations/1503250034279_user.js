

const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('firstname', 80).notNullable();
      table.string('lastname', 80).notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('networkid', 254).notNullable().unique();
      table.string('participantid', 254).notNullable();
      table.string('mmda', 254);
      table.string('role', 254);
      table.string('password', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
