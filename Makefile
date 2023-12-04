# Makefile

# Spécifie le fichier de composition principal
COMPOSE_FILE = ./docker/docker-compose.yml

# Spécifie le fichier d'environnement spécifique pour les tests
ENV_FILE_DOCKER = ./docker/.env.test

ENV_FILE = ./packages/backend/.env


# Cible par défaut
all: run

# # Lance le conteneur avec l'environnement spécifique
up:
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE_DOCKER) up -d

set-env:
#@echo "Value of TEST_DATABASE_URL: $$(grep '^TEST_DATABASE_URL=' $(ENV_FILE) | cut -d '=' -f 2) in $(ENV_FILE)"
	NODE_ENV=test
	DATABASE_URL="$$(grep '^TEST_DATABASE_URL=' $(ENV_FILE) | cut -d '=' -f 2)" npm run prisma:push

run: set-env up
	npx lerna run test --scope=backend
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE_DOCKER) down

# # Règle spéciale pour arrêter le conteneur même en cas d'échec du Makefile
# .PHONY: always
# always:
# 	@:

# # Utilise la règle 'always' comme dépendance pour s'assurer que la cible 'down' est toujours exécutée
# down: always
# 	docker-compose -f $(COMPOSE_FILE) -f $(ENV_FILE_DOCKER) down
