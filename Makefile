local:
	yarn dev:local

dev:
	yarn dev

deploy:
	@echo "Deploy"
	git switch main
	git pull
	git merge code -m "auto merge into develop from script"
	git pull
	git push origin main
	@echo "Deploy Done!"