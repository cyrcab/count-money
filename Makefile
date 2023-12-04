COMPOSE_FILE = ./docker/docker-compose-test.yml
ENV_FILE_DOCKER = ./docker/.env
ENV_FILE = ./packages/backend/.env
CONTAINER_ADDRESS = http://localhost:3306

# # Lance le conteneur avec l'environnement spécifique
test:
	node ./launch-test.js

# Règle spéciale pour arrêter le conteneur même en cas d'échec du Makefile
.PHONY: always
always:
	@:

# Utilise la règle 'always' comme dépendance pour s'assurer que la cible 'down' est toujours exécutée
down: always
	docker-compose -f $(COMPOSE_FILE) -f $(ENV_FILE_DOCKER) down
