deploy:
	ssh -o StrictHostKeyChecking=no deployer@${HOST} -p ${PORT} 'cd near-wallet-generator \
		&& git pull origin main \
		&& docker-compose up --build --remove-orphans -d'
