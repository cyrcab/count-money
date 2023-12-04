const { execSync } = require('child_process')
const dotenv = require('dotenv')

// Load environment variables from the specified files
dotenv.config({ path: './docker/.env' })
dotenv.config({ path: './packages/backend/.env' })

const COMPOSE_FILE = './docker/docker-compose-test.yml'

function up() {
  execSync(`docker-compose -f ${COMPOSE_FILE} up -d`)
  wait_for_container()
}

function wait_for_container() {
  console.log('Waiting for the container to be ready...')
  let container_ready = false

  while (!container_ready) {
    try {
      execSync(
        `docker exec docker-db-1 mysql -u root -p${process.env.MYSQL_ROOT_PASSWORD} -e 'SELECT 1;' > output.log 2>&1`
      )
      container_ready = true
    } catch (error) {
      // Ignore error and continue waiting
    }
  }
  console.log('Container is ready!')
}

function setup_prisma() {
  up()
  execSync('npm run prisma:push')
}

function run_tests() {
  setup_prisma()
  execSync(`npx lerna run test --scope=backend`)
  execSync(`docker-compose -f ${COMPOSE_FILE} down`)
}

run_tests()
