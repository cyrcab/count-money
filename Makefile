COMPOSE_FILE = ./docker/docker-compose-test.yml
ENV_FILE_DOCKER = ./docker/.env
ENV_FILE = ./packages/backend/.env
CONTAINER_ADDRESS = http://localhost:3306
include $(ENV_FILE_DOCKER)
export


# Cible par défaut
test: run

# # Lance le conteneur avec l'environnement spécifique
up:
	docker-compose -f $(COMPOSE_FILE) up -d
	@$(MAKE) wait_for_container

wait_for_container:
	@echo "Waiting for the container to be ready..."
	@container_ready=false; \
	while [ $$container_ready != true ]; do \
		if docker exec docker-db-1 mysql -u root -p$${MYSQL_ROOT_PASSWORD} -e 'SELECT 1;' > /dev/null 2>&1; then \
			container_ready=true; \
		fi; \
		sleep 2; \
	done
	@echo "Container is ready!"

setup_prisma: up
	npm run prisma:push

run: setup_prisma up
	npx lerna run test --scope=backend
	docker-compose -f $(COMPOSE_FILE) down

# Règle spéciale pour arrêter le conteneur même en cas d'échec du Makefile
.PHONY: always
always:
	@:

# Utilise la règle 'always' comme dépendance pour s'assurer que la cible 'down' est toujours exécutée
down: always
	docker-compose -f $(COMPOSE_FILE) -f $(ENV_FILE_DOCKER) down
