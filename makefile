include .env

# Deploy to GCloud
deploy-products:
	gcloud builds submit --config ./deploy/products.yaml

deploy-orders:
	gcloud builds submit --config ./deploy/orders.yaml

deploy-users:
	gcloud builds submit --config ./deploy/users.yaml

deploy:
	echo "Running Google Cloud Build" && \
	gcloud builds submit --substitutions=_APOLLO_KEY=${APOLLO_KEY},_APOLLO_GRAPH_REF=${APOLLO_GRAPH_REF}

# Publish Schema to Apollo Studio
publish-products:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
 	--schema ./nosql-products/schema.graphql \
  	--name products --routing-url https://subgraph-products-j3nprurqka-ue.a.run.app

publish-orders:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
 	--schema ./rest-orders/schema.graphql \
  	--name orders --routing-url https://subgraph-orders-j3nprurqka-ue.a.run.app

publish-users:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
 	--schema ./sql-users/schema.graphql \
  	--name users --routing-url https://subgraph-users-j3nprurqka-ue.a.run.app
