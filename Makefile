BRANCH=$(GIT_BRANCH)

local:
	yarn dev:local

dev:
	yarn dev

## make deploy-sit: deploy app in sit
deploy:
	@echo "Deploy"
	git switch main
	git pull
	git merge $(BRANCH) -m "auto merge into main from script"
	git push origin main
	git switch $(BRANCH)
	@echo "Deploy SIT Done!"
